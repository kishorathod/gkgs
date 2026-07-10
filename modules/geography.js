/* ==========================================================================
   Geography Module (modules/geography.js)
   Renders the interactive river map hotspots, detailed Indian Geography
   exam notes (Physiography, Rivers, Lakes, Mountain Passes) + 22 PYQs.
   ========================================================================== */

import { addXP } from '../app.js';
import { GEOGRAPHY_NOTES_SECTIONS, GEOGRAPHY_PYQ_DATA } from './geography-notes-data.js';

// River systems detailed focus facts (for interactive map tab)
const RIVERS_DATA = {
  indus: {
    name: "Indus River System",
    type: "Himalayan Drainage",
    origin: "Bokhar Chu Glacier, Tibet (near Mansarovar Lake)",
    tributaries: "Jhelum, Chenab, Ravi, Beas, Sutlej (Left Bank); Shyok, Gilgit, Kabul (Right Bank)",
    dams: "Harike Barrage (confluence of Beas & Sutlej), Bhakra Nangal (on Sutlej)",
    cities: "Leh, Srinagar (on Jhelum bank)",
    sscFocus: "Indus Water Treaty (1960) gives India exclusive rights over Ravi, Beas, and Sutlej. Chenab is the largest tributary of Indus. Jhelum rises in Verinag Spring."
  },
  ganga: {
    name: "Ganga River System",
    type: "Himalayan Drainage",
    origin: "Devprayag (Confluence of Bhagirathi and Alaknanda)",
    tributaries: "Yamuna, Son, Punpun (Right Bank); Ramganga, Ghaghara, Gandak, Kosi, Gomti (Left Bank)",
    dams: "Tehri Dam (on Bhagirathi), Farakka Barrage (West Bengal)",
    cities: "Haridwar, Kanpur, Prayagraj, Varanasi, Patna",
    sscFocus: "Declared National River of India in 2008. The confluence of Ganga and Yamuna occurs at Prayagraj (Sangam). Kosi is called the 'Sorrow of Bihar'. Ganga meets Brahmaputra in Bangladesh to form Padma, which drains into Bay of Bengal via Meghna."
  },
  brahmaputra: {
    name: "Brahmaputra River System",
    type: "Himalayan Drainage",
    origin: "Chemayungdung/Angsi Glacier, Tibet",
    tributaries: "Subansiri, Kameng, Manas, Sankosh (Right Bank); Dibang, Lohit, Dhansiri, Burhi Dihing (Left Bank)",
    dams: "Rangadi Dam (Arunachal Pradesh)",
    cities: "Dibrugarh, Guwahati, Tezpur",
    sscFocus: "Known as Tsangpo in Tibet, Dihang in Arunachal Pradesh, Brahmaputra in Assam, and Jamuna in Bangladesh. Forms Majuli Island in Assam — the world's largest river island."
  },
  narmada: {
    name: "Narmada River System",
    type: "West Flowing Peninsular",
    origin: "Amarkantak Hills, Madhya Pradesh",
    tributaries: "Hiran, Orsang, Barna, Tawa, Kolar",
    dams: "Sardar Sarovar Dam (Gujarat), Indira Sagar Dam (Madhya Pradesh)",
    cities: "Jabalpur, Hoshangabad, Omkareshwar, Bharuch",
    sscFocus: "Flows westwards through a rift valley between Vindhya and Satpura ranges. Creates the famous Dhuandhar Falls near Jabalpur. Forms an estuary instead of a delta."
  },
  godavari: {
    name: "Godavari River System",
    type: "East Flowing Peninsular",
    origin: "Trimbakeshwar, Nashik District, Maharashtra",
    tributaries: "Penganga, Wainganga, Wardha (combined as Pranhita), Indravati, Manjira, Sabari",
    dams: "Jayakwadi Dam, Polavaram Project, Sriram Sagar",
    cities: "Nashik, Nanded, Bhadrachalam, Rajahmundry",
    sscFocus: "Also known as the 'Dakshin Ganga' or 'Vriddha Ganga'. It is the longest Peninsular River of India (1,465 km) and second longest river overall in India."
  },
  mahanadi: {
    name: "Mahanadi River System",
    type: "East Flowing Peninsular",
    origin: "Sihawa Highlands, Dhamtari District, Chhattisgarh",
    tributaries: "Seonath, Hasdeo, Mand, Ib, Jonk, Tel",
    dams: "Hirakud Dam (Odisha) — one of the longest earthen dams in the world.",
    cities: "Raipur, Sambalpur, Cuttack",
    sscFocus: "Flows through Chhattisgarh and Odisha. Seonath is its longest tributary. Silt deposition rate is very high, causing frequent delta shifts."
  }
};

