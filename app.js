/* ==========================================================================
   GK-GS App Main Controller (app.js)
   Manages SPA navigation, user stats, and coordinates active modules.
   ========================================================================== */

import { historyModule } from './modules/history.js';
import { polityModule } from './modules/polity.js';
import { geographyModule } from './modules/geography.js';
import { scienceModule } from './modules/science.js';
import { economyModule } from './modules/economy.js';
import { staticGkModule } from './modules/staticgk.js';
import { currentAffairsModule } from './modules/currentaffairs.js';
import { flashcardModule } from './modules/flashcards.js';
import { quizModule } from './modules/quiz.js';
import { uploadsModule } from './modules/uploads.js';

// Application State
const AppState = {
  currentView: 'dashboard',
  totalXP: 0,
  streak: 1,
  // Per-subject XP earned this session (drives completion %)  
  subjectXP: {
    history: 0,
    polity: 0,
    geography: 0,
    science: 0,
    economy: 0,
    staticgk: 0,
    currentaffairs: 0,
    flashcards: 0,
    quiz: 0
  },
  // Daily goals
  goals: {
    visitModule: false,      // visited any study module today
    flashcard: false,        // completed flashcard session
    quiz: false,             // completed a quiz
    uploadFile: false,       // uploaded a study file
    readNotes: false         // opened notes tab in any subject
  },
  // Recent activity log (last 5 entries)
  activityLog: [],
  // Session start time (ms since epoch)
  sessionStart: Date.now()
};

// Load state from MongoDB local API
async function loadState() {
  const token = localStorage.getItem('gkgs_auth_token');
  if (!token) return;

  try {
    const res = await fetch('/api/state', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!res.ok) throw new Error('API failed');
    const data = await res.json();
    if (data) {
      if (data.totalXP !== undefined) AppState.totalXP = data.totalXP;
      if (data.streak !== undefined) AppState.streak = data.streak;
      if (data.goals !== undefined) AppState.goals = { ...AppState.goals, ...data.goals };
      if (data.activityLog) AppState.activityLog = data.activityLog;
    }
  } catch (e) {
    console.warn("Could not load state from server, falling back to localStorage:", e);
    const savedXP = localStorage.getItem('gkgs_total_xp');
    const savedStreak = localStorage.getItem('gkgs_streak');
    const savedGoals = localStorage.getItem('gkgs_goals');
    const savedLog = localStorage.getItem('gkgs_activity_log');

    if (savedXP !== null) AppState.totalXP = parseInt(savedXP, 10);
    if (savedStreak !== null) AppState.streak = parseInt(savedStreak, 10);
    if (savedGoals !== null) {
      try { AppState.goals = { ...AppState.goals, ...JSON.parse(savedGoals) }; } catch (err) {}
    }
    if (savedLog !== null) {
      try { AppState.activityLog = JSON.parse(savedLog); } catch (err) {}
    }
  }
}

// Save state to MongoDB local API and localStorage (dual-write for reliability)
async function saveState() {
  localStorage.setItem('gkgs_total_xp', AppState.totalXP);
  localStorage.setItem('gkgs_streak', AppState.streak);
  localStorage.setItem('gkgs_goals', JSON.stringify(AppState.goals));
  localStorage.setItem('gkgs_activity_log', JSON.stringify(AppState.activityLog.slice(0, 10)));

  const token = localStorage.getItem('gkgs_auth_token');
  if (!token) return;

  try {
    await fetch('/api/state', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        totalXP: AppState.totalXP,
        streak: AppState.streak,
        goals: AppState.goals,
        activityLog: AppState.activityLog.slice(0, 10)
      })
    });
  } catch (e) {
    console.error("Failed to sync state with MongoDB backend:", e);
  }
}

// ── Authentication Controller ──────────────────────────────────────────

let isSignUpMode = false;

