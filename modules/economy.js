/* ==========================================================================
   Economy Module (modules/economy.js)
   Renders the Five-Year Plan interactive deck, the RBI monetary policy
   parameter simulator, detailed study notes, and the 12-question PYQ quiz.
   ========================================================================== */

import { addXP } from '../app.js';
import { ECONOMY_NOTES_SECTIONS, ECONOMY_PYQ_DATA } from './economy-notes-data.js';

export const economyModule = {
  activeTab: "interactive", // 'interactive' or 'notes'
  activePlanIdx: 0,
  simRates: {
    repo: 6.5,
    crr: 4.5,
    slr: 18.0
  },
  pyqState: {
    active: false,
    questions: [],
    currentIdx: 0,
    answered: [],
    score: 0
  },

  plansData: [
    { num: "1st", period: "1951–56", model: "Harrod-Domar Model", focus: "Agriculture, irrigation, and power.", milestone: "Launch of Bhakra-Nangal and Hirakud dams.", icon: "🌾" },
    { num: "2nd", period: "1956–61", model: "Mahalanobis Model", focus: "Rapid industrialisation & heavy industries.", milestone: "Setup of Bhilai, Durgapur, and Rourkela steel plants.", icon: "🏗️" },
    { num: "3rd", period: "1961–66", model: "Gadgil Yojana", focus: "Self-reliant and self-generating economy.", milestone: "Failed due to Indo-China (1962) & Indo-Pak (1965) wars.", icon: "⚔️" },
    { num: "Holidays", period: "1966–69", model: "Three Annual Plans", focus: "Devaluation of rupee; focus on agriculture.", milestone: "Launch of the Green Revolution in India.", icon: "🚜" },
    { num: "4th", period: "1969–74", model: "Ashok Rudra Model", focus: "Growth with stability and self-reliance.", milestone: "Nationalisation of 14 banks (1969); Pokhran-1 (1974).", icon: "⚛️" },
    { num: "5th", period: "1974–79", model: "C. Subramaniam / D.D. Dhar", focus: "Garibi Hatao (Poverty eradication).", milestone: "Terminated 1 year early by the Janata Party govt.", icon: "🤝" },
    { num: "Rolling", period: "1978–80", model: "Gunnar Myrdal Concept", focus: "Reviewed and revised every year.", milestone: "Introduced by Morarji Desai's Janata government.", icon: "🔄" }
  ],

  init() {
    this.setupTabs();
    this.renderInteractiveDashboard();
    this.renderNotes();
  },

  setupTabs() {
    const interBtn = document.getElementById('btn-economy-interactive-tab');
    const notesBtn = document.getElementById('btn-economy-notes-tab');

    if (interBtn) interBtn.addEventListener('click', () => this.switchTab('interactive'));
    if (notesBtn) notesBtn.addEventListener('click', () => this.switchTab('notes'));
  },

  switchTab(tab) {
    this.activeTab = tab;

    document.querySelectorAll('.economy-tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`.economy-tab-btn[data-tab="${tab}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    const interContent = document.getElementById('economy-interactive-tab-content');
    const notesContent = document.getElementById('economy-notes-tab-content');

    if (tab === 'interactive') {
      interContent?.classList.remove('hidden');
      notesContent?.classList.add('hidden');
    } else {
      interContent?.classList.add('hidden');
      notesContent?.classList.remove('hidden');
    }
    addXP(5, 'economy', 'Browsed Economy tab');
  },

  // ── Render Interactive Dashboard ──────────────────────────────────────
  renderInteractiveDashboard() {
    const container = document.getElementById('economy-interactive-container');
    if (!container) return;

    container.innerHTML = `
      <div class="economy-dashboard-layout" style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: start;">
        
        <!-- COLUMN 1: Five-Year Plans interactive deck -->
        <div class="glass-card economy-fyp-section" style="padding: 24px;">
          <h3 style="font-size: 18px; margin-bottom: 16px; display: flex; align-items: center; gap: 10px; color: var(--text-main);">
            <span>📅</span> Five-Year Plan (FYP) Explorer
          </h3>
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 20px;">
            Select a plan timeline tab to view its model, priority objective, and historic milestone.
          </p>

          <!-- Plan selector buttons -->
          <div class="fyp-tabs" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;">
            ${this.plansData.map((plan, idx) => `
              <button class="fyp-tab-btn ${idx === this.activePlanIdx ? 'active' : ''}" 
                      style="padding: 8px 12px; font-size: 12px; font-weight: 600; border-radius: var(--radius-sm); border: 1px solid var(--border-glass); background: ${idx === this.activePlanIdx ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255,255,255,0.02)'}; color: ${idx === this.activePlanIdx ? 'var(--accent-cyan)' : 'var(--text-muted)'}; cursor: pointer; transition: all 0.3s;"
                      data-idx="${idx}">
                ${plan.num}
              </button>
            `).join('')}
          </div>

          <!-- Active plan detail card -->
          <div id="active-plan-card" class="glass-card" style="padding: 20px; background: rgba(255, 255, 255, 0.01); border-color: rgba(6, 182, 212, 0.15); min-height: 220px; display: flex; flex-direction: column; justify-content: center; position: relative; overflow: hidden;">
            <!-- Background icon -->
            <div id="plan-bg-icon" style="position: absolute; right: -10px; bottom: -20px; font-size: 120px; opacity: 0.04; pointer-events: none; transform: rotate(-15deg);">🌾</div>
            
            <span id="plan-period" style="font-size: 12px; color: var(--accent-cyan); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">1951 - 1956</span>
            <h4 id="plan-title" style="font-size: 22px; color: var(--text-main); margin: 6px 0 16px 0;">1st Five-Year Plan</h4>
            
            <div style="display: grid; grid-template-columns: 1fr; gap: 12px; font-size: 13px;">
              <div><strong>Core Economic Model:</strong> <span id="plan-model">Harrod-Domar Model</span></div>
              <div><strong>Primary Objective:</strong> <span id="plan-focus">Agriculture, irrigation, and power.</span></div>
              <div><strong>Historic Milestone:</strong> <span id="plan-milestone" style="color: var(--text-main);">Launch of Bhakra-Nangal and Hirakud dams.</span></div>
            </div>
          </div>
        </div>

        <!-- COLUMN 2: RBI Reserve Parameters Simulator -->
        <div class="glass-card economy-rbi-section" style="padding: 24px;">
          <h3 style="font-size: 18px; margin-bottom: 16px; display: flex; align-items: center; gap: 10px; color: var(--text-main);">
            <span>🏦</span> RBI Monetary Policy Simulator
          </h3>
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 20px;">
            Simulate how Repo Rate, CRR, and SLR affect credit availability and market inflation.
          </p>

          <!-- Slider Inputs -->
          <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px;">
            <!-- Repo Rate -->
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px;">
                <span><strong>Repo Rate:</strong> <span style="color: var(--accent-cyan);">Borrowing Cost</span></span>
                <span id="lbl-repo-val" style="font-weight: 700;">6.50%</span>
              </div>
              <input type="range" id="slider-repo" min="4.0" max="10.0" step="0.25" value="6.5" style="width: 100%; accent-color: var(--accent-cyan); cursor: pointer;">
            </div>

            <!-- CRR -->
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px;">
                <span><strong>Cash Reserve Ratio (CRR):</strong> <span style="color: var(--accent-blue);">Cash Locked</span></span>
                <span id="lbl-crr-val" style="font-weight: 700;">4.50%</span>
              </div>
              <input type="range" id="slider-crr" min="3.0" max="8.0" step="0.25" value="4.5" style="width: 100%; accent-color: var(--accent-blue); cursor: pointer;">
            </div>

            <!-- SLR -->
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px;">
                <span><strong>Statutory Liquidity Ratio (SLR):</strong> <span style="color: var(--accent-purple);">Liquid Securities</span></span>
                <span id="lbl-slr-val" style="font-weight: 700;">18.00%</span>
              </div>
              <input type="range" id="slider-slr" min="15.0" max="25.0" step="0.5" value="18.0" style="width: 100%; accent-color: var(--accent-purple); cursor: pointer;">
            </div>
          </div>

          <!-- Output metrics state -->
          <div class="glass-card" style="padding: 16px; background: rgba(255, 255, 255, 0.01); border-color: rgba(255,255,255,0.05); font-size: 13px;">
            <h4 style="margin-bottom: 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">Simulation Impact Output</h4>
            
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <!-- Liquidity -->
              <div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                  <span>Market Money Supply / Liquidity:</span>
                  <span id="sim-liquidity-status" style="font-weight: 700; color: #10b981;">MODERATE</span>
                </div>
                <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.05); border-radius: 3px; overflow: hidden;">
                  <div id="sim-liquidity-bar" style="width: 50%; height: 100%; background: #10b981; transition: all 0.3s;"></div>
                </div>
              </div>

              <!-- Inflation -->
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.04); padding-top: 10px;">
                <span>Inflationary Pressure:</span>
                <span id="sim-inflation-status" style="font-weight: 700; background: rgba(16, 185, 129, 0.1); color: #10b981; padding: 3px 8px; border-radius: 4px;">STABLE &amp; CONTROLLED</span>
              </div>

              <!-- Loan Cost -->
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>Commercial Loan Rates:</span>
                <span id="sim-loans-status" style="font-weight: 700; color: var(--accent-cyan);">BALANCED CREDIT</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    `;

    this.bindFypEvents();
    this.bindRbiEvents();
    this.updatePlanDetails();
    this.updateRbiSimulation();
  },

  bindFypEvents() {
    const buttons = document.querySelectorAll('.fyp-tab-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        buttons.forEach(b => {
          b.style.background = 'rgba(255,255,255,0.02)';
          b.style.color = 'var(--text-muted)';
        });
        const targetBtn = e.currentTarget;
        targetBtn.style.background = 'rgba(6, 182, 212, 0.15)';
        targetBtn.style.color = 'var(--accent-cyan)';
        
        this.activePlanIdx = parseInt(targetBtn.dataset.idx);
        this.updatePlanDetails();
        addXP(10, 'economy', 'Economy simulator interaction');
      });
    });
  },

  updatePlanDetails() {
    const plan = this.plansData[this.activePlanIdx];
    if (!plan) return;

    document.getElementById('plan-period').textContent = plan.period;
    document.getElementById('plan-title').textContent = `${plan.num} Five-Year Plan`;
    document.getElementById('plan-model').textContent = plan.model;
    document.getElementById('plan-focus').textContent = plan.focus;
    document.getElementById('plan-milestone').textContent = plan.milestone;
    document.getElementById('plan-bg-icon').textContent = plan.icon;
  },

  bindRbiEvents() {
    const sRepo = document.getElementById('slider-repo');
    const sCrr = document.getElementById('slider-crr');
    const sSlr = document.getElementById('slider-slr');

    sRepo?.addEventListener('input', (e) => {
      this.simRates.repo = parseFloat(e.target.value);
      document.getElementById('lbl-repo-val').textContent = `${this.simRates.repo.toFixed(2)}%`;
      this.updateRbiSimulation();
    });

    sCrr?.addEventListener('input', (e) => {
      this.simRates.crr = parseFloat(e.target.value);
      document.getElementById('lbl-crr-val').textContent = `${this.simRates.crr.toFixed(2)}%`;
      this.updateRbiSimulation();
    });

    sSlr?.addEventListener('input', (e) => {
      this.simRates.slr = parseFloat(e.target.value);
      document.getElementById('lbl-slr-val').textContent = `${this.simRates.slr.toFixed(2)}%`;
      this.updateRbiSimulation();
    });
  },

  updateRbiSimulation() {
    // Basic heuristics to determine market liquidity index (0 to 100)
    // Higher Repo, CRR, SLR lead to LOWER money supply
    const repoWeight = (10 - this.simRates.repo) / 6; // 0 to 1
    const crrWeight = (8 - this.simRates.crr) / 5; // 0 to 1
    const slrWeight = (25 - this.simRates.slr) / 10; // 0 to 1

    const avgSupplyIdx = ((repoWeight + crrWeight + slrWeight) / 3) * 100;
    
    const liquidityBar = document.getElementById('sim-liquidity-bar');
    const liquidityStatus = document.getElementById('sim-liquidity-status');
    const inflationStatus = document.getElementById('sim-inflation-status');
    const loansStatus = document.getElementById('sim-loans-status');

    if (!liquidityBar) return;

    liquidityBar.style.width = `${avgSupplyIdx}%`;

    if (avgSupplyIdx > 70) {
      // High Money Supply
      liquidityStatus.textContent = "HIGH SURPLUS LIQUIDITY";
      liquidityStatus.style.color = "#f43f5e"; // rose
      liquidityBar.style.background = "#f43f5e";

      inflationStatus.textContent = "🔥 HIGH INFLATION RISK";
      inflationStatus.style.color = "#f43f5e";
      inflationStatus.style.background = "rgba(244, 63, 94, 0.1)";

      loansStatus.textContent = "CHEAP EASY LOANS";
      loansStatus.style.color = "#22c55e";
    } else if (avgSupplyIdx < 35) {
      // Low Money Supply (Tightened Credit)
      liquidityStatus.textContent = "TIGHT / CONTRACTED LIQUIDITY";
      liquidityStatus.style.color = "#eab308"; // yellow
      liquidityBar.style.background = "#eab308";

      inflationStatus.textContent = "❄️ DEFLATION / COOLING";
      inflationStatus.style.color = "#06b6d4";
      inflationStatus.style.background = "rgba(6, 182, 212, 0.1)";

      loansStatus.textContent = "EXPENSIVE / HIGH INTEREST RATES";
      loansStatus.style.color = "#f43f5e";
    } else {
      // Balanced
      liquidityStatus.textContent = "OPTIMAL & BALANCED";
      liquidityStatus.style.color = "#10b981"; // emerald
      liquidityBar.style.background = "#10b981";

      inflationStatus.textContent = "✅ STABLE (4% - 6% target)";
      inflationStatus.style.color = "#10b981";
      inflationStatus.style.background = "rgba(16, 185, 129, 0.1)";

      loansStatus.textContent = "STABILIZED LENDING";
      loansStatus.style.color = "#06b6d4";
    }
  },

  // ── Render Detailed Notes Tab ─────────────────────────────────────────
  renderNotes() {
    const container = document.getElementById('economy-notes-container');
    if (!container) return;

    let html = '';

    // Hero banner
    html += `
      <div class="notes-hero-banner" style="background: linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(139, 92, 246, 0.08) 100%); border-color: rgba(6, 182, 212, 0.25);">
        <div class="notes-hero-icon">📈</div>
        <div>
          <h2>Indian Economy — Core CGL Notes</h2>
          <p>Planning Commission &amp; NITI Aayog · RBI Reserve Rates · National Income Definitions · Inflation &amp; Deficit Equations</p>
        </div>
      </div>
    `;

    // Table of Contents
    html += `<div class="notes-toc">
      <h4>📑 Table of Contents</h4>
      <div class="toc-grid">`;
    ECONOMY_NOTES_SECTIONS.forEach(sec => {
      html += `<a href="#eco-sec-${sec.id}" class="toc-item" onclick="event.preventDefault(); document.getElementById('eco-sec-${sec.id}').scrollIntoView({behavior:'smooth', block:'start'})">
        <span class="toc-icon">${sec.icon}</span>
        <span class="toc-text">${sec.title}</span>
      </a>`;
    });
    html += `</div></div>`;

    // Render notes content
    ECONOMY_NOTES_SECTIONS.forEach(sec => {
      const typeClass = sec.type === 'highlight' ? 'notes-section-highlight' :
                        sec.type === 'table'     ? 'notes-section-table' :
                        sec.type === 'info'      ? 'notes-section-info' :
                                                   'notes-section-standard';

      html += `
        <div class="notes-section ${typeClass}" id="eco-sec-${sec.id}">
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

    // PYQ practice quiz section
    html += `
      <div class="notes-section notes-section-quiz" id="eco-sec-pyq-quiz">
        <div class="notes-section-header">
          <span class="notes-section-icon">📝</span>
          <h3>Indian Economy PYQ Quiz — 12 MCQs</h3>
        </div>
        <div class="notes-section-body">
          <p>Test your conceptual understanding of Five-Year Plans, RBI Reserve Parameters, and national deficits with <strong>12 authentic previous year questions</strong>.</p>
          <div class="pyq-controls">
            <button class="btn btn-primary" id="btn-eco-start-pyq" style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);">Start Full Quiz (12 Questions)</button>
            <button class="btn btn-secondary" id="btn-eco-random-5">Quick 5 Random PYQs</button>
          </div>
          <div id="eco-pyq-quiz-area" class="pyq-quiz-area hidden"></div>
          <div id="eco-pyq-result-area" class="pyq-result-area hidden"></div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    this.setupPYQQuiz();

    // Render LaTeX equations in client if MathJax/KaTeX is used, or fallback
    // Since math equations are formatted in $$...$$ we can let them render standard.
  },

  setupPYQQuiz() {
    const startBtn = document.getElementById('btn-eco-start-pyq');
    const randomBtn = document.getElementById('btn-eco-random-5');

    if (startBtn) {
      startBtn.addEventListener('click', () => this.startPYQ(ECONOMY_PYQ_DATA.slice()));
    }
    if (randomBtn) {
      randomBtn.addEventListener('click', () => {
        const shuffled = [...ECONOMY_PYQ_DATA].sort(() => Math.random() - 0.5);
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
    document.getElementById('eco-pyq-quiz-area')?.classList.remove('hidden');
    document.getElementById('eco-pyq-result-area')?.classList.add('hidden');
    this.renderPYQQuestion();
  },

  renderPYQQuestion() {
    const area = document.getElementById('eco-pyq-quiz-area');
    if (!area) return;

    const { questions, currentIdx } = this.pyqState;
    const q = questions[currentIdx];
    const progress = ((currentIdx + 1) / questions.length * 100).toFixed(0);

    const sectionColors = { A: '#06b6d4', B: '#3b82f6', C: '#10b981' };
    const sectionColor = sectionColors[q.section] || '#06b6d4';

    let html = `
      <div class="pyq-progress-bar">
        <div class="pyq-progress-fill" style="width: ${progress}%; background: linear-gradient(90deg, ${sectionColor}, ${sectionColor}bb);"></div>
      </div>
      <div class="pyq-question-header">
        <span class="pyq-section-tag" style="background: ${sectionColor}18; color: ${sectionColor};">Section ${q.section}: ${q.sectionTitle}</span>
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
        if (i === q.answer) optClass += ' pyq-correct';
        else if (i === userAnswer) optClass += ' pyq-wrong';
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
    if (currentIdx > 0) html += `<button class="btn btn-secondary" id="eco-pyq-prev">← Previous</button>`;
    if (currentIdx < questions.length - 1) {
      html += `<button class="btn btn-primary" id="eco-pyq-next">Next →</button>`;
    } else if (this.pyqState.answered[currentIdx] !== null) {
      html += `<button class="btn btn-primary" id="eco-pyq-finish" style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);">View Results 🏆</button>`;
    }
    html += `</div>`;

    area.innerHTML = html;

    area.querySelectorAll('.pyq-option:not([disabled])').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.optIdx);
        this.pyqState.answered[currentIdx] = idx;
        if (idx === q.answer) {
          this.pyqState.score++;
          addXP(15, 'economy', 'Economy PYQ answered');
        }
        this.renderPYQQuestion();
      });
    });

    document.getElementById('eco-pyq-prev')?.addEventListener('click', () => {
      this.pyqState.currentIdx--;
      this.renderPYQQuestion();
    });
    document.getElementById('eco-pyq-next')?.addEventListener('click', () => {
      this.pyqState.currentIdx++;
      this.renderPYQQuestion();
    });
    document.getElementById('eco-pyq-finish')?.addEventListener('click', () => {
      this.showPYQResults();
    });
  },

  showPYQResults() {
    const area = document.getElementById('eco-pyq-quiz-area');
    const resultArea = document.getElementById('eco-pyq-result-area');
    if (!resultArea) return;

    area?.classList.add('hidden');
    resultArea.classList.remove('hidden');

    const { questions, score } = this.pyqState;
    const total = questions.length;
    const percent = ((score / total) * 100).toFixed(0);

    let grade = '';
    if (percent >= 90) grade = '🏆 Financial Expert! You have mastered Indian Economy concepts!';
    else if (percent >= 70) grade = '🎯 Solid performance on Five-Year Plans & monetary rates!';
    else if (percent >= 50) grade = '📚 Good effort. Revise national income equations and deficit calculations.';
    else grade = '💪 Keep practicing! Go through the RBI reserve definitions and plans index.';

    resultArea.innerHTML = `
      <div class="pyq-results-card">
        <div class="pyq-trophy" style="animation: float 4s ease-in-out infinite;">🏦</div>
        <h3>Economy Quiz Results</h3>
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
          <button class="btn btn-primary" id="eco-pyq-retry" style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);">Retry Quiz</button>
          <button class="btn btn-secondary" id="eco-pyq-review">Review Answers</button>
        </div>
      </div>
    `;

    document.getElementById('eco-pyq-retry')?.addEventListener('click', () => {
      resultArea.classList.add('hidden');
      this.startPYQ([...ECONOMY_PYQ_DATA]);
    });
    document.getElementById('eco-pyq-review')?.addEventListener('click', () => {
      resultArea.classList.add('hidden');
      this.pyqState.currentIdx = 0;
      document.getElementById('eco-pyq-quiz-area')?.classList.remove('hidden');
      this.renderPYQQuestion();
    });
  }
};
