/* ==========================================================================
   Quiz Module (modules/quiz.js)
   Renders custom mock tests, timings, progress, scoring, and explanations.
   ========================================================================== */

import { addXP, logQuestionAnswered } from '../app.js';
import { POLITY_PYQ_DATA } from './polity-notes-data.js';
import { HISTORY_PYQ_DATA } from './history-notes-data.js';
import { SCIENCE_PYQ_DATA } from './science-notes-data.js';
import { GEOGRAPHY_PYQ_DATA } from './geography-notes-data.js';
import { ECONOMY_PYQ_DATA } from './economy-notes-data.js';
import { STATIC_GK_PYQ_DATA } from './static-gk-notes-data.js';
import { CURRENT_AFFAIRS_PYQ_DATA } from './currentaffairs-notes-data.js';

// Map 70 Indian Polity PYQs from the data module
const MAPPED_POLITY_PYQS = POLITY_PYQ_DATA.map(q => ({
  id: q.id + 100,
  subject: "POLITY",
  category: "polity",
  q: q.question,
  options: q.options.map(opt => opt.replace(/^\([A-D]\)\s*/, '')),
  correctIdx: q.answer,
  expl: `The correct option is ${q.options[q.answer]}. This question is an authentic SSC CGL previous year question from the section: "${q.sectionTitle}".`,
  tip: `Articles, parts, schedules, and constitutional amendments form the core factual syllabus of Polity in CGL.`
}));

// Map 50 Modern History PYQs from the history data module
const MAPPED_HISTORY_PYQS = HISTORY_PYQ_DATA.map(q => ({
  id: q.id + 200, // Avoid collisions with Polity IDs
  subject: "HISTORY",
  category: "history",
  q: q.question,
  options: q.options.map(opt => opt.replace(/^\([A-D]\)\s*/, '')),
  correctIdx: q.answer,
  expl: `The correct option is ${q.options[q.answer]}. This question is an authentic SSC CGL previous year question from the section: "${q.sectionTitle}".`,
  tip: `Governor-Generals, Congress sessions, and Gandhian chronological timelines are high-yield Modern History topics.`
}));

// Map 15 General Science PYQs from the science data module
const MAPPED_SCIENCE_PYQS = SCIENCE_PYQ_DATA.map(q => ({
  id: q.id + 300, // Avoid collisions with History/Polity IDs
  subject: "SCIENCE",
  category: "science",
  q: q.question,
  options: q.options.map(opt => opt.replace(/^\([A-D]\)\s*/, '')),
  correctIdx: q.answer,
  expl: `The correct option is ${q.options[q.answer]}. This question is an authentic SSC CGL previous year question from the section: "${q.sectionTitle}".`,
  tip: `Biology systems, vitamin chemical names, everyday chemistry compounds, and physics light phenomena are high-yield science topics.`
}));

// Map 22 Indian Geography PYQs from the geography data module
const MAPPED_GEOGRAPHY_PYQS = GEOGRAPHY_PYQ_DATA.map(q => ({
  id: q.id + 400, // Avoid collisions with Science/History/Polity IDs
  subject: "GEOGRAPHY",
  category: "geography",
  q: q.question,
  options: q.options.map(opt => opt.replace(/^\([A-D]\)\s*/, '')),
  correctIdx: q.answer,
  expl: `The correct option is ${q.options[q.answer]}. This question is an authentic SSC CGL previous year question from the section: "${q.sectionTitle}".`,
  tip: `River tributaries (Left/Right bank), lake superlatives, and mountain passes are the highest-yield Geography topics for CGL.`
}));

