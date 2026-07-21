/* ==========================================================================
   engine/statistics.js — Core Statistics & Calculation Engine
   Pure server-side engine. Handles XP ledger, streaks, ranks, achievements,
   subject performance analytics, weekly charts, and dashboard payload creation.
   ========================================================================== */

const {
  XpTransaction,
  ActivityLog,
  QuizAttempt,
  FlashcardSession,
  StudySession,
  Achievement,
  DailyGoal,
  UserProgress
} = require('./models');

const GKGSUpload = require('mongoose').model('Upload');

// Rank Thresholds
const RANKS = [
  { rank: 'Champion',  minXP: 6000, nextRank: null,        maxXP: 6000 },
  { rank: 'Officer',   minXP: 3000, nextRank: 'Champion',  maxXP: 6000 },
  { rank: 'Scholar',   minXP: 1500, nextRank: 'Officer',   maxXP: 3000 },
  { rank: 'Aspirant',  minXP: 500,  nextRank: 'Scholar',   maxXP: 1500 },
  { rank: 'Beginner',  minXP: 0,    nextRank: 'Aspirant',  maxXP: 500  }
];

// Achievement Rules & Metadata
const ACHIEVEMENTS_DEF = [
  { id: 'first_step',  title: 'First Step',     icon: '🌟', check: (p) => p.modulesVisited >= 1 },
  { id: 'xp_100',     title: '100 XP Club',    icon: '⚡', check: (p) => p.totalXP >= 100 },
  { id: 'xp_500',     title: '500 XP Club',    icon: '⚡', check: (p) => p.totalXP >= 500 },
  { id: 'xp_1000',    title: 'Scholar',        icon: '🎓', check: (p) => p.totalXP >= 1000 },
  { id: 'streak_7',   title: 'Week Warrior',   icon: '🔥', check: (p) => p.currentStreak >= 7 },
  { id: 'streak_30',  title: 'Iron Will',      icon: '🛡️', check: (p) => p.currentStreak >= 30 },
  { id: 'quiz_champ', title: 'Quiz Champ',     icon: '🎯', check: (p) => p.quizzesCompleted >= 1 },
  { id: 'q_100',      title: '100 Questions',  icon: '❓', check: (p) => p.questionsAttempted >= 100 },
  { id: 'note_taker', title: 'Note Taker',     icon: '📖', check: (p) => p.notesRead >= 1 },
  { id: 'card_shark', title: 'Card Shark',     icon: '🃏', check: (p) => p.flashcardsReviewed >= 10 }
];

const SUBJECTS_LIST = ['history', 'polity', 'geography', 'science', 'economy', 'staticgk', 'currentaffairs', 'flashcards'];

