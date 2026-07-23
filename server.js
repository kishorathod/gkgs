/* ==========================================================================
   GK-GS App Backend Server (server.js)
   Express server integrating MongoDB, JWT Authentication, Google SSO,
   and the Database-Driven Statistics Engine.
   ========================================================================== */

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://krr8088_db_user:1QSqWfPXYiDgUOym@cluster0.ccgxa3n.mongodb.net/gkgs?retryWrites=true&w=majority';
const JWT_SECRET = process.env.JWT_SECRET || 'gkgs_secret_jwt_key_2026_cgl';

// Initialize Google OAuth2 client
const oauthClient = new OAuth2Client();

// Middleware
app.use(cors());
app.use(express.json());

// Set up Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB file limit
});

// ── Database Connection ────────────────────────────────────────────────
mongoose.connect(MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB Atlas for GK-GS Hub'))
  .catch(err => console.error('MongoDB connection error:', err));

// ── Core MongoDB Models ────────────────────────────────────────────────
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  passwordHash: { type: String },
  googleId: { type: String },
  picture: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const GKGSUser = mongoose.model('User', UserSchema);

// Legacy State Model (kept for fallback)
const StateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  totalXP: { type: Number, default: 0 },
  streak: { type: Number, default: 1 },
  goals: {
    visitModule: { type: Boolean, default: false },
    flashcard: { type: Boolean, default: false },
    quiz: { type: Boolean, default: false },
    uploadFile: { type: Boolean, default: false },
    readNotes: { type: Boolean, default: false }
  },
  activityLog: { type: Array, default: [] }
}, { timestamps: true });

const GKGSState = mongoose.model('State', StateSchema);

// Uploaded study files
const UploadSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  subject: { type: String, required: true, index: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: Number, required: true },
  data: { type: Buffer, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

const GKGSUpload = mongoose.model('Upload', UploadSchema);

// Import Statistics Engine & Models
const StatisticsEngine = require('./engine/statistics');
const {
  UserActivity,
  QuizAttempt,
  FlashcardSession,
  StudySession,
  ActivityLog,
  Achievement
} = require('./engine/models');

// ── Authentication Middleware ─────────────────────────────────────────
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const headerToken = authHeader && authHeader.split(' ')[1];
  const token = headerToken || req.query.token;

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

// ── Authentication Endpoints ──────────────────────────────────────────

// 1. Email/Password Signup
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await GKGSUser.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new GKGSUser({
      name,
      email: email.toLowerCase(),
      passwordHash
    });
    await user.save();

    // Create default state & progress
    await new GKGSState({ userId: user._id }).save();
    await StatisticsEngine.recalculateAndSaveProgress(user._id);

    const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Signup failed', details: err.message });
  }
});

// 2. Email/Password Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await GKGSUser.findOne({ email: email.toLowerCase() });
    if (!user || !user.passwordHash) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, email: user.email, name: user.name, picture: user.picture }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, picture: user.picture } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
});

// 3. Google Sign-In verification endpoint
app.post('/api/auth/google', async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ error: 'Google credential token is required' });
    }

    let payload;
    try {
      const googleVerifyUrl = `https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`;
      const response = await fetch(googleVerifyUrl);
      if (!response.ok) throw new Error('Google token validation failed');
      payload = await response.json();
    } catch (fetchErr) {
      const ticket = await oauthClient.verifyIdToken({ idToken: credential });
      payload = ticket.getPayload();
    }

    if (!payload || !payload.email) {
      return res.status(400).json({ error: 'Invalid Google credential payload' });
    }

    const email = payload.email.toLowerCase();
    const name = payload.name || payload.given_name || 'Google User';
    const googleId = payload.sub;
    const picture = payload.picture || '';

    let user = await GKGSUser.findOne({ email });
    if (!user) {
      user = new GKGSUser({ name, email, googleId, picture });
      await user.save();
      await new GKGSState({ userId: user._id }).save();
      await StatisticsEngine.recalculateAndSaveProgress(user._id);
    } else if (!user.googleId || user.picture !== picture) {
      user.googleId = googleId;
      user.picture = picture;
      await user.save();
    }

    const token = jwt.sign({ id: user._id, email: user.email, name: user.name, picture: user.picture }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, picture: user.picture } });
  } catch (err) {
    res.status(500).json({ error: 'Google authentication failed', details: err.message });
  }
});

// ── Database-Driven Dashboard & Action API ────────────────────────────

// GET /api/dashboard — Full database-driven metrics payload
app.get('/api/dashboard', authenticateToken, async (req, res) => {
  try {
    const payload = await StatisticsEngine.buildDashboardPayload(req.user.id);
    res.json(payload);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate dashboard data', details: err.message });
  }
});

