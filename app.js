/* ==========================================================================
   GK-GS App Main Controller (app.js)
   Database-Driven Architecture: Router, Module Orchestrated Controller,
   and Realtime Dashboard Refresh Client.
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

import { HISTORY_NOTES_SECTIONS } from './modules/history-notes-data.js';
import { POLITY_NOTES_SECTIONS } from './modules/polity-notes-data.js';
import { GEOGRAPHY_NOTES_SECTIONS } from './modules/geography-notes-data.js';
import { SCIENCE_NOTES_SECTIONS } from './modules/science-notes-data.js';
import { ECONOMY_NOTES_SECTIONS } from './modules/economy-notes-data.js';
import { STATIC_GK_NOTES_SECTIONS } from './modules/static-gk-notes-data.js';
import { CURRENT_AFFAIRS_NOTES_SECTIONS } from './modules/currentaffairs-notes-data.js';

import { api } from './modules/api-service.js';
import { DashboardRenderer } from './modules/dashboard-renderer.js';

// App State (Transient UI state only)
const AppState = {
  currentView: 'dashboard',
  sessionStart: Date.now()
};

/**
 * Fetch fresh database-driven dashboard payload and render to UI
 */
export async function refreshDashboard() {
  const token = localStorage.getItem('gkgs_auth_token');
  if (!token) return;

  try {
    const data = await api.getDashboard();
    DashboardRenderer.render(data);
  } catch (e) {
    console.warn("Could not fetch dashboard metrics from database:", e.message);
  }
}

// ── Authentication Controller ──────────────────────────────────────────

let isSignUpMode = false;

async function initAuth() {
  const authOverlay = document.getElementById('auth-overlay');
  const authTitle = document.querySelector('.auth-card h2');
  const authSubtitle = document.getElementById('auth-subtitle');
  const authSubmitBtn = document.getElementById('btn-auth-submit');
  const authToggleBtn = document.getElementById('btn-auth-toggle');
  const authToggleText = document.getElementById('auth-toggle-text');
  const nameGroup = document.getElementById('name-group');
  const authError = document.getElementById('auth-error');
  const logoutBtn = document.getElementById('btn-logout');

  // Check cached auth state
  const cachedUser = localStorage.getItem('gkgs_user');
  const cachedToken = localStorage.getItem('gkgs_auth_token');

  if (cachedToken && cachedUser) {
    authOverlay.classList.remove('active');
    renderUserProfile(JSON.parse(cachedUser));
    await refreshDashboard();
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

  // Local Login/Signup Form Handler
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
      if (!response.ok) throw new Error(data.error || 'Authentication failed');

      localStorage.setItem('gkgs_auth_token', data.token);
      localStorage.setItem('gkgs_user', JSON.stringify(data.user));

      authOverlay.classList.remove('active');
      renderUserProfile(data.user);

      await refreshDashboard();
      showToast(`Welcome back, ${data.user.name}!`);
    } catch (err) {
      showAuthError(err.message);
    }
  });

  // Logout Handler
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('gkgs_auth_token');
    localStorage.removeItem('gkgs_user');

    authOverlay.classList.add('active');
    showToast('Logged out successfully');
  });

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
  const checkGisInterval = setInterval(() => {
    if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
      clearInterval(checkGisInterval);

      google.accounts.id.initialize({
        client_id: "874794269176-s33rblsc62d7j4421b106l1a3v87955c.apps.googleusercontent.com",
        callback: handleGoogleLoginResponse
      });

      google.accounts.id.renderButton(
        document.getElementById("google-login-button"),
        { theme: "outline", size: "large", text: "signin_with", shape: "rectangular" }
      );

      google.accounts.id.prompt();
    }
  }, 500);
}

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
    if (!res.ok) throw new Error(data.error || 'Google Auth failed');

    localStorage.setItem('gkgs_auth_token', data.token);
    localStorage.setItem('gkgs_user', JSON.stringify(data.user));

    document.getElementById('auth-overlay').classList.remove('active');
    renderUserProfile(data.user);

    await refreshDashboard();
    showToast(`Logged in as ${data.user.name}`);
  } catch (err) {
    showAuthError(`Google SSO Error: ${err.message}`);
  }
}

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
  await initAuth();
  setupNavigation();
  setupSearch();
  setupMobileDrawer();
  setupSideTabs();
  startSessionTimer();

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

  const index = [];
  const addSections = (sections, navKey, badgeName) => {
    if (!sections) return;
    sections.forEach(sec => {
      const cleanSnippet = (sec.content || '').replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
      index.push({
        title: sec.title || 'Untitled Section',
        snippet: cleanSnippet.slice(0, 100) + '...',
        fullText: `${sec.title} ${cleanSnippet}`.toLowerCase(),
        nav: navKey,
        badge: badgeName,
        targetId: sec.id
      });
    });
  };

  addSections(HISTORY_NOTES_SECTIONS, 'history', 'history');
  addSections(POLITY_NOTES_SECTIONS, 'polity', 'polity');
  addSections(GEOGRAPHY_NOTES_SECTIONS, 'geography', 'geography');
  addSections(SCIENCE_NOTES_SECTIONS, 'science', 'science');
  addSections(ECONOMY_NOTES_SECTIONS, 'economy', 'economy');
  addSections(STATIC_GK_NOTES_SECTIONS, 'staticgk', 'staticgk');
  addSections(CURRENT_AFFAIRS_NOTES_SECTIONS, 'currentaffairs', 'currentaffairs');

  index.push(
    { title: 'Flashcards Active Recall Deck', snippet: 'Memorize high-yield SSC facts with 3D cards', fullText: 'flashcards deck active recall leitner', nav: 'flashcards', badge: 'flashcards' },
    { title: 'SSC CGL Mock Quiz Zone', snippet: 'Test your knowledge with authentic SSC PYQs', fullText: 'quiz mock test practice questions pyq', nav: 'quiz', badge: 'quiz' }
  );

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) {
      dropdown.classList.add('hidden');
      return;
    }

    const matches = index.filter(item => item.fullText.includes(query)).slice(0, 8);

    if (matches.length === 0) {
      dropdown.innerHTML = `<div class="search-no-results">No matching topics found for "${searchInput.value}"</div>`;
    } else {
      dropdown.innerHTML = matches.map(m => `
        <div class="search-result-item" data-nav="${m.nav}" data-target-id="${m.targetId || ''}">
          <span class="search-result-badge ${m.badge}">${m.badge}</span>
          <div class="search-result-text">
            <span class="search-result-title">${m.title}</span>
            <span class="search-result-snippet">${m.snippet}</span>
          </div>
        </div>
      `).join('');
    }

    dropdown.classList.remove('hidden');

    dropdown.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const targetNav = item.dataset.nav;
        const targetId = item.dataset.targetId;

        if (targetNav) {
          const navBtn = document.getElementById(`nav-${targetNav}`);
          if (navBtn) navBtn.click();

          if (targetId) {
            setTimeout(() => {
              const targetEl = document.getElementById(targetId);
              if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                targetEl.classList.add('search-highlight-pulse');
                setTimeout(() => targetEl.classList.remove('search-highlight-pulse'), 2200);
              }
            }, 200);
          }
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

