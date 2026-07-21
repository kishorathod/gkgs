const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Extract history section
const historyStart = html.indexOf('<section id="view-history"');
const historyEnd = html.indexOf('</section>', historyStart) + 10;
const historyHtml = html.substring(historyStart, historyEnd);

// Create polity section by replacing history specific IDs and text
let polityHtml = historyHtml.replace(/view-history/g, 'view-polity')
  .replace(/history-topic-selector-wrap/g, 'polity-topic-selector-wrap')
  .replace(/history-topic-selector-bar/g, 'polity-topic-selector-bar')
  .replace(/btn-history-/g, 'btn-polity-')
  .replace(/history-hero-bar/g, 'polity-hero-bar')
  .replace(/history-hero-pct/g, 'polity-hero-pct')
  .replace(/history-subnav/g, 'polity-subnav')
  .replace(/history-subtab-/g, 'polity-subtab-')
  .replace(/history-notes-accordion-container/g, 'polity-notes-accordion-container')
  .replace(/history-pyqs-container/g, 'polity-pyqs-container')
  .replace(/history-quiz-container/g, 'polity-quiz-container')
  .replace(/history-flashcards-container/g, 'polity-flashcards-container')
  .replace(/history-flashcard-card/g, 'polity-flashcard-card')
  .replace(/history-flashcard-front/g, 'polity-flashcard-front')
  .replace(/history-flashcard-back/g, 'polity-flashcard-back')
  .replace(/btn-history-flip/g, 'btn-polity-flip')
  .replace(/history-revisionsheet-container/g, 'polity-revisionsheet-container')
  .replace(/history-mindmaps-container/g, 'polity-mindmaps-container')
  .replace(/history-files-container/g, 'polity-files-container')
  .replace(/hist-modal/g, 'polity-modal')
  // Update static text
  .replace('📚 Modern &amp; Indian History', '⚖️ Indian Polity')
  .replace('Chronology of Indian History', 'Constitution of India')
  .replace('Master the high-yield timelines, European arrival, Governor-Generals, freedom struggle, and TCS repeated PYQs for SSC CGL Tier 1 &amp; Tier 2.', 'Master the Fundamental Rights, DPSP, Union Executive, Parliament, Judiciary, and Constitutional Bodies with TCS repeated PYQs.')
  .replace('📚 Indian History — Topics:', '⚖️ Indian Polity — Topics:')
  .replace('<button class="topic-chip active" data-topic-id="ancient-indian-history">🏛️ Ancient Indian History</button>', '<button class="topic-chip active" data-topic-id="historical-underpinnings">📜 Historical Underpinnings</button>')
  .replace('<button class="topic-chip" data-topic-id="delhi-sultanate">🕌 Delhi Sultanate</button>', '<button class="topic-chip" data-topic-id="fundamental-rights">⚖️ Fundamental Rights</button>')
  .replace('<button class="topic-chip" data-topic-id="mughal-empire">👑 Mughal Empire</button>', '<button class="topic-chip" data-topic-id="dpsp-and-duties">🎯 DPSP & Duties</button>')
  .replace('<button class="topic-chip" data-topic-id="arrival-of-europeans">⚓ Arrival of Europeans</button>', '<button class="topic-chip" data-topic-id="union-executive">🏛️ Union Executive</button>')
  .replace('<button class="topic-chip" data-topic-id="portuguese-and-dutch-in-india">🇵🇹 Portuguese &amp; Dutch</button>', '<button class="topic-chip" data-topic-id="parliament">🗣️ Parliament</button>')
  .replace('<button class="topic-chip" data-topic-id="english-eic-and-carnatic-wars">🇬🇧 English EIC &amp; Carnatic Wars</button>', '<button class="topic-chip" data-topic-id="judiciary">⚖️ Judiciary</button>')
  .replace('<button class="topic-chip" data-topic-id="regulating-act-and-early-governors">🏛️ Regulating Act &amp; Early Governors</button>', '<button class="topic-chip" data-topic-id="state-govt">🏛️ State Government</button>')
  .replace('<button class="topic-chip" data-topic-id="revolt-of-1857">⚔️ Revolt of 1857</button>', '<button class="topic-chip" data-topic-id="local-govt">🏘️ Local Government</button>')
  .replace('<button class="topic-chip" data-topic-id="inc-formation-and-swadeshi-movement">🇮🇳 INC &amp; Swadeshi Movement</button>', '<button class="topic-chip" data-topic-id="constitutional-bodies">🏢 Constitutional Bodies</button>')
  .replace('<button class="topic-chip" data-topic-id="gandhian-era-and-independence">🕊️ Gandhian Era &amp; Independence</button>', '<button class="topic-chip" data-topic-id="amendments">📝 Amendments</button>');

// Find the old polity section
const polityOldStart = html.indexOf('<section id="view-polity"');
const polityOldEnd = html.indexOf('</section>', polityOldStart) + 10;

// Replace
const newHtml = html.substring(0, polityOldStart) + polityHtml + html.substring(polityOldEnd);
fs.writeFileSync('index.html', newHtml, 'utf8');
console.log('Done replacing index.html');