export const geographyModule = {
  activeTab: "map",
  pyqState: {
    active: false,
    questions: [],
    currentIdx: 0,
    answered: [],
    score: 0
  },

  init() {
    this.setupHotspots();
    this.setupTabs();
    this.renderNotes();
  },

  // ── Tab Switching ──────────────────────────────────────────────────────
  setupTabs() {
    const mapBtn = document.getElementById('btn-geography-map-tab');
    const notesBtn = document.getElementById('btn-geography-notes-tab');

    if (mapBtn) mapBtn.addEventListener('click', () => this.switchTab('map'));
    if (notesBtn) notesBtn.addEventListener('click', () => this.switchTab('notes'));
  },

  switchTab(tab) {
    this.activeTab = tab;

    document.querySelectorAll('.geography-tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`.geography-tab-btn[data-tab="${tab}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    const mapContent = document.getElementById('geography-map-tab-content');
    const notesContent = document.getElementById('geography-notes-tab-content');

    if (tab === 'map') {
      mapContent?.classList.remove('hidden');
      notesContent?.classList.add('hidden');
    } else {
      mapContent?.classList.add('hidden');
      notesContent?.classList.remove('hidden');
    }

    addXP(5, 'geography', 'Browsed Geography tab');
  },

  // ── Notes Rendering ────────────────────────────────────────────────────
  renderNotes() {
    const container = document.getElementById('geography-notes-container');
    if (!container) return;

    let html = '';

    // Hero banner
    html += `
      <div class="notes-hero-banner" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 182, 212, 0.08) 100%); border-color: rgba(6, 182, 212, 0.25);">
        <div class="notes-hero-icon">🗺️</div>
        <div>
          <h2>Indian Geography — Complete SSC CGL Notes</h2>
          <p>Physiographic Divisions · Himalayan &amp; Peninsular River Systems · Lakes Matrix · Mountain Passes Cheat Sheet</p>
        </div>
      </div>
    `;

    // Table of Contents
    html += `<div class="notes-toc">
      <h4>📑 Table of Contents</h4>
      <div class="toc-grid">`;
    GEOGRAPHY_NOTES_SECTIONS.forEach(sec => {
      html += `<a href="#geo-sec-${sec.id}" class="toc-item" onclick="event.preventDefault(); document.getElementById('geo-sec-${sec.id}').scrollIntoView({behavior:'smooth', block:'start'})">
        <span class="toc-icon">${sec.icon}</span>
        <span class="toc-text">${sec.title}</span>
      </a>`;
    });
    html += `</div></div>`;

    // Render each section
    GEOGRAPHY_NOTES_SECTIONS.forEach(sec => {
      const typeClass = sec.type === 'highlight' ? 'notes-section-highlight' :
                        sec.type === 'table'     ? 'notes-section-table' :
                        sec.type === 'info'      ? 'notes-section-info' :
                                                   'notes-section-standard';

      html += `
        <div class="notes-section ${typeClass}" id="geo-sec-${sec.id}">
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
      <div class="notes-section notes-section-quiz" id="geo-sec-pyq-quiz">
        <div class="notes-section-header">
          <span class="notes-section-icon">📝</span>
          <h3>Indian Geography PYQ Quiz — 22 MCQs</h3>
        </div>
        <div class="notes-section-body">
          <p>Test your knowledge with <strong>22 authentic previous year questions</strong> covering Physiography, River Systems, and Lakes.</p>
          <div class="pyq-controls">
            <button class="btn btn-primary" id="btn-geo-start-pyq" style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);">Start Full Quiz (22 Questions)</button>
            <button class="btn btn-secondary" id="btn-geo-random-10">Quick 10 Random PYQs</button>
          </div>
          <div id="geo-pyq-quiz-area" class="pyq-quiz-area hidden"></div>
          <div id="geo-pyq-result-area" class="pyq-result-area hidden"></div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    this.setupPYQQuiz();
  },

  // ── PYQ Quiz Logic ─────────────────────────────────────────────────────
  setupPYQQuiz() {
    const startBtn = document.getElementById('btn-geo-start-pyq');
    const randomBtn = document.getElementById('btn-geo-random-10');

    if (startBtn) {
      startBtn.addEventListener('click', () => this.startPYQ(GEOGRAPHY_PYQ_DATA.slice()));
    }
    if (randomBtn) {
      randomBtn.addEventListener('click', () => {
        const shuffled = [...GEOGRAPHY_PYQ_DATA].sort(() => Math.random() - 0.5);
        this.startPYQ(shuffled.slice(0, 10));
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
    document.getElementById('geo-pyq-quiz-area')?.classList.remove('hidden');
    document.getElementById('geo-pyq-result-area')?.classList.add('hidden');
    this.renderPYQQuestion();
  },

  renderPYQQuestion() {
    const area = document.getElementById('geo-pyq-quiz-area');
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
    if (currentIdx > 0) html += `<button class="btn btn-secondary" id="geo-pyq-prev">← Previous</button>`;
    if (currentIdx < questions.length - 1) {
      html += `<button class="btn btn-primary" id="geo-pyq-next">Next →</button>`;
    } else if (this.pyqState.answered[currentIdx] !== null) {
      html += `<button class="btn btn-primary" id="geo-pyq-finish" style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);">View Results 🏆</button>`;
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
          addXP(15, 'geography', 'Clicked river/hotspot');
        }
        this.renderPYQQuestion();
      });
    });

    document.getElementById('geo-pyq-prev')?.addEventListener('click', () => {
      this.pyqState.currentIdx--;
      this.renderPYQQuestion();
    });
    document.getElementById('geo-pyq-next')?.addEventListener('click', () => {
      this.pyqState.currentIdx++;
      this.renderPYQQuestion();
    });
    document.getElementById('geo-pyq-finish')?.addEventListener('click', () => {
      this.showPYQResults();
    });
  },

  showPYQResults() {
    const area = document.getElementById('geo-pyq-quiz-area');
    const resultArea = document.getElementById('geo-pyq-result-area');
    if (!resultArea) return;

    area?.classList.add('hidden');
    resultArea.classList.remove('hidden');

    const { questions, score } = this.pyqState;
    const total = questions.length;
    const percent = ((score / total) * 100).toFixed(0);

    let grade = '';
    if (percent >= 90) grade = '🏆 Outstanding! You have mastered Indian Geography for CGL!';
    else if (percent >= 70) grade = '🎯 Great accuracy on rivers and lake features!';
    else if (percent >= 50) grade = '📚 Good attempt! Revise the Left/Right bank matrices and lake superlatives.';
    else grade = '💪 Keep practising! Focus on river tributaries and mountain passes.';

    resultArea.innerHTML = `
      <div class="pyq-results-card">
        <div class="pyq-trophy" style="animation: float 4s ease-in-out infinite;">🗺️</div>
        <h3>Indian Geography Quiz Results</h3>
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
          <button class="btn btn-primary" id="geo-pyq-retry" style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);">Retry Quiz</button>
          <button class="btn btn-secondary" id="geo-pyq-review">Review Answers</button>
        </div>
      </div>
    `;

    document.getElementById('geo-pyq-retry')?.addEventListener('click', () => {
      resultArea.classList.add('hidden');
      this.startPYQ([...GEOGRAPHY_PYQ_DATA]);
    });
    document.getElementById('geo-pyq-review')?.addEventListener('click', () => {
      resultArea.classList.add('hidden');
      this.pyqState.currentIdx = 0;
      document.getElementById('geo-pyq-quiz-area')?.classList.remove('hidden');
      this.renderPYQQuestion();
    });
  },

  // ── Interactive Map Hotspot Logic ─────────────────────────────────────
  setupHotspots() {
    const hotspots = document.querySelectorAll('.hotspot');
    const promptEl = document.querySelector('#map-info-panel .empty-prompt');
    const contentEl = document.getElementById('map-info-content');

    hotspots.forEach(hs => {
      hs.addEventListener('click', () => {
        hotspots.forEach(h => h.classList.remove('active'));
        hs.classList.add('active');

        const riverKey = hs.dataset.river;
        const data = RIVERS_DATA[riverKey];
        if (data) {
          if (promptEl) promptEl.classList.add('hidden');
          if (contentEl) contentEl.classList.remove('hidden');

          document.getElementById('river-sys-type').textContent = data.type;
          document.getElementById('river-name').textContent = data.name;
          document.getElementById('river-origin').textContent = data.origin;
          document.getElementById('river-tribs').textContent = data.tributaries;
          document.getElementById('river-dams').textContent = data.dams;
          document.getElementById('river-cities').textContent = data.cities;
          document.getElementById('river-ssc-focus').textContent = data.sscFocus;

          addXP(20, 'geography', 'Geography PYQ answered');
        }
      });
    });
  }
};
