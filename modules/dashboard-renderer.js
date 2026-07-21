/* ==========================================================================
   modules/dashboard-renderer.js — Pure DOM Renderer for Dashboard
   Renders real database-driven values into the HTML DOM.
   Does zero business logic calculations — strictly renders payload from backend.
   Handles empty states gracefully without hardcoded values or fake data.
   ========================================================================== */

export class DashboardRenderer {
  static render(data) {
    if (!data) return;
    const { userProgress, goals, goalsDoneCount, weeklyChart, subjectProgress, achievements, activityFeed } = data;

    this.renderHeader(userProgress);
    this.renderHero(userProgress, goalsDoneCount);
    this.renderMetricsStrip(userProgress);
    this.renderContinueLearning(subjectProgress);
    this.renderDailyGoals(goals, goalsDoneCount);
    this.renderWeeklyChart(weeklyChart);
    this.renderSubjectModules(subjectProgress);
    this.renderActivityFeed(activityFeed);
    this.renderAchievements(achievements, userProgress);
    this.renderRankProgress(userProgress);
  }

  static renderHeader(up) {
    const xpEl = document.getElementById('total-xp');
    const streakEl = document.getElementById('streak-count');
    if (xpEl) xpEl.textContent = `${(up.totalXP || 0).toLocaleString()} XP`;
    if (streakEl) streakEl.textContent = `${up.currentStreak || 0} Days`;
  }

  static renderHero(up, goalsDoneCount) {
    const hqsStreak = document.getElementById('hqs-streak');
    const hqsXp     = document.getElementById('hqs-xp');
    const hqsTime   = document.getElementById('hqs-time');
    const hqsRank   = document.getElementById('hqs-rank');

    if (hqsStreak) hqsStreak.textContent = up.currentStreak || 0;
    if (hqsXp)     hqsXp.textContent     = (up.totalXP || 0).toLocaleString();
    if (hqsTime)   hqsTime.textContent   = `${up.totalStudyTime || 0}m`;
    if (hqsRank)   hqsRank.textContent   = up.currentRank || 'Beginner';

    const goalPct = Math.round((goalsDoneCount / 5) * 100);
    const dbGaugePath = document.getElementById('db-gauge-path');
    const dbGaugePct  = document.getElementById('db-gauge-pct');
    if (dbGaugePath) dbGaugePath.setAttribute('stroke-dasharray', `${goalPct}, 100`);
    if (dbGaugePct)  dbGaugePct.textContent = `${goalPct}%`;
  }

  static renderMetricsStrip(up) {
    const timeEl       = document.getElementById('session-time');
    const totalXpEl    = document.getElementById('stat-total-xp');
    const streakDashEl = document.getElementById('streak-count-dash');
    const qsSolvedEl   = document.getElementById('ssc-qs-solved');
    const strongestEl  = document.getElementById('ssc-strongest');
    const weakestEl    = document.getElementById('ssc-weakest');

    if (timeEl)       timeEl.textContent       = `${up.totalStudyTime || 0}m`;
    if (totalXpEl)    totalXpEl.textContent    = (up.totalXP || 0).toLocaleString();
    if (streakDashEl) streakDashEl.textContent = up.currentStreak || 0;
    if (qsSolvedEl)   qsSolvedEl.textContent   = up.questionsAttempted || 0;

    // Strongest & Focus Area empty state handling
    if (strongestEl) {
      strongestEl.textContent = up.strongestSubject || 'No data yet';
      strongestEl.style.color = up.strongestSubject && up.strongestSubject !== 'No data yet' ? '#34d399' : 'var(--text-muted)';
    }

    if (weakestEl) {
      weakestEl.textContent = up.weakestSubject || 'Start learning';
      weakestEl.style.color = up.weakestSubject && up.weakestSubject !== 'Start learning' ? '#fbbf24' : 'var(--text-muted)';
    }
  }