// POST /api/activity/log — Event-driven activity logger
app.post('/api/activity/log', authenticateToken, async (req, res) => {
  try {
    const { eventType, subject, topicId, metadata, timestamp } = req.body;
    if (!eventType) {
      return res.status(400).json({ error: 'eventType is required' });
    }

    const activity = new UserActivity({
      userId: req.user.id,
      eventType,
      subject: subject || null,
      topicId: topicId || null,
      metadata: metadata || {},
      timestamp: timestamp ? new Date(timestamp) : new Date()
    });

    await activity.save();

    // Secondary side effects based on eventType (XP award & goals)
    const todayStr = new Date().toISOString().slice(0, 10);

    if (['visit_module', 'topic_opened'].includes(eventType) && subject) {
      const key = `visit_module:${req.user.id}:${subject}:${todayStr}`;
      const { awarded } = await StatisticsEngine.awardXP(req.user.id, 50, 'visit_module', subject, key);
      if (awarded) {
        await ActivityLog.create({
          userId: req.user.id,
          action: `Opened ${subject.toUpperCase()} Topic`,
          type: 'visit_module',
          icon: '📚',
          subject,
          xpEarned: 50
        });
      }
      await StatisticsEngine.markDailyGoal(req.user.id, 'visitModule');
    } else if (['note_read', 'read_notes'].includes(eventType)) {
      const key = `read_notes:${req.user.id}:${topicId || subject || 'gen'}:${todayStr}`;
      const { awarded } = await StatisticsEngine.awardXP(req.user.id, 30, 'read_notes', subject, key);
      if (awarded) {
        await ActivityLog.create({
          userId: req.user.id,
          action: `Read ${subject ? subject.toUpperCase() : ''} Notes`,
          type: 'read_notes',
          icon: '📖',
          subject,
          xpEarned: 30
        });
      }
      await StatisticsEngine.markDailyGoal(req.user.id, 'readNotes');
    } else if (eventType === 'flashcard_reviewed') {
      const key = `flashcard:${req.user.id}:${Date.now()}`;
      await StatisticsEngine.awardXP(req.user.id, 5, 'flashcard_reviewed', subject || 'flashcards', key);
      await StatisticsEngine.markDailyGoal(req.user.id, 'flashcard');
    } else if (eventType === 'quiz_completed') {
      await StatisticsEngine.markDailyGoal(req.user.id, 'quiz');
    } else if (eventType === 'file_upload' || eventType === 'study_file_opened') {
      await StatisticsEngine.markDailyGoal(req.user.id, 'uploadFile');
    }

    const dashboard = await StatisticsEngine.buildDashboardPayload(req.user.id);
    res.json({ success: true, activityId: activity._id, dashboard });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record activity log', details: err.message });
  }
});

// GET /api/activity/history — Retrieve raw event stream for user
app.get('/api/activity/history', authenticateToken, async (req, res) => {
  try {
    const activities = await UserActivity.find({ userId: req.user.id }).sort({ timestamp: -1 }).limit(100);
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch activity history', details: err.message });
  }
});

// Action: Visit Study Module (+50 XP)
app.post('/api/actions/visit-module', authenticateToken, async (req, res) => {
  try {
    const { subject } = req.body;
    if (!subject) return res.status(400).json({ error: 'Subject is required' });

    const todayStr = new Date().toISOString().slice(0, 10);
    const key = `visit_module:${req.user.id}:${subject}:${todayStr}`;

    const { awarded } = await StatisticsEngine.awardXP(req.user.id, 50, 'visit_module', subject, key);
    if (awarded) {
      await ActivityLog.create({
        userId: req.user.id,
        action: `Visited ${subject.toUpperCase()} Module`,
        type: 'visit_module',
        icon: '📚',
        subject,
        xpEarned: 50
      });
    }

    await StatisticsEngine.markDailyGoal(req.user.id, 'visitModule');
    const dashboard = await StatisticsEngine.buildDashboardPayload(req.user.id);
    res.json({ success: true, awarded, dashboard });
  } catch (err) {
    res.status(500).json({ error: 'Failed to log module visit', details: err.message });
  }
});

// Action: Read Detailed Notes (+30 XP)
app.post('/api/actions/read-notes', authenticateToken, async (req, res) => {
  try {
    const { subject, sectionId } = req.body;
    const todayStr = new Date().toISOString().slice(0, 10);
    const key = `read_notes:${req.user.id}:${sectionId || 'gen'}:${todayStr}`;

    const { awarded } = await StatisticsEngine.awardXP(req.user.id, 30, 'read_notes', subject, key);
    if (awarded) {
      await ActivityLog.create({
        userId: req.user.id,
        action: `Read ${subject ? subject.toUpperCase() : ''} Notes`,
        type: 'read_notes',
        icon: '📖',
        subject,
        xpEarned: 30
      });
    }

    await StatisticsEngine.markDailyGoal(req.user.id, 'readNotes');
    const dashboard = await StatisticsEngine.buildDashboardPayload(req.user.id);
    res.json({ success: true, awarded, dashboard });
  } catch (err) {
    res.status(500).json({ error: 'Failed to log notes reading', details: err.message });
  }
});