async function initAuth() {
  const authOverlay = document.getElementById('auth-overlay');
  const authForm = document.getElementById('auth-form');
  const authTitle = document.querySelector('.auth-card h2');
  const authSubtitle = document.getElementById('auth-subtitle');
  const authSubmitBtn = document.getElementById('btn-auth-submit');
  const authToggleBtn = document.getElementById('btn-auth-toggle');
  const authToggleText = document.getElementById('auth-toggle-text');
  const nameGroup = document.getElementById('name-group');
  const authError = document.getElementById('auth-error');
  const logoutBtn = document.getElementById('btn-logout');

  // Check auth state on startup
  const cachedUser = localStorage.getItem('gkgs_user');
  const cachedToken = localStorage.getItem('gkgs_auth_token');
  
  if (cachedToken && cachedUser) {
    authOverlay.classList.remove('active');
    renderUserProfile(JSON.parse(cachedUser));
    // ✅ Always fetch fresh data from Atlas on every page load
    // This ensures XP/streak reflect the real DB value, not stale defaults or localStorage
    await loadState();
    updateXPDisplay();
    updateDashboard();
  } else {
    authOverlay.classList.add('active');
  }

  // Toggle Login/Signup modes
  authToggleBtn.addEventListener('click', () => {
    isSignUpMode = !isSignUpMode;
    authError.classList.add('hidden');
    if (isSignUpMode) {
      authTitle.textContent = 'Join CGL Hub';
      authSubtitle.textContent = 'Create a free account to sync your progress';
      authSubmitBtn.textContent = 'Sign Up';
      nameGroup.classList.remove('hidden');
      authToggleText.textContent = 'Already have an account?';
      authToggleBtn.textContent = 'Sign In';
    } else {
      authTitle.textContent = 'CGL GK-GS Hub';
      authSubtitle.textContent = 'Login to load your preparation progress';
      authSubmitBtn.textContent = 'Sign In';
      nameGroup.classList.add('hidden');
      authToggleText.textContent = "Don't have an account?";
      authToggleBtn.textContent = 'Sign Up';
    }
  });

  // Handle Form Submission (Local Signup/Login)
  authSubmitBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    authError.classList.add('hidden');

    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const name = document.getElementById('auth-name').value;

    if (!email || !password || (isSignUpMode && !name)) {
      showAuthError('Please fill in all required fields.');
      return;
    }

    const endpoint = isSignUpMode ? '/api/auth/signup' : '/api/auth/login';
    const payload = isSignUpMode ? { name, email, password } : { email, password };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Successful local login
      localStorage.setItem('gkgs_auth_token', data.token);
      localStorage.setItem('gkgs_user', JSON.stringify(data.user));
      
      authOverlay.classList.remove('active');
      renderUserProfile(data.user);
      
      // Load and apply stats from backend
      await loadState();
      updateXPDisplay();
      updateDashboard();

      showToast(`Welcome back, ${data.user.name}!`);
    } catch (err) {
      showAuthError(err.message);
    }
  });

  // Logout Handler
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('gkgs_auth_token');
    localStorage.removeItem('gkgs_user');
    localStorage.removeItem('gkgs_total_xp');
    localStorage.removeItem('gkgs_streak');
    localStorage.removeItem('gkgs_goals');
    localStorage.removeItem('gkgs_activity_log');
    
    // Reset local AppState
    AppState.totalXP = 0;
    AppState.streak = 1;
    Object.keys(AppState.goals).forEach(k => AppState.goals[k] = false);
    AppState.activityLog = [];
    
    updateXPDisplay();
    updateDashboard();
    
    authOverlay.classList.add('active');
    showToast('Logged out successfully');
  });

  // Load Google Identity Services library and initialize
  initGoogleOAuth();
}

function showAuthError(msg) {
  const errorEl = document.getElementById('auth-error');
  if (errorEl) {
    errorEl.textContent = msg;
    errorEl.classList.remove('hidden');
  }
}

// ── Google Sign-In Authentication ──────────────────────────────────────

function initGoogleOAuth() {
  // Use a flexible check for Google GIS client availability
  const checkGisInterval = setInterval(() => {
    if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
      clearInterval(checkGisInterval);
      
      // Initialize Google OAuth Sign-in Client
      google.accounts.id.initialize({
        // Generic client id (user can substitute or use immediately as-is)
        client_id: "874794269176-s33rblsc62d7j4421b106l1a3v87955c.apps.googleusercontent.com", 
        callback: handleGoogleLoginResponse
      });

      // Render standard Google Sign In Button
      google.accounts.id.renderButton(
        document.getElementById("google-login-button"),
        { 
          theme: "outline", 
          size: "large",
          text: "signin_with",
          shape: "rectangular",
          logo_alignment: "left"
        }
      );

      // Prompt One-Tap overlay automatically if supported
      google.accounts.id.prompt();
    }
  }, 500);
}

