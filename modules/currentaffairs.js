/* ==========================================================================
   Current Affairs Module (modules/currentaffairs.js)
   Interactive dashboards: Sports Trophy Wall, Military Exercise Map,
   Awards Showcase, Schemes Explorer, and 15-question PYQ quiz.
   ========================================================================== */

import { addXP } from '../app.js';
import { CURRENT_AFFAIRS_NOTES_SECTIONS, CURRENT_AFFAIRS_PYQ_DATA } from './currentaffairs-notes-data.js';

// ── Data ──────────────────────────────────────────────────────────────────────

const SPORTS_DATA = [
  { emoji: "CRICKET", sport: "Cricket", event: "ICC U-19 World Cup 2026", winner: "India", detail: "Held in Zimbabwe & Namibia", tag: "cricket" },
  { emoji: "CRICKET", sport: "Cricket", event: "WPL 2026", winner: "Royal Challengers Bengaluru", detail: "RCB's maiden WPL title", tag: "cricket" },
  { emoji: "HOCKEY", sport: "Hockey", event: "HIL 2025-26 (Men's)", winner: "Kalinga Lancers", detail: "Odisha-based franchise", tag: "hockey" },
  { emoji: "HOCKEY", sport: "Hockey", event: "HIL 2025-26 (Women's)", winner: "Delhi SG Pipers", detail: "Inaugural Women's HIL", tag: "hockey" },
  { emoji: "FOOTBALL", sport: "Football", event: "Santosh Trophy 2026", winner: "Services", detail: "National football championship", tag: "football" },
  { emoji: "BADMINTON", sport: "Badminton", event: "Singapore Open 2026 (M. Doubles)", winner: "Satwik & Chirag", detail: "India's No. 1 doubles pair", tag: "badminton" },
  { emoji: "ATHLETICS", sport: "Athletics", event: "Asian Relays 2026 (Women 4x100m)", winner: "India — GOLD", detail: "Historic Gold; 43.85 seconds", tag: "athletics" },
  { emoji: "SHOOTING", sport: "Shooting", event: "ISSF Junior WC 2026", winner: "India — 1st Place", detail: "25 medals (7 Gold); Suhl, Germany", tag: "shooting" },
  { emoji: "JAVELIN", sport: "Athletics", event: "Neeraj Chopra — Military Honour", winner: "Lt. Colonel (Hon.)", detail: "Territorial Army rank by President", tag: "athletics" },
  { emoji: "CHESS", sport: "Chess", event: "Freestyle Chess WC 2026", winner: "Magnus Carlsen", detail: "Randomized starting positions format", tag: "chess" }
];

const MILITARY_EXERCISES = [
  { name: "MILAN 2026", partners: "India + 50+ Nations", venue: "Visakhapatnam", type: "Naval/Multilateral", flag: "MULTI", detail: "Closing ceremony on INS Vikrant" },
  { name: "Yudh Abhyas", partners: "India & USA", venue: "Alaska, USA", type: "Army/Mountain", flag: "USA", detail: "Mountain Warfare focus" },
  { name: "Bright Star 2025", partners: "Multilateral (700+ India)", venue: "Egypt", type: "Tri-Service", flag: "EGYPT", detail: "One of the largest joint tri-service drills" },
  { name: "Dharma Guardian 2025", partners: "India & Japan", venue: "Mount Fuji, Japan", type: "Army", flag: "JAPAN", detail: "Annual India-Japan bilateral" },
  { name: "Maitree", partners: "India & Thailand", venue: "Umroi, Meghalaya", type: "Army/CT", flag: "THAI", detail: "Madras Regiment participated" },
  { name: "Cyclone 2025", partners: "India & Egypt", venue: "Rajasthan, India", type: "Desert Ops", flag: "EGYPT", detail: "Desert operations focus" },
  { name: "Bold Kurukshetra", partners: "India & Singapore", venue: "Jodhpur, India", type: "Armoured", flag: "SING", detail: "Tank/armoured exercise" },
  { name: "Dustlik 2025", partners: "India & Uzbekistan", venue: "Pune, India", type: "Counter-Terror", flag: "UZB", detail: "Counter-terrorism focus" },
  { name: "Zapad 2025", partners: "Multilateral", venue: "Belarus & W. Russia", type: "Tri-Service", flag: "MULTI", detail: "Tri-service contingent from India" }
];

