/* ==========================================================================
   History Module (modules/history.js)
   Renders the interactive historical timeline of Indian History,
   detailed Modern History exam notes, and interactive history PYQ quiz.
   ========================================================================== */

import { addXP, markGoalReadNotes } from '../app.js';
import { HISTORY_NOTES_SECTIONS, HISTORY_PYQ_DATA } from './history-notes-data.js';

// High-yield SSC CGL History timeline database (for Timeline tab)
const TIMELINE_DATA = [
  {
    id: 1,
    year: "c. 2500 – 1900 BC",
    title: "Indus Valley Civilization (Harappan Era)",
    era: "ancient",
    shortDesc: "The peak of India's earliest urban culture, famous for planned towns, metallurgy, and seal art.",
    longDesc: "The Indus Valley Civilization (IVC) is one of the world's oldest urban settlements. Major sites like Harappa (discovered by Daya Ram Sahni in 1921) and Mohenjo-daro (discovered by R.D. Banerji in 1922) showcased unparalleled engineering, drainage systems, and granaries. Lothal was a key ancient dockyard, while Kalibangan showed evidence of ploughed fields.",
    questions: [
      "Which site has evidence of a dockyard? (Answer: Lothal)",
      "Who discovered Harappa in 1921? (Answer: Daya Ram Sahni)",
      "Which IVC site is famous for the Great Bath? (Answer: Mohenjo-daro)"
    ]
  },
  {
    id: 2,
    year: "322 BC",
    title: "Ascension of Chandragupta Maurya",
    era: "ancient",
    shortDesc: "Founding of the Maurya Empire with Chanakya's guidance, defeating the Nanda Dynasty.",
    longDesc: "Chandragupta Maurya overthrown the Nanda dynasty's Dhanananda to establish the vast Mauryan empire, guided by his advisor Chanakya (Kautilya), author of Arthashastra. Megasthenes visited his court as a Greek ambassador sent by Seleucus Nicator and wrote 'Indica'.",
    questions: [
      "Who wrote the book 'Indica'? (Answer: Megasthenes)",
      "Who was the prime minister of Chandragupta Maurya? (Answer: Chanakya / Kautilya)",
      "Which Greek ruler did Chandragupta Maurya defeat? (Answer: Seleucus Nicator)"
    ]
  },
  {
    id: 3,
    year: "1556 AD",
    title: "Second Battle of Panipat",
    era: "medieval",
    shortDesc: "Akbar defeats Hemu, securing the Mughal Empire and initiating an era of centralization.",
    longDesc: "Fought between Akbar (under the regency of Bairam Khan) and Hem Chandra Vikramaditya (Hemu), the general of Adil Shah Suri. The victory consolidated Mughal rule in northern India. Akbar went on to implement the Mansabdari system, constructed Fatehpur Sikri, and propagated the syncretic religion Din-i-Illahi.",
    questions: [
      "Between whom was the Second Battle of Panipat fought? (Answer: Akbar and Hemu)",
      "Who was Akbar's regent in his early years? (Answer: Bairam Khan)",
      "Who introduced the Mansabdari administrative system? (Answer: Akbar)"
    ]
  },
  {
    id: 4,
    year: "1757 AD",
    title: "Battle of Plassey",
    era: "modern",
    shortDesc: "Robert Clive defeats Siraj-ud-Daulah, laying the foundation of British rule in Bengal.",
    longDesc: "Fought on June 23, 1757, on the banks of Bhagirathi River in Palashi. The British East India Company under Robert Clive defeated the last independent Nawab of Bengal, Siraj-ud-Daulah, who was betrayed by his army commander Mir Jafar. This battle marked the political ascendancy of the British in India.",
    questions: [
      "Who led the British forces in the Battle of Plassey? (Answer: Robert Clive)",
      "Who betrayed Nawab Siraj-ud-Daulah in the battle? (Answer: Mir Jafar)",
      "In which year was the Battle of Plassey fought? (Answer: 1757)"
    ]
  },
  {
    id: 5,
    year: "1857 AD",
    title: "The Revolt of 1857 (Sepoy Mutiny)",
    era: "modern",
    shortDesc: "The First War of Independence, starting at Meerut and spreading rapidly across North India.",
    longDesc: "Triggered by the introduction of greased cartridges, the revolt broke out on May 10, 1857, in Meerut. Key figures included Mangal Pandey (Barrackpore), Rani Lakshmibai (Jhansi), Bahadur Shah Zafar (Delhi), Kunwar Singh (Bihar), and Begum Hazrat Mahal (Lucknow). It led to the dissolution of East India Company rule and direct governance by the British Crown (Govt of India Act 1858).",
    questions: [
      "Where did the revolt of 1857 start? (Answer: Meerut)",
      "Who was the British Governor-General during the 1857 revolt? (Answer: Lord Canning)",
      "Who led the revolt of 1857 in Bihar? (Answer: Kunwar Singh)"
    ]
  },
  {
    id: 6,
    year: "1915 AD",
    title: "Return of Mahatma Gandhi from South Africa",
    era: "modern",
    shortDesc: "Gandhi returns to India, launching satyagrahas in Champaran, Kheda, and Ahmedabad.",
    longDesc: "Mahatma Gandhi returned to India on January 9, 1915 (commemorated as Pravasi Bharatiya Divas). Encouraged by Gopal Krishna Gokhale (his political guru), he toured India and launched his first Satyagraha in Champaran (Bihar) in 1917 to support indigo farmers against the Tinkathia system, followed by Kheda Satyagraha (1918) and Ahmedabad Mill Strike (1918).",
    questions: [
      "When did Mahatma Gandhi return to India from South Africa? (Answer: 9th January 1915)",
      "Which was Mahatma Gandhi's first Satyagraha in India? (Answer: Champaran Satyagraha in 1917)",
      "Who was political guru of Mahatma Gandhi? (Answer: Gopal Krishna Gokhale)"
    ]
  }
];