// Receive credential callback from Google login
async function handleGoogleLoginResponse(response) {
  const authError = document.getElementById('auth-error');
  authError.classList.add('hidden');

  try {
    const res = await fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: response.credential })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Google Authentication failed on backend');
    }

    // Success Google OAuth login
    localStorage.setItem('gkgs_auth_token', data.token);
    localStorage.setItem('gkgs_user', JSON.stringify(data.user));
    
    document.getElementById('auth-overlay').classList.remove('active');
    renderUserProfile(data.user);
    
    // Load and apply stats from backend
    await loadState();
    updateXPDisplay();
    updateDashboard();

    showToast(`Logged in as ${data.user.name}`);
  } catch (err) {
    showAuthError(`Google SSO Error: ${err.message}`);
  }
}

// Render dynamic user info into the sidebar brand card
function renderUserProfile(user) {
  const usernameEl = document.getElementById('sidebar-username');
  const avatarEmojiEl = document.getElementById('sidebar-user-emoji');
  const avatarImgEl = document.getElementById('sidebar-user-avatar');

  if (usernameEl) usernameEl.textContent = user.name;
  
  if (user.picture && avatarImgEl && avatarEmojiEl) {
    avatarImgEl.src = user.picture;
    avatarImgEl.classList.remove('hidden');
    avatarEmojiEl.classList.add('hidden');
  } else if (avatarImgEl && avatarEmojiEl) {
    avatarImgEl.classList.add('hidden');
    avatarEmojiEl.classList.remove('hidden');
    avatarEmojiEl.textContent = '🎓';
  }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
  await initAuth(); // ✅ Await so loadState completes before UI renders
  setupNavigation();
  setupSearch();
  setupMobileDrawer();
  setupSideTabs();
  startSessionTimer();
  
  // Initialize modules
  historyModule.init();
  polityModule.init();
  geographyModule.init();
  scienceModule.init();
  economyModule.init();
  staticGkModule.init();
  currentAffairsModule.init();
  flashcardModule.init();
  quizModule.init(onQuizCompleted);
  uploadsModule.init();
  setupScrollAnimations();
});

// Setup Mobile Sidebar Drawer
function setupMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('mobile-open');
    });
    document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
        sidebar.classList.remove('mobile-open');
      }
    });
  }
}

// Setup Side Panel Tabs
function setupSideTabs() {
  const tabBtns = document.querySelectorAll('.side-tab-btn');
  const tabContents = document.querySelectorAll('.sidetab-content');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.sidetab;
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const activeContent = document.getElementById(`sidetab-${target}`);
      if (activeContent) activeContent.classList.add('active');
    });
  });
}