// Action: Complete Quiz (+100 XP)
app.post('/api/actions/quiz-complete', authenticateToken, async (req, res) => {
  try {
    const { subject, questionsAttempted, correctAnswers, score, duration } = req.body;
    if (!subject || !questionsAttempted) {
      return res.status(400).json({ error: 'Invalid quiz attempt data' });
    }

    await QuizAttempt.create({
      userId: req.user.id,
      subject,
      questionsAttempted: Number(questionsAttempted),
      correctAnswers: Number(correctAnswers || 0),
      score: Number(score || 0),
      duration: Number(duration || 0)
    });

    const key = `quiz:${req.user.id}:${Date.now()}`;
    await StatisticsEngine.awardXP(req.user.id, 100, 'quiz_complete', subject, key);

    await ActivityLog.create({
      userId: req.user.id,
      action: `Completed ${subject.toUpperCase()} Quiz (${score}%)`,
      type: 'quiz_complete',
      icon: '🎯',
      subject,
      xpEarned: 100
    });

    await StatisticsEngine.markDailyGoal(req.user.id, 'quiz');
    const dashboard = await StatisticsEngine.buildDashboardPayload(req.user.id);
    res.json({ success: true, dashboard });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record quiz attempt', details: err.message });
  }
});

// Action: Complete Flashcard Session (+40 XP)
app.post('/api/actions/flashcard-session', authenticateToken, async (req, res) => {
  try {
    const { cardsReviewed, correctCount, subject, duration } = req.body;
    if (!cardsReviewed) return res.status(400).json({ error: 'cardsReviewed required' });

    await FlashcardSession.create({
      userId: req.user.id,
      cardsReviewed: Number(cardsReviewed),
      correctCount: Number(correctCount || 0),
      subject: subject || 'flashcards',
      duration: Number(duration || 0)
    });

    const key = `flashcards:${req.user.id}:${Date.now()}`;
    await StatisticsEngine.awardXP(req.user.id, 40, 'flashcard_session', 'flashcards', key);

    await ActivityLog.create({
      userId: req.user.id,
      action: `Reviewed ${cardsReviewed} Flashcards`,
      type: 'flashcard_session',
      icon: '🃏',
      subject: 'flashcards',
      xpEarned: 40
    });

    await StatisticsEngine.markDailyGoal(req.user.id, 'flashcard');
    const dashboard = await StatisticsEngine.buildDashboardPayload(req.user.id);
    res.json({ success: true, dashboard });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record flashcards', details: err.message });
  }
});

// Action: Record File Upload (+20 XP)
app.post('/api/actions/file-upload', authenticateToken, async (req, res) => {
  try {
    const { subject, fileName } = req.body;
    const key = `upload:${req.user.id}:${fileName}:${Date.now()}`;
    await StatisticsEngine.awardXP(req.user.id, 20, 'file_upload', subject, key);

    await ActivityLog.create({
      userId: req.user.id,
      action: `Uploaded File: ${fileName || 'Study doc'}`,
      type: 'file_upload',
      icon: '📁',
      subject,
      xpEarned: 20
    });

    await StatisticsEngine.markDailyGoal(req.user.id, 'uploadFile');
    const dashboard = await StatisticsEngine.buildDashboardPayload(req.user.id);
    res.json({ success: true, dashboard });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record file upload', details: err.message });
  }
});

// Action: End Study Session (tracks session time)
app.post('/api/actions/session-end', authenticateToken, async (req, res) => {
  try {
    const { subject, durationMinutes } = req.body;
    if (durationMinutes > 0) {
      await StudySession.create({
        userId: req.user.id,
        subject: subject || 'general',
        duration: Number(durationMinutes)
      });
    }
    const dashboard = await StatisticsEngine.buildDashboardPayload(req.user.id);
    res.json({ success: true, dashboard });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record study session', details: err.message });
  }
});

// ── File Management API Routes ────────────────────────────────────────

app.get('/api/uploads/:subject', authenticateToken, async (req, res) => {
  try {
    const { subject } = req.params;
    const files = await GKGSUpload.find({ userId: req.user.id, subject }).select('-data').sort({ uploadedAt: -1 });
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: 'Failed to list uploads', details: err.message });
  }
});

