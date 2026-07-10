/* ==========================================================================
   Polity Module (modules/polity.js)
   Constitution explorer featuring parts selector, search, articles list,
   detailed exam notes with interactive PYQ quiz.
   ========================================================================== */

import { addXP } from '../app.js';
import { POLITY_NOTES_SECTIONS, POLITY_PYQ_DATA } from './polity-notes-data.js';

// High-yield SSC CGL Constitution Parts & Articles Database
const PARTS_DATA = [
  { id: "part-1", name: "Part I: Union & its Territory", range: "Articles 1-4" },
  { id: "part-2", name: "Part II: Citizenship", range: "Articles 5-11" },
  { id: "part-3", name: "Part III: Fundamental Rights", range: "Articles 12-35" },
  { id: "part-4", name: "Part IV: Directive Principles", range: "Articles 36-51" },
  { id: "part-4a", name: "Part IV-A: Fundamental Duties", range: "Article 51A" },
  { id: "part-5", name: "Part V: The Union", range: "Articles 52-151" }
];

const ARTICLES_DATA = [
  {
    partId: "part-1",
    num: "Article 1",
    title: "Name and territory of the Union",
    desc: "India, that is Bharat, shall be a Union of States. Territory of India consists of States, Union Territories, and acquired territories.",
    sscNotes: "SSC CGL often queries: 'Which article states that India, that is Bharat, shall be a union of states?' -> Article 1."
  },
  {
    partId: "part-2",
    num: "Article 5",
    title: "Citizenship at the commencement of the Constitution",
    desc: "Provides citizenship to persons domicile in India at the commencement of the constitution (26 Jan 1950) who were born in India, whose parents were born in India, or who were ordinary residents for not less than 5 years.",
    sscNotes: "Citizenship in India is single and is borrowed from the United Kingdom."
  },
  {
    partId: "part-3",
    num: "Article 14",
    title: "Equality before law",
    desc: "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.",
    sscNotes: "'Equality before law' is borrowed from British Constitution. 'Equal protection of laws' from US Constitution."
  },
  {
    partId: "part-3",
    num: "Article 19",
    title: "Protection of certain rights regarding freedom of speech",
    desc: "Guarantees 6 fundamental freedoms: speech and expression, assembly, association, movement, residence, and profession.",
    sscNotes: "Article 19(1)(a) includes the freedom of press. These rights are suspended during a National Emergency under Article 358."
  },
  {
    partId: "part-3",
    num: "Article 21",
    title: "Protection of life and personal liberty",
    desc: "No person shall be deprived of his life or personal liberty except according to procedure established by law.",
    sscNotes: "Article 21 cannot be suspended even during a National Emergency. Article 21A (Right to Education) was added by the 86th Amendment in 2002."
  },
  {
    partId: "part-3",
    num: "Article 32",
    title: "Remedies for enforcement of Fundamental Rights",
    desc: "Empowers citizens to move the Supreme Court for enforcement of rights. The Supreme Court can issue Writs: Habeas Corpus, Mandamus, Prohibition, Quo Warranto, Certiorari.",
    sscNotes: "Dr. B.R. Ambedkar called Article 32 the 'Heart and Soul of the Constitution'. High Courts issue writs under Article 226."
  },
  {
    partId: "part-4",
    num: "Article 44",
    title: "Uniform civil code for the citizens",
    desc: "The State shall endeavour to secure for the citizens a uniform civil code throughout the territory of India.",
    sscNotes: "Goa was the first state in India to have a Uniform Civil Code. Uttarakhand is the first state in post-independence India to pass a UCC bill."
  },
  {
    partId: "part-4a",
    num: "Article 51A",
    title: "Fundamental duties",
    desc: "Lists 11 fundamental duties of citizens. Originally 10 duties were added by the 42nd Amendment (1976) on the recommendation of the Swaran Singh Committee. The 11th duty was added by the 86th Amendment (2002).",
    sscNotes: "Borrowed from USSR Constitution. Swaran Singh Committee recommended 8 duties but 10 were added."
  },
  {
    partId: "part-5",
    num: "Article 72",
    title: "Power of President to grant pardons",
    desc: "Empowers the President to grant pardons, reprieves, respites, remissions of punishment or to suspend, remit or commute sentences in certain cases (including death sentences and military courts).",
    sscNotes: "Governor's pardoning power is defined under Article 161 (but governor cannot pardon a death sentence or court martial sentence)."
  },
  {
    partId: "part-5",
    num: "Article 110",
    title: "Definition of 'Money Bills'",
    desc: "Lays down the conditions under which a bill is deemed a Money Bill. The Speaker of Lok Sabha decides whether a bill is a money bill or not.",
    sscNotes: "Money Bills can only be introduced in Lok Sabha with prior recommendation of the President. Rajya Sabha can only delay it for 14 days."
  }
];