// Setup Global Search Bar
function setupSearch() {
  const searchInput = document.getElementById('global-search-input');
  const dropdown = document.getElementById('search-dropdown');
  if (!searchInput || !dropdown) return;

  const topics = [
    { title: 'Indian History Timeline', nav: 'history' },
    { title: 'Indus Valley Civilization', nav: 'history' },
    { title: 'Mughal Empire Chronology', nav: 'history' },
    { title: 'Indian Constitution Articles', nav: 'polity' },
    { title: 'Fundamental Rights (Art 12–35)', nav: 'polity' },
    { title: 'Preamble & Amendments', nav: 'polity' },
    { title: 'River Systems of India', nav: 'geography' },
    { title: 'National Parks & Sanctuaries', nav: 'geography' },
    { title: 'Cytology & Biology Diagrams', nav: 'science' },
    { title: 'Five-Year Plans Explorer', nav: 'economy' },
    { title: 'RBI Monetary Policy', nav: 'economy' },
    { title: 'Classical Dances & Folk Arts', nav: 'staticgk' },
    { title: 'Census 2011 Facts', nav: 'staticgk' },
    { title: 'Current Affairs 2025–26', nav: 'currentaffairs' },
    { title: 'SSC Flashcards Deck', nav: 'flashcards' },
    { title: 'Daily Practice Quiz', nav: 'quiz' }
  ];

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) {
      dropdown.classList.add('hidden');
      return;
    }
    const matches = topics.filter(t => t.title.toLowerCase().includes(query));
    if (matches.length === 0) {
      dropdown.innerHTML = `<div class="search-result-item" style="color:var(--text-muted)">No matching topics found</div>`;
    } else {
      dropdown.innerHTML = matches.map(m => `
        <div class="search-result-item" data-nav="${m.nav}">
          <span>🔍 ${m.title}</span>
          <span style="color:var(--text-dim);font-size:10px;">Go →</span>
        </div>
      `).join('');
    }
    dropdown.classList.remove('hidden');

    dropdown.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const targetNav = item.dataset.nav;
        if (targetNav) {
          const navBtn = document.getElementById(`nav-${targetNav}`);
          if (navBtn) navBtn.click();
        }
        dropdown.classList.add('hidden');
        searchInput.value = '';
      });
    });
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.add('hidden');
    }
  });
}

// Setup scroll animations for memory highlights
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-highlight');
        // observer.unobserve(entry.target); // keep it commented if we want to re-animate on scroll
      } else {
        entry.target.classList.remove('animate-highlight'); // reset when out of view
      }
    });
  }, { threshold: 0.5 });

  // Use MutationObserver to detect dynamically added elements
  const mutationObserver = new MutationObserver((mutations) => {
    document.querySelectorAll('.memory-highlight:not(.observed)').forEach(el => {
      el.classList.add('observed');
      observer.observe(el);
    });
  });

  mutationObserver.observe(document.body, { childList: true, subtree: true });
}

// Setup Navigation Routing
function setupNavigation() {
  const menuButtons = document.querySelectorAll('.menu-item');
  const panels = document.querySelectorAll('.view-panel');
  const pageTitle = document.getElementById('page-title');
  const pageSubtitle = document.getElementById('page-subtitle');

  const titleMeta = {
    dashboard: { title: 'GK-GS Study Hub', subtitle: 'Master general studies for SSC CGL 2026' },
    history: { title: 'History Chronology', subtitle: 'Interactive timeline of Indian History' },
    polity: { title: 'Constitution of India', subtitle: 'Interactive explorer of Articles & Amendments' },
    geography: { title: 'Geography Lab', subtitle: 'Visual drainage systems and geographical facts' },
    science: { title: 'Science Lab', subtitle: 'Cytology & biological cell interactive diagrams' },
    economy: { title: 'Economy Corner', subtitle: 'Five-Year Plans explorer & RBI policy simulator' },
    staticgk: { title: 'Static GK Hub', subtitle: 'Master classical dances, instrument exponents, census, and festivals' },
    currentaffairs: { title: 'Current Affairs 2025–26', subtitle: 'Sports, military exercises, awards & central government schemes' },
    flashcards: { title: 'Active Recall Deck', subtitle: 'Memorize high-yield SSC Static GK facts' },
    quiz: { title: 'Quiz Zone', subtitle: 'SSC CGL simulated General Studies mocks' }
  };

  menuButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      if (!target) return;

      // Update button active state
      menuButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update panel active state
      panels.forEach(p => p.classList.remove('active'));
      const activePanel = document.getElementById(`view-${target}`);
      if (activePanel) {
        activePanel.classList.add('active');
        AppState.currentView = target;
      }

      // Update header titles
      if (titleMeta[target]) {
        pageTitle.textContent = titleMeta[target].title;
        pageSubtitle.textContent = titleMeta[target].subtitle;
      }

      // Trigger specific module enter hooks if needed
      onModuleEnter(target);
    });
  });
}

// Module transition actions
function onModuleEnter(moduleName) {
  if (moduleName === 'flashcards') {
    flashcardModule.onEnter();
  }
  // Mark "visit module" goal on first non-dashboard navigation
  if (moduleName !== 'dashboard') {
    completeGoal('visitModule', `Visited ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)} module`);
  }
}

