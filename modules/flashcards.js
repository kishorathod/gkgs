/* ==========================================================================
   Flashcards Module (modules/flashcards.js)
   Renders active recall cards, 3D flip card animations, and rating logic.
   ========================================================================== */

import { addXP, completeGoal, markGoalReadNotes, logFlashcardReviewed } from '../app.js';

// Flashcard decks data
const DECK_DATA = {
  "national-parks": [
    {
      theme: "Geography (Parks)",
      q: "Which state is home to the Jim Corbett National Park, and what is its historic significance?",
      a: "Uttarakhand",
      expl: "Established in 1936 as Hailey National Park (renamed Jim Corbett in 1956), it is India's first national park and the place where Project Tiger was launched in 1973. Ramganga River flows through it."
    },
    {
      theme: "Geography (Parks)",
      q: "Which is the largest national park in India, and where is it located?",
      a: "Hemis National Park (Ladakh)",
      expl: "Hemis National Park is famous for snow leopards. It is located in the Ladakh union territory and is the largest national park in India (area: 4,400 sq km)."
    },
    {
      theme: "Geography (Parks)",
      q: "Which national park is the world's only floating national park, and where is it located?",
      a: "Keibul Lamjao National Park (Manipur)",
      expl: "Located on Loktak Lake, this park is famous for the endangered Sangai (brow-antlered deer), which is also known as the dancing deer. The floating mass of vegetation is called Phumdi."
    },
    {
      theme: "Geography (Parks)",
      q: "Name the national park in Madhya Pradesh that became famous for reintroducing African cheetahs.",
      a: "Kuno National Park",
      expl: "In 2022, cheetahs were brought from Namibia and South Africa to Kuno National Park under the Cheetah Reintroduction Project, aiming to re-establish the species in India."
    }
  ],
  "art-culture": [
    {
      theme: "Art & Culture",
      q: "Which classical dance of India originated in Kerala and is characterized by elaborate makeup and heavy costumes?",
      a: "Kathakali",
      expl: "Kathakali is a story-play art. It is performed in temples and features characters with green makeup (noble/Pacha), red (evil/Kathi), and black (forest-dwellers/Kari)."
    },
    {
      theme: "Art & Culture",
      q: "Who was the founder of Satriya classical dance, and which state does it belong to?",
      a: "Srimanta Sankardev (Assam)",
      expl: "Satriya originated in the 15th century in the Vaishnavite monasteries (Sattras) of Assam, founded by the saint-reformer Srimanta Sankardev as part of the Bhakti movement."
    },
    {
      theme: "Art & Culture",
      q: "The famous festival 'Hornbill' is celebrated in which state, and what is its duration?",
      a: "Nagaland (December 1 to 10)",
      expl: "Also known as the 'Festival of Festivals', Hornbill celebrates Naga heritage and culture. It is held annually in the first week of December in Kisama heritage village, Kohima."
    },
    {
      theme: "Art & Culture",
      q: "With which string instrument is Pandit Shivkumar Sharma associated, and which state did he hail from?",
      a: "Santoor (Jammu & Kashmir)",
      expl: "Pandit Shivkumar Sharma was a legendary Santoor player who modified the folk instrument (Santoor has 100 strings) for Hindustani Classical music."
    }
  ],
  "books-authors": [
    {
      theme: "Static GK (Books)",
      q: "Who wrote the historical biography 'Akbarnama', and in which language?",
      a: "Abul Fazl (Persian)",
      expl: "'Akbarnama' (Book of Akbar) is divided into 3 volumes. The 3rd volume is known as 'Ain-i-Akbari', which deals with Akbar's administration. Written in Persian."
    },
    {
      theme: "Static GK (Books)",
      q: "Who is the author of 'The God of Small Things', which won the Booker Prize in 1997?",
      a: "Arundhati Roy",
      expl: "She was the first Indian citizen to win the Booker Prize for fiction. The novel is set in Aymanam, Kerala, and explores themes of caste, class, and family relations."
    },
    {
      theme: "Static GK (Books)",
      q: "Which book was written by Al-Biruni during his travels to India in the 11th century?",
      a: "Kitab-ul-Hind / Tahqiq-i-Hind",
      expl: "Al-Biruni accompanied Mahmud of Ghazni to India. His Persian book 'Kitab-ul-Hind' provides a detailed account of Indian religion, science, literature, and social laws."
    },
    {
      theme: "Static GK (Books)",
      q: "Who wrote the autobiography 'Playing It My Way'?",
      a: "Sachin Tendulkar (co-authored with Boria Majumdar)",
      expl: "Released in 2014, the book covers Tendulkar's cricket journey from childhood to his historic retirement at Wankhede Stadium."
    }
  ],
  "polity-articles": [
    {
      theme: "Polity (Articles)",
      q: "Which Constitutional Amendment Act is known as the 'Mini-Constitution' of India?",
      a: "42nd Amendment Act, 1976",
      expl: "Enacted during Indira Gandhi's emergency, it added the words 'Socialist', 'Secular', and 'Integrity' to the Preamble, and inserted Fundamental Duties (Part IVA)."
    },
    {
      theme: "Polity (Articles)",
      q: "Which Article of the Indian Constitution provides for the appointment of the Finance Commission?",
      a: "Article 280",
      expl: "The Finance Commission is a quasi-judicial body constituted by the President every 5 years to recommend the distribution of tax revenues between Union and States."
    },
    {
      theme: "Polity (Articles)",
      q: "Under which Article can a National Emergency be declared in India, and what are the grounds?",
      a: "Article 352 (War, External Aggression, or Armed Rebellion)",
      expl: "It was declared three times in India (1962, 1971, 1975). The word 'Armed Rebellion' replaced 'Internal Disturbance' via the 44th Amendment in 1978."
    },
    {
      theme: "Polity (Articles)",
      q: "Which Article deals with the establishment of the Supreme Court of India?",
      a: "Article 124",
      expl: "Established on January 28, 1950, replacing the Federal Court of India. Originally it had 8 judges including the Chief Justice (now 34 judges)."
    }
  ]
};