app.post('/api/uploads/:subject', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    const { subject } = req.params;
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const newUpload = new GKGSUpload({
      userId: req.user.id,
      subject,
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
      data: req.file.buffer
    });

    await newUpload.save();

    // Automatically trigger upload action & goals
    const key = `upload:${req.user.id}:${req.file.originalname}:${Date.now()}`;
    await StatisticsEngine.awardXP(req.user.id, 20, 'file_upload', subject, key);
    await ActivityLog.create({
      userId: req.user.id,
      action: `Uploaded ${req.file.originalname}`,
      type: 'file_upload',
      icon: '📁',
      subject,
      xpEarned: 20
    });
    await StatisticsEngine.markDailyGoal(req.user.id, 'uploadFile');

    const result = newUpload.toObject();
    delete result.data;
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save upload', details: err.message });
  }
});

app.get('/api/files/:id', authenticateToken, async (req, res) => {
  try {
    const file = await GKGSUpload.findOne({ _id: req.params.id, userId: req.user.id });
    if (!file) return res.status(404).json({ error: 'File not found or unauthorized' });

    res.setHeader('Content-Type', file.type);
    res.setHeader('Content-Length', file.size);
    res.setHeader('Content-Disposition', `inline; filename="${file.name}"`);
    res.send(file.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to serve file', details: err.message });
  }
});

app.delete('/api/files/:id', authenticateToken, async (req, res) => {
  try {
    const file = await GKGSUpload.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!file) return res.status(404).json({ error: 'File not found or unauthorized' });
    res.json({ message: 'File deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete file', details: err.message });
  }
});

// Legacy /api/state fallback route
app.get('/api/state', authenticateToken, async (req, res) => {
  try {
    const dashboard = await StatisticsEngine.buildDashboardPayload(req.user.id);
    res.json(dashboard);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve state', details: err.message });
  }
});

// Dynamic CMS Study Material Topic Route
app.get('/api/topics/:topicId', (req, res) => {
  const fs = require('fs');
  const path = require('path');
  const topicId = req.params.topicId === 'history' ? 'revolt-of-1857' : req.params.topicId;
  const contentDir = path.join(__dirname, 'content');
  
  // Try to find the file recursively
  function findFileRecursively(dir, filename) {
    if (!fs.existsSync(dir)) return null;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        const found = findFileRecursively(fullPath, filename);
        if (found) return found;
      } else if (file === filename) {
        return fullPath;
      }
    }
    return null;
  }

  // Find inside /content folder
  let filePath = findFileRecursively(contentDir, `${topicId}.json`);

  // Fallback to legacy data/topics folder if not found in content (migration phase)
  if (!filePath) {
    const legacyPath = path.join(__dirname, 'data', 'topics', `${topicId}.json`);
    if (fs.existsSync(legacyPath)) {
      filePath = legacyPath;
    }
  }

  if (filePath) {
    return res.sendFile(filePath);
  }

  res.status(404).json({ error: 'Topic data not found' });
});

// Modular CMS Endpoint for Polity Sections
app.get('/api/polity/topics/:topicId/sections/:sectionName', (req, res) => {
  const fs = require('fs');
  const path = require('path');
  const { topicId, sectionName } = req.params;
  const contentDir = path.join(__dirname, 'content', 'polity');

  function findTopicDirRecursively(dir, targetTopicId) {
    if (!fs.existsSync(dir)) return null;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        if (file === targetTopicId) return fullPath;
        const found = findTopicDirRecursively(fullPath, targetTopicId);
        if (found) return found;
      }
    }
    return null;
  }

  const topicDir = findTopicDirRecursively(contentDir, topicId);
  if (topicDir) {
    const sectionPath = path.join(topicDir, `${sectionName}.json`);
    if (fs.existsSync(sectionPath)) {
      return res.sendFile(sectionPath);
    }
  }

// Modular CMS Endpoint for Science Sections
app.get('/api/science/topics/:topicId/sections/:sectionName', (req, res) => {
  const fs = require('fs');
  const path = require('path');
  const { topicId, sectionName } = req.params;
  const contentDir = path.join(__dirname, 'content', 'science');

  function findTopicDirRecursively(dir, targetTopicId) {
    if (!fs.existsSync(dir)) return null;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        if (file === targetTopicId) return fullPath;
        const found = findTopicDirRecursively(fullPath, targetTopicId);
        if (found) return found;
      }
    }
    return null;
  }

  const topicDir = findTopicDirRecursively(contentDir, topicId);
  if (topicDir) {
    const sectionPath = path.join(topicDir, `${sectionName}.json`);
    if (fs.existsSync(sectionPath)) {
      return res.sendFile(sectionPath);
    }
  }

  res.status(404).json({ error: `Section '${sectionName}' not found for topic '${topicId}'` });
});

// Static files & SPA Routing
app.use(express.static(__dirname));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`GK-GS Local Backend Server listening at http://localhost:${PORT}`);
});