// Per-subject XP tracking
export function addSubjectXP(subject, amount) {
  if (AppState.subjectXP[subject] !== undefined) {
    AppState.subjectXP[subject] += amount;
  }
}

// Update XP & Streak
export function addXP(amount, subject = null, actionLabel = null) {
  AppState.totalXP += amount;
  if (subject) addSubjectXP(subject, amount);
  updateXPDisplay();
  updateDashboard(); // Re-render live dashboard
  saveState();
  
  // Log to activity feed
  if (actionLabel) logActivity(actionLabel, `+${amount} XP`, subject);
  
  // Show a mini notification overlay
  showToast(`+${amount} XP Earned!`);
}

function updateXPDisplay() {
  const xpEl = document.getElementById('total-xp');
  const streakEl = document.getElementById('streak-count');
  if (xpEl) xpEl.textContent = `${AppState.totalXP.toLocaleString()} XP`;
  if (streakEl) streakEl.textContent = `${AppState.streak} Days`;
  
  // Update ranks based on XP
  const userRankEl = document.querySelector('.user-rank');
  if (!userRankEl) return;
  const ranks = [
    { min: 5000, label: 'Rank: Joint Secretary' },
    { min: 3500, label: 'Rank: Deputy Secretary' },
    { min: 2500, label: 'Rank: Under Secretary' },
    { min: 2000, label: 'Rank: Section Officer' },
    { min: 1500, label: 'Rank: Assistant Section Officer' },
    { min: 0,    label: 'Rank: Aspirant' }
  ];
  userRankEl.textContent = ranks.find(r => AppState.totalXP >= r.min).label;
}

// Handle Goals Completing
export function completeGoal(goalId, label = null) {
  if (AppState.goals[goalId] === false) {
    AppState.goals[goalId] = true;
    updateGoalsUI();
    addXP(100, null, label || `Goal completed: ${goalId}`);
    saveState();
    showToast(`🎯 Goal Unlocked! +100 XP`);
  }
}

function updateGoalsUI() {
  const goalMap = {
    visitModule: 'goal-visit-module',
    flashcard:   'goal-flashcard',
    quiz:        'goal-quiz',
    uploadFile:  'goal-upload-file',
    readNotes:   'goal-read-notes'
  };
  Object.entries(goalMap).forEach(([key, id]) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (AppState.goals[key]) {
      el.classList.add('checked');
      const box = el.querySelector('.checkbox-box');
      // Support both new goal-item style and old checkbox-item style
      if (box) box.textContent = '✓';
    }
  });
  // Update goals progress counter
  const doneCount = Object.values(AppState.goals).filter(Boolean).length;
  const totalCount = Object.keys(AppState.goals).length;
  const counterEl = document.getElementById('goals-progress-counter');
  if (counterEl) counterEl.textContent = `${doneCount}/${totalCount} done`;
}

function onQuizCompleted(score) {
  completeGoal('quiz', `Completed Daily Quiz (score: ${score})`);
}

// ── Live Dashboard Update Engine ─────────────────────────────────────────

// Subject max XP thresholds for % calculation (how much XP = "100% done")
const SUBJECT_MAX_XP = {
  history:      500,
  polity:       500,
  geography:    400,
  science:      400,
  economy:      350,
  staticgk:     350,
  currentaffairs: 300
};

function updateDashboard() {
  updateSubjectProgressBars();
  updateActivityFeed();
  updateRankProgress();
  updateGoalsUI();
  updateStudyStatsBar();
  updateContinueLearning();
  updateBadges();
}

const LESSON_TOTALS = {
  history: 20,
  polity: 18,
  geography: 15,
  science: 25,
  economy: 12,
  staticgk: 16,
  currentaffairs: 30
};

