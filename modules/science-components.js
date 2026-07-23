/* ==========================================================================
   Science UI Components (modules/science-components.js)
   Modular, reusable rendering components for Science Lab.
   Each component receives ONLY its own section data and supports Loading,
   Empty, and Error states.
   ========================================================================== */

import { addXP } from '../app.js';

// Helper for Rendering Standard Section Headers
function createSectionHeader(title, icon = '🔬') {
  return `
    <div class="notes-section-header" style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
      <span style="font-size: 20px;">${icon}</span>
      <h3 style="font-size: 17px; font-weight: 700; color: var(--text-main); margin: 0;">${title}</h3>
    </div>
  `;
}

// Helper for Error & Loading states
function createLoadingSkeleton() {
  return `
    <div class="glass-card loading-skeleton" style="padding: 20px; border-radius: var(--radius-lg); opacity: 0.6;">
      <div style="height: 20px; width: 40%; background: rgba(255,255,255,0.1); border-radius: 4px; margin-bottom: 12px;" class="animated-pulse"></div>
      <div style="height: 14px; width: 80%; background: rgba(255,255,255,0.06); border-radius: 4px; margin-bottom: 8px;" class="animated-pulse"></div>
      <div style="height: 14px; width: 60%; background: rgba(255,255,255,0.06); border-radius: 4px;" class="animated-pulse"></div>
    </div>
  `;
}

function createErrorState(sectionName = 'Section') {
  return `
    <div class="glass-card error-state" style="padding: 16px; border-radius: var(--radius-md); border: 1px dashed rgba(239, 68, 68, 0.4); background: rgba(239, 68, 68, 0.05);">
      <p style="font-size: 13px; color: #f87171; margin: 0; display: flex; align-items: center; gap: 8px;">
        ⚠️ Failed to load ${sectionName} content. The rest of the page remains fully operational.
      </p>
    </div>
  `;
}

// 1. HeroCard Component
export class HeroCard {
  constructor(containerId = 'view-science') {
    this.containerId = containerId;
  }

  render(data, state = {}) {
    const container = document.getElementById('science-hero-card-container') || document.querySelector(`#${this.containerId} .study-hero`);
    if (!container) return;

    if (state.loading) {
      container.innerHTML = createLoadingSkeleton();
      return;
    }
    if (state.error || !data) {
      container.innerHTML = createErrorState('Hero');
      return;
    }

    container.innerHTML = `
      <div class="study-hero-top">
        <div>
          <div class="study-hero-badge">${data.badge || '🔬 SCIENCE LAB'}</div>
          <h2 class="study-hero-title">${data.title || 'General Science — Cell Structure & Cytology'}</h2>
          <p class="study-hero-desc">${data.subtitle || data.whyItMatters || 'Master cell structure, organelle functions, and SSC CGL repeated questions.'}</p>
        </div>
        <div class="study-hero-actions">
          <button class="btn btn-primary" id="btn-science-diagram-cta">🔬 Interactive Diagram</button>
          <button class="btn btn-secondary" id="btn-science-quiz-cta">🎯 Topic Quiz</button>
        </div>
      </div>

      <div class="study-hero-metrics">
        <div class="study-metric-chip chip-importance">
          <span class="chip-label">SSC Weightage</span>
          <span class="chip-val">⭐⭐⭐⭐⭐ ${data.weightage || 'High'}</span>
        </div>
        <div class="study-metric-chip chip-questions">
          <span class="chip-label">Expected Questions</span>
          <span class="chip-val">${data.expectedQuestions || '2–3 Qs'}</span>
        </div>
        <div class="study-metric-chip chip-difficulty">
          <span class="chip-label">Difficulty</span>
          <span class="chip-val">${data.difficulty || 'Medium'}</span>
        </div>
        <div class="study-metric-chip chip-time">
          <span class="chip-label">Reading Time</span>
          <span class="chip-val">⏱️ ${data.estimatedReadingTime || '~40 mins'}</span>
        </div>
        <div class="study-metric-chip chip-progress">
          <span class="chip-label">Chapter Progress</span>
          <div class="study-hero-bar-wrap">
            <div class="study-hero-bar" id="science-hero-bar" style="width: 0%"></div>
          </div>
          <span class="chip-pct" id="science-hero-pct">0%</span>
        </div>
      </div>
    `;
  }
}