export const polityModule = {
  activePart: "part-3", // default focus on Fundamental Rights
  activeTab: "articles", // 'articles' or 'notes'
  pyqState: {
    active: false,
    currentIdx: 0,
    answered: [],
    score: 0,
    showingResult: false
  },

  init() {
    this.renderPartsList();
    this.renderArticles();
    this.setupSearch();
    this.setupTabs();
    this.renderNotes();
  },

  // ── Tab Switching ────────────────────────────────────────────────────
  setupTabs() {
    const articlesBtn = document.getElementById('btn-polity-articles-tab');
    const notesBtn = document.getElementById('btn-polity-notes-tab');

    if (articlesBtn) {
      articlesBtn.addEventListener('click', () => this.switchTab('articles'));
    }
    if (notesBtn) {
      notesBtn.addEventListener('click', () => this.switchTab('notes'));
    }
  },

  switchTab(tab) {
    this.activeTab = tab;

    // Toggle button active state
    document.querySelectorAll('.polity-tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`.polity-tab-btn[data-tab="${tab}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // Toggle content visibility
    const articlesContent = document.getElementById('polity-articles-tab-content');
    const notesContent = document.getElementById('polity-notes-tab-content');

    if (tab === 'articles') {
      articlesContent?.classList.remove('hidden');
      notesContent?.classList.add('hidden');
    } else {
      articlesContent?.classList.add('hidden');
      notesContent?.classList.remove('hidden');
    }

    addXP(5, 'polity', 'Browsed Polity tab');
  },

  // ── Notes Rendering ──────────────────────────────────────────────────
  renderNotes() {
    const container = document.getElementById('polity-notes-container');
    if (!container) return;

    let html = '';

    // Title banner
    html += `
      <div class="notes-hero-banner">
        <div class="notes-hero-icon">⚖️</div>
        <div>
          <h2>Indian Polity — Complete SSC CGL Notes</h2>
          <p>Every word from your exam notes, beautifully organized. Scroll through sections or jump to a topic using the sidebar.</p>
        </div>
      </div>
    `;

    // Table of Contents
    html += `<div class="notes-toc">
      <h4>📑 Table of Contents</h4>
      <div class="toc-grid">`;
    POLITY_NOTES_SECTIONS.forEach((sec, i) => {
      html += `<a href="#notes-sec-${sec.id}" class="toc-item" onclick="event.preventDefault(); document.getElementById('notes-sec-${sec.id}').scrollIntoView({behavior:'smooth', block:'start'})">
        <span class="toc-icon">${sec.icon}</span>
        <span class="toc-text">${sec.title}</span>
      </a>`;
    });
    html += `</div></div>`;

    // Render each section
    POLITY_NOTES_SECTIONS.forEach(sec => {
      const typeClass = sec.type === 'highlight' ? 'notes-section-highlight' :
                        sec.type === 'table' ? 'notes-section-table' :
                        sec.type === 'mnemonics' ? 'notes-section-mnemonics' :
                        sec.type === 'info' ? 'notes-section-info' :
                        'notes-section-standard';

      html += `
        <div class="notes-section ${typeClass}" id="notes-sec-${sec.id}">
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
      <div class="notes-section notes-section-quiz" id="notes-sec-pyq-quiz">
        <div class="notes-section-header">
          <span class="notes-section-icon">📝</span>
          <h3>PYQ Practice Quiz — 70 MCQs</h3>
        </div>
        <div class="notes-section-body">
          <p>Test your retention with <strong>70 previous year questions</strong> covering all sections. Select an answer and get instant feedback!</p>
          <div class="pyq-controls">
            <button class="btn btn-primary" id="btn-start-pyq">Start PYQ Quiz (All 70 Questions)</button>
            <button class="btn btn-secondary" id="btn-random-pyq-10">Quick 10 Random PYQs</button>
          </div>
          <div id="pyq-quiz-area" class="pyq-quiz-area hidden"></div>
          <div id="pyq-result-area" class="pyq-result-area hidden"></div>
        </div>
      </div>
    `;

    container.innerHTML = html;

    // Attach PYQ quiz event listeners
    this.setupPYQQuiz();
  },

  // ── PYQ Quiz Logic ────────────────────────────────────────────────────
  setupPYQQuiz() {
    const startBtn = document.getElementById('btn-start-pyq');
    const randomBtn = document.getElementById('btn-random-pyq-10');

    if (startBtn) {
      startBtn.addEventListener('click', () => this.startPYQ(POLITY_PYQ_DATA.slice()));
    }
    if (randomBtn) {
      randomBtn.addEventListener('click', () => {
        const shuffled = [...POLITY_PYQ_DATA].sort(() => Math.random() - 0.5);
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
    document.getElementById('pyq-quiz-area')?.classList.remove('hidden');
    document.getElementById('pyq-result-area')?.classList.add('hidden');
    this.renderPYQQuestion();
  },

  renderPYQQuestion() {
    const area = document.getElementById('pyq-quiz-area');
    if (!area) return;

    const { questions, currentIdx } = this.pyqState;
    const q = questions[currentIdx];
    const progress = ((currentIdx + 1) / questions.length * 100).toFixed(0);

    let html = `
      <div class="pyq-progress-bar">
        <div class="pyq-progress-fill" style="width: ${progress}%"></div>
      </div>
      <div class="pyq-question-header">
        <span class="pyq-section-tag">Section ${q.section}: ${q.sectionTitle}</span>
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
      html += `<button class="btn btn-secondary" id="pyq-prev">← Previous</button>`;
    }
    if (currentIdx < questions.length - 1) {
      html += `<button class="btn btn-primary" id="pyq-next">Next →</button>`;
    } else if (this.pyqState.answered[currentIdx] !== null) {
      html += `<button class="btn btn-primary" id="pyq-finish" style="background: var(--grad-emerald);">View Results 🏆</button>`;
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
          addXP(15, 'polity', 'Searched Constitution article');
        }
        this.renderPYQQuestion();
      });
    });

    document.getElementById('pyq-prev')?.addEventListener('click', () => {
      this.pyqState.currentIdx--;
      this.renderPYQQuestion();
    });
    document.getElementById('pyq-next')?.addEventListener('click', () => {
      this.pyqState.currentIdx++;
      this.renderPYQQuestion();
    });
    document.getElementById('pyq-finish')?.addEventListener('click', () => {
      this.showPYQResults();
    });
  },

  showPYQResults() {
    const area = document.getElementById('pyq-quiz-area');
    const resultArea = document.getElementById('pyq-result-area');
    if (!resultArea) return;

    area?.classList.add('hidden');
    resultArea.classList.remove('hidden');

    const { questions, answered, score } = this.pyqState;
    const total = questions.length;
    const percent = ((score / total) * 100).toFixed(0);

    let grade = '';
    if (percent >= 90) grade = '🏆 Outstanding! You are CGL-ready!';
    else if (percent >= 70) grade = '🎯 Great job! A few more revisions and you\'re there.';
    else if (percent >= 50) grade = '📚 Good effort! Focus on weaker sections.';
    else grade = '💪 Keep studying! Review the notes and try again.';

    let html = `
      <div class="pyq-results-card">
        <div class="pyq-trophy">🏆</div>
        <h3>PYQ Quiz Results</h3>
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
          <button class="btn btn-primary" id="pyq-retry">Retry Quiz</button>
          <button class="btn btn-secondary" id="pyq-review">Review Answers</button>
        </div>
      </div>
    `;

    resultArea.innerHTML = html;

    document.getElementById('pyq-retry')?.addEventListener('click', () => {
      resultArea.classList.add('hidden');
      this.startPYQ([...POLITY_PYQ_DATA]);
    });

    document.getElementById('pyq-review')?.addEventListener('click', () => {
      resultArea.classList.add('hidden');
      this.pyqState.currentIdx = 0;
      document.getElementById('pyq-quiz-area')?.classList.remove('hidden');
      this.renderPYQQuestion();
    });
  },

  // ── Original Parts & Articles (unchanged) ────────────────────────────
  renderPartsList() {
    const listEl = document.getElementById('polity-parts-list');
    if (!listEl) return;

    listEl.innerHTML = "";

    PARTS_DATA.forEach(part => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.className = `polity-part-btn ${part.id === this.activePart ? 'active' : ''}`;
      btn.innerHTML = `
        <div style="font-weight:600;">${part.name}</div>
        <div style="font-size:11px; opacity:0.7;">${part.range}</div>
      `;

      btn.addEventListener('click', () => {
        document.querySelectorAll('.polity-part-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activePart = part.id;
        
        // Reset search input
        document.getElementById('polity-search').value = "";
        
        // Switch to articles tab
        this.switchTab('articles');
        this.renderArticles();
        addXP(10, 'polity', 'Polity notes section viewed');
      });

      li.appendChild(btn);
      listEl.appendChild(li);
    });
  },

  renderArticles(searchQuery = "") {
    const gridEl = document.getElementById('articles-grid');
    if (!gridEl) return;

    gridEl.innerHTML = "";

    let filtered = [];
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      filtered = ARTICLES_DATA.filter(art => 
        art.num.toLowerCase().includes(q) || 
        art.title.toLowerCase().includes(q) || 
        art.desc.toLowerCase().includes(q) ||
        art.sscNotes.toLowerCase().includes(q)
      );
    } else {
      filtered = ARTICLES_DATA.filter(art => art.partId === this.activePart);
    }

    if (filtered.length === 0) {
      gridEl.innerHTML = `
        <div class="glass-card" style="grid-column: span 2; text-align: center; padding: 40px; color: var(--text-muted);">
          🔍 No articles found matching "${searchQuery}". Try searching for "Article 21" or "President".
        </div>
      `;
      return;
    }

    filtered.forEach(art => {
      const card = document.createElement('div');
      card.className = "glass-card article-card";
      
      const partObj = PARTS_DATA.find(p => p.id === art.partId);
      const partLabel = partObj ? partObj.name.split(':')[0] : 'Union';

      card.innerHTML = `
        <div class="article-card-header">
          <span class="article-num">${art.num}</span>
          <span class="article-part">${partLabel}</span>
        </div>
        <h4>${art.title}</h4>
        <p>${art.desc}</p>
        <div class="ssc-gk-notes" style="margin-top: 14px; background: rgba(59, 130, 246, 0.05); border-color: rgba(59, 130, 246, 0.15);">
          <h5 style="color: var(--accent-blue); font-size:12px; margin-bottom:4px;">🎯 Exam Focus Point</h5>
          <p style="font-size:12px; line-height:1.4;">${art.sscNotes}</p>
        </div>
      `;
      gridEl.appendChild(card);
    });
  },

  setupSearch() {
    const searchInput = document.getElementById('polity-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        this.renderArticles(query);
        
        // Remove active state from sidebar parts if searching globally
        if (query.trim() !== "") {
          document.querySelectorAll('.polity-part-btn').forEach(b => b.classList.remove('active'));
        } else {
          // Re-highlight active part
          const partIndex = PARTS_DATA.findIndex(p => p.id === this.activePart);
          const buttons = document.querySelectorAll('.polity-part-btn');
          if (buttons[partIndex]) {
            buttons[partIndex].classList.add('active');
          }
          this.renderArticles();
        }
      });
    }
  }
};