function updateSubjectProgressBars() {
  Object.entries(SUBJECT_MAX_XP).forEach(([subject, maxXP]) => {
    const earned = AppState.subjectXP[subject] || 0;
    const pct = Math.min(100, Math.round((earned / maxXP) * 100));
    const bar = document.getElementById(`progress-bar-${subject}`);
    const tag = document.getElementById(`progress-tag-${subject}`);
    const countEl = document.getElementById(`lesson-count-${subject}`);
    
    if (bar) bar.style.width = `${pct}%`;
    if (tag) tag.textContent = `${pct}%`;
    
    if (countEl) {
      const total = LESSON_TOTALS[subject] || 20;
      const done = Math.min(total, Math.round((pct / 100) * total));
      const unit = subject === 'currentaffairs' ? 'topics' : 'lessons';
      countEl.textContent = `${done} / ${total} ${unit} completed`;
    }
  });
}

function updateRankProgress() {
  const rankBrackets = [
    { label: 'Aspirant',                min: 0,    max: 1500 },
    { label: 'Assistant Section Officer', min: 1500, max: 2000 },
    { label: 'Section Officer',          min: 2000, max: 2500 },
    { label: 'Under Secretary',          min: 2500, max: 3500 },
    { label: 'Deputy Secretary',         min: 3500, max: 5000 },
    { label: 'Joint Secretary',          min: 5000, max: 5000 }
  ];
  const current = rankBrackets.find(r => AppState.totalXP < r.max) || rankBrackets[rankBrackets.length - 1];
  const next = rankBrackets[rankBrackets.indexOf(current) + 1];
  const pct = next
    ? Math.round(((AppState.totalXP - current.min) / (next.min - current.min)) * 100)
    : 100;

  const rankBar = document.getElementById('rank-progress-bar');
  const rankLabel = document.getElementById('rank-label');
  const rankNextLabel = document.getElementById('rank-next-label');
  const rankPct = document.getElementById('rank-pct');

  if (rankBar) rankBar.style.width = `${pct}%`;
  if (rankLabel) rankLabel.textContent = current.label;
  if (rankNextLabel) rankNextLabel.textContent = next ? `→ ${next.label}` : '🏆 Max Rank!';
  if (rankPct) rankPct.textContent = `${pct}%`;
}

function updateStudyStatsBar() {
  const elapsed = Math.floor((Date.now() - AppState.sessionStart) / 60000);
  const doneCount = Object.values(AppState.goals).filter(Boolean).length;
  const totalCount = Object.keys(AppState.goals).length;

  // Stat cards row
  const timeEl = document.getElementById('session-time');
  const totalXpEl = document.getElementById('stat-total-xp');
  const goalsEl = document.getElementById('stat-goals-done');
  const streakDashEl = document.getElementById('streak-count-dash');
  if (timeEl) timeEl.textContent = `${elapsed}m`;
  if (totalXpEl) totalXpEl.textContent = AppState.totalXP.toLocaleString();
  if (goalsEl) goalsEl.textContent = doneCount;
  if (streakDashEl) streakDashEl.textContent = AppState.streak;

  // Hero quick-stats pills
  const hqsStreak = document.getElementById('hqs-streak');
  const hqsTime   = document.getElementById('hqs-time');
  const hqsRank   = document.getElementById('hqs-rank');
  const hqsGoals  = document.getElementById('hqs-goals');
  if (hqsStreak) hqsStreak.textContent = AppState.streak;
  if (hqsTime)   hqsTime.textContent   = `${elapsed}m`;
  if (hqsGoals)  hqsGoals.textContent  = `${doneCount}/${totalCount}`;

  // Hero rank pill
  const ranks = [
    { min: 5000, label: 'Joint Secretary' },
    { min: 3500, label: 'Deputy Secretary' },
    { min: 2500, label: 'Under Secretary' },
    { min: 2000, label: 'Section Officer' },
    { min: 1500, label: 'Asst Sec Officer' },
    { min: 0,    label: 'Aspirant' }
  ];
  const rankLabel = ranks.find(r => AppState.totalXP >= r.min).label;
  if (hqsRank) hqsRank.textContent = rankLabel;

  // XP-today sub-label (session XP)
  const sessionXP = Object.values(AppState.subjectXP).reduce((a, b) => a + b, 0);
  const xpTodayEl = document.getElementById('sic-xp-today');
  if (xpTodayEl) xpTodayEl.textContent = `+${sessionXP} today`;
}