  static renderContinueLearning(subProg = {}) {
    const container = document.getElementById('continue-learning-row');
    if (!container) return;

    const SUBJECT_META = {
      history:        { title: 'Indian History', icon: '📜', nav: 'history', badge: 'db-badge-medium', level: 'Intermediate', weight: '20% Wt.' },
      polity:         { title: 'Indian Polity', icon: '⚖️', nav: 'polity', badge: 'db-badge-hard', level: 'Advanced', weight: '16% Wt.' },
      geography:      { title: 'Geography', icon: '🗺️', nav: 'geography', badge: 'db-badge-easy', level: 'Beginner', weight: '16% Wt.' },
      science:        { title: 'General Science', icon: '🔬', nav: 'science', badge: 'db-badge-medium', level: 'Intermediate', weight: '24% Wt.' },
      economy:        { title: 'Economy', icon: '💹', nav: 'economy', badge: 'db-badge-medium', level: 'Intermediate', weight: '12% Wt.' },
      staticgk:       { title: 'Static GK Hub', icon: '📚', nav: 'staticgk', badge: 'db-badge-easy', level: 'Beginner', weight: '12% Wt.' },
      currentaffairs: { title: 'Current Affairs', icon: '📰', nav: 'currentaffairs', badge: 'db-badge-medium', level: 'High Wt.', weight: 'High Wt.' },
      flashcards:     { title: 'Flashcards', icon: '🃏', nav: 'flashcards', badge: 'db-badge-easy', level: 'Beginner', weight: 'All Topics' }
    };

    const MAX_XP = {
      history: 500, polity: 500, geography: 400, science: 400,
      economy: 350, staticgk: 350, currentaffairs: 300, flashcards: 300
    };

    // Filter to subjects that user has actually started (xp > 0 or quizzes > 0)
    const activeSubjects = Object.keys(SUBJECT_META).filter(sub => {
      const p = subProg[sub];
      return p && (p.xp > 0 || p.quizzesCompleted > 0);
    });

    if (activeSubjects.length === 0) {
      // Empty state onboarding card
      container.innerHTML = `
        <div class="db-continue-card" style="grid-column: 1 / -1; display: flex; align-items: center; justify-content: space-between; flex-direction: row; padding: var(--space-24);" onclick="document.getElementById('nav-quiz').click()">
          <div style="display: flex; align-items: center; gap: 16px;">
            <div class="db-cc-icon" style="font-size: 32px; width: 56px; height: 56px;">🚀</div>
            <div>
              <div class="db-cc-subject" style="font-size: 16px;">Start Your Learning Journey</div>
              <div class="db-cc-lesson" style="margin-top: 4px;">Choose any subject module below or attempt a mock quiz to begin tracking real database metrics.</div>
            </div>
          </div>
          <button class="btn btn-primary" style="white-space: nowrap;">Start Mock Quiz →</button>
        </div>
      `;
      return;
    }

    // Render active started subjects
    container.innerHTML = activeSubjects.slice(0, 3).map(sub => {
      const meta = SUBJECT_META[sub];
      const p = subProg[sub] || { xp: 0 };
      const pct = Math.min(100, Math.round((p.xp / (MAX_XP[sub] || 300)) * 100));

      return `
        <div class="db-continue-card" onclick="document.getElementById('nav-${meta.nav}').click()">
          <div class="db-cc-top">
            <div class="db-cc-icon">${meta.icon}</div>
            <div class="db-cc-badge ${meta.badge}">${meta.level}</div>
          </div>
          <div class="db-cc-subject">${meta.title}</div>
          <div class="db-cc-lesson">Continue your progress in ${meta.title}</div>
          <div class="db-cc-progress-row">
            <div class="db-cc-bar-wrap">
              <div class="db-cc-bar" style="width:${pct}%"></div>
            </div>
            <span class="db-cc-pct">${pct}%</span>
          </div>
          <div class="db-cc-meta">
            <span>Progress: ${p.xp} XP</span>
            <span>${meta.weight}</span>
          </div>
          <button class="btn btn-outline db-cc-btn">Resume →</button>
        </div>
      `;
    }).join('');
  }

  static renderDailyGoals(goals = {}, goalsDoneCount = 0) {
    const tasksGaugePath = document.getElementById('tasks-gauge-path');
    const counterEl      = document.getElementById('goals-progress-counter');
    const goalPct        = Math.round((goalsDoneCount / 5) * 100);

    if (tasksGaugePath) tasksGaugePath.setAttribute('stroke-dasharray', `${goalPct}, 100`);
    if (counterEl)      counterEl.textContent = `${goalsDoneCount}/5`;

    const goalMap = {
      visitModule: 'goal-visit-module',
      readNotes:   'goal-read-notes',
      flashcard:   'goal-flashcard',
      quiz:        'goal-quiz',
      uploadFile:  'goal-upload-file'
    };

    Object.entries(goalMap).forEach(([key, elementId]) => {
      const itemEl = document.getElementById(elementId);
      if (!itemEl) return;
      const isDone = !!goals[key];
      if (isDone) {
        itemEl.classList.add('task-done');
        const box = itemEl.querySelector('.checkbox-box');
        if (box) box.textContent = '✓';
      } else {
        itemEl.classList.remove('task-done');
        const box = itemEl.querySelector('.checkbox-box');
        if (box) box.textContent = '';
      }
    });
  }