export const flashcardModule = {
  currentDeck: "national-parks",
  currentIdx: 0,

  init() {
    this.setupDeckSelector();
    this.setupCardFlipping();
    this.setupNavigation();
    this.setupRating();
  },

  onEnter() {
    this.currentIdx = 0;
    this.renderCard();
  },

  getCardMasteryKey() {
    return `leitner_${this.currentDeck}_${this.currentIdx}`;
  },

  getMasteryLevel() {
    try {
      const store = JSON.parse(localStorage.getItem('gkgs_flashcard_mastery') || '{}');
      return store[this.getCardMasteryKey()] || 1;
    } catch (e) {
      return 1;
    }
  },

  updateMasteryLevel(difficulty) {
    try {
      const store = JSON.parse(localStorage.getItem('gkgs_flashcard_mastery') || '{}');
      let current = store[this.getCardMasteryKey()] || 1;
      if (difficulty === 'easy') current = Math.min(5, current + 2);
      else if (difficulty === 'good') current = Math.min(5, current + 1);
      else if (difficulty === 'hard') current = Math.max(1, current - 1);
      
      store[this.getCardMasteryKey()] = current;
      localStorage.setItem('gkgs_flashcard_mastery', JSON.stringify(store));
      return current;
    } catch (e) {
      return 1;
    }
  },

  setupDeckSelector() {
    const select = document.getElementById('deck-select');
    if (select) {
      select.addEventListener('change', (e) => {
        this.currentDeck = e.target.value;
        this.currentIdx = 0;
        this.renderCard();
        addXP(10, 'flashcards', 'Flashcard flipped');
      });
    }
  },

  setupCardFlipping() {
    const cardEl = document.getElementById('flashcard-element');
    const ratingButtons = document.getElementById('flashcard-rating-buttons');

    if (cardEl) {
      cardEl.addEventListener('click', () => {
        cardEl.classList.toggle('flipped');
        
        // Show rating buttons when card is flipped to back
        if (cardEl.classList.contains('flipped')) {
          if (ratingButtons) ratingButtons.classList.remove('hidden');
        } else {
          if (ratingButtons) ratingButtons.classList.add('hidden');
        }
      });
    }
  },

  setupNavigation() {
    const btnPrev = document.getElementById('btn-prev-card');
    const btnNext = document.getElementById('btn-next-card');

    if (btnPrev && btnNext) {
      btnPrev.addEventListener('click', () => {
        const deck = DECK_DATA[this.currentDeck];
        if (this.currentIdx > 0) {
          this.currentIdx--;
          this.renderCard();
        }
      });

      btnNext.addEventListener('click', () => {
        const deck = DECK_DATA[this.currentDeck];
        if (this.currentIdx < deck.length - 1) {
          this.currentIdx++;
          this.renderCard();
        }
      });
    }
  },

  setupRating() {
    const rateBtns = document.querySelectorAll('.btn-rate');
    rateBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent flipping the card again
        
        const diff = btn.dataset.difficulty;
        let xpGained = 15;
        if (diff === 'easy') xpGained = 20;
        if (diff === 'hard') xpGained = 10;
        
        const newMastery = this.updateMasteryLevel(diff);
        addXP(xpGained, 'flashcards', `Flashcard rated (Box ${newMastery})`);
        logFlashcardReviewed(this.currentDeck || 'general', diff === 'easy', diff);

        // Mark flashcard goal completed
        completeGoal('flashcard', 'Completed flashcard session');

        // Go to next card automatically after a brief delay
        const deck = DECK_DATA[this.currentDeck];
        setTimeout(() => {
          if (this.currentIdx < deck.length - 1) {
            this.currentIdx++;
            this.renderCard();
          } else {
            // Reached end of deck, loop to start or show complete toast
            this.currentIdx = 0;
            this.renderCard();
          }
        }, 300);
      });
    });
  },

  renderCard() {
    const deck = DECK_DATA[this.currentDeck];
    const card = deck[this.currentIdx];
    const cardEl = document.getElementById('flashcard-element');
    const ratingButtons = document.getElementById('flashcard-rating-buttons');

    if (!card || !cardEl) return;

    // Reset card flip state first
    cardEl.classList.remove('flipped');
    if (ratingButtons) ratingButtons.classList.add('hidden');

    const mastery = this.getMasteryLevel();
    const leitnerLabels = {
      1: "📦 Box 1 (Learning)",
      2: "📦 Box 2 (Reviewing)",
      3: "📦 Box 3 (Practicing)",
      4: "📦 Box 4 (Advanced)",
      5: "🌟 Box 5 (Mastered)"
    };
    const leitnerTag = leitnerLabels[mastery] || "📦 Box 1";

    // Populate contents after flip transition reset
    setTimeout(() => {
      document.getElementById('card-current-idx').textContent = this.currentIdx + 1;
      document.getElementById('card-total-count').textContent = deck.length;

      document.getElementById('card-front-tag').innerHTML = `${card.theme} <span class="leitner-box-badge ${mastery === 5 ? 'mastered' : ''}">${leitnerTag}</span>`;
      document.getElementById('card-front-question').textContent = card.q;

      document.getElementById('card-back-tag').innerHTML = `${card.theme} <span class="leitner-box-badge ${mastery === 5 ? 'mastered' : ''}">${leitnerTag}</span>`;
      document.getElementById('card-back-answer').textContent = card.a;
      document.getElementById('card-back-explanation').textContent = card.expl;
    }, 150); // slight offset to cover card resetting back
  }
};