function updateActivityFeed() {
  const feedEl = document.getElementById('activity-feed');
  if (!feedEl) return;
  if (AppState.activityLog.length === 0) {
    feedEl.innerHTML = `<div class="feed-empty">No activity yet — start studying! 📚</div>`;
    return;
  }
  feedEl.innerHTML = AppState.activityLog.slice(0, 5).map(entry => `
    <div class="feed-entry">
      <span class="feed-icon">${entry.icon}</span>
      <div class="feed-text">
        <span class="feed-action">${entry.action}</span>
        <span class="feed-xp">${entry.xp}</span>
      </div>
      <span class="feed-time">${entry.time}</span>
    </div>
  `).join('');
}

function updateContinueLearning() {
  // Sync continue-learning progress bars to subject XP %
  const map = {
    history: { bar: 'cc-bar-history', pct: 'cc-pct-history' },
    polity:  { bar: 'cc-bar-polity',  pct: 'cc-pct-polity' },
    quiz:    { bar: 'cc-bar-quiz',    pct: 'cc-pct-quiz' }
  };
  Object.entries(map).forEach(([subject, ids]) => {
    const bar = document.getElementById(ids.bar);
    const pctEl = document.getElementById(ids.pct);
    const maxXP = SUBJECT_MAX_XP[subject] || 300;
    const earned = AppState.subjectXP[subject] || 0;
    const pct = Math.min(100, Math.round((earned / maxXP) * 100));
    if (bar) bar.style.width = `${pct}%`;
    if (pctEl) pctEl.textContent = `${pct}% Complete`;
  });
}

function updateBadges() {
  // Streak badge
  const streak5 = document.getElementById('badge-streak5');
  if (streak5 && AppState.streak >= 5) streak5.classList.add('earned');
  // XP badge
  const xp500 = document.getElementById('badge-xp500');
  if (xp500 && AppState.totalXP >= 500) xp500.classList.add('earned');
  // Quiz badge
  const quizBadge = document.getElementById('badge-quiz');
  if (quizBadge && AppState.goals.quiz) quizBadge.classList.add('earned');
  // Notes badge
  const notesBadge = document.getElementById('badge-notes');
  if (notesBadge && AppState.goals.readNotes) notesBadge.classList.add('earned');
  // Flashcard badge
  const flashBadge = document.getElementById('badge-flash');
  if (flashBadge && AppState.goals.flashcard) flashBadge.classList.add('earned');
}

export function logActivity(action, xp = '', subject = null) {
  const icons = {
    history: '📜', polity: '⚖️', geography: '🗺️', science: '🔬',
    economy: '💹', staticgk: '📚', currentaffairs: '📰', flashcards: '🃏',
    quiz: '🎯', null: '⭐'
  };
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  AppState.activityLog.unshift({
    action, xp, icon: icons[subject] || '⭐', time: timeStr
  });
  AppState.activityLog = AppState.activityLog.slice(0, 10);
  updateActivityFeed();
}

export function markGoalReadNotes() {
  completeGoal('readNotes', 'Read study notes');
}

export function markGoalUpload() {
  completeGoal('uploadFile', 'Uploaded a study file');
}

// Start session timer — ticks every minute to update study time
function startSessionTimer() {
  updateStudyStatsBar();
  setInterval(() => {
    updateStudyStatsBar();
  }, 60000); // every 1 minute
}

// Utility Toast Notification
function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.position = 'fixed';
    container.style.bottom = '24px';
    container.style.right = '24px';
    container.style.zIndex = '1000';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '8px';
    document.body.appendChild(container);
  }
  
  const toast = document.createElement('div');
  toast.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
  toast.style.color = '#fff';
  toast.style.padding = '12px 24px';
  toast.style.borderRadius = '8px';
  toast.style.fontFamily = 'Space Grotesk, sans-serif';
  toast.style.fontWeight = '600';
  toast.style.fontSize = '14px';
  toast.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.3)';
  toast.style.transform = 'translateY(20px)';
  toast.style.opacity = '0';
  toast.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  toast.textContent = message;
  
  container.appendChild(toast);
  
  // Animate in
  setTimeout(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  }, 10);
  
  // Remove after duration
  setTimeout(() => {
    toast.style.transform = 'translateY(-20px)';
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}
