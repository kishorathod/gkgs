/* ==========================================================================
   Science Module (modules/science.js)
   Renders cytology cell structure organelle guides, detailed General Science
   exam notes (Biology, Chemistry, Physics + Advanced topics), and 15 PYQs.
   ========================================================================== */

import { addXP } from '../app.js';
import { SCIENCE_NOTES_SECTIONS, SCIENCE_PYQ_DATA } from './science-notes-data.js';

// Eukaryotic organelle data structured for SSC CGL General Science
const ORGANELLE_DATA = {
  nucleus: {
    name: "Nucleus (Director of the Cell)",
    desc: "Discovered by Robert Brown in 1831. It contains the cell's genetic material (DNA/chromosomes) and acts as the brain or command center of the cell, coordinating growth, metabolism, and reproduction.",
    funcs: [
      "Stores genetic blueprint in DNA strings",
      "Controls protein synthesis by transcribing RNA",
      "Initiates cell division (mitosis & meiosis)"
    ],
    sscHighlights: "Robert Brown discovered the nucleus (very common SSC question). Red Blood Cells (RBCs) in mammals (except camels and llamas) lack a nucleus at maturity. Sieve tube cells in plants also lack a nucleus."
  },
  mitochondria: {
    name: "Mitochondria (Powerhouse of the Cell)",
    desc: "Discovered by Albert von Kolliker in 1857 and named by Carl Benda. It is a double-membrane bound organelle responsible for generating Adenosine Triphosphate (ATP), the chemical energy currency of the cell.",
    funcs: [
      "Generates ATP via cellular aerobic respiration",
      "Involved in cellular signaling and cell death (apoptosis)",
      "Stores calcium ions for cellular regulation"
    ],
    sscHighlights: "Mitochondria is known as the 'Powerhouse of the cell'. It is semi-autonomous as it contains its own circular DNA and 70S ribosomes (like bacteria). The inner folding membrane is called cristae."
  },
  ribosome: {
    name: "Ribosomes (Protein Factories)",
    desc: "Discovered by George Palade in 1953 (awarded Nobel Prize). Ribosomes are tiny granular organelles composed of ribosomal RNA (rRNA) and proteins. They are not bound by any membrane.",
    funcs: [
      "Translate genetic code from mRNA into peptide chains (Protein Synthesis)",
      "Found free-floating in cytoplasm or attached to Rough Endoplasmic Reticulum (RER)"
    ],
    sscHighlights: "Ribosome is the smallest organelle in the cell and lacks a membrane. Found in both Prokaryotes (70S size) and Eukaryotes (80S size). Often queried as the 'Protein Factory'."
  },
  lysosome: {
    name: "Lysosomes (Suicidal Bags)",
    desc: "Discovered by Christian de Duve in 1955. Spherical membrane-bound vesicles containing acidic hydrolytic enzymes capable of breaking down organic polymers, worn-out organelles, or foreign invaders.",
    funcs: [
      "Intracellular digestion and waste disposal",
      "Autolysis: Self-destruction of damaged cells by releasing digestive enzymes"
    ],
    sscHighlights: "Lysosomes are famous as the 'Suicidal Bags of the cell'. The enzymes function optimally under acidic conditions (pH ~4.5-5.0). RBCs lack lysosomes."
  },
  golgi: {
    name: "Golgi Apparatus (Traffic Police of the Cell)",
    desc: "Discovered by Camillo Golgi in 1898. A series of flattened membrane-bound sacks (cisternae). It acts as the packaging, sorting, and dispatch center of the cell.",
    funcs: [
      "Modifies, packages, and routes proteins and lipids synthesized in ER",
      "Synthesizes lysosomes and complex carbohydrates"
    ],
    sscHighlights: "Referred to as the 'Traffic Controller' or 'Post Office' of the cell. Discovered using silver staining. In plants, the Golgi apparatus is composed of smaller units called Dictyosomes."
  }
};