// Map 12 Indian Economy PYQs from the economy data module
const MAPPED_ECONOMY_PYQS = ECONOMY_PYQ_DATA.map(q => ({
  id: q.id + 500, // Avoid collisions with Geography/Science/History/Polity IDs
  subject: "ECONOMY",
  category: "economy",
  q: q.question,
  options: q.options.map(opt => opt.replace(/^\([A-D]\)\s*/, '')),
  correctIdx: q.answer,
  expl: `The correct option is ${q.options[q.answer]}. This question is an authentic SSC CGL previous year question from the section: "${q.sectionTitle}".`,
  tip: `Five-Year Plan models, RBI monetary tool impact, inflation definitions, and deficit equations are high-yield economy topics.`
}));

// Map 15 Static GK PYQs from the static-gk data module
const MAPPED_STATIC_GK_PYQS = STATIC_GK_PYQ_DATA.map(q => ({
  id: q.id + 600, // Avoid collisions with Economy/Geography/Science/History/Polity IDs
  subject: "STATIC",
  category: "static",
  q: q.question,
  options: q.options.map(opt => opt.replace(/^\([A-D]\)\s*/, '')),
  correctIdx: q.answer,
  expl: `The correct option is ${q.options[q.answer]}. This question is an authentic SSC CGL previous year question from the section: "${q.sectionTitle}".`,
  tip: `Classical dance exponents, musical instrument maestros, Census 2011 parameters, and regional harvest festivals are high-yield Static GK topics.`
}));

// Map 15 Current Affairs PYQs from the current-affairs data module
const MAPPED_CA_PYQS = CURRENT_AFFAIRS_PYQ_DATA.map(q => ({
  id: q.id + 700, // Avoid collisions with Static GK / Economy / Geography / Science / History / Polity IDs
  subject: "CURRENT AFFAIRS",
  category: "currentaffairs",
  q: q.question,
  options: q.options.map(opt => opt.replace(/^\([A-D]\)\s*/, '')),
  correctIdx: q.answer,
  expl: `The correct option is ${q.options[q.answer]}. This question is an authentic SSC CGL previous year question from the section: "${q.sectionTitle}".`,
  tip: `Sports winners, military exercise venue-partner pairs, national award cash prizes and first recipients, and scheme-ministry linkages are high-yield Current Affairs topics.`
}));

