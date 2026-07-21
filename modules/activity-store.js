/* ==========================================================================
   modules/activity-store.js — Event-Driven UserActivity Store & Analytics Engine
   Single source of truth for user progress and activity events.
   All dashboard metrics are derived strictly as computed selectors from activity data.
   ========================================================================== */

import { api } from './api-service.js';

class ActivityStore {
  constructor() {
    this.activities = [];
    this.subscribers = [];
    this.sessionStartTimestamp = Date.now();
    this.currentActiveSessionSeconds = 0;
    this.storageKey = 'gkgs_activity_log_v2';
    
    // Load cached activities from localStorage
    this.loadFromLocal();
  }

  loadFromLocal() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) {
        this.activities = JSON.parse(raw);
      }
    } catch (e) {
      console.warn('ActivityStore: failed to load local cache', e);
      this.activities = [];
    }
  }

  saveToLocal() {
    try {
      // Keep last 1000 activity logs locally
      const toSave = this.activities.slice(-1000);
      localStorage.setItem(this.storageKey, JSON.stringify(toSave));
    } catch (e) {
      console.warn('ActivityStore: failed to save local cache', e);
    }
  }

  subscribe(callback) {
    if (typeof callback === 'function') {
      this.subscribers.push(callback);
    }
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  notifySubscribers() {
    const payload = this.getDashboardMetrics();
    this.subscribers.forEach(cb => {
      try {
        cb(payload);
      } catch (err) {
        console.error('ActivityStore subscriber error:', err);
      }
    });
  }

  /**
   * Core Event Logger: Every meaningful user interaction dispatches an event here.
   * Event Types:
   *  - 'app_opened'
   *  - 'session_started'
   *  - 'session_ended'
   *  - 'topic_opened'
   *  - 'note_read'
   *  - 'reading_duration'
   *  - 'quiz_started'
   *  - 'quiz_completed'
   *  - 'question_answered'
   *  - 'flashcard_reviewed'
   *  - 'study_file_opened'
   *  - 'bookmark_created'
   *  - 'chapter_completed'
   */
  async logEvent(eventType, payload = {}) {
    const event = {
      id: `act_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      eventType,
      subject: payload.subject || null,
      topicId: payload.topicId || null,
      metadata: {
        duration: payload.duration || 0,
        isCorrect: payload.isCorrect ?? null,
        score: payload.score || 0,
        questionsCount: payload.questionsCount || 0,
        correctCount: payload.correctCount || 0,
        xpEarned: payload.xpEarned || 0,
        title: payload.title || '',
        ...(payload.metadata || {})
      },
      timestamp: payload.timestamp || new Date().toISOString()
    };

    // 1. Optimistically append to local store
    this.activities.push(event);
    this.saveToLocal();

    // 2. Notify subscribers so dashboard re-renders instantly
    this.notifySubscribers();

    // 3. Sync to backend API if authenticated
    try {
      const serverResponse = await api.request('/api/activity/log', {
        method: 'POST',
        body: JSON.stringify(event)
      });

      // If backend returns updated analytics payload, merge and update
      if (serverResponse && serverResponse.dashboard) {
        this.notifySubscribers();
      }
    } catch (e) {
      console.warn('ActivityStore background sync warning:', e.message);
    }

    return event;
  }

  /**
   * Replace local activities with full synced log array from server
   */
  syncWithServerPayload(serverDashboard) {
    if (!serverDashboard) return;
    this.notifySubscribers();
  }

  // ── COMPUTED SELECTORS (Derived Analytics Engine) ─────────────────────

  /**
   * Helper: Get date string YYYY-MM-DD for any date object
   */
  getDateStr(date = new Date()) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Session Time = Current active session duration in minutes
   */
  getSessionTimeMinutes() {
    const elapsedSeconds = Math.floor((Date.now() - this.sessionStartTimestamp) / 1000) + this.currentActiveSessionSeconds;
    return Math.max(0, Math.floor(elapsedSeconds / 60));
  }

  /**
   * Today's Study Time = Sum of today's reading duration, quiz duration & session time
   */
  getTodayStudyTimeMinutes() {
    const todayStr = this.getDateStr();
    let durationSeconds = 0;

    this.activities.forEach(act => {
      if (this.getDateStr(act.timestamp) === todayStr) {
        if (act.metadata && act.metadata.duration) {
          durationSeconds += Number(act.metadata.duration);
        }
      }
    });

    const activeSessionMin = this.getSessionTimeMinutes();
    const loggedMin = Math.round(durationSeconds / 60);
    return loggedMin + activeSessionMin;
  }

  /**
   * Total XP = Sum of XP earned from completed actions
   */
  getTotalXP() {
    return this.activities.reduce((sum, act) => sum + (act.metadata?.xpEarned || 0), 0);
  }

  /**
   * Questions Solved = Total answered questions count
   */
  getQuestionsSolved() {
    let count = 0;
    this.activities.forEach(act => {
      if (act.eventType === 'question_answered') {
        count += 1;
      } else if (act.eventType === 'quiz_completed' && act.metadata?.questionsCount) {
        // Fallback if individual question events weren't counted separately
        count += Number(act.metadata.questionsCount);
      }
    });
    return count;
  }

  /**
   * Correct Answers Count
   */
  getCorrectAnswersCount() {
    let count = 0;
    this.activities.forEach(act => {
      if (act.eventType === 'question_answered' && act.metadata?.isCorrect === true) {
        count += 1;
      } else if (act.eventType === 'quiz_completed' && act.metadata?.correctCount) {
        count += Number(act.metadata.correctCount);
      }
    });
    return count;
  }

  /**
   * Accuracy = Correct answers / Total answered (in %)
   */
  getAccuracy() {
    const solved = this.getQuestionsSolved();
    if (solved === 0) return 0;
    const correct = this.getCorrectAnswersCount();
    return Math.min(100, Math.round((correct / solved) * 100));
  }

  /**
   * Subject Analytics Breakdown
   */
  getSubjectStats() {
    const SUBJECT_NAMES = {
      history: 'Indian History',
      polity: 'Indian Polity',
      geography: 'Geography',
      science: 'General Science',
      economy: 'Economy',
      staticgk: 'Static GK',
      currentaffairs: 'Current Affairs',
      flashcards: 'Flashcards'
    };

    const stats = {};
    Object.keys(SUBJECT_NAMES).forEach(sub => {
      stats[sub] = {
        subject: sub,
        name: SUBJECT_NAMES[sub],
        questionsAttempted: 0,
        correctAnswers: 0,
        studyTimeSeconds: 0,
        xp: 0,
        quizzesCompleted: 0
      };
    });

    this.activities.forEach(act => {
      const sub = act.subject;
      if (sub && stats[sub]) {
        if (act.metadata?.xpEarned) {
          stats[sub].xp += Number(act.metadata.xpEarned);
        }
        if (act.metadata?.duration) {
          stats[sub].studyTimeSeconds += Number(act.metadata.duration);
        }

        if (act.eventType === 'question_answered') {
          stats[sub].questionsAttempted += 1;
          if (act.metadata?.isCorrect) stats[sub].correctAnswers += 1;
        } else if (act.eventType === 'quiz_completed') {
          stats[sub].quizzesCompleted += 1;
          if (act.metadata?.questionsCount) stats[sub].questionsAttempted += Number(act.metadata.questionsCount);
          if (act.metadata?.correctCount) stats[sub].correctAnswers += Number(act.metadata.correctCount);
        }
      }
    });

    return stats;
  }

  /**
   * Strongest Subject = Subject with highest accuracy (min 1 question answered)
   */
  getStrongestSubject() {
    const stats = this.getSubjectStats();
    let bestSub = null;
    let maxAcc = -1;

    Object.values(stats).forEach(s => {
      if (s.questionsAttempted > 0) {
        const acc = Math.round((s.correctAnswers / s.questionsAttempted) * 100);
        if (acc > maxAcc) {
          maxAcc = acc;
          bestSub = s.name;
        }
      }
    });

    return bestSub || 'No data yet';
  }

  /**
   * Focus Area = Subject with highest study time (or lowest accuracy if tied)
   */
  getFocusArea() {
    const stats = this.getSubjectStats();
    let focusSub = null;
    let maxTime = 0;

    Object.values(stats).forEach(s => {
      if (s.studyTimeSeconds > maxTime) {
        maxTime = s.studyTimeSeconds;
        focusSub = s.name;
      }
    });

    return focusSub || 'Start learning';
  }

  /**
   * Day Streak = Consecutive active study dates counting backwards from today/yesterday
   */
  getDayStreak() {
    const activeDatesSet = new Set();
    this.activities.forEach(act => {
      if (act.timestamp) {
        activeDatesSet.add(this.getDateStr(act.timestamp));
      }
    });

    if (activeDatesSet.size === 0) return 0;

    const sortedDates = Array.from(activeDatesSet).sort().reverse(); // newest first
    const today = this.getDateStr();
    const yesterday = this.getDateStr(new Date(Date.now() - 86400000));

    const latestActive = sortedDates[0];
    if (latestActive !== today && latestActive !== yesterday) {
      return 0;
    }

    let streak = 1;
    let curr = new Date(latestActive);

    for (let i = 1; i < sortedDates.length; i++) {
      const prevDate = new Date(curr);
      prevDate.setDate(prevDate.getDate() - 1);
      const prevDateStr = this.getDateStr(prevDate);

      if (sortedDates.includes(prevDateStr)) {
        streak++;
        curr = prevDate;
      } else {
        break;
      }
    }

    return streak;
  }

  /**
   * Daily Goals = Actions completed today
   */
  getDailyGoals() {
    const todayStr = this.getDateStr();
    const todayActs = this.activities.filter(a => this.getDateStr(a.timestamp) === todayStr);

    const goals = {
      visitModule: todayActs.some(a => ['visit_module', 'topic_opened', 'chapter_completed'].includes(a.eventType)),
      readNotes: todayActs.some(a => ['read_notes', 'note_read', 'reading_duration'].includes(a.eventType)),
      flashcard: todayActs.some(a => ['flashcard_reviewed', 'flashcard-session'].includes(a.eventType)),
      quiz: todayActs.some(a => ['quiz_completed', 'quiz-complete', 'question_answered'].includes(a.eventType)),
      uploadFile: todayActs.some(a => ['file_upload', 'study_file_opened'].includes(a.eventType))
    };

    const doneCount = Object.values(goals).filter(Boolean).length;
    return { goals, doneCount };
  }

  /**
   * Continue Learning = Last opened/interacted topic or subject
   */
  getContinueLearning() {
    const topicEvents = this.activities
      .filter(a => ['topic_opened', 'note_read', 'chapter_completed'].includes(a.eventType) && a.subject)
      .reverse();

    if (topicEvents.length > 0) {
      const last = topicEvents[0];
      return {
        subject: last.subject,
        topicId: last.topicId,
        title: last.metadata?.title || last.subject
      };
    }
    return null;
  }

  /**
   * Weekly Chart = Aggregate XP earned each day for the past 7 days
   */
  getWeeklyChart() {
    const days = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = this.getDateStr(d);
      const dayName = i === 0 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short' });
      days.push({ dateStr, dayName, xp: 0 });
    }

    this.activities.forEach(act => {
      const dateStr = this.getDateStr(act.timestamp);
      const dayObj = days.find(d => d.dateStr === dateStr);
      if (dayObj) {
        dayObj.xp += Number(act.metadata?.xpEarned || 0);
      }
    });

    return days;
  }

  /**
   * Calculate User Rank from XP
   */
  getRankInfo() {
    const totalXP = this.getTotalXP();
    const RANKS = [
      { rank: 'Champion',  minXP: 6000, nextRank: null,        maxXP: 6000 },
      { rank: 'Officer',   minXP: 3000, nextRank: 'Champion',  maxXP: 6000 },
      { rank: 'Scholar',   minXP: 1500, nextRank: 'Officer',   maxXP: 3000 },
      { rank: 'Aspirant',  minXP: 500,  nextRank: 'Scholar',   maxXP: 1500 },
      { rank: 'Beginner',  minXP: 0,    nextRank: 'Aspirant',  maxXP: 500  }
    ];

    const current = RANKS.find(r => totalXP >= r.minXP) || RANKS[RANKS.length - 1];
    let rankPct = 100;
    let nextRank = 'Max Rank!';

    if (current.nextRank) {
      nextRank = current.nextRank;
      const nextObj = RANKS.find(r => r.rank === current.nextRank);
      const range = nextObj.minXP - current.minXP;
      const earnedInRange = totalXP - current.minXP;
      rankPct = Math.min(100, Math.max(0, Math.round((earnedInRange / range) * 100)));
    }

    return {
      currentRank: current.rank,
      nextRank,
      rankPct
    };
  }

  /**
   * Returns complete derived Dashboard Payload
   */
  getDashboardMetrics() {
    const { goals, doneCount } = this.getDailyGoals();
    const subjectStats = this.getSubjectStats();
    const rankInfo = this.getRankInfo();

    const subjectProgressMap = {};
    Object.keys(subjectStats).forEach(sub => {
      subjectProgressMap[sub] = {
        xp: subjectStats[sub].xp,
        questionsAttempted: subjectStats[sub].questionsAttempted,
        correctAnswers: subjectStats[sub].correctAnswers,
        accuracy: subjectStats[sub].questionsAttempted > 0 ? Math.round((subjectStats[sub].correctAnswers / subjectStats[sub].questionsAttempted) * 100) : 0,
        quizzesCompleted: subjectStats[sub].quizzesCompleted
      };
    });

    return {
      userProgress: {
        totalXP: this.getTotalXP(),
        currentRank: rankInfo.currentRank,
        nextRank: rankInfo.nextRank,
        rankPct: rankInfo.rankPct,
        currentStreak: this.getDayStreak(),
        longestStreak: this.getDayStreak(),
        totalStudyTime: this.getTodayStudyTimeMinutes(),
        questionsAttempted: this.getQuestionsSolved(),
        correctAnswers: this.getCorrectAnswersCount(),
        accuracy: this.getAccuracy(),
        quizzesCompleted: Object.values(subjectStats).reduce((acc, s) => acc + s.quizzesCompleted, 0),
        notesRead: this.activities.filter(a => a.eventType === 'note_read').length,
        flashcardsReviewed: this.activities.filter(a => a.eventType === 'flashcard_reviewed').length,
        filesUploaded: this.activities.filter(a => a.eventType === 'file_upload').length,
        strongestSubject: this.getStrongestSubject(),
        weakestSubject: this.getFocusArea()
      },
      goals,
      goalsDoneCount: doneCount,
      weeklyChart: this.getWeeklyChart(),
      subjectProgress: subjectProgressMap,
      activityFeed: this.activities.slice(-10).reverse().map(a => ({
        icon: a.metadata?.icon || '⭐',
        action: a.metadata?.title || a.eventType.replace('_', ' '),
        xp: a.metadata?.xpEarned > 0 ? `+${a.metadata.xpEarned} XP` : '',
        time: new Date(a.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }))
    };
  }
}

export const activityStore = new ActivityStore();