// 2. OverviewSection Component
export class OverviewSection {
  constructor(containerId = 'view-science') {
    this.containerId = containerId;
  }

  render(data, quickFactsData, state = {}) {
    const overviewContainer = document.getElementById('science-overview-container');
    const qfContainer = document.getElementById('science-quick-facts-container');

    if (state.loading) {
      if (overviewContainer) overviewContainer.innerHTML = createLoadingSkeleton();
      return;
    }
    if (state.error) {
      if (overviewContainer) overviewContainer.innerHTML = createErrorState('Overview');
      return;
    }

    if (overviewContainer && data) {
      overviewContainer.innerHTML = `
        <div class="glass-card" style="padding: 20px; border-radius: var(--radius-lg); margin-bottom: 20px;">
          ${createSectionHeader(data.heading || 'Module Overview: Cell Biology', '🔬')}
          <p style="font-size: 14px; line-height: 1.6; color: var(--text-main); margin-bottom: 16px;">
            ${data.description}
          </p>
          ${data.learningOutcomes && Array.isArray(data.learningOutcomes) ? `
            <div style="background: rgba(99, 102, 241, 0.08); border-left: 3px solid var(--accent-purple); padding: 12px 16px; border-radius: 0 var(--radius-md) var(--radius-md) 0;">
              <h4 style="font-size: 13px; font-weight: 700; color: var(--accent-purple); margin-bottom: 6px;">🎯 Key Learning Outcomes</h4>
              <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: var(--text-secondary); line-height: 1.5;">
                ${data.learningOutcomes.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </div>
      `;
    }

    // Render Quick Facts
    if (qfContainer && quickFactsData && Array.isArray(quickFactsData)) {
      let html = `
        <div class="quick-facts-section" style="margin-bottom: 24px;">
          <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 14px;">⚡ High-Yield Quick Facts</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 14px;">
            ${quickFactsData.map(f => `
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
      qfContainer.innerHTML = html;
    }
  }
}

// 3. InteractiveDiagram Component (Generic & Dynamic)
export class InteractiveDiagram {
  constructor() {
    this.selectedPartId = null;
  }

  render(data, state = {}) {
    const labelsContainer = document.getElementById('diagram-labels');
    const diagramImg = document.querySelector('.science-diagram');
    const promptEl = document.querySelector('#science-info-panel .empty-prompt');
    const contentEl = document.getElementById('science-info-content');

    if (state.loading) {
      if (labelsContainer) labelsContainer.innerHTML = `<div style="padding: 10px; color: var(--text-secondary);">Loading diagram labels...</div>`;
      return;
    }

    if (state.error || !data) {
      if (state.error && labelsContainer) {
        labelsContainer.innerHTML = createErrorState('Interactive Diagram');
      }
      return;
    }

    if (diagramImg && data.image) {
      diagramImg.src = data.image;
      if (data.title) diagramImg.alt = data.title;
    }

    if (labelsContainer && Array.isArray(data.labels)) {
      let labelsHtml = '';
      data.labels.forEach(label => {
        const topPos = label.y !== undefined ? `${label.y}%` : (label.top || '30%');
        const leftPos = label.x !== undefined ? `${label.x}%` : (label.left || '45%');
        const displayName = label.name ? label.name.split(' (')[0] : (label.id || 'Label');
        
        labelsHtml += `
          <button class="diagram-label-btn ${this.selectedPartId === label.id ? 'active' : ''}" 
                  style="top: ${topPos}; left: ${leftPos};" 
                  data-part-id="${label.id}">
            ${displayName}
          </button>
        `;
      });
      labelsContainer.innerHTML = labelsHtml;

      // Attach dynamic click listeners
      labelsContainer.querySelectorAll('.diagram-label-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const partId = btn.dataset.partId;
          const labelObj = data.labels.find(l => l.id === partId);
          if (labelObj) {
            this.selectedPartId = partId;
            labelsContainer.querySelectorAll('.diagram-label-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            this.updateInfoPanel(labelObj);
            addXP(10, 'science', `Inspected ${labelObj.name || partId}`);
          }
        });
      });
    }
  }

  updateInfoPanel(labelObj) {
    const promptEl = document.querySelector('#science-info-panel .empty-prompt');
    const contentEl = document.getElementById('science-info-content');

    if (!labelObj) {
      if (promptEl) promptEl.classList.remove('hidden');
      if (contentEl) contentEl.classList.add('hidden');
      return;
    }

    if (promptEl) promptEl.classList.add('hidden');
    if (contentEl) contentEl.classList.remove('hidden');

    const nameEl = document.getElementById('organelle-name');
    const descEl = document.getElementById('organelle-desc');
    const funcsList = document.getElementById('organelle-funcs');
    const sscEl = document.getElementById('organelle-ssc');

    if (nameEl) nameEl.textContent = labelObj.name || labelObj.title || labelObj.id;
    if (descEl) descEl.textContent = labelObj.desc || labelObj.description || 'No description available.';

    if (funcsList) {
      funcsList.innerHTML = '';
      const funcs = labelObj.funcs || labelObj.keyFunctions || labelObj.functions || [];
      if (Array.isArray(funcs) && funcs.length > 0) {
        funcs.forEach(f => {
          const li = document.createElement('li');
          li.textContent = f;
          funcsList.appendChild(li);
        });
      } else {
        funcsList.innerHTML = '<li>General organelle structural unit.</li>';
      }
    }

    if (sscEl) {
      sscEl.textContent = labelObj.sscHighlights || labelObj.examHighlights || labelObj.notes || 'High-yield exam topic for General Science.';
    }
  }
}

// 4. ConceptExplorer Component (Concept Cards & Terminology)
export class ConceptExplorer {
  render(cardsData, termsData, containerEl, state = {}) {
    if (!containerEl) return;
    if (state.loading) {
      containerEl.innerHTML = createLoadingSkeleton();
      return;
    }
    if (state.error) {
      containerEl.innerHTML = createErrorState('Concept Explorer');
      return;
    }

    let html = '';

    if (Array.isArray(cardsData) && cardsData.length > 0) {
      html += `
        <div class="concept-cards-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; margin-bottom: 24px;">
          ${cardsData.map(c => `
            <div class="glass-card card-concept" style="padding: 16px; border-radius: var(--radius-lg);">
              <span class="learning-card-tag" style="font-size: 11px; background: rgba(16, 185, 129, 0.15); color: #10b981; padding: 3px 8px; border-radius: 4px; font-weight: 700;">${c.tag || 'Concept'}</span>
              <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main); margin: 8px 0 6px 0;">${c.title}</h4>
              <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 8px;">${c.summary || c.description}</p>
              ${Array.isArray(c.points) ? `
                <ul style="margin: 0; padding-left: 18px; font-size: 12.5px; color: var(--text-main);">
                  ${c.points.map(p => `<li style="margin-bottom: 4px;">${p}</li>`).join('')}
                </ul>
              ` : ''}
            </div>
          `).join('')}
        </div>
      `;
    }

    if (Array.isArray(termsData) && termsData.length > 0) {
      html += `
        <div class="terms-section" style="margin-bottom: 24px;">
          ${createSectionHeader('Key Terminology & Glossary', '📖')}
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px;">
            ${termsData.map(t => `
              <div class="glass-card" style="padding: 12px; border-radius: var(--radius-md);">
                <strong style="font-size: 13px; color: var(--accent-teal); display: block; margin-bottom: 4px;">${t.term}</strong>
                <span style="font-size: 12.5px; color: var(--text-secondary); line-height: 1.4; display: block;">${t.meaning || t.definition}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    containerEl.innerHTML = html;
  }
}

// 5. StudyNotes Component
export class StudyNotes {
  render(data, containerEl, state = {}) {
    if (!containerEl) return;
    if (state.loading) {
      containerEl.innerHTML = createLoadingSkeleton();
      return;
    }
    if (state.error) {
      containerEl.innerHTML = createErrorState('Study Notes');
      return;
    }
    if (!Array.isArray(data) || data.length === 0) return;

    let html = `
      <div class="notes-hero-banner" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(99, 102, 241, 0.08) 100%); border-color: rgba(16, 185, 129, 0.25); padding: 18px; border-radius: var(--radius-lg); margin-bottom: 20px;">
        <div style="display: flex; align-items: center; gap: 14px;">
          <div style="font-size: 28px;">🔬</div>
          <div>
            <h2 style="font-size: 18px; font-weight: 700; color: var(--text-main); margin: 0;">General Science — Structured Notes</h2>
            <p style="font-size: 13px; color: var(--text-secondary); margin: 4px 0 0 0;">Exam-oriented concepts, discoveries, and SSC CGL repeated pointers.</p>
          </div>
        </div>
      </div>
    `;

    data.forEach(sec => {
      html += `
        <div class="notes-section" style="margin-bottom: 20px; padding: 18px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); border-radius: var(--radius-lg);">
          <div class="notes-section-header" style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
            <span style="font-size: 20px;">${sec.icon || '📌'}</span>
            <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin: 0;">${sec.title}</h3>
          </div>
          <div class="notes-section-body" style="font-size: 13.5px; color: var(--text-main); line-height: 1.6;">
            ${sec.content || sec.explanation || ''}
          </div>
        </div>
      `;
    });

    containerEl.innerHTML = html;
  }
}

// 6. ComparisonTables Component
export class ComparisonTables {
  render(data, containerEl, state = {}) {
    if (!containerEl) return;
    if (state.loading) {
      containerEl.innerHTML = createLoadingSkeleton();
      return;
    }
    if (state.error) {
      containerEl.innerHTML = createErrorState('Comparison Tables');
      return;
    }
    if (!Array.isArray(data) || data.length === 0) return;

    let html = '';
    data.forEach(table => {
      html += `
        <div class="comparison-table-wrap" style="margin-bottom: 24px;">
          ${createSectionHeader(table.title || 'Comparison Table', '📊')}
          <div style="overflow-x: auto; background: rgba(0,0,0,0.2); border-radius: var(--radius-md); border: 1px solid var(--border-glass);">
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px;">
              <thead>
                <tr style="background: rgba(16, 185, 129, 0.15); color: #10b981;">
                  ${table.headers.map(h => `<th style="padding: 10px 14px; border-bottom: 1px solid var(--border-glass);">${h}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${table.rows.map(row => `
                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    ${row.map(cell => `<td style="padding: 10px 14px; color: var(--text-main);">${cell}</td>`).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    });

    containerEl.innerHTML = html;
  }
}

// 7. ProcessFlow Component
export class ProcessFlow {
  render(data, containerEl, state = {}) {
    if (!containerEl) return;
    if (state.loading) {
      containerEl.innerHTML = createLoadingSkeleton();
      return;
    }
    if (state.error) {
      containerEl.innerHTML = createErrorState('Process Flow');
      return;
    }
    if (!Array.isArray(data) || data.length === 0) return;

    let html = '';
    data.forEach(flow => {
      html += `
        <div class="process-flow-card glass-card" style="padding: 18px; border-radius: var(--radius-lg); margin-bottom: 24px;">
          ${createSectionHeader(flow.title || 'Biological Process Flow', '🔄')}
          <div class="flow-steps" style="display: flex; flex-direction: column; gap: 10px; margin-top: 12px;">
            ${flow.steps.map((step, idx) => `
              <div style="display: flex; align-items: flex-start; gap: 12px; padding: 10px 14px; background: rgba(255,255,255,0.03); border-radius: var(--radius-md); border-left: 3px solid #10b981;">
                <span style="font-weight: 700; font-size: 13px; color: #10b981;">#${idx + 1}</span>
                <span style="font-size: 13px; color: var(--text-main); line-height: 1.4;">${step}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    });

    containerEl.innerHTML = html;
  }
}

// 8. ExamTraps Component
export class ExamTraps {
  render(data, containerEl, state = {}) {
    if (!containerEl) return;
    if (state.loading) {
      containerEl.innerHTML = createLoadingSkeleton();
      return;
    }
    if (state.error) {
      containerEl.innerHTML = createErrorState('Exam Traps');
      return;
    }
    if (!Array.isArray(data) || data.length === 0) return;

    let html = `
      <div class="exam-traps-section" style="margin-bottom: 24px;">
        ${createSectionHeader('⚠️ Common Exam Traps & Student Mistakes', '🚨')}
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${data.map(trap => `
            <div class="glass-card" style="padding: 16px; border-radius: var(--radius-md); border-left: 4px solid #f59e0b;">
              <div style="font-size: 13px; color: #f59e0b; font-weight: 700; margin-bottom: 4px;">❌ Confusing Concept:</div>
              <p style="font-size: 13px; color: var(--text-main); margin: 0 0 8px 0; line-height: 1.4;">${trap.confusion}</p>
              <div style="font-size: 13px; color: #10b981; font-weight: 700; margin-bottom: 4px;">✅ Correct Exam Concept:</div>
              <p style="font-size: 13px; color: var(--text-main); margin: 0 0 8px 0; line-height: 1.4;">${trap.correctConcept}</p>
              ${trap.memoryTrick ? `
                <div style="background: rgba(99,102,241,0.1); padding: 6px 10px; border-radius: 6px; font-size: 12px; color: var(--accent-purple); font-weight: 600;">
                  💡 Memory Trick: ${trap.memoryTrick}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;

    containerEl.innerHTML = html;
  }
}

// 9. Flashcards Component
export class Flashcards {
  constructor() {
    this.currentIdx = 0;
    this.isFlipped = false;
  }

  render(data, containerEl, state = {}) {
    if (!containerEl) return;
    if (state.loading) {
      containerEl.innerHTML = createLoadingSkeleton();
      return;
    }
    if (state.error) {
      containerEl.innerHTML = createErrorState('Flashcards');
      return;
    }
    if (!Array.isArray(data) || data.length === 0) return;

    const currentCard = data[this.currentIdx];

    let html = `
      <div class="flashcards-wrapper glass-card" style="padding: 24px; text-align: center; border-radius: var(--radius-xl); max-width: 600px; margin: 0 auto 24px auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <span style="font-size: 13px; font-weight: 700; color: var(--accent-teal);">🃏 Science Flashcard</span>
          <span style="font-size: 12px; color: var(--text-secondary);">${this.currentIdx + 1} / ${data.length}</span>
        </div>

        <div id="science-flashcard-inner" 
             style="min-height: 160px; padding: 20px; background: rgba(255,255,255,0.04); border: 1px solid var(--border-glass); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.3s ease;">
          <div style="font-size: 15px; font-weight: 600; color: var(--text-main); line-height: 1.5;">
            ${this.isFlipped ? `<span style="color: #10b981;">💡 ${currentCard.back}</span>` : `❓ ${currentCard.front}`}
          </div>
        </div>
        <p style="font-size: 11.5px; color: var(--text-secondary); margin: 8px 0 16px 0;">Click card to flip</p>

        <div style="display: flex; gap: 12px; justify-content: center;">
          <button class="btn btn-secondary" id="sci-fc-prev" ${this.currentIdx === 0 ? 'disabled' : ''}>← Previous</button>
          <button class="btn btn-primary" id="sci-fc-next" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">${this.currentIdx === data.length - 1 ? 'Finish' : 'Next →'}</button>
        </div>
      </div>
    `;

    containerEl.innerHTML = html;

    const cardEl = containerEl.querySelector('#science-flashcard-inner');
    if (cardEl) {
      cardEl.addEventListener('click', () => {
        this.isFlipped = !this.isFlipped;
        this.render(data, containerEl, state);
      });
    }

    const prevBtn = containerEl.querySelector('#sci-fc-prev');
    const nextBtn = containerEl.querySelector('#sci-fc-next');

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.currentIdx > 0) {
          this.currentIdx--;
          this.isFlipped = false;
          this.render(data, containerEl, state);
        }
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.currentIdx < data.length - 1) {
          this.currentIdx++;
          this.isFlipped = false;
          this.render(data, containerEl, state);
          addXP(5, 'science', 'Reviewed flashcard');
        }
      });
    }
  }
}

// 10. PracticeQuiz Component
export class PracticeQuiz {
  constructor() {
    this.currentIdx = 0;
    this.score = 0;
    this.userAnswers = [];
  }

  render(mcqsData, pyqData, containerEl, state = {}) {
    if (!containerEl) return;
    if (state.loading) {
      containerEl.innerHTML = createLoadingSkeleton();
      return;
    }
    if (state.error) {
      containerEl.innerHTML = createErrorState('Practice Quiz');
      return;
    }

    const questions = Array.isArray(mcqsData) && mcqsData.length > 0 ? mcqsData : [];
    if (questions.length === 0) return;

    const q = questions[this.currentIdx];
    const progress = (((this.currentIdx + 1) / questions.length) * 100).toFixed(0);

    let html = `
      <div class="quiz-container glass-card" style="padding: 20px; border-radius: var(--radius-xl); margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span style="font-size: 13px; font-weight: 700; color: #10b981;">📝 Practice MCQ Quiz</span>
          <span style="font-size: 12px; color: var(--text-secondary);">Question ${this.currentIdx + 1} of ${questions.length}</span>
        </div>

        <div style="height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; margin-bottom: 16px; overflow: hidden;">
          <div style="width: ${progress}%; height: 100%; background: #10b981; transition: width 0.3s ease;"></div>
        </div>

        <div style="font-size: 15px; font-weight: 600; color: var(--text-main); margin-bottom: 16px; line-height: 1.5;">
          ${q.question}
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px;">
          ${q.options.map((opt, idx) => {
            const answered = this.userAnswers[this.currentIdx];
            let optStyle = 'padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid var(--border-glass); background: rgba(255,255,255,0.03); color: var(--text-main); font-size: 13px; text-align: left; cursor: pointer; transition: all 0.2s ease;';
            let icon = '';

            if (answered !== undefined) {
              if (opt === q.correctAnswer || idx === q.correctIdx) {
                optStyle += ' background: rgba(16, 185, 129, 0.2); border-color: #10b981; color: #10b981; font-weight: 700;';
                icon = ' ✅';
              } else if (answered === idx || answered === opt) {
                optStyle += ' background: rgba(239, 68, 68, 0.2); border-color: #ef4444; color: #f87171;';
                icon = ' ❌';
              }
            }

            return `
              <button class="quiz-opt-btn" data-opt-idx="${idx}" data-opt-val="${opt}" style="${optStyle}" ${answered !== undefined ? 'disabled' : ''}>
                ${opt}${icon}
              </button>
            `;
          }).join('')}
        </div>

        ${this.userAnswers[this.currentIdx] !== undefined ? `
          <div style="padding: 12px; background: rgba(16, 185, 129, 0.08); border-left: 3px solid #10b981; border-radius: 4px; font-size: 12.5px; color: var(--text-main); margin-bottom: 16px;">
            💡 <strong>Explanation:</strong> ${q.explanation || 'Option ' + q.correctAnswer + ' is correct.'}
          </div>
        ` : ''}

        <div style="display: flex; justify-content: space-between;">
          <button class="btn btn-secondary" id="sci-quiz-prev" ${this.currentIdx === 0 ? 'disabled' : ''}>← Previous</button>
          <button class="btn btn-primary" id="sci-quiz-next" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
            ${this.currentIdx === questions.length - 1 ? 'Finish Quiz 🏆' : 'Next Question →'}
          </button>
        </div>
      </div>
    `;

    containerEl.innerHTML = html;

    containerEl.querySelectorAll('.quiz-opt-btn:not([disabled])').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const val = e.currentTarget.dataset.optVal;
        const idx = parseInt(e.currentTarget.dataset.optIdx);
        this.userAnswers[this.currentIdx] = val;
        if (val === q.correctAnswer || idx === q.correctIdx) {
          this.score++;
          addXP(15, 'science', 'Correct quiz answer');
        }
        this.render(mcqsData, pyqData, containerEl, state);
      });
    });

    const prevBtn = containerEl.querySelector('#sci-quiz-prev');
    const nextBtn = containerEl.querySelector('#sci-quiz-next');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.currentIdx > 0) {
          this.currentIdx--;
          this.render(mcqsData, pyqData, containerEl, state);
        }
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.currentIdx < questions.length - 1) {
          this.currentIdx++;
          this.render(mcqsData, pyqData, containerEl, state);
        } else {
          alert(`Quiz Completed! Score: ${this.score} / ${questions.length}`);
        }
      });
    }
  }
}

// 11. RevisionSection Component
export class RevisionSection {
  render(data, containerEl, state = {}) {
    if (!containerEl) return;
    if (state.loading) {
      containerEl.innerHTML = createLoadingSkeleton();
      return;
    }
    if (state.error) {
      containerEl.innerHTML = createErrorState('Revision Points');
      return;
    }
    if (!Array.isArray(data) || data.length === 0) return;

    let html = `
      <div class="revision-sheet-card glass-card" style="padding: 20px; border-radius: var(--radius-xl); margin-bottom: 24px;">
        ${createSectionHeader('⚡ Rapid Revision Sheet', '🚀')}
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 10px; margin-top: 12px;">
          ${data.map((point, idx) => `
            <div style="padding: 10px 14px; background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.15); border-radius: var(--radius-md); font-size: 13px; color: var(--text-main); line-height: 1.4;">
              <span style="color: #10b981; font-weight: 700; margin-right: 6px;">#${idx + 1}</span> ${point}
            </div>
          `).join('')}
        </div>
      </div>
    `;

    containerEl.innerHTML = html;
  }
}

// 12. MindMap Component
export class MindMap {
  render(data, containerEl, state = {}) {
    if (!containerEl) return;
    if (state.loading) {
      containerEl.innerHTML = createLoadingSkeleton();
      return;
    }
    if (state.error) {
      containerEl.innerHTML = createErrorState('Mind Map');
      return;
    }
    if (!data || !Array.isArray(data.nodes)) return;

    let html = `
      <div class="mindmap-wrapper glass-card" style="padding: 20px; border-radius: var(--radius-xl); margin-bottom: 24px;">
        ${createSectionHeader(data.title || 'Science Concept Mind Map', '🧠')}
        <div style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; margin-top: 14px;">
          ${data.nodes.map(n => `
            <div style="padding: 10px 16px; border-radius: 20px; background: ${n.type === 'root' ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(255,255,255,0.06)'}; color: var(--text-main); font-size: 13px; font-weight: 600; border: 1px solid var(--border-glass);">
              ${n.label}
            </div>
          `).join('')}
        </div>
      </div>
    `;

    containerEl.innerHTML = html;
  }
}

// 13. StudyFiles Component
export class StudyFiles {
  render(data, containerEl, state = {}) {
    if (!containerEl) return;
    if (state.loading) {
      containerEl.innerHTML = createLoadingSkeleton();
      return;
    }
    if (state.error) {
      containerEl.innerHTML = createErrorState('Study Files');
      return;
    }
    if (!Array.isArray(data) || data.length === 0) return;

    let html = `
      <div class="study-files-wrapper glass-card" style="padding: 20px; border-radius: var(--radius-xl); margin-bottom: 24px;">
        ${createSectionHeader('📁 Study Files & Downloadable Resources', '📄')}
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; margin-top: 12px;">
          ${data.map(f => `
            <div class="glass-card" style="padding: 12px 16px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between;">
              <div>
                <strong style="font-size: 13px; color: var(--text-main); display: block;">${f.name}</strong>
                <span style="font-size: 11px; color: var(--text-secondary);">${f.size || 'PDF Document'}</span>
              </div>
              <a href="${f.downloadUrl || '#'}" class="btn btn-secondary" style="font-size: 12px; padding: 4px 10px;" onclick="event.preventDefault(); alert('Downloading ${f.name}...');">Download</a>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    containerEl.innerHTML = html;
  }
}

// 14. RelatedTopics Component
export class RelatedTopics {
  render(data, containerEl, state = {}) {
    if (!containerEl) return;
    if (state.loading) {
      containerEl.innerHTML = createLoadingSkeleton();
      return;
    }
    if (state.error) {
      containerEl.innerHTML = createErrorState('Related Topics');
      return;
    }
    if (!data) return;

    let html = `
      <div class="related-topics-card glass-card" style="padding: 20px; border-radius: var(--radius-xl); margin-bottom: 24px;">
        ${createSectionHeader('🔗 Related Topics & Prerequisites', '🧭')}
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; margin-top: 12px;">
          ${Array.isArray(data.prerequisites) ? `
            <div>
              <h5 style="font-size: 12.5px; color: var(--accent-purple); margin: 0 0 8px 0; font-weight: 700;">Prerequisites:</h5>
              <ul style="margin: 0; padding-left: 16px; font-size: 12.5px; color: var(--text-secondary);">
                ${data.prerequisites.map(p => `<li>${p}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          ${Array.isArray(data.nextSteps) ? `
            <div>
              <h5 style="font-size: 12.5px; color: #10b981; margin: 0 0 8px 0; font-weight: 700;">Next Learning Steps:</h5>
              <ul style="margin: 0; padding-left: 16px; font-size: 12.5px; color: var(--text-secondary);">
                ${data.nextSteps.map(n => `<li>${n}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    containerEl.innerHTML = html;
  }
}