// Helper: Get YYYY-MM-DD string in IST timezone
function getTodayDateString(dateObj = new Date()) {
  const d = new Date(dateObj.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Helper: Difference in calendar days between two YYYY-MM-DD strings
function getDaysDiff(dateStr1, dateStr2) {
  const d1 = new Date(dateStr1);
  const d2 = new Date(dateStr2);
  const diffTime = Math.abs(d2 - d1);
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

class StatisticsEngine {

  /**
   * Idempotently award XP to a user.
   * Ensures duplicate actions never award double XP.
   */
  static async awardXP(userId, amount, action, subject = null, idempotencyKey = null) {
    if (!idempotencyKey) {
      idempotencyKey = `${action}:${userId}:${subject || 'gen'}:${Date.now()}:${Math.random()}`;
    }

    try {
      const tx = new XpTransaction({
        userId,
        amount,
        action,
        subject,
        idempotencyKey
      });
      await tx.save();
      return { awarded: true, amount };
    } catch (err) {
      if (err.code === 11000) {
        // Duplicate transaction attempt caught by unique idempotency index
        return { awarded: false, amount: 0, reason: 'duplicate' };
      }
      throw err;
    }
  }

  /**
   * Calculate total XP by summing append-only XpTransaction records
   */
  static async calculateTotalXP(userId) {
    const res = await XpTransaction.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    return res.length > 0 ? res[0].total : 0;
  }

  /**
   * Calculate current and longest streak based on activity logs
   */
  static async calculateStreak(userId) {
    // Get unique activity dates sorted descending
    const logs = await ActivityLog.aggregate([
      { $match: { userId } },
      {
        $project: {
          dateStr: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: 'Asia/Kolkata' }
          }
        }
      },
      { $group: { _id: '$dateStr' } },
      { $sort: { _id: -1 } }
    ]);

    if (logs.length === 0) {
      return { currentStreak: 0, longestStreak: 0, lastActiveDate: null };
    }

    const today = getTodayDateString();
    const activeDates = logs.map(l => l._id);
    const lastActiveDate = activeDates[0];

    // Check if user was active today or yesterday to maintain current streak
    const diffFromToday = getDaysDiff(lastActiveDate, today);
    let currentStreak = 0;

    if (diffFromToday <= 1) { // Active today or yesterday
      currentStreak = 1;
      for (let i = 0; i < activeDates.length - 1; i++) {
        const diff = getDaysDiff(activeDates[i + 1], activeDates[i]);
        if (diff === 1) {
          currentStreak++;
        } else {
          break;
        }
      }
    } else {
      // Missed more than 1 day -> streak reset to 0
      currentStreak = 0;
    }

    // Calculate longest streak historically
    let longestStreak = activeDates.length > 0 ? 1 : 0;
    let tempStreak = 1;
    for (let i = 0; i < activeDates.length - 1; i++) {
      const diff = getDaysDiff(activeDates[i + 1], activeDates[i]);
      if (diff === 1) {
        tempStreak++;
      } else {
        tempStreak = 1;
      }
      if (tempStreak > longestStreak) longestStreak = tempStreak;
    }

    return { currentStreak, longestStreak, lastActiveDate };
  }

  /**
   * Compute Rank & progress percentage from XP
   */
  static calculateRank(totalXP) {
    const current = RANKS.find(r => totalXP >= r.minXP) || RANKS[RANKS.length - 1];
    let rankPct = 100;
    let nextRankName = 'Max Rank!';

    if (current.nextRank) {
      nextRankName = current.nextRank;
      const nextRankObj = RANKS.find(r => r.rank === current.nextRank);
      const range = nextRankObj.minXP - current.minXP;
      const earnedInRange = totalXP - current.minXP;
      rankPct = Math.min(100, Math.max(0, Math.round((earnedInRange / range) * 100)));
    }

    return {
      currentRank: current.rank,
      nextRank: nextRankName,
      rankPct
    };
  }

  /**
   * Calculate subject progress, overall accuracy, strongest and focus subjects
   */
  static async calculateSubjectStats(userId) {
    // Aggregate quiz attempts per subject
    const quizStats = await QuizAttempt.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: '$subject',
          attemptsCount: { $sum: 1 },
          questionsAttempted: { $sum: '$questionsAttempted' },
          correctAnswers: { $sum: '$correctAnswers' },
          totalScore: { $sum: '$score' }
        }
      }
    ]);

    // Aggregate XP per subject
    const xpStats = await XpTransaction.aggregate([
      { $match: { userId, subject: { $ne: null } } },
      { $group: { _id: '$subject', totalXP: { $sum: '$amount' } } }
    ]);

    const xpMap = {};
    xpStats.forEach(x => { xpMap[x._id] = x.totalXP; });

    const quizMap = {};
    let totalQuestions = 0;
    let totalCorrect = 0;
    let totalQuizzes = 0;

    quizStats.forEach(q => {
      quizMap[q._id] = q;
      totalQuestions += q.questionsAttempted;
      totalCorrect += q.correctAnswers;
      totalQuizzes += q.attemptsCount;
    });

    const subjectProgressMap = {};
    let highestAccuracy = -1;
    let lowestAccuracy = 101;
    let strongestSubject = 'History';
    let weakestSubject = 'Geography';

    SUBJECTS_LIST.forEach(sub => {
      const q = quizMap[sub] || { questionsAttempted: 0, correctAnswers: 0, attemptsCount: 0 };
      const subXP = xpMap[sub] || 0;
      const acc = q.questionsAttempted > 0 ? Math.round((q.correctAnswers / q.questionsAttempted) * 100) : 0;
      
      subjectProgressMap[sub] = {
        xp: subXP,
        questionsAttempted: q.questionsAttempted,
        correctAnswers: q.correctAnswers,
        accuracy: acc,
        quizzesCompleted: q.attemptsCount
      };

      if (q.questionsAttempted > 0) {
        if (acc > highestAccuracy) {
          highestAccuracy = acc;
          strongestSubject = sub.toUpperCase();
        }
        if (acc < lowestAccuracy) {
          lowestAccuracy = acc;
          weakestSubject = sub.toUpperCase();
        }
      }
    });

    const overallAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

    return {
      totalQuestions,
      totalCorrect,
      totalQuizzes,
      overallAccuracy,
      strongestSubject,
      weakestSubject,
      subjectProgressMap
    };
  }

  /**
   * Get 7-day weekly performance (daily XP breakdown)
   */
  static async calculateWeeklyChart(userId) {
    const days = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = getTodayDateString(d);
      const dayName = i === 0 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short' });
      days.push({ dateStr, dayName, xp: 0 });
    }

    const startDate = new Date(days[0].dateStr);
    const endDate = new Date(days[6].dateStr);
    endDate.setHours(23, 59, 59, 999);

    const xpDaily = await XpTransaction.aggregate([
      {
        $match: {
          userId,
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $project: {
          amount: 1,
          dateStr: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: 'Asia/Kolkata' }
          }
        }
      },
      {
        $group: {
          _id: '$dateStr',
          dailyTotal: { $sum: '$amount' }
        }
      }
    ]);

    const dailyMap = {};
    xpDaily.forEach(x => { dailyMap[x._id] = x.dailyTotal; });

    days.forEach(day => {
      day.xp = dailyMap[day.dateStr] || 0;
    });

    return days;
  }

  /**
   * Check and unlock new achievements automatically
   */
  static async checkAndUnlockAchievements(userId, progressData) {
    const existing = await Achievement.find({ userId }).select('achievementId');
    const unlockedSet = new Set(existing.map(a => a.achievementId));
    const newUnlocked = [];

    for (const def of ACHIEVEMENTS_DEF) {
      if (!unlockedSet.has(def.id) && def.check(progressData)) {
        try {
          const ach = new Achievement({
            userId,
            achievementId: def.id,
            title: def.title,
            icon: def.icon
          });
          await ach.save();
          newUnlocked.push(def);
          
          // Log achievement unlocked to activity
          await ActivityLog.create({
            userId,
            action: `Unlocked Achievement: ${def.title}`,
            type: 'achievement_unlocked',
            icon: def.icon,
            xpEarned: 0
          });
        } catch (e) {
          // Ignore duplicate if race condition occurs
        }
      }
    }

    return newUnlocked;
  }

  /**
   * Get or initialize today's Daily Goal document
   */
  static async getDailyGoals(userId) {
    const today = getTodayDateString();
    let goalDoc = await DailyGoal.findOne({ userId, date: today });
    if (!goalDoc) {
      goalDoc = new DailyGoal({ userId, date: today });
      await goalDoc.save();
    }
    return goalDoc;
  }

  /**
   * Mark a daily goal as completed and award bonus if all 5 are completed
   */
  static async markDailyGoal(userId, goalKey) {
    const today = getTodayDateString();
    const goalDoc = await this.getDailyGoals(userId);

    if (goalDoc.goals[goalKey] === false) {
      goalDoc.goals[goalKey] = true;
      
      // Award Goal XP
      const idempotencyKey = `goal_${goalKey}:${userId}:${today}`;
      await this.awardXP(userId, 100, `goal_${goalKey}`, null, idempotencyKey);

      await ActivityLog.create({
        userId,
        action: `Completed Daily Goal: ${goalKey}`,
        type: 'daily_goal',
        icon: '🎯',
        xpEarned: 100
      });

      // Check if all 5 goals are done for bonus
      const allDone = Object.values(goalDoc.goals).every(Boolean);
      if (allDone && !goalDoc.bonusAwarded) {
        goalDoc.bonusAwarded = true;
        await this.awardXP(userId, 100, 'daily_goal_bonus', null, `goal_bonus:${userId}:${today}`);
        await ActivityLog.create({
          userId,
          action: '🎯 Completed All 5 Daily Goals! (+100 Bonus XP)',
          type: 'daily_goal_bonus',
          icon: '🏆',
          xpEarned: 100
        });
      }

      await goalDoc.save();
    }

    return goalDoc;
  }

  /**
   * Complete full user progress recalculation and persist snapshot
   */
  static async recalculateAndSaveProgress(userId) {
    const totalXP = await this.calculateTotalXP(userId);
    const { currentStreak, longestStreak, lastActiveDate } = await this.calculateStreak(userId);
    const { currentRank, nextRank, rankPct } = this.calculateRank(totalXP);
    const subjectStats = await this.calculateSubjectStats(userId);

    // Count notes read, flashcards, files uploaded, modules visited from ActivityLog/Uploads
    const notesReadCount = await ActivityLog.countDocuments({ userId, type: 'read_notes' });
    const flashcardsCount = await FlashcardSession.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: '$cardsReviewed' } } }
    ]);

    const studyTimeStats = await StudySession.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: '$duration' } } }
    ]);

    const filesUploaded = await GKGSUpload.countDocuments({ userId });
    const modulesVisited = await ActivityLog.countDocuments({ userId, type: 'visit_module' });

    const totalStudyTime = studyTimeStats.length > 0 ? studyTimeStats[0].total : 0;
    const flashcardsReviewed = flashcardsCount.length > 0 ? flashcardsCount[0].total : 0;

    const progressData = {
      totalXP,
      currentRank,
      nextRank,
      rankPct,
      currentStreak,
      longestStreak,
      totalStudyTime,
      questionsAttempted: subjectStats.totalQuestions,
      correctAnswers: subjectStats.totalCorrect,
      accuracy: subjectStats.overallAccuracy,
      quizzesCompleted: subjectStats.totalQuizzes,
      mockTestsCompleted: await QuizAttempt.countDocuments({ userId, subject: 'mock' }),
      notesRead: notesReadCount,
      flashcardsReviewed,
      filesUploaded,
      modulesVisited,
      lastActiveDate
    };

    // Save/Upsert snapshot to UserProgress collection
    const userProgress = await UserProgress.findOneAndUpdate(
      { userId },
      {
        ...progressData,
        subjectProgress: subjectStats.subjectProgressMap
      },
      { new: true, upsert: true }
    );

    // Check & unlock any new achievements
    await this.checkAndUnlockAchievements(userId, progressData);

    return userProgress;
  }

  /**
   * Main Orchestrator: Generate complete, real-time database-driven Dashboard Payload
   */
  static async buildDashboardPayload(userId) {
    // 1. Recalculate progress snapshot
    const progress = await this.recalculateAndSaveProgress(userId);

    // 2. Fetch Daily Goals
    const dailyGoalDoc = await this.getDailyGoals(userId);

    // 3. Fetch 7-day Weekly XP Chart
    const weeklyChart = await this.calculateWeeklyChart(userId);

    // 4. Fetch Unlocked Achievements
    const achievements = await Achievement.find({ userId }).sort({ unlockedAt: -1 });

    // 5. Fetch Recent Activity Feed (latest 10)
    const activityFeed = await ActivityLog.find({ userId }).sort({ createdAt: -1 }).limit(10);

    // 6. Subject stats for focus/strongest
    const { strongestSubject, weakestSubject, subjectProgressMap } = await this.calculateSubjectStats(userId);

    return {
      userProgress: {
        totalXP: progress.totalXP,
        currentRank: progress.currentRank,
        nextRank: progress.nextRank,
        rankPct: progress.rankPct,
        currentStreak: progress.currentStreak,
        longestStreak: progress.longestStreak,
        totalStudyTime: progress.totalStudyTime,
        questionsAttempted: progress.questionsAttempted,
        correctAnswers: progress.correctAnswers,
        accuracy: progress.accuracy,
        quizzesCompleted: progress.quizzesCompleted,
        mockTestsCompleted: progress.mockTestsCompleted,
        notesRead: progress.notesRead,
        flashcardsReviewed: progress.flashcardsReviewed,
        filesUploaded: progress.filesUploaded,
        strongestSubject,
        weakestSubject
      },
      goals: dailyGoalDoc.goals,
      goalsDoneCount: Object.values(dailyGoalDoc.goals).filter(Boolean).length,
      weeklyChart,
      subjectProgress: subjectProgressMap,
      achievements: achievements.map(a => ({ id: a.achievementId, title: a.title, icon: a.icon, unlockedAt: a.unlockedAt })),
      activityFeed: activityFeed.map(a => ({
        icon: a.icon,
        action: a.action,
        xp: a.xpEarned > 0 ? `+${a.xpEarned} XP` : '',
        time: new Date(a.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }))
    };
  }

}

module.exports = StatisticsEngine;
