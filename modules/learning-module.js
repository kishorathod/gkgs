/* ==========================================================================
   Universal Component-Driven Learning Module System
   modules/learning-module.js

   Redesigns the SSC CGL learning platform into a scalable, production-ready
   CMS-driven architecture. Enforces the strict learning hierarchy:
   Subject ➔ Module ➔ Chapter ➔ Topic ➔ Learning Blocks.

   Powers History, Polity, Geography, Science, Economy, Static GK, and
   Current Affairs using a unified UI shell and topic-scoped JSON rendering.
   ========================================================================== */

import { addXP, markGoalReadNotes } from '../app.js';
import { api } from './api-service.js';
import { activityStore } from './activity-store.js';

export class LearningModuleEngine {
  constructor(options = {}) {
    this.subject = options.subject || 'history';
    this.containerId = options.containerId || `view-${this.subject}`;
    this.activeSubTab = 'overview';
    this.topicData = null;
    this.pyqState = {
      active: false,
      questions: [],
      currentIdx: 0,
      answered: [],
      score: 0
    };
    this.flashcardIdx = 0;
    this.flashcardFlipped = false;
  }

  /**
   * Load topic JSON payload from API and initialize learning module shell
   */
  async loadTopic(topicId) {
    try {
      const payload = await api.getTopic(topicId);
      if (payload) {
        this.topicData = payload;
        this.activeSubTab = 'overview';
        this.flashcardIdx = 0;
        this.flashcardFlipped = false;
        activityStore.logEvent('topic_opened', { subject: this.subject, topicId });
        this.renderAll();
        this.syncTopicSelector(topicId);
      }
    } catch (err) {
      console.warn(`LearningModuleEngine: Failed to load topic ${topicId}:`, err.message);
    }
  }