const AWARDS_DATA = [
  {
    name: "Major Dhyan Chand Khel Ratna",
    emoji: "TROPHY",
    instituted: "1991–92",
    cashPrize: "₹25 Lakh",
    firstRecipient: "Viswanathan Anand",
    criteria: "Highest sporting honour of India; for spectacular & outstanding sports performance",
    color: "#f59e0b"
  },
  {
    name: "Arjuna Award",
    emoji: "MEDAL",
    instituted: "1961",
    cashPrize: "₹15 Lakh",
    firstRecipient: "Multiple athletes (1961)",
    criteria: "4 years of consistent outstanding performance in international events",
    color: "#6366f1"
  },
  {
    name: "Dronacharya Award",
    emoji: "COACH",
    instituted: "1985",
    cashPrize: "₹15 Lakh",
    firstRecipient: "O.M. Nambiar (Athletics Coach)",
    criteria: "For outstanding coaches who have produced medal-winning athletes",
    color: "#10b981"
  },
  {
    name: "Jnanpith Award",
    emoji: "BOOK",
    instituted: "1961",
    cashPrize: "₹11 Lakh",
    firstRecipient: "G. Sankara Kurup (1965)",
    criteria: "India's highest literary award; for outstanding contributions to Indian literature",
    color: "#ec4899"
  },
  {
    name: "Padma Vibhushan",
    emoji: "LOTUS",
    instituted: "1954",
    cashPrize: "No cash prize",
    firstRecipient: "Multiple awardees (1954)",
    criteria: "Highest Padma award; exceptional & distinguished service to the nation",
    color: "#8b5cf6"
  }
];

const SCHEMES_DATA = [
  {
    name: "PM-VISHWAKARMA",
    ministry: "Ministry of MSME",
    target: "18 traditional crafts & artisans",
    benefit: "₹13,000 Crore budget",
    highlight: "5% concessional loan interest rate",
    emoji: "HAMMER",
    color: "#f59e0b"
  },
  {
    name: "PM-SURYA GHAR (Muft Bijli Yojana)",
    ministry: "Ministry of New & Renewable Energy",
    target: "1 Crore households",
    benefit: "300 units free electricity/month",
    highlight: "Rooftop solar panels installation",
    emoji: "SUN",
    color: "#f97316"
  },
  {
    name: "PM-PRANAM",
    ministry: "Ministry of Chemicals & Fertilizers",
    target: "States reducing chemical fertilizer use",
    benefit: "Incentive grants to states",
    highlight: "Promotes organic & bio-fertilizers",
    emoji: "LEAF",
    color: "#10b981"
  },
  {
    name: "LAKHPATI DIDI",
    ministry: "Ministry of Rural Development",
    target: "3 Crore rural women (SHG members)",
    benefit: "Minimum ₹1 Lakh/year income",
    highlight: "Micro-enterprise skill training",
    emoji: "WOMEN",
    color: "#ec4899"
  }
];

// ── Module ───────────────────────────────────────────────────────────────────