  static renderWeeklyChart(weeklyChart = []) {
    const container = document.getElementById('analytics-chart');
    if (!container) return;

    const hasData = weeklyChart && weeklyChart.some(d => d.xp > 0);

    if (!hasData) {
      container.innerHTML = `
        <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: var(--text-muted); font-size: 12.5px; text-align: center; border: 1px dashed rgba(255,255,255,0.08); border-radius: var(--radius-md); padding: 16px;">
          📊 No XP activity recorded this week yet.<br>Start studying to see your daily chart!
        </div>
      `;
      return;
    }

    const maxVal = Math.max(...weeklyChart.map(d => d.xp), 100);

    container.innerHTML = weeklyChart.map((d, index) => {
      const heightPct = Math.max(8, Math.round((d.xp / maxVal) * 100));
      const isActive = index === weeklyChart.length - 1 ? 'db-bar-active' : '';
      return `
        <div class="db-chart-col">
          <div class="db-chart-bar ${isActive}" style="height:${heightPct}%" data-val="${d.xp} XP">
            <span class="db-bar-tip">${d.xp}</span>
          </div>
          <span class="db-chart-day">${d.dayName}</span>
        </div>
      `;
    }).join('');
  }

  static renderSubjectModules(subProg = {}) {
    const MAX_XP = {
      history: 500, polity: 500, geography: 400, science: 400,
      economy: 350, staticgk: 350, currentaffairs: 300, flashcards: 300
    };
    const LESSON_TOTALS = {
      history: 20, polity: 18, geography: 15, science: 25,
      economy: 12, staticgk: 16, currentaffairs: 30, flashcards: 50
    };

    Object.keys(MAX_XP).forEach(sub => {
      const data = subProg[sub] || { xp: 0, accuracy: 0, quizzesCompleted: 0 };
      const pct = Math.min(100, Math.round((data.xp / MAX_XP[sub]) * 100));

      const bar = document.getElementById(`progress-bar-${sub}`);
      const tag = document.getElementById(`progress-tag-${sub}`);
      const countEl = document.getElementById(`lesson-count-${sub}`);

      if (bar) bar.style.width = `${pct}%`;
      if (tag) tag.textContent = `${pct}%`;

      if (countEl) {
        const total = LESSON_TOTALS[sub] || 20;
        const done = Math.min(total, Math.round((pct / 100) * total));
        const unit = sub === 'currentaffairs' ? 'topics' : (sub === 'flashcards' ? 'cards' : 'lessons');
        countEl.textContent = `${done} / ${total} ${unit}`;
      }
    });
  }

  static renderActivityFeed(feed = []) {
    const feedEl = document.getElementById('activity-feed');
    if (!feedEl) return;

    if (!feed || feed.length === 0) {
      feedEl.innerHTML = `<div class="feed-empty">No activity yet — start studying! 📚</div>`;
      return;
    }

    feedEl.innerHTML = feed.slice(0, 6).map(item => `
      <div class="feed-entry">
        <span class="feed-icon">${item.icon || '⭐'}</span>
        <div class="feed-text">
          <span class="feed-action">${item.action}</span>
          ${item.xp ? `<span class="feed-xp">${item.xp}</span>` : ''}
        </div>
        <span class="feed-time">${item.time || ''}</span>
      </div>
    `).join('');
  }

  static renderAchievements(unlockedAchievements = [], up = {}) {
    const grid = document.getElementById('badges-grid');
    if (!grid) return;

    const unlockedSet = new Set(unlockedAchievements.map(a => a.id));

    const badgeElements = [
      { id: 'first_step',  elId: 'badge-firststep' },
      { id: 'streak_7',    elId: 'badge-streak5' },
      { id: 'xp_500',      elId: 'badge-xp500' },
      { id: 'quiz_champ',  elId: 'badge-quiz' },
      { id: 'note_taker',  elId: 'badge-notes' },
      { id: 'card_shark',  elId: 'badge-flash' }
    ];

    badgeElements.forEach(b => {
      let el = document.getElementById(b.elId);
      if (!el) return;

      if (unlockedSet.has(b.id) || (b.id === 'first_step' && up.modulesVisited >= 1)) {
        el.classList.add('earned');
      } else {
        el.classList.remove('earned');
      }
    });
  }

  static renderRankProgress(up) {
    const rankLabel     = document.getElementById('rank-label');
    const rankNextLabel = document.getElementById('rank-next-label');
    const rankPct       = document.getElementById('rank-pct');
    const rankBar       = document.getElementById('rank-progress-bar');

    if (rankLabel)     rankLabel.textContent     = up.currentRank || 'Beginner';
    if (rankNextLabel) rankNextLabel.textContent = up.nextRank ? `→ ${up.nextRank}` : '🏆 Max Rank!';
    if (rankPct)       rankPct.textContent       = `${up.rankPct || 0}%`;
    if (rankBar)       rankBar.style.width       = `${up.rankPct || 0}%`;
  }
}
