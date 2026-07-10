/* ==========================================================================
   GK-GS App Backend Server (server.js)
   Express server integrating MongoDB, JWT Authentication, and Google SSO verification.
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

// Initialize Google OAuth2 client (flexible verification)
const oauthClient = new OAuth2Client();

// Middleware
app.use(cors());
app.use(express.json());

// Set up Multer memory storage (store raw buffers in MongoDB)
const storage = multer.memoryStorage();
const upload = multer({
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB file size limit
});

// ── Database Connection ────────────────────────────────────────────────
mongoose.connect(MONGO_URI)
  .then(() => console.log('Successfully connected to local MongoDB at 127.0.0.1:27017/gkgs'))
  .catch(err => console.error('MongoDB connection error:', err));

// ── MongoDB Schemas & Models ──────────────────────────────────────────

// User Schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  passwordHash: { type: String }, // Null for Google OAuth users
  googleId: { type: String },     // Null for local users
  picture: { type: String, default: '' }, // Profile avatar URL
  createdAt: { type: Date, default: Date.now }
});

const GKGSUser = mongoose.model('User', UserSchema);

// User stats / app state scoped to user
const StateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  totalXP: { type: Number, default: 0 }, // Starts fresh for new users
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

// Uploaded study files scoped to user
const UploadSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  subject: { type: String, required: true, index: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: Number, required: true },
  data: { type: Buffer, required: true }, // binary file content
  uploadedAt: { type: Date, default: Date.now }
});

const GKGSUpload = mongoose.model('Upload', UploadSchema);

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

    // Create default state for new user
    const state = new GKGSState({ userId: user._id });
    await state.save();

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
      // Direct validation using Google endpoint (supports local testing with various client IDs)
      const googleVerifyUrl = `https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`;
      const response = await fetch(googleVerifyUrl);
      if (!response.ok) {
        throw new Error('Google token validation failed on Google server');
      }
      payload = await response.json();
    } catch (fetchErr) {
      console.warn('Google direct fetch verification failed, trying OAuth client verify...', fetchErr.message);
      // Fallback: Verify ID token using google-auth-library
      const ticket = await oauthClient.verifyIdToken({
        idToken: credential
      });
      payload = ticket.getPayload();
    }

    if (!payload || !payload.email) {
      return res.status(400).json({ error: 'Invalid Google credential payload' });
    }

    const email = payload.email.toLowerCase();
    const name = payload.name || payload.given_name || 'Google User';
    const googleId = payload.sub;
    const picture = payload.picture || '';

    // Find or create user
    let user = await GKGSUser.findOne({ email });
    if (!user) {
      user = new GKGSUser({
        name,
        email,
        googleId,
        picture
      });
      await user.save();

      // Create default state
      const state = new GKGSState({ userId: user._id });
      await state.save();
    } else {
      // Update Google ID and profile picture if previously signed up with password
      if (!user.googleId || user.picture !== picture) {
        user.googleId = googleId;
        user.picture = picture;
        await user.save();
      }
    }

    const token = jwt.sign({ id: user._id, email: user.email, name: user.name, picture: user.picture }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, picture: user.picture } });
  } catch (err) {
    res.status(500).json({ error: 'Google authentication failed', details: err.message });
  }
});

// ── REST API Scoped Endpoints (Authenticated) ─────────────────────────

// 4. Get user state (scoped to user)
app.get('/api/state', authenticateToken, async (req, res) => {
  try {
    let state = await GKGSState.findOne({ userId: req.user.id });
    if (!state) {
      // Initialize if not present
      state = new GKGSState({ userId: req.user.id });
      await state.save();
    }
    res.json(state);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve state', details: err.message });
  }
});

// 5. Save/Update user state (scoped to user)
app.post('/api/state', authenticateToken, async (req, res) => {
  try {
    const { totalXP, streak, goals, activityLog } = req.body;
    const state = await GKGSState.findOneAndUpdate(
      { userId: req.user.id },
      { totalXP, streak, goals, activityLog },
      { new: true, upsert: true }
    );
    res.json(state);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save state', details: err.message });
  }
});

// 6. List uploaded files for specific subject (scoped to user)
app.get('/api/uploads/:subject', authenticateToken, async (req, res) => {
  try {
    const { subject } = req.params;
    const files = await GKGSUpload.find({ userId: req.user.id, subject }).select('-data').sort({ uploadedAt: -1 });
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: 'Failed to list uploads', details: err.message });
  }
});

// 7. Upload file(s) for specific subject (scoped to user)
app.post('/api/uploads/:subject', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    const { subject } = req.params;
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const newUpload = new GKGSUpload({
      userId: req.user.id,
      subject,
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
      data: req.file.buffer
    });

    await newUpload.save();
    
    const result = newUpload.toObject();
    delete result.data;
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save upload', details: err.message });
  }
});

// 8. Get file content (Stream/Serve Binary Data) - scoped to user
app.get('/api/files/:id', authenticateToken, async (req, res) => {
  try {
    const file = await GKGSUpload.findOne({ _id: req.params.id, userId: req.user.id });
    if (!file) {
      return res.status(404).json({ error: 'File not found or unauthorized' });
    }

    res.setHeader('Content-Type', file.type);
    res.setHeader('Content-Length', file.size);
    res.setHeader('Content-Disposition', `inline; filename="${file.name}"`);
    res.send(file.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to serve file', details: err.message });
  }
});

// 9. Delete file (scoped to user)
app.delete('/api/files/:id', authenticateToken, async (req, res) => {
  try {
    const file = await GKGSUpload.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!file) {
      return res.status(404).json({ error: 'File not found or unauthorized' });
    }
    res.json({ message: 'File deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete file', details: err.message });
  }
});

// ── Serve Static Files ────────────────────────────────────────────────

app.use(express.static(__dirname));

// Fallback to index.html for general navigation
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`GK-GS Local Backend Server listening at http://localhost:${PORT}`);
});
