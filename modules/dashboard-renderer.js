/* ==========================================================================
   modules/dashboard-renderer.js — Pure DOM Renderer for Dashboard
   Renders real database-driven values into the HTML DOM.
   Does zero business logic calculations — strictly renders payload from backend.
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

    // Circular Goal Ring Gauge
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
    if (strongestEl)  strongestEl.textContent  = up.strongestSubject || 'History';
    if (weakestEl)    weakestEl.textContent    = up.weakestSubject || 'Geography';
  }

  static renderContinueLearning(subProg = {}) {
    const MAX_XP = { history: 500, polity: 500, quiz: 300 };
    const map = {
      history: { bar: 'cc-bar-history', pct: 'cc-pct-history' },
      polity:  { bar: 'cc-bar-polity',  pct: 'cc-pct-polity' },
      quiz:    { bar: 'cc-bar-quiz',    pct: 'cc-pct-quiz' }
    };

    Object.entries(map).forEach(([sub, ids]) => {
      const bar = document.getElementById(ids.bar);
      const pctEl = document.getElementById(ids.pct);
      const xp = (subProg[sub] && subProg[sub].xp) || 0;
      const pct = Math.min(100, Math.round((xp / (MAX_XP[sub] || 300)) * 100));

      if (bar) bar.style.width = `${pct}%`;
      if (pctEl) pctEl.textContent = `${pct}% Complete`;
    });
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
    if (!container || !weeklyChart || weeklyChart.length === 0) return;

    // Find max XP to scale chart heights proportionally
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

    // Map badge IDs to HTML element IDs
    const badgeElements = [
      { id: 'first_step',  elId: 'badge-firststep', defaultEl: grid.children[0] },
      { id: 'streak_7',    elId: 'badge-streak5' },
      { id: 'xp_500',      elId: 'badge-xp500' },
      { id: 'quiz_champ',  elId: 'badge-quiz' },
      { id: 'note_taker',  elId: 'badge-notes' },
      { id: 'card_shark',  elId: 'badge-flash' }
    ];

    badgeElements.forEach(b => {
      let el = document.getElementById(b.elId);
      if (!el && b.defaultEl) el = b.defaultEl;
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