// Base SSC CGL Mock Question Pool
const BASE_QUESTION_POOL = [
  {
    id: 1,
    subject: "HISTORY",
    category: "history",
    q: "Who was the founder of the Gupta Empire, and which ruler is known as the 'Napoleon of India'?",
    options: [
      "Chandragupta I & Chandragupta II",
      "Sri Gupta & Samudragupta",
      "Ghatotkacha & Kumaragupta",
      "Vishnugupta & Skandagupta"
    ],
    correctIdx: 1,
    expl: "Sri Gupta founded the Gupta dynasty around 240 AD. Samudragupta (335-375 AD) is called the 'Napoleon of India' by historian V.A. Smith because of his extensive military conquests, recorded on the Prayag Prashasti (Allahabad Pillar) by Harishena.",
    tip: "Gupta period is known as the 'Golden Age of India'. Samudragupta played the Veena, depicted on his coins."
  },
  {
    id: 2,
    subject: "POLITY",
    category: "polity",
    q: "Under which Article of the Indian Constitution can State Emergency (President's Rule) be imposed, and who recommends it?",
    options: [
      "Article 352 by the Prime Minister",
      "Article 360 by the Finance Minister",
      "Article 356 by the Governor of the State",
      "Article 368 by the Speaker of Lok Sabha"
    ],
    correctIdx: 2,
    expl: "Article 356 provides for the imposition of President's Rule in a state in case of failure of constitutional machinery, recommended by the Governor. Article 352 is National Emergency, and Article 360 is Financial Emergency.",
    tip: "President's Rule was first imposed in Punjab in 1951. Maximum times it was imposed in Uttar Pradesh."
  },
  {
    id: 3,
    subject: "GEOGRAPHY",
    category: "geography",
    q: "Which west-flowing Indian river passes through a rift valley between the Vindhyas and Satpuras, forming the Dhuandhar Falls?",
    options: [
      "Tapi River",
      "Mahi River",
      "Luni River",
      "Narmada River"
    ],
    correctIdx: 3,
    expl: "The Narmada River originates from Amarkantak, Madhya Pradesh, and flows westwards through a rift valley. It forms the spectacular Dhuandhar Falls ('smoke cascade') in Jabalpur and empties into the Gulf of Khambhat (Arabian Sea) forming an estuary.",
    tip: "Narmada is the longest west-flowing river. Major project: Sardar Sarovar Dam."
  },
  {
    id: 4,
    subject: "SCIENCE",
    category: "science",
    q: "Which cell organelle is commonly referred to as the 'Suicidal Bag of the Cell' due to its digestive enzymes?",
    options: [
      "Ribosome",
      "Mitochondria",
      "Lysosome",
      "Centrosome"
    ],
    correctIdx: 2,
    expl: "Lysosomes contain strong hydrolytic digestive enzymes that break down waste. If a cell is damaged, the lysosome bursts and its enzymes digest the cell itself (autolysis), hence the name 'Suicidal Bag'.",
    tip: "Discovered by Christian de Duve in 1955. They lack in Mammalian Red Blood Cells."
  },
  {
    id: 5,
    subject: "STATIC GK",
    category: "static",
    q: "Kuchipudi, a prominent classical dance of India, belongs to which state, and what is its traditional background?",
    options: [
      "Kerala (Temple dramas)",
      "Andhra Pradesh (Village of Kuchelapuram)",
      "Tamil Nadu (Devadasi tradition)",
      "Odisha (Mahari dancers)"
    ],
    correctIdx: 1,
    expl: "Kuchipudi originated in the village of Kuchelapuram (Krishna district, Andhra Pradesh). It developed as a dance-drama form connected to the Vaishnavite cult, historically performed by male Brahmins (Bhagavatulus).",
    tip: "Features 'Tarangam' where dancers dance on the edges of a brass plate."
  },
  {
    id: 6,
    subject: "ECONOMY",
    category: "static",
    q: "Who signs the One Rupee note in India, and who issues it?",
    options: [
      "Governor of RBI, Issued by RBI",
      "Finance Minister, Issued by Government of India",
      "Finance Secretary, Issued by Ministry of Finance",
      "President of India, Issued by Parliament"
    ],
    correctIdx: 2,
    expl: "Under Section 22 of the RBI Act, RBI has sole rights to issue bank notes except the One Rupee note and coins. The One Rupee note is issued by the Ministry of Finance and signed by the Finance Secretary of India. All other notes are signed by the RBI Governor.",
    tip: "Paper currency was introduced in India in 1861 by the British Government."
  },
  {
    id: 7,
    subject: "HISTORY",
    category: "history",
    q: "Which major war prompted Emperor Ashoka to embrace Buddhism, and which Buddhist monk initiated him?",
    options: [
      "Battle of Hydaspes initiated by Chanakya",
      "Battle of Kalinga initiated by Upagupta",
      "Battle of Tarain initiated by Harishena",
      "Sack of Patliputra initiated by Bhadrabahu"
    ],
    correctIdx: 1,
    expl: "The Kalinga War (261 BC), fought in present-day Odisha, caused massive bloodshed which filled Ashoka with remorse. Under the influence of the Buddhist monk Upagupta, Ashoka converted to Buddhism and replaced Bherighosha (war drum) with Dhammaghosha (righteousness).",
    tip: "Described in Major Rock Edict XIII of Ashoka's inscriptions."
  },
  {
    id: 8,
    subject: "SCIENCE",
    category: "science",
    q: "Which vitamin is chemically known as 'Calciferol', and its deficiency causes rickets in children?",
    options: [
      "Vitamin A",
      "Vitamin C",
      "Vitamin D",
      "Vitamin B12"
    ],
    correctIdx: 2,
    expl: "Vitamin D is known as Calciferol. It helps in absorbing calcium in the body. Deficiency of Vitamin D leads to Rickets in children (softening/bending of bones) and Osteomalacia in adults.",
    tip: "It is synthesized in human skin upon exposure to sunlight, often called the 'sunshine vitamin'."
  }
];