export const currentAffairsModule = {
  activeTab: "interactive",
  activeFilter: "all",
  pyqState: {
    active: false,
    questions: [],
    currentIdx: 0,
    answered: [],
    score: 0
  },

  init() {
    this.setupTabs();
    this.renderInteractiveDashboard();
    this.renderNotes();
    this.setupPYQ();
  },

  setupTabs() {
    const interBtn = document.getElementById('btn-ca-interactive-tab');
    const notesBtn = document.getElementById('btn-ca-notes-tab');
    if (interBtn) interBtn.addEventListener('click', () => this.switchTab('interactive'));
    if (notesBtn) notesBtn.addEventListener('click', () => this.switchTab('notes'));
  },

  switchTab(tab) {
    this.activeTab = tab;
    document.querySelectorAll('.ca-tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`.ca-tab-btn[data-tab="${tab}"]`);
    if (activeBtn) activeBtn.classList.add('active');
    const inter = document.getElementById('ca-interactive-tab-content');
    const notes = document.getElementById('ca-notes-tab-content');
    if (tab === 'interactive') {
      inter?.classList.remove('hidden');
      notes?.classList.add('hidden');
    } else {
      inter?.classList.add('hidden');
      notes?.classList.remove('hidden');
    }
    addXP(5, 'currentaffairs', 'Browsed Current Affairs tab');
  },

  // ── Interactive Dashboard ─────────────────────────────────────────────────

  renderInteractiveDashboard() {
    const container = document.getElementById('ca-interactive-container');
    if (!container) return;

    const sportEmojis = { CRICKET: "🏏", HOCKEY: "🏑", FOOTBALL: "⚽", BADMINTON: "🏸", ATHLETICS: "🏃", SHOOTING: "🎯", JAVELIN: "🥇", CHESS: "♟️" };
    const awardEmojis = { TROPHY: "🏆", MEDAL: "🥈", COACH: "👨‍🏫", BOOK: "📚", LOTUS: "🌸" };
    const schemeEmojis = { HAMMER: "🔨", SUN: "☀️", LEAF: "🌿", WOMEN: "👩‍🌾" };
    const flagEmojis = { USA: "🇺🇸", EGYPT: "🇪🇬", JAPAN: "🇯🇵", THAI: "🇹🇭", SING: "🇸🇬", UZB: "🇺🇿", MULTI: "🌍" };

    container.innerHTML = `
      <!-- SPORTS TROPHY WALL -->
      <div class="glass-card" style="padding: 24px; margin-bottom: 28px;">
        <h3 style="font-size: 17px; margin-bottom: 6px; color: var(--text-main); display: flex; align-items: center; gap: 8px;">
          🏆 Sports Trophy Wall <span style="font-size: 12px; color: var(--accent-teal); background: rgba(20,184,166,0.12); padding: 2px 10px; border-radius: 12px; margin-left: 4px;">2025–26</span>
        </h3>
        <p style="font-size: 12.5px; color: var(--text-muted); margin-bottom: 18px;">Live winners board — click any sport filter to narrow results.</p>

        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 18px;">
          ${["all","cricket","hockey","football","badminton","athletics","shooting","chess"].map(f =>
            `<button onclick="currentAffairsModule.filterSports('${f}')" id="sport-filter-${f}"
              style="padding: 5px 14px; border-radius: 20px; border: 1.5px solid ${f==='all'?'var(--accent-teal)':'rgba(255,255,255,0.12)'}; background: ${f==='all'?'rgba(20,184,166,0.18)':'transparent'}; color: ${f==='all'?'var(--accent-teal)':'var(--text-muted)'}; font-size: 12px; cursor: pointer; text-transform: capitalize; transition: all 0.2s;">
              ${f}
            </button>`
          ).join('')}
        </div>

        <div id="sports-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px;">
          ${SPORTS_DATA.map(s => `
            <div class="sport-card" data-tag="${s.tag}" style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 14px 16px; display: flex; align-items: center; gap: 14px; transition: all 0.3s;">
              <div style="font-size: 28px; flex-shrink: 0;">${sportEmojis[s.emoji] || "🏅"}</div>
              <div style="flex: 1; min-width: 0;">
                <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px;">${s.sport} · ${s.event}</div>
                <div style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 2px;">${s.winner}</div>
                <div style="font-size: 11.5px; color: var(--accent-teal);">${s.detail}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- MILITARY EXERCISES TABLE -->
      <div class="glass-card" style="padding: 24px; margin-bottom: 28px;">
        <h3 style="font-size: 17px; margin-bottom: 6px; color: var(--text-main);">⚔️ Military Exercises Tracker</h3>
        <p style="font-size: 12.5px; color: var(--text-muted); margin-bottom: 18px;">3-column exam matrix: Exercise → Partners → Venue/Details</p>
        <div class="notes-table-wrapper">
          <table class="notes-data-table" style="font-size: 13px;">
            <thead>
              <tr><th>#</th><th>Exercise</th><th>Partners</th><th>Type</th><th>Venue / Key Fact</th></tr>
            </thead>
            <tbody>
              ${MILITARY_EXERCISES.map((ex, i) => `
                <tr class="${i%2===0?'highlight-row':''}">
                  <td style="color: var(--text-muted); font-size: 11px;">${i+1}</td>
                  <td><strong>${ex.name}</strong></td>
                  <td>${flagEmojis[ex.flag]||"🌍"} ${ex.partners}</td>
                  <td><span style="font-size: 11px; background: rgba(99,102,241,0.15); color: #a5b4fc; padding: 2px 8px; border-radius: 10px;">${ex.type}</span></td>
                  <td style="color: var(--text-muted);">${ex.venue} — <em>${ex.detail}</em></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- AWARDS SHOWCASE & SCHEMES EXPLORER side by side -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 28px;">

        <!-- Awards -->
        <div class="glass-card" style="padding: 24px;">
          <h3 style="font-size: 16px; margin-bottom: 16px; color: var(--text-main);">🏅 Awards Showcase</h3>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${AWARDS_DATA.map(a => `
              <div style="border-left: 3px solid ${a.color}; background: rgba(255,255,255,0.04); border-radius: 0 10px 10px 0; padding: 10px 14px;">
                <div style="font-size: 13.5px; font-weight: 700; color: var(--text-main); margin-bottom: 2px;">${awardEmojis[a.emoji]||"🏆"} ${a.name}</div>
                <div style="font-size: 11.5px; color: var(--text-muted); line-height: 1.5;">
                  <span style="color: ${a.color}; font-weight: 600;">${a.cashPrize}</span> · Since ${a.instituted}<br>
                  1st: <strong>${a.firstRecipient}</strong>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Schemes -->
        <div class="glass-card" style="padding: 24px;">
          <h3 style="font-size: 16px; margin-bottom: 16px; color: var(--text-main);">📋 Schemes Explorer</h3>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${SCHEMES_DATA.map(s => `
              <div style="border-left: 3px solid ${s.color}; background: rgba(255,255,255,0.04); border-radius: 0 10px 10px 0; padding: 10px 14px;">
                <div style="font-size: 13.5px; font-weight: 700; color: var(--text-main); margin-bottom: 2px;">${schemeEmojis[s.emoji]||"📋"} ${s.name}</div>
                <div style="font-size: 11.5px; color: var(--text-muted); line-height: 1.5;">
                  <span style="color: var(--text-muted);">${s.ministry}</span><br>
                  Target: <strong>${s.target}</strong><br>
                  <span style="color: ${s.color}; font-weight: 600;">${s.benefit}</span> — ${s.highlight}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- PYQ QUIZ TRIGGER -->
      <div class="glass-card" style="padding: 24px; text-align: center;">
        <h3 style="font-size: 17px; margin-bottom: 8px; color: var(--text-main);">🧠 Current Affairs PYQ Practice</h3>
        <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 18px;">15 SSC CGL-style questions across Sports, Military Exercises, Awards & Schemes</p>
        <div id="ca-pyq-area">
          <button id="btn-start-ca-pyq" onclick="currentAffairsModule.startPYQ()"
            style="padding: 12px 32px; border-radius: 12px; border: none; background: linear-gradient(135deg, #f59e0b, #ec4899); color: white; font-size: 14px; font-weight: 700; cursor: pointer; letter-spacing: 0.5px; transition: transform 0.2s;"
            onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
            Start 15-Question Quiz
          </button>
        </div>
      </div>
    `;
  },

  filterSports(filter) {
    this.activeFilter = filter;
    // Update button styles
    ["all","cricket","hockey","football","badminton","athletics","shooting","chess"].forEach(f => {
      const btn = document.getElementById(`sport-filter-${f}`);
      if (!btn) return;
      const active = f === filter;
      btn.style.borderColor = active ? 'var(--accent-teal)' : 'rgba(255,255,255,0.12)';
      btn.style.background = active ? 'rgba(20,184,166,0.18)' : 'transparent';
      btn.style.color = active ? 'var(--accent-teal)' : 'var(--text-muted)';
    });
    // Filter cards
    document.querySelectorAll('.sport-card').forEach(card => {
      const matches = filter === 'all' || card.dataset.tag === filter;
      card.style.display = matches ? 'flex' : 'none';
      card.style.opacity = matches ? '1' : '0';
    });
    addXP(2, 'currentaffairs', 'Expanded CA item');
  },

  // ── Notes Renderer ────────────────────────────────────────────────────────

  renderNotes() {
    const container = document.getElementById('ca-notes-container');
    if (!container) return;

    const tocHtml = CURRENT_AFFAIRS_NOTES_SECTIONS.map((s, i) =>
      `<a href="#" onclick="currentAffairsModule.scrollToSection('${s.id}'); return false;"
         style="display: flex; align-items: center; gap: 8px; padding: 6px 10px; border-radius: 8px; font-size: 12.5px; color: var(--text-muted); text-decoration: none; transition: all 0.2s;"
         onmouseover="this.style.background='rgba(255,255,255,0.06)'; this.style.color='var(--text-main)';"
         onmouseout="this.style.background='transparent'; this.style.color='var(--text-muted)';">
        <span>${s.icon}</span><span>${s.title}</span>
      </a>`
    ).join('');

    const sectionsHtml = CURRENT_AFFAIRS_NOTES_SECTIONS.map(s => `
      <div id="${s.id}" style="margin-bottom: 36px; scroll-margin-top: 20px;">
        <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 14px; display: flex; align-items: center; gap: 10px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.1);">
          <span style="font-size: 20px;">${s.icon}</span> ${s.title}
        </h3>
        <div class="notes-section-content" style="font-size: 13.5px; line-height: 1.8; color: var(--text-muted);">
          ${s.content}
        </div>
      </div>
    `).join('');

    container.innerHTML = `
      <div style="display: grid; grid-template-columns: 200px 1fr; gap: 28px; align-items: start;">
        <div style="position: sticky; top: 20px; background: rgba(255,255,255,0.03); border-radius: 12px; padding: 14px;">
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: 8px; padding: 0 10px;">Contents</div>
          ${tocHtml}
        </div>
        <div>${sectionsHtml}</div>
      </div>
      <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.08); text-align: center;">
        <button onclick="currentAffairsModule.startPYQ(); currentAffairsModule.switchTab('interactive');"
          style="padding: 12px 32px; border-radius: 12px; border: none; background: linear-gradient(135deg, #f59e0b, #ec4899); color: white; font-size: 14px; font-weight: 700; cursor: pointer;">
          Attempt 15 PYQ Questions
        </button>
      </div>
    `;
  },

  scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },

  // ── PYQ Quiz Engine ───────────────────────────────────────────────────────

  setupPYQ() {
    // Will be triggered by button click
  },

  startPYQ() {
    this.pyqState = {
      active: true,
      questions: [...CURRENT_AFFAIRS_PYQ_DATA],
      currentIdx: 0,
      answered: [],
      score: 0
    };
    this.switchTab('interactive');
    this.renderPYQQuestion();
    addXP(10, 'currentaffairs', 'CA notes section viewed');
  },

  renderPYQQuestion() {
    const area = document.getElementById('ca-pyq-area');
    if (!area) return;
    const state = this.pyqState;
    if (state.currentIdx >= state.questions.length) {
      this.showPYQResults();
      return;
    }
    const q = state.questions[state.currentIdx];
    const progress = ((state.currentIdx) / state.questions.length) * 100;

    area.innerHTML = `
      <div style="text-align: left; max-width: 700px; margin: 0 auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <span style="font-size: 12px; color: var(--text-muted);">Question ${state.currentIdx + 1} of ${state.questions.length}</span>
          <span style="font-size: 12px; color: var(--accent-teal); font-weight: 600;">${q.sectionTitle}</span>
        </div>
        <div style="height: 4px; background: rgba(255,255,255,0.08); border-radius: 2px; margin-bottom: 18px;">
          <div style="height: 100%; width: ${progress}%; background: linear-gradient(90deg, #f59e0b, #ec4899); border-radius: 2px; transition: width 0.4s;"></div>
        </div>
        <p style="font-size: 15px; font-weight: 600; color: var(--text-main); margin-bottom: 20px; line-height: 1.6;">${q.question}</p>
        <div style="display: flex; flex-direction: column; gap: 10px;" id="ca-options">
          ${q.options.map((opt, i) => `
            <button onclick="currentAffairsModule.answerPYQ(${i})"
              style="padding: 12px 16px; border-radius: 10px; border: 1.5px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.04); color: var(--text-main); font-size: 13.5px; text-align: left; cursor: pointer; transition: all 0.2s;"
              onmouseover="this.style.borderColor='rgba(245,158,11,0.5)'; this.style.background='rgba(245,158,11,0.08)';"
              onmouseout="this.style.borderColor='rgba(255,255,255,0.1)'; this.style.background='rgba(255,255,255,0.04)';">
              ${opt}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  },

  answerPYQ(selectedIdx) {
    const state = this.pyqState;
    const q = state.questions[state.currentIdx];
    const isCorrect = selectedIdx === q.answer;
    if (isCorrect) { state.score++; addXP(15, 'currentaffairs', 'CA PYQ correct'); }

    // Highlight options
    const btns = document.querySelectorAll('#ca-options button');
    btns.forEach((btn, i) => {
      btn.style.pointerEvents = 'none';
      btn.onmouseover = null; btn.onmouseout = null;
      if (i === q.answer) {
        btn.style.background = 'rgba(16,185,129,0.2)';
        btn.style.borderColor = '#10b981';
        btn.style.color = '#10b981';
      } else if (i === selectedIdx && !isCorrect) {
        btn.style.background = 'rgba(239,68,68,0.15)';
        btn.style.borderColor = '#ef4444';
        btn.style.color = '#ef4444';
      }
    });

    // Show explanation then advance
    const area = document.getElementById('ca-pyq-area');
    const explDiv = document.createElement('div');
    explDiv.style.cssText = `margin-top: 16px; padding: 14px; border-radius: 10px; background: ${isCorrect ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)'}; border: 1px solid ${isCorrect ? '#10b981' : '#ef4444'}; font-size: 13px; color: var(--text-muted); text-align: left; max-width: 700px; margin-left: auto; margin-right: auto;`;
    explDiv.innerHTML = `
      <strong style="color: ${isCorrect ? '#10b981' : '#ef4444'};">${isCorrect ? '✅ Correct!' : '❌ Incorrect'}</strong>
      &nbsp;Correct answer: <strong>${q.answerLabel}</strong>
      <br><br>
      <button onclick="currentAffairsModule.nextPYQ()"
        style="margin-top: 10px; padding: 8px 22px; border-radius: 8px; border: none; background: linear-gradient(135deg, #f59e0b, #ec4899); color: white; font-size: 13px; font-weight: 600; cursor: pointer;">
        ${state.currentIdx + 1 < state.questions.length ? 'Next Question →' : 'See Results'}
      </button>
    `;
    area.querySelector('div').appendChild(explDiv);
  },

  nextPYQ() {
    this.pyqState.currentIdx++;
    this.renderPYQQuestion();
  },

  showPYQResults() {
    const area = document.getElementById('ca-pyq-area');
    const { score, questions } = this.pyqState;
    const pct = Math.round((score / questions.length) * 100);
    const grade = pct >= 80 ? '🏆 Excellent!' : pct >= 60 ? '✅ Good Work!' : '📚 Keep Revising';
    addXP(50, 'currentaffairs', 'CA Quiz completed');
    area.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <div style="font-size: 48px; margin-bottom: 12px;">${pct >= 80 ? '🏆' : pct >= 60 ? '✅' : '📚'}</div>
        <h3 style="font-size: 22px; color: var(--text-main); margin-bottom: 6px;">${grade}</h3>
        <p style="font-size: 15px; color: var(--text-muted); margin-bottom: 20px;">You scored <strong style="color: var(--accent-teal);">${score} / ${questions.length}</strong> (${pct}%)</p>
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <button onclick="currentAffairsModule.startPYQ()"
            style="padding: 10px 24px; border-radius: 10px; border: none; background: linear-gradient(135deg, #f59e0b, #ec4899); color: white; font-size: 13px; font-weight: 700; cursor: pointer;">
            Retry Quiz
          </button>
          <button onclick="currentAffairsModule.switchTab('notes')"
            style="padding: 10px 24px; border-radius: 10px; border: 1.5px solid rgba(255,255,255,0.15); background: transparent; color: var(--text-main); font-size: 13px; cursor: pointer;">
            Review Notes
          </button>
        </div>
      </div>
    `;
  }
};
