/* ==========================================================================
   History Module (modules/history.js)
   Redesigned Study Material Architecture for SSC CGL History.
   Handles 10 structured sub-tabs, collapsible accordions, learning cards,
   interactive timelines, PYQ quizzes, flashcards, mindmaps, and analytics.
   ========================================================================== */

import { addXP, markGoalReadNotes } from '../app.js';
import { api } from './api-service.js';
import { HISTORY_NOTES_SECTIONS, HISTORY_PYQ_DATA } from './history-notes-data.js';

// High-yield SSC CGL History timeline database
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
    longDesc: "Chandragupta Maurya overthrew the Nanda dynasty's Dhanananda to establish the vast Mauryan empire, guided by his advisor Chanakya (Kautilya), author of Arthashastra. Megasthenes visited his court as a Greek ambassador sent by Seleucus Nicator and wrote 'Indica'.",
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
  activeSubTab: "overview",
  topicData: null,
  pyqState: {
    active: false,
    questions: [],
    currentIdx: 0,
    answered: [],
    score: 0,
    showingResult: false
  },

  async init() {
    this.setupSubNav();
    this.setupHeroCTAs();
    this.renderEvents("all");
    this.setupFilters();
    this.setupModal();
    this.renderStructuredNotes();
    this.setupPYQQuiz();
    this.setupAccordions();
    this.setupBottomNav();

    // Dynamically fetch topic JSON from CMS API
    try {
      const payload = await api.getTopic('revolt-of-1857');
      if (payload) {
        this.topicData = payload;
        this.renderTopicCMSPayload(payload);
      }
    } catch (err) {
      console.warn('Could not load dynamic topic JSON from backend, keeping fallback content:', err.message);
    }
  },

  // ── 1. Sub-Tab Navigation Bar ──────────────────────────────────────────
  setupSubNav() {
    const subnavContainer = document.getElementById('history-subnav');
    if (!subnavContainer) return;

    subnavContainer.querySelectorAll('.study-nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetSubtab = e.currentTarget.dataset.subtab;
        this.switchSubTab(targetSubtab);
      });
    });
  },

  switchSubTab(subtabId) {
    this.activeSubTab = subtabId;

    // Update button active state
    const subnavContainer = document.getElementById('history-subnav');
    if (subnavContainer) {
      subnavContainer.querySelectorAll('.study-nav-btn').forEach(btn => {
        if (btn.dataset.subtab === subtabId) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }

    // Toggle sub-tab content panes
    document.querySelectorAll('#history-notes-tab-content .study-tab-pane').forEach(pane => {
      pane.classList.add('hidden');
    });

    const activePane = document.getElementById(`history-subtab-${subtabId}`);
    if (activePane) {
      activePane.classList.remove('hidden');
    }

    if (subtabId === 'notes') {
      markGoalReadNotes();
    }

    addXP(5, 'history', `Browsed History ${subtabId} tab`);
  },

  // ── 2. Hero CTAs & Bottom Nav ─────────────────────────────────────────
  setupHeroCTAs() {
    document.getElementById('btn-history-continue')?.addEventListener('click', () => {
      this.switchSubTab('notes');
    });
    document.getElementById('btn-history-hero-quiz')?.addEventListener('click', () => {
      this.switchSubTab('quiz');
    });
  },

  setupBottomNav() {
    document.getElementById('btn-history-bottom-prev')?.addEventListener('click', () => {
      const tabs = ['overview', 'timeline', 'notes', 'pyqs', 'quiz', 'flashcards', 'mindmaps', 'revision', 'files', 'analytics'];
      const currentIdx = tabs.indexOf(this.activeSubTab);
      if (currentIdx > 0) {
        this.switchSubTab(tabs[currentIdx - 1]);
      }
    });

    document.getElementById('btn-history-bottom-next')?.addEventListener('click', () => {
      const tabs = ['overview', 'timeline', 'notes', 'pyqs', 'quiz', 'flashcards', 'mindmaps', 'revision', 'files', 'analytics'];
      const currentIdx = tabs.indexOf(this.activeSubTab);
      if (currentIdx < tabs.length - 1) {
        this.switchSubTab(tabs[currentIdx + 1]);
      }
    });

    document.getElementById('btn-history-bottom-quiz')?.addEventListener('click', () => {
      this.switchSubTab('quiz');
    });

    document.getElementById('btn-history-bottom-flashcards')?.addEventListener('click', () => {
      this.switchSubTab('flashcards');
    });
  },

  // ── 3. Accordion Handler ───────────────────────────────────────────────
  setupAccordions() {
    const container = document.getElementById('history-accordions-container');
    if (!container) return;

    container.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', (e) => {
        const item = e.currentTarget.closest('.accordion-item');
        if (item) {
          item.classList.toggle('expanded');
        }
      });
    });
  },

  // ── 4. Structured Notes Render ────────────────────────────────────────
  renderStructuredNotes() {
    const container = document.getElementById('history-accordions-container');
    if (!container) return;

    let html = '';

    HISTORY_NOTES_SECTIONS.forEach((sec, idx) => {
      const isFirst = idx === 0 || idx === 1;
      const expandedClass = isFirst ? 'expanded' : '';

      html += `
        <div class="accordion-item ${expandedClass}" id="acc-sec-${sec.id}">
          <div class="accordion-header">
            <div class="accordion-title-wrap">
              <span class="accordion-icon">${sec.icon}</span>
              <span class="accordion-title">${sec.title}</span>
            </div>
            <span class="accordion-chevron">▼</span>
          </div>
          <div class="accordion-body">
            ${sec.content}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
    this.setupAccordions();
  },

  // ── 5. PYQ Quiz Logic ──────────────────────────────────────────────────
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
      <div class="pyq-question-header" style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 13px;">
        <span class="pyq-section-tag" style="background: rgba(236, 72, 153, 0.08); color: var(--accent-pink); padding: 4px 10px; border-radius: 12px; font-weight: 700;">Section ${q.section}: ${q.sectionTitle}</span>
        <span class="pyq-counter" style="color: var(--text-muted);">Q${currentIdx + 1} / ${questions.length}</span>
      </div>
      <div class="pyq-question-text" style="font-size: 16px; font-weight: 600; color: var(--text-main); margin-bottom: 16px; line-height: 1.5;">
        <strong>Q${q.id}.</strong> ${q.question}
      </div>
      <div class="pyq-options-list" style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px;">
    `;

    q.options.forEach((opt, i) => {
      const userAnswer = this.pyqState.answered[currentIdx];
      let optClass = 'pyq-option btn btn-secondary';
      let disabled = '';

      if (userAnswer !== null) {
        disabled = 'disabled';
        if (i === q.answer) {
          optClass += ' pyq-correct';
        } else if (i === userAnswer && i !== q.answer) {
          optClass += ' pyq-wrong';
        }
      }

      html += `<button class="${optClass}" data-opt-idx="${i}" ${disabled} style="text-align: left; width: 100%; border: 1px solid var(--border-glass); padding: 12px 16px;">${opt}</button>`;
    });

    html += `</div>`;

    if (this.pyqState.answered[currentIdx] !== null) {
      const isCorrect = this.pyqState.answered[currentIdx] === q.answer;
      html += `
        <div class="pyq-feedback ${isCorrect ? 'pyq-feedback-correct' : 'pyq-feedback-wrong'}" style="padding: 12px; border-radius: var(--radius-md); background: ${isCorrect ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)'}; color: ${isCorrect ? '#34d399' : '#f87171'}; border: 1px solid ${isCorrect ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}; font-weight: 600; margin-bottom: 16px;">
          <span>${isCorrect ? '✅ Correct Answer!' : `❌ Incorrect! Correct Answer: ${q.answerLabel}`}</span>
        </div>
      `;
    }

    html += `<div class="pyq-nav-buttons" style="display: flex; gap: 10px; justify-content: flex-end;">`;
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

    area.querySelectorAll('.pyq-option:not([disabled])').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.optIdx);
        this.pyqState.answered[currentIdx] = idx;
        if (idx === q.answer) {
          this.pyqState.score++;
          addXP(15, 'history', 'Correct answer in History PYQ');
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

    const { questions, score } = this.pyqState;
    const total = questions.length;
    const percent = ((score / total) * 100).toFixed(0);

    let grade = '';
    if (percent >= 90) grade = '🏆 Outstanding! Mastered Modern History!';
    else if (percent >= 70) grade = '🎯 Great job! High accuracy on dates and acts.';
    else if (percent >= 50) grade = '📚 Good attempt! Re-read the Viceroy matrices.';
    else grade = '💪 Practice makes perfect! Study the chronological tables and retry.';

    let html = `
      <div class="pyq-results-card" style="text-align: center; padding: 32px; background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-xl);">
        <div class="pyq-trophy" style="font-size: 48px; margin-bottom: 12px;">🏆</div>
        <h3 style="font-size: 20px; color: var(--text-main); margin-bottom: 16px;">Modern History Quiz Results</h3>
        <div class="pyq-results-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 20px;">
          <div class="pyq-res-box" style="padding: 16px; background: rgba(255,255,255,0.03); border-radius: var(--radius-md); border: 1px solid var(--border-glass);">
            <div style="font-size: 22px; font-weight: 700; color: var(--text-main);">${score}/${total}</div>
            <div style="font-size: 12px; color: var(--text-muted);">Score</div>
          </div>
          <div class="pyq-res-box" style="padding: 16px; background: rgba(255,255,255,0.03); border-radius: var(--radius-md); border: 1px solid var(--border-glass);">
            <div style="font-size: 22px; font-weight: 700; color: var(--accent-purple);">${percent}%</div>
            <div style="font-size: 12px; color: var(--text-muted);">Accuracy</div>
          </div>
          <div class="pyq-res-box" style="padding: 16px; background: rgba(255,255,255,0.03); border-radius: var(--radius-md); border: 1px solid var(--border-glass);">
            <div style="font-size: 22px; font-weight: 700; color: var(--accent-emerald);">+${score * 15} XP</div>
            <div style="font-size: 12px; color: var(--text-muted);">Earned</div>
          </div>
        </div>
        <div class="pyq-grade" style="font-size: 14px; font-weight: 600; color: var(--text-secondary); margin-bottom: 24px;">${grade}</div>
        <div class="pyq-results-actions" style="display: flex; gap: 12px; justify-content: center;">
          <button class="btn btn-primary" id="hist-pyq-retry" style="background: var(--grad-primary);">Retry Quiz</button>
        </div>
      </div>
    `;

    resultArea.innerHTML = html;

    document.getElementById('hist-pyq-retry')?.addEventListener('click', () => {
      resultArea.classList.add('hidden');
      this.startPYQ([...HISTORY_PYQ_DATA]);
    });
  },

  // ── 6. Timeline Filtering ──────────────────────────────────────────────
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
          <div class="date" style="color: var(--accent-purple); font-weight: 700; font-size: 12px; margin-bottom: 4px;">${evt.year}</div>
          <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 6px;">${evt.title}</h3>
          <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5;">${evt.shortDesc}</p>
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
        addXP(10, 'history', 'Filtered History Timeline');
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
  },

  // ── Dynamic CMS Renderer for Topic JSON ────────────────────────────────
  renderTopicCMSPayload(payload) {
    if (!payload) return;

    // 1. Hero
    if (payload.hero) {
      const hero = payload.hero;
      const titleEl = document.querySelector('.study-hero-title');
      const descEl = document.querySelector('.study-hero-desc');
      if (titleEl) titleEl.textContent = hero.title;
      if (descEl) descEl.textContent = hero.subtitle;

      // Update chips if available
      const chipVals = document.querySelectorAll('.study-hero-metrics .chip-val');
      if (chipVals.length >= 4) {
        if (hero.sscWeightage) chipVals[0].textContent = hero.sscWeightage;
        if (hero.expectedQuestions) chipVals[1].textContent = hero.expectedQuestions;
        if (hero.difficulty) chipVals[2].textContent = hero.difficulty;
        if (hero.estimatedReadingTime) chipVals[3].textContent = hero.estimatedReadingTime;
      }
    }

    // 2. Notes Accordions
    if (payload.notes && payload.notes.length > 0) {
      const accContainer = document.getElementById('history-accordions-container');
      if (accContainer) {
        accContainer.innerHTML = payload.notes.map((note, idx) => `
          <div class="accordion-item ${idx === 0 ? 'expanded' : ''}">
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
                  <ul>${note.keyTakeaways.map(t => `<li>${t}</li>`).join('')}</ul>
                </div>
              ` : ''}

              ${note.importantExamPoints && note.importantExamPoints.length > 0 ? `
                <div class="learning-card card-facts">
                  <span class="learning-card-tag">📌 Important Exam Points</span>
                  <ul>${note.importantExamPoints.map(p => `<li>${p}</li>`).join('')}</ul>
                </div>
              ` : ''}

              ${note.commonStudentMistakes && note.commonStudentMistakes.length > 0 ? `
                <div class="learning-card card-trap">
                  <span class="learning-card-tag">⚠️ Common Student Mistakes</span>
                  <ul>${note.commonStudentMistakes.map(m => `<li style="color:#f87171;">${m}</li>`).join('')}</ul>
                </div>
              ` : ''}
            </div>
          </div>
        `).join('');
        this.setupAccordions();
      }
    }

    // 3. MCQs
    if (payload.mcqs && payload.mcqs.length > 0) {
      const mcqData = payload.mcqs.map(m => ({
        id: m.id,
        section: "1857",
        sectionTitle: m.topicTag || "Revolt of 1857",
        question: m.question,
        options: m.options,
        answer: m.options.indexOf(m.correctAnswer) >= 0 ? m.options.indexOf(m.correctAnswer) : 0,
        answerLabel: m.correctAnswer,
        explanation: m.explanation
      }));
      this.setupPYQQuizWithData(mcqData);
    }
  },

  setupPYQQuizWithData(mcqs) {
    const startBtn = document.getElementById('btn-hist-start-pyq');
    if (startBtn) {
      startBtn.onclick = () => this.startPYQ(mcqs);
    }
  }
};