const QUESTION_POOL = [...BASE_QUESTION_POOL, ...MAPPED_POLITY_PYQS, ...MAPPED_HISTORY_PYQS, ...MAPPED_SCIENCE_PYQS, ...MAPPED_GEOGRAPHY_PYQS, ...MAPPED_ECONOMY_PYQS, ...MAPPED_STATIC_GK_PYQS, ...MAPPED_CA_PYQS];

export const quizModule = {
  currentQuestions: [],
  currentIdx: 0,
  score: 0,
  timerInterval: null,
  timeLeft: 600, // 10 minutes in seconds
  onCompleteCallback: null,

  init(onComplete) {
    this.onCompleteCallback = onComplete;
    this.setupStartButton();
  },

  setupStartButton() {
    const btn = document.getElementById('btn-start-quiz');
    const allCb = document.getElementById('cb-all');
    const subCbs = document.querySelectorAll('.cb-sub');

    // Toggle categories selection checkbox behavior
    if (allCb) {
      allCb.addEventListener('change', () => {
        subCbs.forEach(cb => cb.checked = !allCb.checked);
      });
      subCbs.forEach(cb => {
        cb.addEventListener('change', () => {
          if (cb.checked) allCb.checked = false;
        });
      });
    }

    if (btn) {
      btn.addEventListener('click', () => {
        this.launchQuiz();
      });
    }
  },

  launchQuiz() {
    // Determine categories
    const selectedCats = [];
    const allCb = document.getElementById('cb-all');
    
    if (allCb && allCb.checked) {
      QUESTION_POOL.forEach(q => selectedCats.push(q));
    } else {
      const subCbs = document.querySelectorAll('.cb-sub');
      const catsChecked = [];
      subCbs.forEach(cb => {
        if (cb.checked) catsChecked.push(cb.value);
      });

      if (catsChecked.length === 0) {
        alert("Please select at least one GK-GS category!");
        return;
      }

      QUESTION_POOL.forEach(q => {
        if (catsChecked.includes(q.category)) {
          selectedCats.push(q);
        }
      });
    }

    // Shuffle and pick 10 questions (or total matching)
    this.currentQuestions = this.shuffleArray(selectedCats).slice(0, 10);
    
    if (this.currentQuestions.length === 0) {
      alert("No questions found matching selected categories.");
      return;
    }

    // Transition panels
    document.getElementById('quiz-setup').classList.add('hidden');
    document.getElementById('quiz-active').classList.remove('hidden');
    document.getElementById('quiz-results').classList.add('hidden');

    this.currentIdx = 0;
    this.score = 0;
    this.timeLeft = 300; // 5 minutes for shorter mock
    this.userAnswers = [];
    this.setupBookmarkButton();
    this.startTimer();
    this.renderQuestion();
  },

  setupBookmarkButton() {
    const btnBookmark = document.getElementById('btn-bookmark-question');
    if (!btnBookmark) return;

    btnBookmark.onclick = () => {
      const qData = this.currentQuestions[this.currentIdx];
      if (!qData) return;

      try {
        const bookmarks = JSON.parse(localStorage.getItem('gkgs_quiz_bookmarks') || '[]');
        const existingIdx = bookmarks.findIndex(b => b.q === qData.q);

        if (existingIdx >= 0) {
          bookmarks.splice(existingIdx, 1);
          btnBookmark.classList.remove('bookmarked');
          btnBookmark.textContent = '🔖 Bookmark';
        } else {
          bookmarks.push(qData);
          btnBookmark.classList.add('bookmarked');
          btnBookmark.textContent = '⭐ Bookmarked';
        }
        localStorage.setItem('gkgs_quiz_bookmarks', JSON.stringify(bookmarks));
      } catch (e) {
        console.error("Failed to update quiz bookmarks:", e);
      }
    };
  },

  updateBookmarkUI() {
    const btnBookmark = document.getElementById('btn-bookmark-question');
    if (!btnBookmark) return;

    const qData = this.currentQuestions[this.currentIdx];
    if (!qData) return;

    try {
      const bookmarks = JSON.parse(localStorage.getItem('gkgs_quiz_bookmarks') || '[]');
      const isBookmarked = bookmarks.some(b => b.q === qData.q);
      if (isBookmarked) {
        btnBookmark.classList.add('bookmarked');
        btnBookmark.textContent = '⭐ Bookmarked';
      } else {
        btnBookmark.classList.remove('bookmarked');
        btnBookmark.textContent = '🔖 Bookmark';
      }
    } catch (e) {}
  },

  shuffleArray(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  },

  startTimer() {
    clearInterval(this.timerInterval);
    this.updateTimerDisplay();

    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      this.updateTimerDisplay();

      if (this.timeLeft <= 0) {
        this.endQuiz();
      }
    }, 1000);
  },

  updateTimerDisplay() {
    const el = document.getElementById('quiz-timer-display');
    if (!el) return;

    const mins = Math.floor(this.timeLeft / 60);
    const secs = this.timeLeft % 60;
    el.textContent = `Time: ${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  },

  renderQuestion() {
    const qData = this.currentQuestions[this.currentIdx];
    const total = this.currentQuestions.length;

    // Reset explanation card
    const explBox = document.getElementById('quiz-explanation-box');
    explBox.classList.add('hidden');

    this.updateBookmarkUI();

    // Update progress numbers
    document.getElementById('quiz-current-num').textContent = this.currentIdx + 1;
    document.getElementById('quiz-total-num').textContent = total;

    // Update progress bar fill
    const fillPercent = ((this.currentIdx) / total) * 100;
    document.getElementById('quiz-progress-fill').style.width = `${fillPercent}%`;

    // Populate question card
    document.getElementById('quiz-card-subject').textContent = qData.subject;
    document.getElementById('quiz-card-question').textContent = qData.q;

    // Render options
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = "";

    const indexes = ["A", "B", "C", "D"];

    qData.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = "quiz-option";
      btn.innerHTML = `
        <span class="quiz-option-index">${indexes[idx]}</span>
        <span>${opt}</span>
      `;

      btn.addEventListener('click', () => {
        this.checkAnswer(idx, btn);
      });

      optionsContainer.appendChild(btn);
    });
  },

  checkAnswer(selectedIdx, clickedBtn) {
    const qData = this.currentQuestions[this.currentIdx];
    const optionsButtons = document.querySelectorAll('.quiz-option');

    // Lock options
    optionsButtons.forEach(btn => btn.classList.add('disabled'));

    const isCorrect = (selectedIdx === qData.correctIdx);
    const explBox = document.getElementById('quiz-explanation-box');
    const statusHeader = document.getElementById('expl-header-status');

    // Record response for detailed end-of-quiz review
    this.userAnswers.push({
      question: qData.q,
      subject: qData.subject,
      selectedIdx,
      correctIdx: qData.correctIdx,
      userAnswerText: qData.options[selectedIdx],
      correctAnswerText: qData.options[qData.correctIdx],
      expl: qData.expl,
      isCorrect
    });

    logQuestionAnswered((qData.category || qData.subject || 'quiz').toLowerCase(), qData.id ? String(qData.id) : null, isCorrect, qData.q);

    if (isCorrect) {
      this.score++;
      clickedBtn.classList.add('correct');
      explBox.className = "glass-card quiz-explanation-card correct-expl";
      statusHeader.querySelector('.expl-status-icon').textContent = "✓";
      statusHeader.querySelector('.expl-status-text').textContent = "Correct Answer!";
      addXP(20, 'quiz', 'Quiz question answered correctly');
    } else {
      clickedBtn.classList.add('wrong');
      optionsButtons[qData.correctIdx].classList.add('correct');
      explBox.className = "glass-card quiz-explanation-card wrong-expl";
      statusHeader.querySelector('.expl-status-icon').textContent = "✗";
      statusHeader.querySelector('.expl-status-text').textContent = "Incorrect Answer!";
    }

    // Populate explanation content
    document.getElementById('quiz-explanation-text').innerHTML = `
      ${qData.expl}
      <div class="ssc-tip" style="margin-top:12px;">
        <strong>🎯 SSC Repeater Fact:</strong> ${qData.tip}
      </div>
    `;

    // Reveal explanation card
    explBox.classList.remove('hidden');

    // Handle next button click
    const nextBtn = document.getElementById('btn-next-question');
    nextBtn.onclick = () => {
      this.advanceQuestion();
    };
  },

  advanceQuestion() {
    this.currentIdx++;
    if (this.currentIdx < this.currentQuestions.length) {
      this.renderQuestion();
    } else {
      this.endQuiz();
    }
  },

  endQuiz() {
    clearInterval(this.timerInterval);

    // Hide active container
    document.getElementById('quiz-active').classList.add('hidden');
    document.getElementById('quiz-results').classList.remove('hidden');

    // Calculate metrics
    const total = this.currentQuestions.length;
    const accuracy = Math.round((this.score / total) * 100);
    const xpGained = this.score * 30 + 50; // 30 XP per correct + 50 completion bonus

    document.getElementById('res-score').textContent = `${this.score}/${total}`;
    document.getElementById('res-accuracy').textContent = `${accuracy}%`;
    document.getElementById('res-xp').textContent = `+${xpGained} XP`;

    // Feedback message
    let feedback = "";
    if (accuracy >= 80) {
      feedback = "Outstanding! Your GS prep is at officer level. Keep it up!";
    } else if (accuracy >= 50) {
      feedback = "Good job! A little more revise of timelines and maps will push you to 80%+.";
    } else {
      feedback = "Needs improvement. Try revising your active recall cards and polity articles first.";
    }
    document.getElementById('res-feedback').textContent = feedback;

    // Render Question Review Breakdown
    const reviewContainer = document.getElementById('quiz-review-container');
    if (reviewContainer && this.userAnswers) {
      reviewContainer.innerHTML = `
        <h4 style="font-size:16px; font-weight:700; margin-bottom:8px; border-left:3px solid var(--accent-purple); padding-left:8px;">Detailed Question Breakdown</h4>
        ${this.userAnswers.map((ans, i) => `
          <div class="review-item-card ${ans.isCorrect ? 'correct-item' : 'wrong-item'}">
            <div class="review-q-title">${i + 1}. [${ans.subject}] ${ans.question}</div>
            <div class="review-ans-row">
              ${ans.isCorrect 
                ? `<span class="review-correct-ans">✓ Correct: ${ans.correctAnswerText}</span>` 
                : `<span class="review-user-ans">✗ Your Answer: ${ans.userAnswerText}</span> | <span class="review-correct-ans">✓ Correct: ${ans.correctAnswerText}</span>`
              }
            </div>
            <div class="review-expl-text"><strong>Explanation:</strong> ${ans.expl}</div>
          </div>
        `).join('')}
      `;
    }

    // Apply XP
    addXP(xpGained, 'quiz', 'Quiz session completed');

    // Invoke daily mock goal completion
    if (this.onCompleteCallback) {
      this.onCompleteCallback(this.score);
    }

    // Setup retry button
    document.getElementById('btn-restart-quiz').onclick = () => {
      document.getElementById('quiz-results').classList.add('hidden');
      document.getElementById('quiz-setup').classList.remove('hidden');
    };
  }
};