function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-highlight');
      } else {
        entry.target.classList.remove('animate-highlight');
      }
    });
  }, { threshold: 0.5 });

  const mutationObserver = new MutationObserver(() => {
    document.querySelectorAll('.memory-highlight:not(.observed)').forEach(el => {
      el.classList.add('observed');
      observer.observe(el);
    });
  });

  mutationObserver.observe(document.body, { childList: true, subtree: true });
}

// Navigation Router
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

      menuButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      panels.forEach(p => p.classList.remove('active'));
      const activePanel = document.getElementById(`view-${target}`);
      if (activePanel) {
        activePanel.classList.add('active');
        AppState.currentView = target;
      }

      if (titleMeta[target]) {
        pageTitle.textContent = titleMeta[target].title;
        pageSubtitle.textContent = titleMeta[target].subtitle;
      }

      onModuleEnter(target);
    });
  });
}

// Module enter handler — triggers database action & updates dashboard
async function onModuleEnter(moduleName) {
  if (moduleName === 'flashcards') {
    flashcardModule.onEnter();
  }

  if (moduleName !== 'dashboard') {
    try {
      await api.visitModule(moduleName);
      await refreshDashboard();
    } catch (e) {
      console.warn("Module visit record failed:", e.message);
    }
  }
}

// ── Exported Actions used by Sub-Modules ──────────────────────────────

export async function addXP(amount, subject = null, actionLabel = null) {
  try {
    if (subject) {
      await api.visitModule(subject);
    } else {
      await api.triggerAction('visit-module', { subject: 'general' });
    }
    await refreshDashboard();
    showToast(`+${amount} XP Earned!`);
  } catch (e) {
    console.warn("addXP failed:", e.message);
  }
}

export async function completeGoal(goalId, label = null) {
  try {
    const actionTypeMap = {
      visitModule: 'visit-module',
      readNotes:   'read-notes',
      flashcard:   'flashcard-session',
      quiz:        'quiz-complete',
      uploadFile:  'file-upload'
    };
    const actionType = actionTypeMap[goalId] || 'visit-module';
    await api.triggerAction(actionType, { subject: 'general' });
    await refreshDashboard();
    showToast(`🎯 Goal Unlocked! +100 XP`);
  } catch (e) {
    console.warn("completeGoal failed:", e.message);
  }
}

export async function markGoalReadNotes(subject, sectionId) {
  try {
    await api.readNotes(subject, sectionId);
    await refreshDashboard();
    showToast('🎯 Goal Unlocked: Read Notes (+30 XP)');
  } catch (e) {
    console.warn("markGoalReadNotes failed:", e.message);
  }
}

export async function markGoalUpload(subject, fileName) {
  try {
    await api.recordFileUpload(subject, fileName);
    await refreshDashboard();
    showToast('🎯 Goal Unlocked: File Uploaded (+20 XP)');
  } catch (e) {
    console.warn("markGoalUpload failed:", e.message);
  }
}

async function onQuizCompleted(score, details = {}) {
  try {
    const questionsAttempted = (details && details.questionsAttempted) || 10;
    const correctAnswers = (details && details.correctAnswers) || Math.round((score / 100) * questionsAttempted);
    const subject = (details && details.subject) || 'quiz';
    const duration = (details && details.duration) || 60;

    await api.completeQuiz(subject, questionsAttempted, correctAnswers, score, duration);
    await refreshDashboard();
    showToast('🎯 Quiz Completed! (+100 XP)');
  } catch (e) {
    console.warn("onQuizCompleted failed:", e.message);
  }
}

// Session Timer — ticks every 1 minute to record time spent on task
function startSessionTimer() {
  setInterval(async () => {
    if (AppState.currentView && AppState.currentView !== 'dashboard') {
      try {
        await api.endStudySession(AppState.currentView, 1);
        await refreshDashboard();
      } catch (e) {
        // silent
      }
    }
  }, 60000);
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

  setTimeout(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  }, 10);

  setTimeout(() => {
    toast.style.transform = 'translateY(-20px)';
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}