export const historyModule = {
  activeTab: "timeline", // 'timeline' or 'notes'
  pyqState: {
    active: false,
    questions: [],
    currentIdx: 0,
    answered: [],
    score: 0,
    showingResult: false
  },

  init() {
    this.renderEvents("all");
    this.setupFilters();
    this.setupModal();
    this.setupTabs();
    this.renderNotes();
  },

  // ── Tab Switching ────────────────────────────────────────────────────
  setupTabs() {
    const timelineBtn = document.getElementById('btn-history-timeline-tab');
    const notesBtn = document.getElementById('btn-history-notes-tab');

    if (timelineBtn) {
      timelineBtn.addEventListener('click', () => this.switchTab('timeline'));
    }
    if (notesBtn) {
      notesBtn.addEventListener('click', () => this.switchTab('notes'));
    }
  },

  switchTab(tab) {
    this.activeTab = tab;

    // Toggle active classes on buttons
    document.querySelectorAll('.history-tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`.history-tab-btn[data-tab="${tab}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // Toggle content panes
    const timelineContent = document.getElementById('history-timeline-tab-content');
    const notesContent = document.getElementById('history-notes-tab-content');

    if (tab === 'timeline') {
      timelineContent?.classList.remove('hidden');
      notesContent?.classList.add('hidden');
    } else {
      timelineContent?.classList.add('hidden');
      notesContent?.classList.remove('hidden');
      markGoalReadNotes(); // Mark 'read notes' goal complete
    }

    addXP(5, 'history', 'Browsed History tab');
  },

  // ── Notes Rendering ──────────────────────────────────────────────────
  renderNotes() {
    const container = document.getElementById('history-notes-container');
    if (!container) return;

    let html = '';

    // Title banner
    html += `
      <div class="notes-hero-banner" style="background: linear-gradient(135deg, rgba(236, 72, 153, 0.12) 0%, rgba(139, 92, 246, 0.08) 100%); border-color: rgba(236, 72, 153, 0.2);">
        <div class="notes-hero-icon">⚔️</div>
        <div>
          <h2>Modern Indian History — Complete Study Notes</h2>
          <p>Verbatim notes covering Governor-Generals, Congress, Socio-Religious reforms, Revolutionary movements, and Gandhian timelines.</p>
        </div>
      </div>
    `;

    // Table of Contents
    html += `<div class="notes-toc">
      <h4>📑 Table of Contents</h4>
      <div class="toc-grid">`;
    HISTORY_NOTES_SECTIONS.forEach((sec, i) => {
      html += `<a href="#hist-sec-${sec.id}" class="toc-item" onclick="event.preventDefault(); document.getElementById('hist-sec-${sec.id}').scrollIntoView({behavior:'smooth', block:'start'})">
        <span class="toc-icon">${sec.icon}</span>
        <span class="toc-text">${sec.title}</span>
      </a>`;
    });
    html += `</div></div>`;

    // Render each section
    HISTORY_NOTES_SECTIONS.forEach(sec => {
      const typeClass = sec.type === 'highlight' ? 'notes-section-highlight' :
                        sec.type === 'table' ? 'notes-section-table' :
                        sec.type === 'info' ? 'notes-section-info' :
                        'notes-section-standard';

      html += `
        <div class="notes-section ${typeClass}" id="hist-sec-${sec.id}">
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
      <div class="notes-section notes-section-quiz" id="hist-sec-pyq-quiz">
        <div class="notes-section-header">
          <span class="notes-section-icon">📝</span>
          <h3>Modern History PYQ Quiz — 50 MCQs</h3>
        </div>
        <div class="notes-section-body">
          <p>Test your knowledge with <strong>50 authentic previous year questions</strong> covering all periods of Modern Indian History.</p>
          <div class="pyq-controls">
            <button class="btn btn-primary" id="btn-hist-start-pyq" style="background: var(--grad-primary);">Start PYQ Quiz (50 Questions)</button>
            <button class="btn btn-secondary" id="btn-hist-random-10">Quick 10 Random PYQs</button>
          </div>
          <div id="hist-pyq-quiz-area" class="pyq-quiz-area hidden"></div>
          <div id="hist-pyq-result-area" class="pyq-result-area hidden"></div>
        </div>
      </div>
    `;

    container.innerHTML = html;

    // Attach PYQ quiz events
    this.setupPYQQuiz();
  },

  // ── PYQ Quiz Logic ────────────────────────────────────────────────────
  setupPYQQuiz() {
    const startBtn = document.getElementById('btn-hist-start-pyq');
    const randomBtn = document.getElementById('btn-hist-random-10');

    if (startBtn) {
      startBtn.addEventListener('click', () => this.startPYQ(HISTORY_PYQ_DATA.slice()));
    }
    if (randomBtn) {
      randomBtn.addEventListener('click', () => {
        const shuffled = [...HISTORY_PYQ_DATA].sort(() => Math.random() - 0.5);
        this.startPYQ(shuffled.slice(0, 10));
      });
    }
  },

  startPYQ(questions) {
    this.pyqState = {
      active: true,
      questions: questions,
      currentIdx: 0,
      answered: new Array(questions.length).fill(null),
      score: 0,
      showingResult: false
    };
    document.getElementById('hist-pyq-quiz-area')?.classList.remove('hidden');
    document.getElementById('hist-pyq-result-area')?.classList.add('hidden');
    this.renderPYQQuestion();
  },

  renderPYQQuestion() {
    const area = document.getElementById('hist-pyq-quiz-area');
    if (!area) return;

    const { questions, currentIdx } = this.pyqState;
    const q = questions[currentIdx];
    const progress = ((currentIdx + 1) / questions.length * 100).toFixed(0);

    let html = `
      <div class="pyq-progress-bar">
        <div class="pyq-progress-fill" style="width: ${progress}%; background: var(--grad-primary);"></div>
      </div>
      <div class="pyq-question-header">
        <span class="pyq-section-tag" style="background: rgba(236, 72, 153, 0.08); color: var(--accent-pink);">Section ${q.section}: ${q.sectionTitle}</span>
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

    // Show answer explanation if answered
    if (this.pyqState.answered[currentIdx] !== null) {
      const isCorrect = this.pyqState.answered[currentIdx] === q.answer;
      html += `
        <div class="pyq-feedback ${isCorrect ? 'pyq-feedback-correct' : 'pyq-feedback-wrong'}">
          <span class="pyq-feedback-icon">${isCorrect ? '✅' : '❌'}</span>
          <span>${isCorrect ? 'Correct!' : `Wrong! The correct answer is ${q.answerLabel}`}</span>
        </div>
      `;
    }

    // Navigation
    html += `<div class="pyq-nav-buttons">`;
    if (currentIdx > 0) {
      html += `<button class="btn btn-secondary" id="hist-pyq-prev">← Previous</button>`;
    }
    if (currentIdx < questions.length - 1) {
      html += `<button class="btn btn-primary" id="hist-pyq-next">Next →</button>`;
    } else if (this.pyqState.answered[currentIdx] !== null) {
      html += `<button class="btn btn-primary" id="hist-pyq-finish" style="background: var(--grad-emerald);">View Results 🏆</button>`;
    }
    html += `</div>`;

    area.innerHTML = html;

    // Attach events
    area.querySelectorAll('.pyq-option:not([disabled])').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.optIdx);
        this.pyqState.answered[currentIdx] = idx;
        if (idx === q.answer) {
          this.pyqState.score++;
          addXP(15, 'history', 'Opened History event detail');
        }
        this.renderPYQQuestion();
      });
    });

    document.getElementById('hist-pyq-prev')?.addEventListener('click', () => {
      this.pyqState.currentIdx--;
      this.renderPYQQuestion();
    });
    document.getElementById('hist-pyq-next')?.addEventListener('click', () => {
      this.pyqState.currentIdx++;
      this.renderPYQQuestion();
    });
    document.getElementById('hist-pyq-finish')?.addEventListener('click', () => {
      this.showPYQResults();
    });
  },

  showPYQResults() {
    const area = document.getElementById('hist-pyq-quiz-area');
    const resultArea = document.getElementById('hist-pyq-result-area');
    if (!resultArea) return;

    area?.classList.add('hidden');
    resultArea.classList.remove('hidden');

    const { questions, answered, score } = this.pyqState;
    const total = questions.length;
    const percent = ((score / total) * 100).toFixed(0);

    let grade = '';
    if (percent >= 90) grade = '🏆 Outstanding! You are a Modern History mastermind!';
    else if (percent >= 70) grade = '🎯 Great job! Highly accurate on dates and acts.';
    else if (percent >= 50) grade = '📚 Good attempt! Re-read the Viceroy matrices and try again.';
    else grade = '💪 Practice makes perfect! Study the chronological tables and retry.';

    let html = `
      <div class="pyq-results-card">
        <div class="pyq-trophy" style="animation: float 4s ease-in-out infinite;">🏆</div>
        <h3>Modern History Quiz Results</h3>
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
          <button class="btn btn-primary" id="hist-pyq-retry">Retry Quiz</button>
          <button class="btn btn-secondary" id="hist-pyq-review">Review Answers</button>
        </div>
      </div>
    `;

    resultArea.innerHTML = html;

    document.getElementById('hist-pyq-retry')?.addEventListener('click', () => {
      resultArea.classList.add('hidden');
      this.startPYQ([...HISTORY_PYQ_DATA]);
    });

    document.getElementById('hist-pyq-review')?.addEventListener('click', () => {
      resultArea.classList.add('hidden');
      this.pyqState.currentIdx = 0;
      document.getElementById('hist-pyq-quiz-area')?.classList.remove('hidden');
      this.renderPYQQuestion();
    });
  },

  // ── Interactive Timeline Render & Logic ─────────────────────────────
  renderEvents(periodFilter) {
    const wrapper = document.getElementById('timeline-events');
    if (!wrapper) return;

    wrapper.innerHTML = "";

    const filtered = TIMELINE_DATA.filter(evt => periodFilter === "all" || evt.era === periodFilter);

    filtered.forEach(evt => {
      const eventCard = document.createElement('div');
      eventCard.className = 'timeline-event-card';
      eventCard.setAttribute('data-era', evt.era);

      eventCard.innerHTML = `
        <div class="glass-card" data-id="${evt.id}">
          <div class="date">${evt.year}</div>
          <h3>${evt.title}</h3>
          <p>${evt.shortDesc}</p>
        </div>
      `;

      eventCard.querySelector('.glass-card').addEventListener('click', () => {
        this.openEventModal(evt);
      });

      wrapper.appendChild(eventCard);
    });
  },

  setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const period = btn.dataset.period;
        this.renderEvents(period);
        addXP(10, 'history', 'History notes section viewed');
      });
    });
  },

  setupModal() {
    const modal = document.getElementById('history-modal');
    const closeBtn = document.getElementById('close-history-modal');

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
      });

      window.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    }
  },

  openEventModal(eventData) {
    const modal = document.getElementById('history-modal');
    if (!modal) return;

    document.getElementById('hist-modal-tag').textContent = eventData.era;
    document.getElementById('hist-modal-title').textContent = eventData.title;
    document.getElementById('hist-modal-date').textContent = eventData.year;
    document.getElementById('hist-modal-desc').textContent = eventData.longDesc;

    const questionsList = document.getElementById('hist-modal-questions');
    questionsList.innerHTML = "";
    eventData.questions.forEach(q => {
      const li = document.createElement('li');
      li.textContent = q;
      questionsList.appendChild(li);
    });

    modal.classList.add('active');
    addXP(15, 'history', 'Opened History event detail');
  }
};
