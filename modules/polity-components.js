/* ==========================================================================
   Polity UI Components (modules/polity-components.js)
   Reusable rendering components for all Polity sub-tabs.
   ========================================================================== */

import { addXP } from '../app.js';

export class HeroCard {
  constructor(containerId) {
    this.containerId = containerId;
  }
  render(data) {
    if (!data) return;
    const titleEl = document.querySelector(`#${this.containerId} .study-hero-title`);
    const descEl = document.querySelector(`#${this.containerId} .study-hero-desc`);
    const badgeEl = document.querySelector(`#${this.containerId} .study-hero-badge`);

    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.subtitle;
    if (badgeEl) badgeEl.textContent = `📚 POLITY — TOPIC MODULE`;

    const chipVals = document.querySelectorAll(`#${this.containerId} .study-hero-metrics .chip-val`);
    if (chipVals.length >= 4) {
      if (data.sscWeightage || data.weightage) chipVals[0].textContent = data.sscWeightage || data.weightage;
      if (data.expectedQuestions) chipVals[1].textContent = data.expectedQuestions;
      if (data.difficulty) chipVals[2].textContent = data.difficulty;
      if (data.estimatedReadingTime || data.readingTime) chipVals[3].textContent = `⏱️ ~${data.estimatedReadingTime || data.readingTime}`;
    }
  }
}