  /**
   * Sync the topic selector chip active state to the current topicId
   */
  syncTopicSelector(topicId) {
    const bar = document.getElementById(`${this.subject}-topic-selector-bar`);
    if (!bar) return;
    bar.querySelectorAll('.topic-chip').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.topicId === topicId);
    });
  }

  /**
   * Master render method: Renders all learning blocks dynamically
   */
  renderAll() {
    if (!this.topicData) return;

    const data = this.topicData;

    // 1. Hero Section
    this.renderHero(data.hero);

    // 2. Sub-Navigation Bar
    this.setupSubNav();

    // 3. Show overview pane, hide rest
    document.querySelectorAll(`#${this.containerId} .study-tab-pane`).forEach(pane => {
      pane.classList.add('hidden');
      pane.classList.remove('active');
    });
    const firstPane = document.getElementById(`${this.subject}-subtab-overview`);
    if (firstPane) {
      firstPane.classList.remove('hidden');
      firstPane.classList.add('active');
    }

    // 4. Update sub-nav active state
    const subnav = document.querySelector(`#${this.containerId} .study-sticky-nav`);
    if (subnav) {
      subnav.querySelectorAll('.study-nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.subtab === 'overview');
      });
    }

    // 5. Sub-Tab Panes
    this.renderOverviewPane(data);
    this.renderVisualPane(data);
    this.renderNotesPane(data);
    this.renderPYQPane(data);
    this.renderQuizPane(data);
    this.renderFlashcardPane(data);
    this.renderRevisionPane(data);
    this.renderMindMapsPane(data);
    this.renderFilesPane(data);
    this.renderAnalyticsPane(data);
    this.renderRelatedTopicsPane(data);

    // 6. Sidebar Analytics
    this.renderSidebarAnalytics(data);

    // 7. Setup Action Listeners
    this.setupActionListeners();
  }

  // ── 1. Hero Section Renderer ─────────────────────────────────────────────
  renderHero(hero) {
    if (!hero) return;

    const titleEl = document.querySelector(`#${this.containerId} .study-hero-title`);
    const descEl = document.querySelector(`#${this.containerId} .study-hero-desc`);
    const badgeEl = document.querySelector(`#${this.containerId} .study-hero-badge`);

    if (titleEl) titleEl.textContent = hero.title;
    if (descEl) descEl.textContent = hero.subtitle;
    if (badgeEl && this.topicData.subject) {
      badgeEl.textContent = `📚 ${this.topicData.subject.charAt(0).toUpperCase() + this.topicData.subject.slice(1)} — TOPIC MODULE`;
    }

    const chipVals = document.querySelectorAll(`#${this.containerId} .study-hero-metrics .chip-val`);
    if (chipVals.length >= 4) {
      if (hero.sscWeightage) chipVals[0].textContent = hero.sscWeightage;
      if (hero.expectedQuestions) chipVals[1].textContent = hero.expectedQuestions;
      if (hero.difficulty) chipVals[2].textContent = hero.difficulty;
      if (hero.estimatedReadingTime) chipVals[3].textContent = `⏱️ ~${hero.estimatedReadingTime}`;
    }
  }

  // ── 2. Sub-Navigation ────────────────────────────────────────────────────
  setupSubNav() {
    const subnav = document.querySelector(`#${this.containerId} .study-sticky-nav`);
    if (!subnav) return;

    subnav.querySelectorAll('.study-nav-btn').forEach(btn => {
      btn.onclick = (e) => {
        const targetSubtab = e.currentTarget.dataset.subtab;
        this.switchSubTab(targetSubtab);
      };
    });
  }

  switchSubTab(subtabId) {
    this.activeSubTab = subtabId;

    const subnav = document.querySelector(`#${this.containerId} .study-sticky-nav`);
    if (subnav) {
      subnav.querySelectorAll('.study-nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.subtab === subtabId);
      });
    }

    document.querySelectorAll(`#${this.containerId} .study-tab-pane`).forEach(pane => {
      pane.classList.add('hidden');
      pane.classList.remove('active');
    });

    const targetPaneId = `${this.subject}-subtab-${subtabId}`;
    const targetPane = document.getElementById(targetPaneId);
    if (targetPane) {
      targetPane.classList.remove('hidden');
      targetPane.classList.add('active');
    }

    if (subtabId === 'notes') {
      markGoalReadNotes();
    }

    addXP(5, this.subject, `Browsed ${this.subject} ${subtabId} tab`);
  }

  // ── 3. Overview Tab Renderer (QuickFacts, Personalities, Terms) ──────────
  renderOverviewPane(data) {
    const pane = document.getElementById(`${this.subject}-subtab-overview`);
    if (!pane) return;

    let html = '';

    // Why It Matters Banner
    if (data.hero?.whyItMatters) {
      html += `
        <div class="learning-card card-concept" style="margin-bottom: 20px;">
          <span class="learning-card-tag">💡 Why This Topic Matters in SSC CGL</span>
          <p style="font-size: 14px; line-height: 1.6; color: var(--text-main); margin-top: 6px;">${data.hero.whyItMatters}</p>
        </div>
      `;
    }

    // Quick Facts Grid
    if (data.quickFacts && data.quickFacts.length > 0) {
      html += `
        <div class="quick-facts-section" style="margin-bottom: 24px;">
          <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 14px;">⚡ High-Yield Quick Facts</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 14px;">
            ${data.quickFacts.map(f => `
              <div class="glass-card" style="padding: 14px; border: 1px solid var(--border-glass); border-radius: var(--radius-md);">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                  <span style="font-size: 18px;">${f.icon || '📌'}</span>
                  <strong style="font-size: 12.5px; color: var(--accent-purple);">${f.heading}</strong>
                </div>
                <p style="font-size: 13px; color: var(--text-main); margin: 0; line-height: 1.4;">${f.fact}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Key Personalities / Entities
    if (data.personalities && data.personalities.length > 0) {
      html += `
        <div class="personalities-section" style="margin-bottom: 24px;">
          <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 14px;">👤 Key Personalities &amp; Leaders</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px;">
            ${data.personalities.map(p => `
              <div class="glass-card" style="padding: 16px; border-radius: var(--radius-lg);">
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                  <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main); margin: 0;">${p.name}</h4>
                  <span style="font-size: 11px; color: var(--accent-pink); font-weight: 700;">${p.role}</span>
                </div>
                <p style="font-size: 12.5px; color: var(--text-secondary); margin-bottom: 8px; line-height: 1.4;">${p.majorContributions}</p>
                ${p.sscTrick ? `
                  <div style="background: rgba(99,102,241,0.1); padding: 6px 10px; border-radius: 6px; font-size: 11.5px; color: var(--accent-purple); font-weight: 600;">
                    💡 SSC Trick: ${p.sscTrick}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Important Terms & Glossary
    if (data.terms && data.terms.length > 0) {
      html += `
        <div class="terms-section" style="margin-bottom: 24px;">
          <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 14px;">📖 High-Yield Glossary &amp; Terms</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px;">
            ${data.terms.map(t => `
              <div class="glass-card" style="padding: 14px; border-radius: var(--radius-md);">
                <h5 style="font-size: 13.5px; font-weight: 700; color: var(--accent-cyan); margin: 0 0 4px 0;">${t.term}</h5>
                <p style="font-size: 12.5px; color: var(--text-secondary); margin: 0; line-height: 1.4;">${t.definition}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    pane.innerHTML = html;
  }

  // ── 4. Subject Visual Pane (Timeline) ────────────────────────────────────
  renderVisualPane(data) {
    const pane = document.getElementById(`${this.subject}-subtab-timeline`);
    if (!pane) return;

    if (!data.timeline || data.timeline.length === 0) {
      pane.innerHTML = `<div style="padding: 24px; color: var(--text-muted); text-align: center;">No visual timeline available for this topic.</div>`;
      return;
    }

    let html = `
      <div class="timeline-container">
        <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 16px;">⏱️ Topic Chronology: ${data.hero?.title || ''}</h3>
        <div style="display: flex; flex-direction: column; gap: 14px;">
          ${data.timeline.map(t => `
            <div class="timeline-event-card glass-card" style="padding: 16px; border-left: 4px solid var(--accent-purple);">
              <span style="font-size: 12px; font-weight: 700; color: var(--accent-purple);">${t.year}</span>
              <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main); margin: 4px 0;">${t.title}</h4>
              <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 6px; line-height: 1.5;">${t.shortDescription}</p>
              <span style="font-size: 11.5px; font-weight: 600; color: var(--text-muted);">🎯 Significance: ${t.importance}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    pane.innerHTML = html;
  }

  // ── 5. Notes Accordion & Learning Content ────────────────────────────────
  renderNotesPane(data) {
    const container = document.getElementById(`${this.subject}-notes-accordion-container`) || document.getElementById('history-accordions-container');
    if (!container) return;

    let html = '';

    if (data.notes && data.notes.length > 0) {
      html += data.notes.map((note, idx) => `
        <div class="accordion-item ${idx === 0 ? 'expanded' : ''}" id="${this.subject}-acc-${idx}">
          <div class="accordion-header">
            <div class="accordion-title-wrap">
              <span class="accordion-icon">📖</span>
              <span class="accordion-title">${note.heading}</span>
            </div>
            <span class="accordion-chevron">▼</span>
          </div>
          <div class="accordion-body">
            <p style="font-size: 14px; line-height: 1.6; color: var(--text-secondary);">${note.explanation}</p>

            ${note.keyTakeaways && note.keyTakeaways.length > 0 ? `
              <div class="learning-card card-concept">
                <span class="learning-card-tag">💡 Key Takeaways</span>
                <ul style="margin: 0; padding-left: 20px;">${note.keyTakeaways.map(t => `<li style="font-size: 13px;">${t}</li>`).join('')}</ul>
              </div>
            ` : ''}

            ${note.importantExamPoints && note.importantExamPoints.length > 0 ? `
              <div class="learning-card card-facts">
                <span class="learning-card-tag">📌 Important Exam Points</span>
                <ul style="margin: 0; padding-left: 20px;">${note.importantExamPoints.map(p => `<li style="font-size: 13px;">${p}</li>`).join('')}</ul>
              </div>
            ` : ''}

            ${note.commonStudentMistakes && note.commonStudentMistakes.length > 0 ? `
              <div class="learning-card card-trap">
                <span class="learning-card-tag">⚠️ Common Student Mistakes</span>
                <ul style="margin: 0; padding-left: 20px;">${note.commonStudentMistakes.map(m => `<li style="font-size: 13px; color:#f87171;">${m}</li>`).join('')}</ul>
              </div>
            ` : ''}
          </div>
        </div>
      `).join('');
    }

    // Render Memory Tricks & Mnemonics
    if (data.memoryTricks && data.memoryTricks.length > 0) {
      html += `
        <div style="margin-top: 24px;">
          <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 14px;">🧠 Memory Tricks &amp; Mnemonics</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px;">
            ${data.memoryTricks.map(m => `
              <div class="learning-card card-trick">
                <span class="learning-card-tag">💡 ${m.concept}</span>
                <h4 style="font-size: 14px; font-weight: 700; color: var(--accent-cyan); margin: 6px 0;">${m.mnemonic}</h4>
                <p style="font-size: 12.5px; color: var(--text-secondary); margin: 0; line-height: 1.4;">${m.explanation}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Render Exam Traps
    if (data.examTraps && data.examTraps.length > 0) {
      html += `
        <div style="margin-top: 24px;">
          <h3 style="font-size: 16px; font-weight: 700; color: #f87171; margin-bottom: 14px;">⚠️ High-Frequency SSC Exam Traps</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${data.examTraps.map(t => `
              <div class="learning-card card-trap">
                <span class="learning-card-tag">⚠️ Trap: ${t.topic}</span>
                <p style="font-size: 13px; color: #f87171; margin: 4px 0;">❌ <strong>Common Mistake:</strong> ${t.trap}</p>
                <p style="font-size: 13px; color: #34d399; margin: 0;">✅ <strong>Correct Concept:</strong> ${t.correction}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Render Comparison Tables
    if (data.tables && data.tables.length > 0) {
      html += `
        <div style="margin-top: 24px;">
          <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 14px;">📊 Comparison &amp; Reference Tables</h3>
          ${data.tables.map(tbl => `
            <div class="glass-card" style="padding: 16px; margin-bottom: 16px; overflow-x: auto;">
              <h4 style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 12px;">${tbl.title}</h4>
              <table style="width: 100%; border-collapse: collapse; font-size: 12.5px;">
                <thead>
                  <tr style="background: rgba(255,255,255,0.04); border-bottom: 1px solid var(--border-glass);">
                    ${tbl.headers.map(h => `<th style="padding: 10px; text-align: left; color: var(--accent-purple); font-weight: 700;">${h}</th>`).join('')}
                  </tr>
                </thead>
                <tbody>
                  ${tbl.rows.map(row => `
                    <tr style="border-bottom: 1px solid var(--border-glass);">
                      ${row.map(cell => `<td style="padding: 10px; color: var(--text-secondary);">${cell}</td>`).join('')}
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `).join('')}
        </div>
      `;
    }

    container.innerHTML = html;
    this.setupAccordionEvents(container);
  }

  setupAccordionEvents(container) {
    container.querySelectorAll('.accordion-header').forEach(header => {
      header.onclick = (e) => {
        const item = e.currentTarget.closest('.accordion-item');
        if (item) item.classList.toggle('expanded');
      };
    });
  }

  // ── 6. PYQ Pane & Insights ───────────────────────────────────────────────
  renderPYQPane(data) {
    const pane = document.getElementById(`${this.subject}-subtab-pyqs`);
    if (!pane) return;

    let html = '';

    if (data.pyqAnalysis) {
      const p = data.pyqAnalysis;
      html += `
        <div class="glass-card" style="padding: 20px; margin-bottom: 20px; border-left: 4px solid var(--accent-purple);">
          <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 14px;">📌 TCS PYQ Analysis &amp; Exam Insights</h3>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px;">
            ${p.frequentlyTestedConcepts ? `
              <div>
                <h5 style="font-size: 13px; color: var(--accent-purple); font-weight: 700;">Frequently Tested Concepts</h5>
                <ul style="margin: 0; padding-left: 18px; font-size: 12.5px; color: var(--text-secondary);">${p.frequentlyTestedConcepts.map(c => `<li>${c}</li>`).join('')}</ul>
              </div>
            ` : ''}
            
            ${p.repeatedThemes ? `
              <div>
                <h5 style="font-size: 13px; color: var(--accent-pink); font-weight: 700;">Repeated Themes</h5>
                <ul style="margin: 0; padding-left: 18px; font-size: 12.5px; color: var(--text-secondary);">${p.repeatedThemes.map(t => `<li>${t}</li>`).join('')}</ul>
              </div>
            ` : ''}
          </div>

          ${p.difficultyTrend ? `
            <div style="margin-top: 14px; padding-top: 10px; border-top: 1px solid var(--border-glass); font-size: 12px; color: var(--text-muted);">
              📈 <strong>Difficulty Trend:</strong> ${p.difficultyTrend}
            </div>
          ` : ''}
        </div>
      `;
    }

    if (data.mcqs && data.mcqs.length > 0) {
      html += `
        <div style="padding: 16px; background: var(--bg-card); border-radius: var(--radius-lg); text-align: center;">
          <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main); margin-bottom: 8px;">Authentic Practice PYQs Available (${data.mcqs.length} MCQs)</h4>
          <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;">Test your concept retention with exam-level questions.</p>
          <button class="btn btn-primary" id="${this.subject}-jump-to-quiz" style="background: var(--grad-primary);">Switch to Practice Quiz 🎯</button>
        </div>
      `;
    }

    pane.innerHTML = html;

    const jumpBtn = document.getElementById(`${this.subject}-jump-to-quiz`);
    if (jumpBtn) {
      jumpBtn.onclick = () => this.switchSubTab('quiz');
    }
  }

  // ── 7. Interactive Practice Quiz Engine ──────────────────────────────────
  renderQuizPane(data) {
    const pane = document.getElementById(`${this.subject}-subtab-quiz`);
    if (!pane) return;

    if (!data.mcqs || data.mcqs.length === 0) {
      pane.innerHTML = `<div style="padding: 24px; color: var(--text-muted); text-align: center;">No MCQs available for this topic yet.</div>`;
      return;
    }

    this.pyqState = {
      active: true,
      questions: data.mcqs,
      currentIdx: 0,
      answered: new Array(data.mcqs.length).fill(null),
      score: 0
    };

    this.renderQuizQuestion(pane);
  }

  renderQuizQuestion(pane) {
    const { questions, currentIdx, answered } = this.pyqState;
    const q = questions[currentIdx];
    const progress = ((currentIdx + 1) / questions.length * 100).toFixed(0);

    let html = `
      <div class="glass-card" style="padding: 20px;">
        <div style="height: 5px; background: rgba(255,255,255,0.08); border-radius: 10px; overflow: hidden; margin-bottom: 16px;">
          <div style="width: ${progress}%; height: 100%; background: var(--grad-primary); transition: width 0.3s;"></div>
        </div>

        <div style="display: flex; justify-content: space-between; font-size: 12.5px; margin-bottom: 12px;">
          <span style="color: var(--accent-purple); font-weight: 700;">Question ${currentIdx + 1} of ${questions.length}</span>
          <span style="color: var(--text-muted);">Tag: ${q.topicTag || 'General'}</span>
        </div>

        <h4 style="font-size: 15px; font-weight: 600; color: var(--text-main); margin-bottom: 16px; line-height: 1.5;">${q.question}</h4>

        <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px;">
          ${q.options.map((opt) => {
            const userAnswer = answered[currentIdx];
            let style = 'text-align: left; width: 100%; border: 1px solid var(--border-glass); padding: 12px;';

            if (userAnswer !== null) {
              if (opt === q.correctAnswer) {
                style += ' background: rgba(16,185,129,0.18); border-color: rgba(16,185,129,0.4); color: #34d399;';
              } else if (userAnswer === opt && opt !== q.correctAnswer) {
                style += ' background: rgba(239,68,68,0.18); border-color: rgba(239,68,68,0.4); color: #f87171;';
              }
            }

            return `<button class="btn btn-secondary" data-opt="${opt}" ${userAnswer !== null ? 'disabled' : ''} style="${style}">${opt}</button>`;
          }).join('')}
        </div>

        ${answered[currentIdx] !== null ? `
          <div style="padding: 12px; border-radius: var(--radius-md); background: rgba(99,102,241,0.08); font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;">
            💡 <strong>Explanation:</strong> ${q.explanation}
          </div>
        ` : ''}

        <div style="display: flex; justify-content: space-between;">
          <button class="btn btn-secondary" id="${this.subject}-quiz-prev" ${currentIdx === 0 ? 'disabled' : ''}>← Previous</button>
          ${currentIdx < questions.length - 1 ? `
            <button class="btn btn-primary" id="${this.subject}-quiz-next">Next →</button>
          ` : `
            <button class="btn btn-primary" id="${this.subject}-quiz-finish" style="background: var(--grad-emerald);">View Results 🏆</button>
          `}
        </div>
      </div>
    `;

    pane.innerHTML = html;

    pane.querySelectorAll('button[data-opt]').forEach(btn => {
      btn.onclick = (e) => {
        const selectedOpt = e.currentTarget.dataset.opt;
        this.pyqState.answered[currentIdx] = selectedOpt;
        if (selectedOpt === q.correctAnswer) {
          this.pyqState.score++;
          addXP(15, this.subject, 'Correct MCQ Answer');
        }
        this.renderQuizQuestion(pane);
      };
    });

    const prevBtn = document.getElementById(`${this.subject}-quiz-prev`);
    const nextBtn = document.getElementById(`${this.subject}-quiz-next`);
    const finishBtn = document.getElementById(`${this.subject}-quiz-finish`);

    if (prevBtn) prevBtn.onclick = () => { this.pyqState.currentIdx--; this.renderQuizQuestion(pane); };
    if (nextBtn) nextBtn.onclick = () => { this.pyqState.currentIdx++; this.renderQuizQuestion(pane); };
    if (finishBtn) finishBtn.onclick = () => this.showQuizResults(pane);
  }

  showQuizResults(pane) {
    const { questions, score } = this.pyqState;
    const total = questions.length;
    const percent = ((score / total) * 100).toFixed(0);

    pane.innerHTML = `
      <div class="glass-card" style="text-align: center; padding: 32px; border-radius: var(--radius-xl);">
        <div style="font-size: 44px; margin-bottom: 12px;">🏆</div>
        <h3 style="font-size: 20px; color: var(--text-main); margin-bottom: 16px;">Topic Quiz Completed!</h3>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 24px;">
          <div style="padding: 14px; background: rgba(255,255,255,0.03); border-radius: var(--radius-md); border: 1px solid var(--border-glass);">
            <div style="font-size: 22px; font-weight: 700; color: var(--text-main);">${score} / ${total}</div>
            <div style="font-size: 11.5px; color: var(--text-muted);">Score</div>
          </div>
          <div style="padding: 14px; background: rgba(255,255,255,0.03); border-radius: var(--radius-md); border: 1px solid var(--border-glass);">
            <div style="font-size: 22px; font-weight: 700; color: var(--accent-purple);">${percent}%</div>
            <div style="font-size: 11.5px; color: var(--text-muted);">Accuracy</div>
          </div>
          <div style="padding: 14px; background: rgba(255,255,255,0.03); border-radius: var(--radius-md); border: 1px solid var(--border-glass);">
            <div style="font-size: 22px; font-weight: 700; color: var(--accent-emerald);">+${score * 15} XP</div>
            <div style="font-size: 11.5px; color: var(--text-muted);">XP Earned</div>
          </div>
        </div>
        <button class="btn btn-primary" id="${this.subject}-quiz-retry" style="background: var(--grad-primary);">Retry Quiz</button>
      </div>
    `;

    const retryBtn = document.getElementById(`${this.subject}-quiz-retry`);
    if (retryBtn) {
      retryBtn.onclick = () => this.renderQuizPane(this.topicData);
    }
  }

  // ── 8. Flashcards Carousel ───────────────────────────────────────────────
  renderFlashcardPane(data) {
    const pane = document.getElementById(`${this.subject}-subtab-flashcards`);
    if (!pane) return;

    if (!data.flashcards || data.flashcards.length === 0) {
      pane.innerHTML = `<div style="padding: 24px; color: var(--text-muted); text-align: center;">No flashcards available for this topic.</div>`;
      return;
    }

    this.flashcardIdx = 0;
    this.flashcardFlipped = false;
    this.renderFlashcardCard(pane);
  }

  renderFlashcardCard(pane) {
    const cards = this.topicData.flashcards;
    const card = cards[this.flashcardIdx];
    const total = cards.length;

    pane.innerHTML = `
      <div>
        <div style="text-align: center; font-size: 12px; color: var(--text-muted); margin-bottom: 12px;">
          Card ${this.flashcardIdx + 1} of ${total} — Click the card to reveal the answer
        </div>
        <div id="${this.subject}-fc-box" class="glass-card flashcard-box" style="
          min-height: 200px; padding: 32px; display: flex; flex-direction: column;
          align-items: center; justify-content: center; text-align: center;
          cursor: pointer; border: 2px solid ${this.flashcardFlipped ? 'var(--accent-emerald)' : 'var(--accent-purple)'};
          border-radius: var(--radius-xl); transition: all 0.3s ease; margin-bottom: 16px;
        ">
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: 12px;">
            ${this.flashcardFlipped ? '✅ ANSWER' : '❓ QUESTION'}
          </div>
          <div style="font-size: 16px; font-weight: 700; color: ${this.flashcardFlipped ? 'var(--accent-emerald)' : 'var(--text-main)'}; line-height: 1.6;">
            ${this.flashcardFlipped ? card.back : card.front}
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center;">
          <button class="btn btn-secondary" id="${this.subject}-fc-prev" ${this.flashcardIdx === 0 ? 'disabled' : ''}>← Previous</button>
          <div style="display: flex; gap: 6px;">
            ${cards.map((_, i) => `
              <div style="width: 8px; height: 8px; border-radius: 50%; background: ${i === this.flashcardIdx ? 'var(--accent-purple)' : 'rgba(255,255,255,0.1)'}; transition: background 0.2s;"></div>
            `).join('')}
          </div>
          <button class="btn btn-primary" id="${this.subject}-fc-next" ${this.flashcardIdx === total - 1 ? 'disabled' : ''}>Next →</button>
        </div>
      </div>
    `;

    const fcBox = document.getElementById(`${this.subject}-fc-box`);
    const prevBtn = document.getElementById(`${this.subject}-fc-prev`);
    const nextBtn = document.getElementById(`${this.subject}-fc-next`);

    if (fcBox) fcBox.onclick = () => { this.flashcardFlipped = !this.flashcardFlipped; this.renderFlashcardCard(pane); };
    if (prevBtn) prevBtn.onclick = () => { this.flashcardFlipped = false; this.flashcardIdx--; this.renderFlashcardCard(pane); };
    if (nextBtn) nextBtn.onclick = () => { this.flashcardFlipped = false; this.flashcardIdx++; this.renderFlashcardCard(pane); };
  }

  // ── 9. Mind Maps Pane ────────────────────────────────────────────────────
  renderMindMapsPane(data) {
    const pane = document.getElementById(`${this.subject}-subtab-mindmaps`);
    if (!pane) return;

    // Build a radial text mind map from quickFacts and personalities
    const centerTopic = data.hero?.title || 'Topic';
    const branches = [];

    if (data.quickFacts && data.quickFacts.length > 0) {
      branches.push({
        label: '⚡ Key Facts',
        color: 'var(--accent-purple)',
        children: data.quickFacts.slice(0, 5).map(f => `${f.icon} ${f.heading}`)
      });
    }

    if (data.personalities && data.personalities.length > 0) {
      branches.push({
        label: '👤 Key People',
        color: 'var(--accent-pink)',
        children: data.personalities.slice(0, 5).map(p => p.name)
      });
    }

    if (data.timeline && data.timeline.length > 0) {
      branches.push({
        label: '⏱️ Key Events',
        color: 'var(--accent-cyan)',
        children: data.timeline.slice(0, 5).map(t => `${t.year}: ${t.title}`)
      });
    }

    if (data.examTraps && data.examTraps.length > 0) {
      branches.push({
        label: '⚠️ Exam Traps',
        color: '#f87171',
        children: data.examTraps.slice(0, 4).map(t => t.topic)
      });
    }

    pane.innerHTML = `
      <div>
        <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 16px;">🧠 Topic Mind Map: ${centerTopic}</h3>

        <!-- Center Node -->
        <div style="display: flex; justify-content: center; margin-bottom: 24px;">
          <div style="padding: 16px 24px; background: var(--grad-primary); border-radius: var(--radius-xl); font-size: 16px; font-weight: 800; color: #fff; text-align: center; max-width: 280px; box-shadow: 0 8px 24px rgba(99,102,241,0.3);">
            ${centerTopic}
          </div>
        </div>

        <!-- Branch Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px;">
          ${branches.map(branch => `
            <div class="glass-card" style="padding: 16px; border-left: 4px solid ${branch.color};">
              <h4 style="font-size: 14px; font-weight: 700; color: ${branch.color}; margin: 0 0 12px 0;">${branch.label}</h4>
              <div style="display: flex; flex-direction: column; gap: 6px;">
                ${branch.children.map(child => `
                  <div style="display: flex; align-items: flex-start; gap: 6px; font-size: 12.5px; color: var(--text-secondary);">
                    <span style="color: ${branch.color}; flex-shrink: 0;">→</span>
                    <span>${child}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>

        <div style="margin-top: 20px; padding: 12px 16px; background: rgba(99,102,241,0.06); border-radius: var(--radius-md); font-size: 12.5px; color: var(--text-muted); text-align: center;">
          💡 Study Tip: Use this mind map as a quick visual overview. Each branch connects to detailed notes in the Study Notes tab.
        </div>
      </div>
    `;
  }

  // ── 9. Revision Sheet & One-Liners ───────────────────────────────────────
  renderRevisionPane(data) {
    const pane = document.getElementById(`${this.subject}-subtab-revisionsheet`);
    if (!pane) return;

    let html = '';

    if (data.revisionSheet && data.revisionSheet.length > 0) {
      html += `
        <div class="glass-card" style="padding: 20px; border: 1px solid var(--accent-emerald); margin-bottom: 20px;">
          <h3 style="font-size: 16px; font-weight: 700; color: var(--accent-emerald); margin-bottom: 14px;">📝 1-Page Exam Cheat Sheet</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 10px;">
            ${data.revisionSheet.map(s => `<div style="padding: 8px 12px; background: rgba(16,185,129,0.06); border-radius: 6px; font-size: 12.5px; color: var(--text-main);">${s}</div>`).join('')}
          </div>
        </div>
      `;
    }

    if (data.revisionPoints && data.revisionPoints.length > 0) {
      html += `
        <div>
          <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 14px;">⚡ One-Liner Quick Points (${data.revisionPoints.length} Points)</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${data.revisionPoints.map(p => `
              <div class="glass-card" style="padding: 10px 14px; font-size: 13px; color: var(--text-main); display: flex; align-items: center; gap: 8px;">
                <span>🔹</span><span>${p}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    pane.innerHTML = html;
  }

  // ── 10. Study Files Pane ─────────────────────────────────────────────────
  renderFilesPane(data) {
    const pane = document.getElementById(`${this.subject}-subtab-files`);
    if (!pane) return;

    pane.innerHTML = `
      <div>
        <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 16px;">📁 Study Files for ${data.hero?.title || 'This Topic'}</h3>

        <div class="glass-card" style="padding: 24px; text-align: center; margin-bottom: 16px; border: 2px dashed rgba(255,255,255,0.08);">
          <div style="font-size: 36px; margin-bottom: 8px;">📤</div>
          <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main); margin-bottom: 8px;">Upload Your Study Notes</h4>
          <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;">Upload PDFs, images, or notes to organize your personal study materials for this topic.</p>
          <button class="btn btn-primary" onclick="document.getElementById('nav-uploads')?.click()">
            📤 Go to Study Files
          </button>
        </div>

        <div class="glass-card" style="padding: 16px;">
          <h4 style="font-size: 14px; font-weight: 700; color: var(--accent-purple); margin-bottom: 12px;">📚 Recommended Resources</h4>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <div style="display: flex; align-items: center; gap: 12px; padding: 10px; background: rgba(255,255,255,0.03); border-radius: var(--radius-md);">
              <span style="font-size: 20px;">📘</span>
              <div>
                <div style="font-size: 13px; font-weight: 700; color: var(--text-main);">NCERT Class 11 — Themes in World History</div>
                <div style="font-size: 11.5px; color: var(--text-muted);">Chapter on early European contacts with Asia</div>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 12px; padding: 10px; background: rgba(255,255,255,0.03); border-radius: var(--radius-md);">
              <span style="font-size: 20px;">📗</span>
              <div>
                <div style="font-size: 13px; font-weight: 700; color: var(--text-main);">Spectrum Modern History — Rajiv Ahir</div>
                <div style="font-size: 11.5px; color: var(--text-muted);">Chapter 3: Coming of Europeans to India</div>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 12px; padding: 10px; background: rgba(255,255,255,0.03); border-radius: var(--radius-md);">
              <span style="font-size: 20px;">📄</span>
              <div>
                <div style="font-size: 13px; font-weight: 700; color: var(--text-main);">Lucent's GK — History Section</div>
                <div style="font-size: 11.5px; color: var(--text-muted);">European trading companies and their establishment</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ── 11. Analytics Pane ───────────────────────────────────────────────────
  renderAnalyticsPane(data) {
    const pane = document.getElementById(`${this.subject}-subtab-analytics`);
    if (!pane) return;

    const topicTitle = data.hero?.title || 'This Topic';
    const totalMCQs = data.mcqs?.length || 0;
    const totalFlashcards = data.flashcards?.length || 0;
    const totalNotes = data.notes?.length || 0;
    const totalTimeline = data.timeline?.length || 0;

    pane.innerHTML = `
      <div>
        <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 16px;">📈 Topic Analytics: ${topicTitle}</h3>

        <!-- Content Summary Cards -->
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 14px; margin-bottom: 24px;">
          <div class="glass-card" style="padding: 16px; text-align: center; border-top: 3px solid var(--accent-purple);">
            <div style="font-size: 28px; font-weight: 800; color: var(--accent-purple);">${totalMCQs}</div>
            <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Practice MCQs</div>
          </div>
          <div class="glass-card" style="padding: 16px; text-align: center; border-top: 3px solid var(--accent-cyan);">
            <div style="font-size: 28px; font-weight: 800; color: var(--accent-cyan);">${totalFlashcards}</div>
            <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Flashcards</div>
          </div>
          <div class="glass-card" style="padding: 16px; text-align: center; border-top: 3px solid var(--accent-pink);">
            <div style="font-size: 28px; font-weight: 800; color: var(--accent-pink);">${totalNotes}</div>
            <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Study Sections</div>
          </div>
          <div class="glass-card" style="padding: 16px; text-align: center; border-top: 3px solid var(--accent-emerald);">
            <div style="font-size: 28px; font-weight: 800; color: var(--accent-emerald);">${totalTimeline}</div>
            <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Timeline Events</div>
          </div>
        </div>

        <!-- Exam Importance -->
        <div class="glass-card" style="padding: 20px; margin-bottom: 16px; border-left: 4px solid var(--accent-amber);">
          <h4 style="font-size: 14px; font-weight: 700; color: var(--accent-amber); margin-bottom: 12px;">📊 SSC CGL Exam Relevance</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div>
              <div style="font-size: 12px; color: var(--text-muted);">SSC Weightage</div>
              <div style="font-size: 15px; font-weight: 700; color: var(--text-main);">${data.hero?.sscWeightage || 'High'}</div>
            </div>
            <div>
              <div style="font-size: 12px; color: var(--text-muted);">Expected Questions</div>
              <div style="font-size: 15px; font-weight: 700; color: var(--text-main);">${data.hero?.expectedQuestions || '1-2'}</div>
            </div>
            <div>
              <div style="font-size: 12px; color: var(--text-muted);">Difficulty Level</div>
              <div style="font-size: 15px; font-weight: 700; color: var(--text-main);">${data.hero?.difficulty || 'Medium'}</div>
            </div>
            <div>
              <div style="font-size: 12px; color: var(--text-muted);">Reading Time</div>
              <div style="font-size: 15px; font-weight: 700; color: var(--text-main);">${data.hero?.estimatedReadingTime || '10 mins'}</div>
            </div>
          </div>
        </div>

        <!-- Study Completion Checklist -->
        <div class="glass-card" style="padding: 20px;">
          <h4 style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 12px;">✅ Topic Mastery Checklist</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${[
              { label: 'Read all study notes', tab: 'notes', icon: '📖' },
              { label: 'Study the chronological timeline', tab: 'timeline', icon: '⏱️' },
              { label: 'Attempt all practice MCQs', tab: 'quiz', icon: '🎯' },
              { label: 'Complete flashcard deck', tab: 'flashcards', icon: '🃏' },
              { label: 'Review exam traps & memory tricks', tab: 'notes', icon: '🧠' },
              { label: 'Read the revision cheat sheet', tab: 'revisionsheet', icon: '📝' }
            ].map(item => `
              <div style="display: flex; align-items: center; gap: 10px; padding: 10px; background: rgba(255,255,255,0.03); border-radius: var(--radius-md); cursor: pointer;"
                   onclick="document.querySelector('#${this.containerId} .study-nav-btn[data-subtab=\\'${item.tab}\\']')?.click()">
                <span style="font-size: 16px;">${item.icon}</span>
                <span style="font-size: 13px; color: var(--text-secondary);">${item.label}</span>
                <span style="margin-left: auto; font-size: 11px; color: var(--accent-purple);">Go →</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // ── 12. Related Topics Navigation ────────────────────────────────────────
  renderRelatedTopicsPane(data) {
    if (!data.relatedTopics) return;

    const nav = data.relatedTopics;
    const prevBtn = document.getElementById('btn-hist-prev-topic');
    const nextBtn = document.getElementById('btn-hist-next-topic');

    if (prevBtn) {
      if (nav.previousTopic && nav.previousTopicId) {
        prevBtn.textContent = `← ${nav.previousTopic}`;
        prevBtn.disabled = false;
        prevBtn.onclick = () => this.loadTopic(nav.previousTopicId);
      } else if (nav.previousTopic) {
        prevBtn.textContent = `← ${nav.previousTopic}`;
        prevBtn.disabled = true;
      } else {
        prevBtn.textContent = `← Previous Topic`;
        prevBtn.disabled = true;
      }
    }

    if (nextBtn) {
      if (nav.nextTopic && nav.nextTopicId) {
        nextBtn.textContent = `${nav.nextTopic} →`;
        nextBtn.disabled = false;
        nextBtn.onclick = () => this.loadTopic(nav.nextTopicId);
      } else {
        nextBtn.textContent = `Next Topic →`;
        nextBtn.disabled = true;
      }
    }
  }

  // ── 13. Sidebar Analytics ────────────────────────────────────────────────
  renderSidebarAnalytics(data) {
    const timeEl = document.getElementById('hist-sb-time');
    if (timeEl && data.hero?.estimatedReadingTime) {
      timeEl.textContent = `~${data.hero.estimatedReadingTime}`;
    }

    // Update total MCQs count
    const pyqsEl = document.getElementById('hist-sb-pyqs');
    if (pyqsEl && data.mcqs) {
      pyqsEl.textContent = `0 / ${data.mcqs.length}`;
    }
  }

  // ── 14. Action Listeners ────────────────────────────────────────────────
  setupActionListeners() {
    const continueBtn = document.getElementById('btn-history-read-cta') || document.getElementById(`btn-${this.subject}-continue`);
    const quizBtn = document.getElementById('btn-history-quiz-cta') || document.getElementById(`btn-${this.subject}-quiz`);
    const bottomQuizBtn = document.getElementById('btn-hist-bottom-quiz');
    const bottomFlashBtn = document.getElementById('btn-hist-bottom-flash');
    const sbQuizBtn = document.getElementById('btn-hist-sb-quiz');

    if (continueBtn) continueBtn.onclick = () => this.switchSubTab('notes');
    if (quizBtn) quizBtn.onclick = () => this.switchSubTab('quiz');
    if (bottomQuizBtn) bottomQuizBtn.onclick = () => this.switchSubTab('quiz');
    if (bottomFlashBtn) bottomFlashBtn.onclick = () => this.switchSubTab('flashcards');
    if (sbQuizBtn) sbQuizBtn.onclick = () => this.switchSubTab('quiz');
  }

  // ── 15. Setup Topic Selector ─────────────────────────────────────────────
  setupTopicSelector(selectorBarId) {
    const bar = document.getElementById(selectorBarId);
    if (!bar) return;

    bar.querySelectorAll('.topic-chip').forEach(chip => {
      chip.onclick = async () => {
        const topicId = chip.dataset.topicId;
        if (topicId && topicId !== this.topicData?.topicId) {
          await this.loadTopic(topicId);
        }
      };
    });
  }
}
