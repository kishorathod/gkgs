/* ==========================================================================
   engine/models.js — All Mongoose schemas for GK-GS App
   Single source of truth for all DB models.
   ========================================================================== */

const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

// ── XP Transaction (append-only ledger) ─────────────────────────────────────
// idempotencyKey prevents double-awarding XP for the same action.
const XpTransactionSchema = new Schema({
  userId:           { type: ObjectId, ref: 'User', required: true, index: true },
  amount:           { type: Number, required: true },
  action:           { type: String, required: true }, // e.g. 'visit_module', 'quiz_complete'
  subject:          { type: String, default: null },
  idempotencyKey:   { type: String, required: true, unique: true }, // e.g. 'visit_module:userId:history:2026-07-21'
  createdAt:        { type: Date, default: Date.now, index: true }
});

// ── User Activity (event-driven stream) ──────────────────────────────────────
const UserActivitySchema = new Schema({
  userId:    { type: ObjectId, ref: 'User', required: true, index: true },
  eventType: { type: String, required: true, index: true }, // e.g. 'topic_opened', 'question_answered', 'flashcard_reviewed'
  subject:   { type: String, default: null, index: true },
  topicId:   { type: String, default: null },
  metadata:  { type: Schema.Types.Mixed, default: {} },
  timestamp: { type: Date, default: Date.now, index: true }
});

// ── Activity Log (event stream) ──────────────────────────────────────────────
const ActivityLogSchema = new Schema({
  userId:    { type: ObjectId, ref: 'User', required: true, index: true },
  action:    { type: String, required: true },   // human-readable: "Completed History Quiz"
  type:      { type: String, required: true },   // machine key: 'quiz_complete'
  icon:      { type: String, default: '⭐' },
  subject:   { type: String, default: null },
  xpEarned:  { type: Number, default: 0 },
  metadata:  { type: Schema.Types.Mixed, default: {} },
  createdAt: { type: Date, default: Date.now, index: true }
});

// ── Quiz Attempt ─────────────────────────────────────────────────────────────
const QuizAttemptSchema = new Schema({
  userId:              { type: ObjectId, ref: 'User', required: true, index: true },
  subject:             { type: String, required: true },
  questionsAttempted:  { type: Number, required: true, min: 1 },
  correctAnswers:      { type: Number, required: true, min: 0 },
  score:               { type: Number, required: true }, // percentage 0-100
  duration:            { type: Number, default: 0 },     // seconds
  completedAt:         { type: Date, default: Date.now, index: true }
});

// ── Flashcard Session ────────────────────────────────────────────────────────
const FlashcardSessionSchema = new Schema({
  userId:        { type: ObjectId, ref: 'User', required: true, index: true },
  cardsReviewed: { type: Number, required: true, min: 1 },
  correctCount:  { type: Number, required: true, min: 0 },
  subject:       { type: String, default: 'general' },
  duration:      { type: Number, default: 0 }, // seconds
  completedAt:   { type: Date, default: Date.now, index: true }
});

// ── Study Session (tracks time-on-task) ─────────────────────────────────────
const StudySessionSchema = new Schema({
  userId:    { type: ObjectId, ref: 'User', required: true, index: true },
  subject:   { type: String, default: 'general' },
  startedAt: { type: Date, default: Date.now, index: true },
  endedAt:   { type: Date, default: null },
  duration:  { type: Number, default: 0 } // minutes (set when session ends)
});

// ── Achievement (per user, no duplicates) ────────────────────────────────────
const AchievementSchema = new Schema({
  userId:        { type: ObjectId, ref: 'User', required: true },
  achievementId: { type: String, required: true },
  title:         { type: String, required: true },
  icon:          { type: String, required: true },
  unlockedAt:    { type: Date, default: Date.now }
});
// Compound unique index prevents the same achievement being unlocked twice
AchievementSchema.index({ userId: 1, achievementId: 1 }, { unique: true });

// ── Daily Goal (per user per calendar day) ───────────────────────────────────
const DailyGoalSchema = new Schema({
  userId: { type: ObjectId, ref: 'User', required: true },
  date:   { type: String, required: true }, // 'YYYY-MM-DD' (IST)
  goals: {
    visitModule: { type: Boolean, default: false },
    readNotes:   { type: Boolean, default: false },
    flashcard:   { type: Boolean, default: false },
    quiz:        { type: Boolean, default: false },
    uploadFile:  { type: Boolean, default: false }
  },
  bonusAwarded: { type: Boolean, default: false }
});
// Unique: one goal doc per user per day
DailyGoalSchema.index({ userId: 1, date: 1 }, { unique: true });

// ── User Progress (single computed snapshot per user) ────────────────────────
// Recomputed by StatisticsEngine after every action. Never edited directly.
const UserProgressSchema = new Schema({
  userId:            { type: ObjectId, ref: 'User', required: true, unique: true },
  totalXP:           { type: Number, default: 0 },
  currentRank:       { type: String, default: 'Beginner' },
  nextRank:          { type: String, default: 'Aspirant' },
  rankPct:           { type: Number, default: 0 },
  currentStreak:     { type: Number, default: 0 },
  longestStreak:     { type: Number, default: 0 },
  totalStudyTime:    { type: Number, default: 0 },  // minutes
  questionsAttempted:{ type: Number, default: 0 },
  correctAnswers:    { type: Number, default: 0 },
  accuracy:          { type: Number, default: 0 },  // 0–100 %
  quizzesCompleted:  { type: Number, default: 0 },
  mockTestsCompleted:{ type: Number, default: 0 },
  notesRead:         { type: Number, default: 0 },
  flashcardsReviewed:{ type: Number, default: 0 },
  filesUploaded:     { type: Number, default: 0 },
  modulesVisited:    { type: Number, default: 0 },
  // Map: subject → { xp, pct, lessonsCompleted, totalLessons, questionsAttempted, correctAnswers, accuracy, lastVisited }
  subjectProgress:   { type: Map, of: Schema.Types.Mixed, default: {} },
  lastActiveDate:    { type: String, default: null }, // 'YYYY-MM-DD'
}, { timestamps: true });

// ── Model Exports ────────────────────────────────────────────────────────────
const UserActivity     = mongoose.model('UserActivity',     UserActivitySchema);
const XpTransaction    = mongoose.model('XpTransaction',    XpTransactionSchema);
const ActivityLog      = mongoose.model('ActivityLog',      ActivityLogSchema);
const QuizAttempt      = mongoose.model('QuizAttempt',      QuizAttemptSchema);
const FlashcardSession = mongoose.model('FlashcardSession', FlashcardSessionSchema);
const StudySession     = mongoose.model('StudySession',     StudySessionSchema);
const Achievement      = mongoose.model('Achievement',      AchievementSchema);
const DailyGoal        = mongoose.model('DailyGoal',        DailyGoalSchema);
const UserProgress     = mongoose.model('UserProgress',     UserProgressSchema);

module.exports = {
  UserActivity,
  XpTransaction,
  ActivityLog,
  QuizAttempt,
  FlashcardSession,
  StudySession,
  Achievement,
  DailyGoal,
  UserProgress
};