export class OverviewSection {
  constructor(containerId, subject = 'polity') {
    this.containerId = containerId;
    this.subject = subject;
  }
  render(data = {}) {
    const pane = document.getElementById(`${this.subject}-subtab-overview`);
    if (!pane) return;

    let html = '';

    if (data.hero?.whyItMatters || data.hero?.whyImportant) {
      html += `
        <div class="learning-card card-concept" style="margin-bottom: 20px;">
          <span class="learning-card-tag">💡 Why This Topic Matters in SSC CGL</span>
          <p style="font-size: 14px; line-height: 1.6; color: var(--text-main); margin-top: 6px;">${data.hero.whyItMatters || data.hero.whyImportant}</p>
        </div>
      `;
    }

    if (data.quickFacts && data.quickFacts.length > 0) {
      html += `
        <div class="quick-facts-section" style="margin-bottom: 24px;">
          <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 14px;">⚡ High-Yield Quick Facts</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 14px;">
            ${data.quickFacts.map(f => `
              <div class="glass-card" style="padding: 14px; border: 1px solid var(--border-glass); border-radius: var(--radius-md);">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                  <span style="font-size: 18px;">${f.icon || '📌'}</span>
                  <strong style="font-size: 12.5px; color: var(--accent-purple);">${f.heading || f.title || 'Fact'}</strong>
                </div>
                <p style="font-size: 13px; color: var(--text-main); margin: 0; line-height: 1.4;">${f.fact || f.description}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

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
                <p style="font-size: 12.5px; color: var(--text-secondary); margin-bottom: 8px; line-height: 1.4;">${p.majorContributions || p.contribution}</p>
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

    if (data.terms && data.terms.length > 0) {
      html += `
        <div class="terms-section" style="margin-bottom: 24px;">
          <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 14px;">📖 High-Yield Glossary &amp; Terms</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px;">
            ${data.terms.map(t => `
              <div class="glass-card" style="padding: 14px; border-radius: var(--radius-md);">
                <h5 style="font-size: 13.5px; font-weight: 700; color: var(--accent-cyan); margin: 0 0 4px 0;">${t.term}</h5>
                <p style="font-size: 12.5px; color: var(--text-secondary); margin: 0; line-height: 1.4;">${t.definition || t.meaning}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    pane.innerHTML = html || `<div style="padding: 24px; color: var(--text-muted); text-align: center;">Loading Overview...</div>`;
  }
}

export class ArticleExplorer {
  constructor(subject = 'polity') {
    this.subject = subject;
  }
  render(data = []) {
    const pane = document.getElementById(`${this.subject}-subtab-article-explorer`);
    if (!pane) return;
    
    const grid = document.getElementById(`${this.subject}-articles-explorer-grid`);
    if (!grid) return;

    if (!data || data.length === 0) {
      grid.innerHTML = `<div style="padding: 24px; color: var(--text-muted); text-align: center;">No articles available in this module.</div>`;
      return;
    }

    grid.innerHTML = data.map(art => `
      <div class="glass-card article-explorer-card" style="padding: 16px; border-radius: var(--radius-lg); cursor: pointer; transition: all 0.2s; border: 1px solid var(--border-glass);" 
           onclick="document.dispatchEvent(new CustomEvent('load-topic', {detail: '${art.topicId || 'article-' + art.article}'}))"
           onmouseover="this.style.borderColor='var(--accent-cyan)'; this.style.transform='translateY(-2px)'"
           onmouseout="this.style.borderColor='var(--border-glass)'; this.style.transform='translateY(0)'">
        
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
          <h3 style="font-size: 18px; font-weight: 800; color: var(--accent-cyan); margin: 0;">${art.article.startsWith('Article') ? art.article : 'Article ' + art.article}</h3>
          <span style="font-size: 11px; background: rgba(99,102,241,0.1); color: var(--accent-purple); padding: 4px 8px; border-radius: 12px; font-weight: 700;">
            ${art.difficulty || 'Medium'}
          </span>
        </div>
        
        <h4 style="font-size: 14.5px; font-weight: 700; color: var(--text-main); margin: 0 0 12px 0; line-height: 1.3;">${art.title}</h4>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 16px;">
          <div style="background: rgba(255,255,255,0.03); padding: 8px; border-radius: 6px;">
            <div style="font-size: 10px; color: var(--text-muted); text-transform: uppercase; margin-bottom: 2px;">SSC Weightage</div>
            <div style="font-size: 13px; color: var(--accent-pink); font-weight: 700;">${art.weightage || 'High'}</div>
          </div>
          <div style="background: rgba(255,255,255,0.03); padding: 8px; border-radius: 6px;">
            <div style="font-size: 10px; color: var(--text-muted); text-transform: uppercase; margin-bottom: 2px;">PYQs Asked</div>
            <div style="font-size: 13px; color: var(--accent-cyan); font-weight: 700;">${art.pyqCount || '5+'} Questions</div>
          </div>
        </div>
        
        <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-glass); padding-top: 12px; margin-top: auto;">
          <span style="font-size: 12px; color: var(--text-secondary);">${art.frequentlyAsked !== false ? '🔥 Frequently Asked' : '📚 Standard Study'}</span>
          <span style="font-size: 12px; color: var(--accent-cyan); font-weight: 600;">Read Deep Dive →</span>
        </div>
      </div>
    `).join('');
  }
}

export class NotesSection {
  constructor(subject = 'polity') {
    this.subject = subject;
  }
  render(data = {}) {
    const container = document.getElementById(`${this.subject}-notes-accordion-container`);
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
            ${(note.importantExamPoints || note.sscExamPoints) && (note.importantExamPoints || note.sscExamPoints).length > 0 ? `
              <div class="learning-card card-facts">
                <span class="learning-card-tag">📌 Important Exam Points</span>
                <ul style="margin: 0; padding-left: 20px;">${(note.importantExamPoints || note.sscExamPoints).map(p => `<li style="font-size: 13px;">${p}</li>`).join('')}</ul>
              </div>
            ` : ''}
            ${(note.commonStudentMistakes || note.commonMistakes) && (note.commonStudentMistakes || note.commonMistakes).length > 0 ? `
              <div class="learning-card card-trap">
                <span class="learning-card-tag">⚠️ Common Student Mistakes</span>
                <ul style="margin: 0; padding-left: 20px;">${(note.commonStudentMistakes || note.commonMistakes).map(m => `<li style="font-size: 13px; color:#f87171;">${m}</li>`).join('')}</ul>
              </div>
            ` : ''}
          </div>
        </div>
      `).join('');
    }

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

    if (data.examTraps && (data.examTraps.length > 0 || data.examTraps.traps)) {
      const traps = data.examTraps.traps || data.examTraps;
      html += `
        <div style="margin-top: 24px;">
          <h3 style="font-size: 16px; font-weight: 700; color: #f87171; margin-bottom: 14px;">⚠️ High-Frequency SSC Exam Traps</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${traps.map(t => `
              <div class="learning-card card-trap">
                <span class="learning-card-tag">⚠️ Trap: ${t.topic || t.confusedPair}</span>
                <p style="font-size: 13px; color: #f87171; margin: 4px 0;">❌ <strong>Common Mistake:</strong> ${t.trap || t.explanation}</p>
                ${t.correction ? `<p style="font-size: 13px; color: #34d399; margin: 0;">✅ <strong>Correct Concept:</strong> ${t.correction}</p>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (data.tables && data.tables.length > 0) {
      html += `
        <div style="margin-top: 24px;">
          <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 14px;">📊 Comparison &amp; Reference Tables</h3>
          ${data.tables.map(tbl => `
            <div class="glass-card" style="padding: 16px; margin-bottom: 16px; overflow-x: auto;">
              <h4 style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 12px;">${tbl.title || tbl.tableName}</h4>
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
}

export class TimelineSection {
  constructor(subject = 'polity') {
    this.subject = subject;
  }
  render(data = []) {
    const pane = document.getElementById(`${this.subject}-subtab-timeline`);
    if (!pane) return;

    if (!data || data.length === 0) {
      pane.innerHTML = `<div style="padding: 24px; color: var(--text-muted); text-align: center;">No visual timeline available for this topic.</div>`;
      return;
    }

    pane.innerHTML = `
      <div class="timeline-container">
        <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 16px;">⏱️ Topic Chronology</h3>
        <div style="display: flex; flex-direction: column; gap: 14px;">
          ${data.map(t => `
            <div class="timeline-event-card glass-card" style="padding: 16px; border-left: 4px solid var(--accent-purple);">
              <span style="font-size: 12px; font-weight: 700; color: var(--accent-purple);">${t.year}</span>
              <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main); margin: 4px 0;">${t.title}</h4>
              <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 6px; line-height: 1.5;">${t.shortDescription || t.description}</p>
              <span style="font-size: 11.5px; font-weight: 600; color: var(--text-muted);">🎯 Significance: ${t.importance}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

export class PYQSection {
  constructor(subject = 'polity', onSwitchToQuiz = null) {
    this.subject = subject;
    this.onSwitchToQuiz = onSwitchToQuiz;
  }
  render(data = {}, mcqsCount = 0) {
    const pane = document.getElementById(`${this.subject}-subtab-pyqs`);
    if (!pane) return;

    let html = '';
    const p = data.pyqAnalysis || data;

    if (p && (p.frequentlyTestedConcepts || p.repeatedThemes)) {
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

    const count = mcqsCount || (p.mcqs ? p.mcqs.length : 15);
    html += `
      <div style="padding: 24px; background: var(--bg-card); border-radius: var(--radius-lg); text-align: center;" class="glass-card">
        <h4 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 8px;">Authentic TCS Exam Questions (${count}+ Questions)</h4>
        <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;">Test your concept retention with interactive practice MCQs tailored for SSC CGL.</p>
        <button class="btn btn-primary" id="${this.subject}-jump-to-quiz" style="background: var(--grad-primary); font-weight: 700;">Switch to Practice Quiz 🎯</button>
      </div>
    `;

    pane.innerHTML = html;

    const jumpBtn = document.getElementById(`${this.subject}-jump-to-quiz`);
    if (jumpBtn && this.onSwitchToQuiz) {
      jumpBtn.onclick = () => this.onSwitchToQuiz();
    }
  }
}

export class QuizSection {
  constructor(subject = 'polity') {
    this.subject = subject;
    this.quizState = null;
  }
  render(mcqs = []) {
    const pane = document.getElementById(`${this.subject}-subtab-quiz`);
    if (!pane) return;

    if (!mcqs || mcqs.length === 0) {
      pane.innerHTML = `<div style="padding: 24px; color: var(--text-muted); text-align: center;">No MCQs available for this topic yet.</div>`;
      return;
    }

    this.quizState = {
      questions: mcqs,
      currentIdx: 0,
      answered: new Array(mcqs.length).fill(null),
      score: 0
    };

    this.renderQuestion(pane);
  }

  renderQuestion(pane) {
    const { questions, currentIdx, answered } = this.quizState;
    const q = questions[currentIdx];
    const progress = ((currentIdx + 1) / questions.length * 100).toFixed(0);

    const questionText = q.q || q.question;
    const options = q.options;
    const correctIdx = q.correctIdx !== undefined ? q.correctIdx : q.correctAnswer;
    const correctText = typeof correctIdx === 'number' ? options[correctIdx] : correctIdx;

    let html = `
      <div class="glass-card" style="padding: 20px;">
        <div style="height: 5px; background: rgba(255,255,255,0.08); border-radius: 10px; overflow: hidden; margin-bottom: 16px;">
          <div style="width: ${progress}%; height: 100%; background: var(--grad-primary); transition: width 0.3s;"></div>
        </div>

        <div style="display: flex; justify-content: space-between; font-size: 12.5px; margin-bottom: 12px;">
          <span style="color: var(--accent-purple); font-weight: 700;">Question ${currentIdx + 1} of ${questions.length}</span>
          <span style="color: var(--text-muted);">Tag: ${q.category || q.topicTag || 'General'}</span>
        </div>

        <h4 style="font-size: 15px; font-weight: 600; color: var(--text-main); margin-bottom: 16px; line-height: 1.5;">${questionText}</h4>

        <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px;">
          ${options.map((opt, idx) => {
            const userAnswer = answered[currentIdx];
            let style = 'text-align: left; width: 100%; border: 1px solid var(--border-glass); padding: 12px;';

            if (userAnswer !== null) {
              if (opt === correctText || idx === correctIdx) {
                style += ' background: rgba(16,185,129,0.18); border-color: rgba(16,185,129,0.4); color: #34d399;';
              } else if (userAnswer === opt || userAnswer === idx) {
                style += ' background: rgba(239,68,68,0.18); border-color: rgba(239,68,68,0.4); color: #f87171;';
              }
            }

            return `<button class="btn btn-secondary" data-opt-idx="${idx}" data-opt="${opt}" ${userAnswer !== null ? 'disabled' : ''} style="${style}">${opt}</button>`;
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

    pane.querySelectorAll('button[data-opt-idx]').forEach(btn => {
      btn.onclick = (e) => {
        const selectedOpt = e.currentTarget.dataset.opt;
        const selectedIdx = parseInt(e.currentTarget.dataset.optIdx, 10);
        this.quizState.answered[currentIdx] = selectedOpt;
        if (selectedOpt === correctText || selectedIdx === correctIdx) {
          this.quizState.score++;
          addXP(15, this.subject, 'Correct MCQ Answer');
        }
        this.renderQuestion(pane);
      };
    });

    const prevBtn = document.getElementById(`${this.subject}-quiz-prev`);
    const nextBtn = document.getElementById(`${this.subject}-quiz-next`);
    const finishBtn = document.getElementById(`${this.subject}-quiz-finish`);

    if (prevBtn) prevBtn.onclick = () => { this.quizState.currentIdx--; this.renderQuestion(pane); };
    if (nextBtn) nextBtn.onclick = () => { this.quizState.currentIdx++; this.renderQuestion(pane); };
    if (finishBtn) finishBtn.onclick = () => this.showResults(pane);
  }

  showResults(pane) {
    const { questions, score } = this.quizState;
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
      retryBtn.onclick = () => this.render(this.quizState.questions);
    }
  }
}

export class FlashcardSection {
  constructor(subject = 'polity') {
    this.subject = subject;
    this.cards = [];
    this.flashcardIdx = 0;
    this.flashcardFlipped = false;
  }
  render(cards = []) {
    const pane = document.getElementById(`${this.subject}-subtab-flashcards`);
    if (!pane) return;

    if (!cards || cards.length === 0) {
      pane.innerHTML = `<div style="padding: 24px; color: var(--text-muted); text-align: center;">No flashcards available for this topic yet.</div>`;
      return;
    }

    this.cards = cards;
    this.flashcardIdx = 0;
    this.flashcardFlipped = false;
    this.renderCard(pane);
  }

  renderCard(pane) {
    const card = this.cards[this.flashcardIdx];
    const total = this.cards.length;

    pane.innerHTML = `
      <div>
        <div style="text-align: center; font-size: 12px; color: var(--text-muted); margin-bottom: 12px;">
          Card ${this.flashcardIdx + 1} of ${total} — Click card to flip
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
            ${this.cards.map((_, i) => `
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

    if (fcBox) fcBox.onclick = () => { this.flashcardFlipped = !this.flashcardFlipped; this.renderCard(pane); };
    if (prevBtn) prevBtn.onclick = () => { this.flashcardFlipped = false; this.flashcardIdx--; this.renderCard(pane); };
    if (nextBtn) nextBtn.onclick = () => { this.flashcardFlipped = false; this.flashcardIdx++; this.renderCard(pane); };
  }
}

export class MindMapSection {
  constructor(subject = 'polity') {
    this.subject = subject;
  }
  render(data = {}) {
    const pane = document.getElementById(`${this.subject}-subtab-mindmaps`);
    if (!pane) return;

    const centerTopic = data.hero?.title || 'Topic Mind Map';
    const branches = [];

    if (data.quickFacts && data.quickFacts.length > 0) {
      branches.push({
        label: '⚡ Key Facts',
        color: 'var(--accent-purple)',
        children: data.quickFacts.slice(0, 5).map(f => `${f.icon || '📌'} ${f.heading || f.title || f.fact}`)
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

    if (data.articleExplorer && data.articleExplorer.length > 0) {
      branches.push({
        label: '📜 Key Articles',
        color: 'var(--accent-emerald)',
        children: data.articleExplorer.slice(0, 5).map(a => `${a.article}: ${a.title}`)
      });
    }

    pane.innerHTML = `
      <div>
        <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 16px;">🧠 Interactive Mind Map: ${centerTopic}</h3>

        <div style="display: flex; justify-content: center; margin-bottom: 24px;">
          <div style="padding: 16px 24px; background: var(--grad-primary); border-radius: var(--radius-xl); font-size: 16px; font-weight: 800; color: #fff; text-align: center; max-width: 320px; box-shadow: 0 8px 24px rgba(99,102,241,0.3);">
            ${centerTopic}
          </div>
        </div>

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
      </div>
    `;
  }
}

export class RevisionSection {
  constructor(subject = 'polity') {
    this.subject = subject;
  }
  render(data = {}) {
    const pane = document.getElementById(`${this.subject}-subtab-revisionsheet`);
    if (!pane) return;

    let html = '';
    const revSheet = data.revisionSheet?.points || data.revisionSheet || [];

    if (revSheet.length > 0) {
      html += `
        <div class="glass-card" style="padding: 20px; border: 1px solid var(--accent-emerald); margin-bottom: 20px;">
          <h3 style="font-size: 16px; font-weight: 700; color: var(--accent-emerald); margin-bottom: 14px;">📝 1-Page Exam Cheat Sheet</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 10px;">
            ${revSheet.map(s => `<div style="padding: 8px 12px; background: rgba(16,185,129,0.06); border-radius: 6px; font-size: 12.5px; color: var(--text-main);">${s}</div>`).join('')}
          </div>
        </div>
      `;
    }

    if (data.quickFacts && data.quickFacts.length > 0) {
      html += `
        <div>
          <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 14px;">⚡ High-Yield Exam Points</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${data.quickFacts.map(p => `
              <div class="glass-card" style="padding: 10px 14px; font-size: 13px; color: var(--text-main); display: flex; align-items: center; gap: 8px;">
                <span>🔹</span><span><strong>${p.heading || p.title || ''}:</strong> ${p.fact || p.description}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    pane.innerHTML = html || `<div style="padding: 24px; color: var(--text-muted); text-align: center;">No revision sheet available for this topic yet.</div>`;
  }
}

export class FilesSection {
  constructor(subject = 'polity') {
    this.subject = subject;
  }
  render(hero = {}) {
    const pane = document.getElementById(`${this.subject}-subtab-files`);
    if (!pane) return;

    pane.innerHTML = `
      <div>
        <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 16px;">📁 Study Files for ${hero.title || 'Polity Module'}</h3>

        <div class="glass-card" style="padding: 24px; text-align: center; margin-bottom: 16px; border: 2px dashed rgba(255,255,255,0.08);">
          <div style="font-size: 36px; margin-bottom: 8px;">📤</div>
          <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main); margin-bottom: 8px;">Upload Your Study Notes</h4>
          <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;">Upload PDFs, images, or notes to organize your personal study materials for this topic.</p>
          <button class="btn btn-primary" onclick="document.getElementById('nav-uploads')?.click()">
            📤 Go to Study Files
          </button>
        </div>

        <div class="glass-card" style="padding: 16px;">
          <h4 style="font-size: 14px; font-weight: 700; color: var(--accent-purple); margin-bottom: 12px;">📚 Recommended Standard Resources</h4>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <div style="display: flex; align-items: center; gap: 12px; padding: 10px; background: rgba(255,255,255,0.03); border-radius: var(--radius-md);">
              <span style="font-size: 20px;">📘</span>
              <div>
                <div style="font-size: 13px; font-weight: 700; color: var(--text-main);">M. Laxmikanth — Indian Polity</div>
                <div style="font-size: 11.5px; color: var(--text-muted);">Chapters on DPSPs (Part IV) &amp; Fundamental Duties (Part IVA)</div>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 12px; padding: 10px; background: rgba(255,255,255,0.03); border-radius: var(--radius-md);">
              <span style="font-size: 20px;">📗</span>
              <div>
                <div style="font-size: 13px; font-weight: 700; color: var(--text-main);">NCERT Class 11 — Indian Constitution at Work</div>
                <div style="font-size: 11.5px; color: var(--text-muted);">Chapter 2: Rights in the Indian Constitution</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

export class AnalyticsSection {
  constructor(subject = 'polity') {
    this.subject = subject;
  }
  render(data = {}) {
    const pane = document.getElementById(`${this.subject}-subtab-analytics`);
    if (!pane) return;

    const topicTitle = data.hero?.title || 'This Topic';
    const totalMCQs = data.mcqs?.length || 15;
    const totalFlashcards = data.flashcards?.length || 12;
    const totalNotes = data.notes?.length || 8;
    const totalArticles = data.articleExplorer?.length || 20;

    pane.innerHTML = `
      <div>
        <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 16px;">📈 Topic Analytics: ${topicTitle}</h3>

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
            <div style="font-size: 28px; font-weight: 800; color: var(--accent-emerald);">${totalArticles}</div>
            <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Articles Covered</div>
          </div>
        </div>

        <div class="glass-card" style="padding: 20px; border-radius: var(--radius-lg);">
          <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main); margin-bottom: 12px;">📊 Completion Status</h4>
          <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5;">You are actively progressing through this module. Keep solving practice quizzes and reviewing flashcards to boost your mastery index!</p>
        </div>
      </div>
    `;
  }
}
