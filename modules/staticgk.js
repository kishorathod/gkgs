/* ==========================================================================
   Static GK Module (modules/staticgk.js)
   Renders interactive dashboards for Classical Dances, Census 2011 comparisons,
   Musical Instrument maestros, detailed notes, and a 15-question PYQ quiz.
   ========================================================================== */

import { addXP } from '../app.js';
import { STATIC_GK_NOTES_SECTIONS, STATIC_GK_PYQ_DATA } from './static-gk-notes-data.js';

export const staticGkModule = {
  activeTab: "interactive", // 'interactive' or 'notes'
  activeDanceIdx: 0,
  activeCensusMetric: "literacy",
  activeInstrument: "sitar",
  pyqState: {
    active: false,
    questions: [],
    currentIdx: 0,
    answered: [],
    score: 0
  },

  dances: [
    { name: "Bharatanatyam", state: "Tamil Nadu", facts: "Oldest dance form; performed by Devadasis (Sadir Attam); uses Ekaharya (one dancer plays multiple roles).", exponents: "Rukmini Devi Arundale, Padma Subrahmanyam, Tanjore Balasaraswati, Yamini Krishnamurthy", icon: "💃" },
    { name: "Kathak", state: "Uttar Pradesh", facts: "Name from 'Katha' (storyteller); intense footwork (Tatkar) and lightning-fast spins (Chakkars).", exponents: "Pandit Birju Maharaj, Sitara Devi, Shovana Narayan", icon: "🌀" },
    { name: "Kathakali", state: "Kerala", facts: "Dance-drama featuring heavy, colorful makeup and masks; noble characters wear green face paint (Pacha).", exponents: "Kalamandalam Gopi, Rita Ganguly", icon: "🎭" },
    { name: "Kuchipudi", state: "Andhra Pradesh", facts: "Features Tarangam (dancing on brass plate edges with a water pot balanced on the head).", exponents: "Yamini Krishnamurthy, Raja and Radha Reddy", icon: "🏺" },
    { name: "Odissi", state: "Odisha", facts: "Tribhanga posture (three-bend body curve); based heavily on the Geeta Govinda.", exponents: "Kelucharan Mohapatra, Sonal Mansingh", icon: "🗿" },
    { name: "Manipuri", state: "Manipur", facts: "Raas Leela (Radha-Krishna devotion); dancers wear a barrel-shaped Kumil skirt.", exponents: "Guru Bipin Singh, Jhaveri Sisters", icon: "👗" },
    { name: "Mohiniyattam", state: "Kerala", facts: "Solo dance performed by women; dominant theme is Lasya (graceful, feminine movements).", exponents: "Kanak Rele, Sunanda Nair", icon: "🌾" },
    { name: "Sattriya", state: "Assam", facts: "Introduced by Vaishnava saint Mahapurush Sankaradeva in the 15th century in Sattras (monasteries).", exponents: "Bayanbayan, Sharodi Saikia", icon: "🛕" }
  ],

  instruments: {
    sitar: { name: "Sitar", icon: "🪕", exponents: "Pandit Ravi Shankar (India's 1st Grammy winner), Vilayat Khan, Shahid Parvez, Anoushka Shankar." },
    santoor: { name: "Santoor", icon: "🎹", exponents: "Pandit Shivkumar Sharma (pioneered santoor into classical music), Bhajan Sopori." },
    sarod: { name: "Sarod", icon: "🎻", exponents: "Amjad Ali Khan, Aman Ali Khan, Ayan Ali Khan, Ustad Alauddin Khan, Ali Akbar Khan." },
    shehnai: { name: "Shehnai", icon: "🎺", exponents: "Ustad Bismillah Khan (played at Red Fort in 1947; received Bharat Ratna in 2001)." },
    bansuri: { name: "Flute (Bansuri)", icon: "💨", exponents: "Hariprasad Chaurasia, Pannalal Ghosh." },
    tabla: { name: "Tabla", icon: "🥁", exponents: "Zakir Hussain (Padma Vibhushan 2023), Alla Rakha Khan, Pandit Kishan Maharaj." }
  },

  censusData: {
    literacy: {
      title: "Literacy Rate (Overall: 74.04%)",
      highState: "Kerala (94.00%)",
      lowState: "Bihar (61.80%)",
      highUt: "Lakshadweep",
      lowUt: "Dadra & Nagar Haveli",
      color: "var(--accent-cyan)",
      highVal: 94.0,
      lowVal: 61.8
    },
    sexratio: {
      title: "Sex Ratio (Overall: 940 females per 1000 males)",
      highState: "Kerala (1084)",
      lowState: "Haryana (879)",
      highUt: "Puducherry (1037)",
      lowUt: "Daman & Diu (618)",
      color: "var(--accent-pink)",
      highVal: 108.4, // scaled for progress bars
      lowVal: 61.8 // scaled
    },
    density: {
      title: "Population Density (Overall: 382/sq km)",
      highState: "Bihar (1106 per sq km)",
      lowState: "Arunachal Pradesh (17 per sq km)",
      highUt: "Delhi (11,320 per sq km)",
      lowUt: "Andaman & Nicobar (46 per sq km)",
      color: "var(--accent-purple)",
      highVal: 100.0,
      lowVal: 1.5
    }
  },

  init() {
    this.setupTabs();
    this.renderInteractiveDashboard();
    this.renderNotes();
  },

  setupTabs() {
    const interBtn = document.getElementById('btn-staticgk-interactive-tab');
    const notesBtn = document.getElementById('btn-staticgk-notes-tab');

    if (interBtn) interBtn.addEventListener('click', () => this.switchTab('interactive'));
    if (notesBtn) notesBtn.addEventListener('click', () => this.switchTab('notes'));
  },

  switchTab(tab) {
    this.activeTab = tab;

    document.querySelectorAll('.staticgk-tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`.staticgk-tab-btn[data-tab="${tab}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    const interContent = document.getElementById('staticgk-interactive-tab-content');
    const notesContent = document.getElementById('staticgk-notes-tab-content');

    if (tab === 'interactive') {
      interContent?.classList.remove('hidden');
      notesContent?.classList.add('hidden');
    } else {
      interContent?.classList.add('hidden');
      notesContent?.classList.remove('hidden');
    }
    addXP(5, 'staticgk', 'Browsed Static GK tab');
  },

  renderInteractiveDashboard() {
    const container = document.getElementById('staticgk-interactive-container');
    if (!container) return;

    container.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: start; margin-bottom: 32px;">
        
        <!-- SECTION 1: Classical Dances Explorer -->
        <div class="glass-card" style="padding: 24px;">
          <h3 style="font-size: 16px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; color: var(--text-main);">
            <span>💃</span> Classical Dances &amp; Exponents
          </h3>
          <p style="font-size: 12.5px; color: var(--text-muted); margin-bottom: 16px;">
            Click on a dance form to view origin, key features, and famous award-winning exponents.
          </p>

          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 20px;">
            ${this.dances.map((d, i) => `
              <button class="dance-select-btn ${i === this.activeDanceIdx ? 'active' : ''}"
                      style="padding: 10px; font-size: 12px; font-weight: 600; border-radius: var(--radius-sm); border: 1px solid var(--border-glass); background: ${i === this.activeDanceIdx ? 'rgba(139, 92, 246, 0.15)' : 'rgba(255,255,255,0.02)'}; color: ${i === this.activeDanceIdx ? 'var(--accent-purple)' : 'var(--text-muted)'}; cursor: pointer; transition: all 0.3s;"
                      data-idx="${i}">
                ${d.name}
              </button>
            `).join('')}
          </div>

          <div id="active-dance-panel" class="glass-card" style="padding: 16px; background: rgba(255,255,255,0.01); border-color: rgba(139, 92, 246, 0.15); min-height: 180px; position: relative;">
            <div id="dance-bg-icon" style="position: absolute; right: 10px; bottom: 0px; font-size: 100px; opacity: 0.03; pointer-events: none;">💃</div>
            <span id="dance-state" style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: var(--accent-purple); letter-spacing: 0.05em;">State</span>
            <h4 id="dance-name" style="font-size: 20px; color: var(--text-main); margin: 4px 0 12px 0;">Dance Name</h4>
            <div style="font-size: 13px; line-height: 1.5; display: flex; flex-direction: column; gap: 10px;">
              <div><strong>Core TCS Facts:</strong> <span id="dance-facts" style="color: var(--text-muted);">Facts</span></div>
              <div><strong>Famous Exponents:</strong> <span id="dance-exponents" style="color: var(--text-main);">Exponents</span></div>
            </div>
          </div>
        </div>

        <!-- SECTION 2: Census 2011 extremes -->
        <div class="glass-card" style="padding: 24px;">
          <h3 style="font-size: 16px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; color: var(--text-main);">
            <span>📊</span> Census 2011 Demographics
          </h3>
          <p style="font-size: 12.5px; color: var(--text-muted); margin-bottom: 16px;">
            Compare extreme states and UT ratios recorded during Census 2011.
          </p>

          <div style="display: flex; gap: 10px; margin-bottom: 20px;">
            ${Object.keys(this.censusData).map(key => `
              <button class="census-select-btn ${key === this.activeCensusMetric ? 'active' : ''}"
                      style="flex: 1; padding: 10px; font-size: 12px; font-weight: 600; border-radius: var(--radius-sm); border: 1px solid var(--border-glass); background: ${key === this.activeCensusMetric ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255,255,255,0.02)'}; color: ${key === this.activeCensusMetric ? 'var(--accent-cyan)' : 'var(--text-muted)'}; cursor: pointer; transition: all 0.3s;"
                      data-metric="${key}">
                ${key === 'literacy' ? 'Literacy' : key === 'sexratio' ? 'Sex Ratio' : 'Density'}
              </button>
            `).join('')}
          </div>

          <div class="glass-card" style="padding: 16px; background: rgba(255,255,255,0.01); border-color: rgba(6, 182, 212, 0.15); min-height: 180px;">
            <h4 id="census-metric-title" style="font-size: 14px; margin-bottom: 16px; color: var(--text-main); font-family: var(--font-title); border-bottom: 1px solid var(--border-glass); padding-bottom: 8px;">Metric Title</h4>
            
            <div style="display: flex; flex-direction: column; gap: 16px; font-size: 13px;">
              <!-- High State -->
              <div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                  <span>🥇 Highest State: <strong id="census-high-state">State</strong></span>
                </div>
                <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.05); border-radius: 3px; overflow: hidden;">
                  <div id="census-high-bar" style="width: 0%; height: 100%; transition: all 0.5s;"></div>
                </div>
              </div>

              <!-- Low State -->
              <div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                  <span>🥈 Lowest State: <strong id="census-low-state">State</strong></span>
                </div>
                <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.05); border-radius: 3px; overflow: hidden;">
                  <div id="census-low-bar" style="width: 0%; height: 100%; transition: all 0.5s;"></div>
                </div>
              </div>

              <!-- UT details -->
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; border-top: 1px solid rgba(255,255,255,0.04); padding-top: 12px; font-size: 12px;">
                <div>🌟 <strong>Highest UT:</strong> <span id="census-high-ut" style="color: var(--text-main);">Lakshadweep</span></div>
                <div>💀 <strong>Lowest UT:</strong> <span id="census-low-ut" style="color: var(--text-main);">DNH</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SECTION 3: Musical Instruments Maestros list -->
      <div class="glass-card" style="padding: 24px; margin-bottom: 32px;">
        <h3 style="font-size: 16px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; color: var(--text-main);">
          <span>🪕</span> Musical Instruments &amp; Maestros
        </h3>
        <p style="font-size: 12.5px; color: var(--text-muted); margin-bottom: 16px;">
          Explore Maestros associated with key classical instruments targeted by TCS.
        </p>

        <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; margin-bottom: 20px;">
          ${Object.keys(this.instruments).map(key => `
            <button class="inst-select-btn ${key === this.activeInstrument ? 'active' : ''}"
                    style="padding: 12px 10px; font-size: 13px; font-weight: 600; border-radius: var(--radius-sm); border: 1px solid var(--border-glass); background: ${key === this.activeInstrument ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.02)'}; color: ${key === this.activeInstrument ? 'var(--accent-emerald)' : 'var(--text-muted)'}; cursor: pointer; transition: all 0.3s; display: flex; flex-direction: column; align-items: center; gap: 6px;"
                    data-inst="${key}">
              <span style="font-size: 20px;">${this.instruments[key].icon}</span>
              <span>${this.instruments[key].name}</span>
            </button>
          `).join('')}
        </div>

        <div class="glass-card" style="padding: 20px; background: rgba(255,255,255,0.01); border-color: rgba(16, 185, 129, 0.15); display: flex; align-items: center; gap: 16px;">
          <div id="inst-panel-icon" style="font-size: 36px; background: rgba(16, 185, 129, 0.05); width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 50%; border: 1px solid rgba(16, 185, 129, 0.15);">🪕</div>
          <div>
            <h4 id="inst-panel-name" style="font-size: 16px; color: var(--text-main); margin-bottom: 6px;">Instrument Name</h4>
            <p id="inst-panel-exponents" style="font-size: 13.5px; color: var(--text-muted); line-height: 1.6; margin: 0;">Maestros list</p>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    this.updateDanceDetails();
    this.updateCensusDetails();
    this.updateInstrumentDetails();
  },

  bindEvents() {
    // Dance tabs
    const danceBtns = document.querySelectorAll('.dance-select-btn');
    danceBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        danceBtns.forEach(b => {
          b.style.background = 'rgba(255,255,255,0.02)';
          b.style.color = 'var(--text-muted)';
        });
        const target = e.currentTarget;
        target.style.background = 'rgba(139, 92, 246, 0.15)';
        target.style.color = 'var(--accent-purple)';
        this.activeDanceIdx = parseInt(target.dataset.idx);
        this.updateDanceDetails();
        addXP(10, 'staticgk', 'Static GK item explored');
      });
    });

    // Census tabs
    const censusBtns = document.querySelectorAll('.census-select-btn');
    censusBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        censusBtns.forEach(b => {
          b.style.background = 'rgba(255,255,255,0.02)';
          b.style.color = 'var(--text-muted)';
        });
        const target = e.currentTarget;
        target.style.background = 'rgba(6, 182, 212, 0.15)';
        target.style.color = 'var(--accent-cyan)';
        this.activeCensusMetric = target.dataset.metric;
        this.updateCensusDetails();
        addXP(10, 'staticgk', 'Static GK item explored');
      });
    });

    // Instrument tabs
    const instBtns = document.querySelectorAll('.inst-select-btn');
    instBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        instBtns.forEach(b => {
          b.style.background = 'rgba(255,255,255,0.02)';
          b.style.color = 'var(--text-muted)';
        });
        const target = e.currentTarget;
        target.style.background = 'rgba(16, 185, 129, 0.15)';
        target.style.color = 'var(--accent-emerald)';
        this.activeInstrument = target.dataset.inst;
        this.updateInstrumentDetails();
        addXP(10, 'staticgk', 'Static GK item explored');
      });
    });
  },

  updateDanceDetails() {
    const d = this.dances[this.activeDanceIdx];
    if (!d) return;

    document.getElementById('dance-state').textContent = d.state;
    document.getElementById('dance-name').textContent = d.name;
    document.getElementById('dance-facts').textContent = d.facts;
    document.getElementById('dance-exponents').textContent = d.exponents;
    document.getElementById('dance-bg-icon').textContent = d.icon;
  },

  updateCensusDetails() {
    const c = this.censusData[this.activeCensusMetric];
    if (!c) return;

    document.getElementById('census-metric-title').textContent = c.title;
    document.getElementById('census-high-state').textContent = c.highState;
    document.getElementById('census-low-state').textContent = c.lowState;
    document.getElementById('census-high-ut').textContent = c.highUt;
    document.getElementById('census-low-ut').textContent = c.lowUt;

    const highBar = document.getElementById('census-high-bar');
    const lowBar = document.getElementById('census-low-bar');

    if (highBar && lowBar) {
      highBar.style.width = `${c.highVal}%`;
      highBar.style.background = c.color;
      highBar.style.boxShadow = `0 0 8px ${c.color}`;

      lowBar.style.width = `${c.lowVal}%`;
      lowBar.style.background = c.color;
      lowBar.style.boxShadow = `0 0 8px ${c.color}`;
    }
  },

  updateInstrumentDetails() {
    const inst = this.instruments[this.activeInstrument];
    if (!inst) return;

    document.getElementById('inst-panel-icon').textContent = inst.icon;
    document.getElementById('inst-panel-name').textContent = inst.name;
    document.getElementById('inst-panel-exponents').textContent = inst.exponents;
  },

  renderNotes() {
    const container = document.getElementById('staticgk-notes-container');
    if (!container) return;

    let html = '';

    // Hero banner
    html += `
      <div class="notes-hero-banner" style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(16, 185, 129, 0.08) 100%); border-color: rgba(139, 92, 246, 0.25);">
        <div class="notes-hero-icon">🏛️</div>
        <div>
          <h2>Static GK — Core CGL Notes</h2>
          <p>Classical Dances &amp; Exponents · Musical Instrument Maestros · Census 2011 extremes · National Parks · Harvest Festivals</p>
        </div>
      </div>
    `;

    // Table of Contents
    html += `<div class="notes-toc">
      <h4>📑 Table of Contents</h4>
      <div class="toc-grid">`;
    STATIC_GK_NOTES_SECTIONS.forEach(sec => {
      html += `<a href="#gk-sec-${sec.id}" class="toc-item" onclick="event.preventDefault(); document.getElementById('gk-sec-${sec.id}').scrollIntoView({behavior:'smooth', block:'start'})">
        <span class="toc-icon">${sec.icon}</span>
        <span class="toc-text">${sec.title}</span>
      </a>`;
    });
    html += `</div></div>`;

    // Sections
    STATIC_GK_NOTES_SECTIONS.forEach(sec => {
      const typeClass = sec.type === 'highlight' ? 'notes-section-highlight' :
                        sec.type === 'table'     ? 'notes-section-table' :
                        sec.type === 'info'      ? 'notes-section-info' :
                                                   'notes-section-standard';

      html += `
        <div class="notes-section ${typeClass}" id="gk-sec-${sec.id}">
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

    // Quiz Section
    html += `
      <div class="notes-section notes-section-quiz" id="gk-sec-pyq-quiz">
        <div class="notes-section-header">
          <span class="notes-section-icon">📝</span>
          <h3>Static GK PYQ Quiz — 15 MCQs</h3>
        </div>
        <div class="notes-section-body">
          <p>Test your active memory on dances, exponents, musical maestros, census statistics, and harvest festivals with <strong>15 authentic CGL questions</strong>.</p>
          <div class="pyq-controls">
            <button class="btn btn-primary" id="btn-gk-start-pyq" style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);">Start Full Quiz (15 Questions)</button>
            <button class="btn btn-secondary" id="btn-gk-random-5">Quick 5 Random PYQs</button>
          </div>
          <div id="gk-pyq-quiz-area" class="pyq-quiz-area hidden"></div>
          <div id="gk-pyq-result-area" class="pyq-result-area hidden"></div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    this.setupPYQQuiz();
  },

  setupPYQQuiz() {
    const startBtn = document.getElementById('btn-gk-start-pyq');
    const randomBtn = document.getElementById('btn-gk-random-5');

    if (startBtn) {
      startBtn.addEventListener('click', () => this.startPYQ(STATIC_GK_PYQ_DATA.slice()));
    }
    if (randomBtn) {
      randomBtn.addEventListener('click', () => {
        const shuffled = [...STATIC_GK_PYQ_DATA].sort(() => Math.random() - 0.5);
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
    document.getElementById('gk-pyq-quiz-area')?.classList.remove('hidden');
    document.getElementById('gk-pyq-result-area')?.classList.add('hidden');
    this.renderPYQQuestion();
  },

  renderPYQQuestion() {
    const area = document.getElementById('gk-pyq-quiz-area');
    if (!area) return;

    const { questions, currentIdx } = this.pyqState;
    const q = questions[currentIdx];
    const progress = ((currentIdx + 1) / questions.length * 100).toFixed(0);

    const sectionColors = { A: '#06b6d4', B: '#3b82f6', C: '#10b981', D: '#8b5cf6' };
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
    if (currentIdx > 0) html += `<button class="btn btn-secondary" id="gk-pyq-prev">← Previous</button>`;
    if (currentIdx < questions.length - 1) {
      html += `<button class="btn btn-primary" id="gk-pyq-next">Next →</button>`;
    } else if (this.pyqState.answered[currentIdx] !== null) {
      html += `<button class="btn btn-primary" id="gk-pyq-finish" style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);">View Results 🏆</button>`;
    }
    html += `</div>`;

    area.innerHTML = html;

    area.querySelectorAll('.pyq-option:not([disabled])').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.optIdx);
        this.pyqState.answered[currentIdx] = idx;
        if (idx === q.answer) {
          this.pyqState.score++;
          addXP(15, 'staticgk', 'Static GK PYQ answered');
        }
        this.renderPYQQuestion();
      });
    });

    document.getElementById('gk-pyq-prev')?.addEventListener('click', () => {
      this.pyqState.currentIdx--;
      this.renderPYQQuestion();
    });
    document.getElementById('gk-pyq-next')?.addEventListener('click', () => {
      this.pyqState.currentIdx++;
      this.renderPYQQuestion();
    });
    document.getElementById('gk-pyq-finish')?.addEventListener('click', () => {
      this.showPYQResults();
    });
  },

  showPYQResults() {
    const area = document.getElementById('gk-pyq-quiz-area');
    const resultArea = document.getElementById('gk-pyq-result-area');
    if (!resultArea) return;

    area?.classList.add('hidden');
    resultArea.classList.remove('hidden');

    const { questions, score } = this.pyqState;
    const total = questions.length;
    const percent = ((score / total) * 100).toFixed(0);

    let grade = '';
    if (percent >= 90) grade = '🏆 Cultured Scholar! You have mastered Static GK!';
    else if (percent >= 70) grade = '🎯 Great memory! You know your classical exponents and census landmarks.';
    else if (percent >= 50) grade = '📚 Good job. Review the list of musical instruments and harvest festivals.';
    else grade = '💪 Keep reading. Focus on classical dances, states, and the 2011 Census extremes.';

    resultArea.innerHTML = `
      <div class="pyq-results-card">
        <div class="pyq-trophy" style="animation: float 4s ease-in-out infinite;">🏛️</div>
        <h3>Static GK Quiz Results</h3>
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
          <button class="btn btn-primary" id="gk-pyq-retry" style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);">Retry Quiz</button>
          <button class="btn btn-secondary" id="gk-pyq-review">Review Answers</button>
        </div>
      </div>
    `;

    document.getElementById('gk-pyq-retry')?.addEventListener('click', () => {
      resultArea.classList.add('hidden');
      this.startPYQ([...STATIC_GK_PYQ_DATA]);
    });
    document.getElementById('gk-pyq-review')?.addEventListener('click', () => {
      resultArea.classList.add('hidden');
      this.pyqState.currentIdx = 0;
      document.getElementById('gk-pyq-quiz-area')?.classList.remove('hidden');
      this.renderPYQQuestion();
    });
  }
};