export const scienceModule = {
  activeTab: "cell",
  pyqState: {
    active: false,
    questions: [],
    currentIdx: 0,
    answered: [],
    score: 0
  },

  init() {
    this.setupLabels();
    this.setupTabs();
    this.renderNotes();
  },

  // ── Tab Switching ─────────────────────────────────────────────────────
  setupTabs() {
    const cellBtn = document.getElementById('btn-science-cell-tab');
    const notesBtn = document.getElementById('btn-science-notes-tab');

    if (cellBtn) cellBtn.addEventListener('click', () => this.switchTab('cell'));
    if (notesBtn) notesBtn.addEventListener('click', () => this.switchTab('notes'));
  },

  switchTab(tab) {
    this.activeTab = tab;

    document.querySelectorAll('.science-tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`.science-tab-btn[data-tab="${tab}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    const cellContent = document.getElementById('science-cell-tab-content');
    const notesContent = document.getElementById('science-notes-tab-content');

    if (tab === 'cell') {
      cellContent?.classList.remove('hidden');
      notesContent?.classList.add('hidden');
    } else {
      cellContent?.classList.add('hidden');
      notesContent?.classList.remove('hidden');
    }

    addXP(5, 'science', 'Browsed Science tab');
  },

  // ── Notes Rendering ───────────────────────────────────────────────────
  renderNotes() {
    const container = document.getElementById('science-notes-container');
    if (!container) return;

    let html = '';

    // Hero banner
    html += `
      <div class="notes-hero-banner" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(99, 102, 241, 0.08) 100%); border-color: rgba(16, 185, 129, 0.25);">
        <div class="notes-hero-icon">🔬</div>
        <div>
          <h2>General Science — Complete SSC CGL Notes</h2>
          <p>Biology (Human Systems, Vitamins, Plant Kingdom) · Chemistry (Compounds, Ores, Reactions, Periodic Trends) · Physics (Light, Units, Equations, Sound)</p>
        </div>
      </div>
    `;

    // Table of Contents
    html += `<div class="notes-toc">
      <h4>📑 Table of Contents</h4>
      <div class="toc-grid">`;
    SCIENCE_NOTES_SECTIONS.forEach(sec => {
      html += `<a href="#sci-sec-${sec.id}" class="toc-item" onclick="event.preventDefault(); document.getElementById('sci-sec-${sec.id}').scrollIntoView({behavior:'smooth', block:'start'})">
        <span class="toc-icon">${sec.icon}</span>
        <span class="toc-text">${sec.title}</span>
      </a>`;
    });
    html += `</div></div>`;

    // Render each section
    SCIENCE_NOTES_SECTIONS.forEach(sec => {
      const typeClass = sec.type === 'highlight' ? 'notes-section-highlight' :
                        sec.type === 'table'     ? 'notes-section-table' :
                        sec.type === 'info'      ? 'notes-section-info' :
                                                   'notes-section-standard';

      html += `
        <div class="notes-section ${typeClass}" id="sci-sec-${sec.id}">
          <div class="notes-section-header">
            <span class="notes-section-icon">${sec.icon}</span>
            <h3>${sec.title}</h3>
          </div>
          <div class="notes-section-body">
            ${sec.content}
          </div>
        </div>
      `;
    });

    // PYQ Quiz Section
    html += `
      <div class="notes-section notes-section-quiz" id="sci-sec-pyq-quiz">
        <div class="notes-section-header">
          <span class="notes-section-icon">📝</span>
          <h3>General Science PYQ Quiz — 15 MCQs</h3>
        </div>
        <div class="notes-section-body">
          <p>Test your knowledge with <strong>15 authentic previous year questions</strong> covering Biology, Chemistry, and Physics.</p>
          <div class="pyq-controls">
            <button class="btn btn-primary" id="btn-sci-start-pyq" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">Start Full Quiz (15 Questions)</button>
            <button class="btn btn-secondary" id="btn-sci-random-5">Quick 5 Random PYQs</button>
          </div>
          <div id="sci-pyq-quiz-area" class="pyq-quiz-area hidden"></div>
          <div id="sci-pyq-result-area" class="pyq-result-area hidden"></div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    this.setupPYQQuiz();
  },

  // ── PYQ Quiz Logic ────────────────────────────────────────────────────
  setupPYQQuiz() {
    const startBtn = document.getElementById('btn-sci-start-pyq');
    const randomBtn = document.getElementById('btn-sci-random-5');

    if (startBtn) {
      startBtn.addEventListener('click', () => this.startPYQ(SCIENCE_PYQ_DATA.slice()));
    }
    if (randomBtn) {
      randomBtn.addEventListener('click', () => {
        const shuffled = [...SCIENCE_PYQ_DATA].sort(() => Math.random() - 0.5);
        this.startPYQ(shuffled.slice(0, 5));
      });
    }
  },

  startPYQ(questions) {
    this.pyqState = {
      active: true,
      questions,
      currentIdx: 0,
      answered: new Array(questions.length).fill(null),
      score: 0
    };
    document.getElementById('sci-pyq-quiz-area')?.classList.remove('hidden');
    document.getElementById('sci-pyq-result-area')?.classList.add('hidden');
    this.renderPYQQuestion();
  },

  renderPYQQuestion() {
    const area = document.getElementById('sci-pyq-quiz-area');
    if (!area) return;

    const { questions, currentIdx } = this.pyqState;
    const q = questions[currentIdx];
    const progress = ((currentIdx + 1) / questions.length * 100).toFixed(0);

    // Section color based on section letter
    const sectionColors = { A: '#10b981', B: '#6366f1', C: '#f59e0b', D: '#ec4899' };
    const sectionColor = sectionColors[q.section] || '#10b981';

    let html = `
      <div class="pyq-progress-bar">
        <div class="pyq-progress-fill" style="width: ${progress}%; background: linear-gradient(90deg, ${sectionColor}, ${sectionColor}aa);"></div>
      </div>
      <div class="pyq-question-header">
        <span class="pyq-section-tag" style="background: ${sectionColor}15; color: ${sectionColor};">Section ${q.section}: ${q.sectionTitle}</span>
        <span class="pyq-counter">Q${currentIdx + 1} / ${questions.length}</span>
      </div>
      <div class="pyq-question-text">
        <strong>Q${q.id}.</strong> ${q.question}
      </div>
      <div class="pyq-options-list">
    `;

    q.options.forEach((opt, i) => {
      const userAnswer = this.pyqState.answered[currentIdx];
      let optClass = 'pyq-option';
      let disabled = '';

      if (userAnswer !== null) {
        disabled = 'disabled';
        if (i === q.answer) {
          optClass += ' pyq-correct';
        } else if (i === userAnswer && i !== q.answer) {
          optClass += ' pyq-wrong';
        }
      }

      html += `<button class="${optClass}" data-opt-idx="${i}" ${disabled}>${opt}</button>`;
    });

    html += `</div>`;

    if (this.pyqState.answered[currentIdx] !== null) {
      const isCorrect = this.pyqState.answered[currentIdx] === q.answer;
      html += `
        <div class="pyq-feedback ${isCorrect ? 'pyq-feedback-correct' : 'pyq-feedback-wrong'}">
          <span class="pyq-feedback-icon">${isCorrect ? '✅' : '❌'}</span>
          <span>${isCorrect ? 'Correct!' : `Wrong! Correct answer: ${q.answerLabel}`}</span>
        </div>
      `;
    }

    html += `<div class="pyq-nav-buttons">`;
    if (currentIdx > 0) html += `<button class="btn btn-secondary" id="sci-pyq-prev">← Previous</button>`;
    if (currentIdx < questions.length - 1) {
      html += `<button class="btn btn-primary" id="sci-pyq-next">Next →</button>`;
    } else if (this.pyqState.answered[currentIdx] !== null) {
      html += `<button class="btn btn-primary" id="sci-pyq-finish" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">View Results 🏆</button>`;
    }
    html += `</div>`;

    area.innerHTML = html;

    // Attach option events
    area.querySelectorAll('.pyq-option:not([disabled])').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.optIdx);
        this.pyqState.answered[currentIdx] = idx;
        if (idx === q.answer) {
          this.pyqState.score++;
          addXP(15, 'science', 'Clicked cell organelle');
        }
        this.renderPYQQuestion();
      });
    });

    document.getElementById('sci-pyq-prev')?.addEventListener('click', () => {
      this.pyqState.currentIdx--;
      this.renderPYQQuestion();
    });
    document.getElementById('sci-pyq-next')?.addEventListener('click', () => {
      this.pyqState.currentIdx++;
      this.renderPYQQuestion();
    });
    document.getElementById('sci-pyq-finish')?.addEventListener('click', () => {
      this.showPYQResults();
    });
  },

  showPYQResults() {
    const area = document.getElementById('sci-pyq-quiz-area');
    const resultArea = document.getElementById('sci-pyq-result-area');
    if (!resultArea) return;

    area?.classList.add('hidden');
    resultArea.classList.remove('hidden');

    const { questions, score } = this.pyqState;
    const total = questions.length;
    const percent = ((score / total) * 100).toFixed(0);

    let grade = '';
    if (percent >= 90) grade = '🏆 Brilliant! You have mastered General Science for CGL!';
    else if (percent >= 70) grade = '🎯 Great accuracy on chemical formulas and vital facts!';
    else if (percent >= 50) grade = '📚 Good attempt! Revise the vitamin table and compound names.';
    else grade = '💪 Keep practising! Focus on the Chemistry compounds and Biology systems.';

    resultArea.innerHTML = `
      <div class="pyq-results-card">
        <div class="pyq-trophy" style="animation: float 4s ease-in-out infinite;">🔬</div>
        <h3>General Science Quiz Results</h3>
        <div class="pyq-results-grid">
          <div class="pyq-res-box">
            <span class="pyq-res-val">${score}/${total}</span>
            <span class="pyq-res-lbl">Score</span>
          </div>
          <div class="pyq-res-box">
            <span class="pyq-res-val">${percent}%</span>
            <span class="pyq-res-lbl">Accuracy</span>
          </div>
          <div class="pyq-res-box">
            <span class="pyq-res-val">+${score * 15} XP</span>
            <span class="pyq-res-lbl">Earned</span>
          </div>
        </div>
        <div class="pyq-grade">${grade}</div>
        <div class="pyq-results-actions">
          <button class="btn btn-primary" id="sci-pyq-retry" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">Retry Quiz</button>
          <button class="btn btn-secondary" id="sci-pyq-review">Review Answers</button>
        </div>
      </div>
    `;

    document.getElementById('sci-pyq-retry')?.addEventListener('click', () => {
      resultArea.classList.add('hidden');
      this.startPYQ([...SCIENCE_PYQ_DATA]);
    });
    document.getElementById('sci-pyq-review')?.addEventListener('click', () => {
      resultArea.classList.add('hidden');
      this.pyqState.currentIdx = 0;
      document.getElementById('sci-pyq-quiz-area')?.classList.remove('hidden');
      this.renderPYQQuestion();
    });
  },

  // ── Interactive Cell Diagram Logic ────────────────────────────────────
  setupLabels() {
    const labels = document.querySelectorAll('.diagram-label-btn');
    const promptEl = document.querySelector('#science-info-panel .empty-prompt');
    const contentEl = document.getElementById('science-info-content');

    labels.forEach(btn => {
      btn.addEventListener('click', () => {
        labels.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const organelleKey = btn.dataset.part;
        const data = ORGANELLE_DATA[organelleKey];
        if (data) {
          if (promptEl) promptEl.classList.add('hidden');
          if (contentEl) contentEl.classList.remove('hidden');

          document.getElementById('organelle-name').textContent = data.name;
          document.getElementById('organelle-desc').textContent = data.desc;

          const funcsList = document.getElementById('organelle-funcs');
          funcsList.innerHTML = "";
          data.funcs.forEach(f => {
            const li = document.createElement('li');
            li.textContent = f;
            funcsList.appendChild(li);
          });

          document.getElementById('organelle-ssc').textContent = data.sscHighlights;
          addXP(20, 'science', 'Science PYQ answered');
        }
      });
    });
  }
};
