/* ==========================================================================
   Current Affairs Data Module (modules/currentaffairs-notes-data.js)
   Covers Sports 2025-26 Winners, Military Exercises, Awards & Central Schemes.
   ========================================================================== */

export const CURRENT_AFFAIRS_NOTES_SECTIONS = [

  // =====================================================================
  // SECTION 1: Sports Winners 2025-2026
  // =====================================================================
  {
    id: "ca-sports",
    icon: "🏆",
    title: "1. Major Sports Winners & Tournaments (2025-2026)",
    type: "notes",
    content: `
      <p><strong>TCS Focus:</strong> Latest championship winners, tournament venues, and individual achievement records are heavily tested.</p>

      <h4 style="color: var(--accent-teal); margin: 18px 0 8px;">Cricket</h4>
      <div class="notes-table-wrapper">
        <table class="notes-data-table">
          <thead><tr><th>Tournament</th><th>Winner</th><th>Key Details</th></tr></thead>
          <tbody>
            <tr class="highlight-row">
              <td><strong>ICC U-19 World Cup 2026</strong></td>
              <td><strong>India</strong></td>
              <td>Held in Zimbabwe & Namibia</td>
            </tr>
            <tr>
              <td><strong>WPL 2026</strong> (Women's Premier League)</td>
              <td><strong>Royal Challengers Bengaluru (RCB)</strong></td>
              <td>RCB's maiden WPL title</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 style="color: var(--accent-teal); margin: 18px 0 8px;">Hockey & Football</h4>
      <div class="notes-table-wrapper">
        <table class="notes-data-table">
          <thead><tr><th>Tournament</th><th>Winner</th><th>Key Details</th></tr></thead>
          <tbody>
            <tr class="highlight-row">
              <td><strong>HIL 2025-26 (Men's)</strong></td>
              <td><strong>Kalinga Lancers</strong></td>
              <td>Odisha franchise; HIL resumed after a long gap</td>
            </tr>
            <tr>
              <td><strong>HIL 2025-26 (Women's)</strong></td>
              <td><strong>Delhi SG Pipers</strong></td>
              <td>Inaugural Women's HIL edition</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>Santosh Trophy 2026</strong></td>
              <td><strong>Services</strong></td>
              <td>India's national football championship (State teams)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 style="color: var(--accent-teal); margin: 18px 0 8px;">Badminton & Athletics</h4>
      <div class="notes-table-wrapper">
        <table class="notes-data-table">
          <thead><tr><th>Event</th><th>Achievement</th><th>Key Details</th></tr></thead>
          <tbody>
            <tr class="highlight-row">
              <td><strong>Singapore Open 2026 (Men's Doubles)</strong></td>
              <td><strong>Satwiksairaj Rankireddy & Chirag Shetty</strong></td>
              <td>India's No. 1 badminton doubles pair</td>
            </tr>
            <tr>
              <td><strong>Asian Relays 2026</strong></td>
              <td><strong>Indian Women's 4x100m Relay — Gold</strong></td>
              <td>Historic Gold; Time: 43.85 seconds</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>ISSF Junior World Championship 2026</strong></td>
              <td><strong>India — 1st place globally</strong></td>
              <td>25 total medals (7 Gold); held in Suhl, Germany</td>
            </tr>
            <tr>
              <td><strong>Neeraj Chopra</strong></td>
              <td><strong>Honorary rank: Lieutenant Colonel</strong></td>
              <td>Territorial Army rank conferred by the President of India</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 style="color: var(--accent-teal); margin: 18px 0 8px;">Chess</h4>
      <div class="notes-table-wrapper">
        <table class="notes-data-table">
          <thead><tr><th>Tournament</th><th>Winner</th><th>Details</th></tr></thead>
          <tbody>
            <tr class="highlight-row">
              <td><strong>Freestyle Chess World Championship 2026</strong></td>
              <td><strong>Magnus Carlsen (Norway)</strong></td>
              <td>Freestyle = no opening theory; positions are randomly shuffled</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="key-highlight">
        <strong>Memory Hook (Sports 2025-26):</strong> "India U-19 & RCB Win, Kalinga-Delhi Hockey Score, Satwik-Chirag Singapore, Neeraj Gets Colonel, ISSF India Tops, Magnus Chess King"
      </div>
    `
  },

  // =====================================================================
  // SECTION 2: Military Exercises
  // =====================================================================
  {
    id: "ca-military",
    icon: "⚔️",
    title: "2. Latest Military Exercises (Last 8-10 Months)",
    type: "notes",
    content: `
      <p><strong>TCS Focus:</strong> Partner country, venue, and objective/type of exercise are directly tested. Memorize 3-column matrix: Exercise — Partners — Venue.</p>

      <div class="notes-table-wrapper">
        <table class="notes-data-table">
          <thead>
            <tr>
              <th>Exercise Name</th>
              <th>Participating Nations</th>
              <th>Venue / Key Facts</th>
            </tr>
          </thead>
          <tbody>
            <tr class="highlight-row">
              <td><strong>MILAN 2026</strong></td>
              <td>India + 50+ nations (Multilateral)</td>
              <td>Visakhapatnam coast; closing ceremony on INS Vikrant</td>
            </tr>
            <tr>
              <td><strong>Yudh Abhyas</strong></td>
              <td>India & USA</td>
              <td>Alaska, USA — Mountain Warfare focus</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>Bright Star 2025</strong></td>
              <td>Multilateral (700+ Indian personnel)</td>
              <td>Egypt — One of the largest joint tri-service drills</td>
            </tr>
            <tr>
              <td><strong>Dharma Guardian 2025</strong></td>
              <td>India & Japan</td>
              <td>Mount Fuji, Japan</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>Maitree</strong></td>
              <td>India & Thailand</td>
              <td>Umroi, Meghalaya — Madras Regiment participated</td>
            </tr>
            <tr>
              <td><strong>Cyclone 2025</strong></td>
              <td>India & Egypt</td>
              <td>Rajasthan, India — Desert operations focus</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>Bold Kurukshetra</strong></td>
              <td>India & Singapore</td>
              <td>Jodhpur, India</td>
            </tr>
            <tr>
              <td><strong>Dustlik 2025</strong></td>
              <td>India & Uzbekistan</td>
              <td>Pune, India — Counter-terrorism focus</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>Zapad 2025</strong></td>
              <td>Multilateral (Tri-service contingent)</td>
              <td>Belarus & Western Russia</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="key-highlight">
        <strong>Country Quick-Map:</strong> USA - Yudh Abhyas (Alaska) | Japan - Dharma Guardian (Mt. Fuji) | Thailand - Maitree (Meghalaya) | Egypt - Bright Star + Cyclone | Singapore - Bold Kurukshetra (Jodhpur) | Uzbekistan - Dustlik (Pune) | 50+ Nations - MILAN (Vizag)
      </div>
    `
  },

  // =====================================================================
  // SECTION 3: Awards
  // =====================================================================
  {
    id: "ca-awards",
    icon: "🏅",
    title: "3. Awards — Padma, Khel Ratna, Arjuna, Jnanpith",
    type: "notes",
    content: `
      <p><strong>TCS Focus:</strong> First recipient, cash prizes, instituting year, and eligibility criteria are direct exam questions.</p>

      <h4 style="color: var(--accent-teal); margin: 18px 0 8px;">Padma Awards</h4>
      <div class="notes-table-wrapper">
        <table class="notes-data-table">
          <thead><tr><th>Award</th><th>Rank</th><th>Key Details</th></tr></thead>
          <tbody>
            <tr class="highlight-row">
              <td><strong>Padma Vibhushan</strong></td>
              <td>Highest Padma</td>
              <td>Instituted 1954; for exceptional & distinguished service</td>
            </tr>
            <tr>
              <td><strong>Padma Bhushan</strong></td>
              <td>Second highest</td>
              <td>For distinguished service of high order to the nation</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>Padma Shri</strong></td>
              <td>Third highest</td>
              <td>Most numerous — no fixed annual cap</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p style="font-size: 13px; color: var(--text-muted); margin: 8px 0 16px;"><strong>Latest Batch (2025):</strong> 131 total — 5 Vibhushan + 13 Bhushan + 113 Shri. Announced on Republic Day (Jan 26).</p>

      <h4 style="color: var(--accent-teal); margin: 18px 0 8px;">Sporting Awards</h4>
      <div class="notes-table-wrapper">
        <table class="notes-data-table">
          <thead><tr><th>Award</th><th>Instituted</th><th>Cash Prize</th><th>First Recipient / Criteria</th></tr></thead>
          <tbody>
            <tr class="highlight-row">
              <td><strong>Major Dhyan Chand Khel Ratna</strong></td>
              <td>1991-92</td>
              <td>Rs 25 Lakh</td>
              <td>First recipient: <strong>Viswanathan Anand</strong>; Highest sporting honor of India</td>
            </tr>
            <tr>
              <td><strong>Arjuna Award</strong></td>
              <td>1961</td>
              <td>Rs 15 Lakh</td>
              <td>4 years of consistent outstanding performance required</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>Dronacharya Award</strong></td>
              <td>1985</td>
              <td>Rs 15 Lakh</td>
              <td>For outstanding sports coaches; named after Guru Dronacharya</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 style="color: var(--accent-teal); margin: 18px 0 8px;">Literary Award</h4>
      <div class="notes-table-wrapper">
        <table class="notes-data-table">
          <thead><tr><th>Award</th><th>Instituted</th><th>First Awarded</th><th>Cash Prize</th><th>First Recipient</th></tr></thead>
          <tbody>
            <tr class="highlight-row">
              <td><strong>Jnanpith Award</strong></td>
              <td>1961</td>
              <td>1965</td>
              <td>Rs 11 Lakh</td>
              <td><strong>G. Sankara Kurup</strong> (Malayalam poet)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="key-highlight">
        <strong>Award Cash Prize Ladder:</strong> Khel Ratna Rs 25L &gt; Arjuna/Dronacharya Rs 15L &gt; Jnanpith Rs 11L<br>
        <strong>1961 Club:</strong> Arjuna Award (1961) + Jnanpith Award (1961) — both instituted same year!
      </div>
    `
  },

  // =====================================================================
  // SECTION 4: Central Government Schemes
  // =====================================================================
  {
    id: "ca-schemes",
    icon: "📋",
    title: "4. Central Government Schemes — TCS Target Specs",
    type: "notes",
    content: `
      <p><strong>TCS Focus:</strong> Ministry responsible, target beneficiary count, and key benefit figure (Rs or units) are directly tested every year.</p>

      <div class="notes-table-wrapper">
        <table class="notes-data-table">
          <thead>
            <tr><th>Scheme Name</th><th>Ministry</th><th>Target Group</th><th>Key Benefit / Budget</th></tr>
          </thead>
          <tbody>
            <tr class="highlight-row">
              <td><strong>PM-VISHWAKARMA</strong></td>
              <td>Ministry of MSME</td>
              <td>18 traditional crafts & artisans</td>
              <td>Rs 13,000 Crore budget; 5% concessional loan interest rate</td>
            </tr>
            <tr>
              <td><strong>PM-SURYA GHAR (Muft Bijli Yojana)</strong></td>
              <td>Ministry of New & Renewable Energy</td>
              <td>1 Crore households</td>
              <td>300 units free electricity per month via rooftop solar</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>PM-PRANAM</strong></td>
              <td>Ministry of Chemicals & Fertilizers</td>
              <td>States reducing chemical fertilizers</td>
              <td>Promotes organic / alternative bio-fertilizers</td>
            </tr>
            <tr>
              <td><strong>LAKHPATI DIDI</strong></td>
              <td>Ministry of Rural Development</td>
              <td>3 Crore rural women (SHG members)</td>
              <td>Micro-enterprise training; earn minimum Rs 1 Lakh/year</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 style="color: var(--accent-teal); margin: 18px 0 8px;">Scheme Mnemonics</h4>
      <ul style="font-size: 13.5px; line-height: 1.8; padding-left: 20px;">
        <li><strong>VISHWAKARMA</strong> — MSME — 18 trades — 5% loan — Rs 13,000 Cr</li>
        <li><strong>SURYA GHAR</strong> — Sun — Solar Rooftop — 1 Crore homes — 300 units free</li>
        <li><strong>PRANAM</strong> — Fertilizer reduction — Chemicals Ministry — Bio alternatives</li>
        <li><strong>LAKHPATI DIDI</strong> — Rural Women — 3 Crore SHGs — Rs 1 Lakh/year minimum income</li>
      </ul>

      <div class="key-highlight">
        <strong>Ministry Quick Match:</strong> MSME = VISHWAKARMA | New Energy = SURYA GHAR | Chemicals = PRANAM | Rural Dev = LAKHPATI DIDI
      </div>
    `
  },

  // =====================================================================
  // SECTION 5: Quick Revision
  // =====================================================================
  {
    id: "ca-quickrevision",
    icon: "⚡",
    title: "5. Quick Revision — High-Yield Facts at a Glance",
    type: "notes",
    content: `
      <h4 style="color: var(--accent-teal); margin: 0 0 10px;">Sports 2025-26 Flashpoints</h4>
      <ul style="font-size: 13px; line-height: 1.9; padding-left: 20px; margin-bottom: 20px;">
        <li><strong>ICC U-19 WC 2026</strong> — India | Venue: Zimbabwe & Namibia</li>
        <li><strong>WPL 2026</strong> — Royal Challengers Bengaluru</li>
        <li><strong>HIL 2025-26 Men</strong> — Kalinga Lancers</li>
        <li><strong>HIL 2025-26 Women</strong> — Delhi SG Pipers</li>
        <li><strong>Santosh Trophy 2026</strong> — Services</li>
        <li><strong>Singapore Open Men's Doubles</strong> — Satwik & Chirag</li>
        <li><strong>Asian Relays Women's 4x100m</strong> — India Gold (43.85s)</li>
        <li><strong>ISSF Junior WC 2026</strong> — India 1st (25 medals, 7 Gold) | Suhl, Germany</li>
        <li><strong>Neeraj Chopra</strong> — Honorary Lt. Colonel (Territorial Army)</li>
        <li><strong>Freestyle Chess WC 2026</strong> — Magnus Carlsen</li>
      </ul>

      <h4 style="color: var(--accent-teal); margin: 0 0 10px;">Military Exercises Quick Map</h4>
      <ul style="font-size: 13px; line-height: 1.9; padding-left: 20px; margin-bottom: 20px;">
        <li><strong>MILAN 2026</strong> — 50+ nations | Visakhapatnam | INS Vikrant closing</li>
        <li><strong>Yudh Abhyas</strong> — India-USA | Alaska | Mountain Warfare</li>
        <li><strong>Bright Star 2025</strong> — Multilateral | Egypt | Tri-service</li>
        <li><strong>Dharma Guardian</strong> — India-Japan | Mount Fuji</li>
        <li><strong>Maitree</strong> — India-Thailand | Umroi, Meghalaya | Madras Regiment</li>
        <li><strong>Cyclone 2025</strong> — India-Egypt | Rajasthan | Desert ops</li>
        <li><strong>Bold Kurukshetra</strong> — India-Singapore | Jodhpur</li>
        <li><strong>Dustlik 2025</strong> — India-Uzbekistan | Pune | Counter-terrorism</li>
        <li><strong>Zapad 2025</strong> — Multilateral | Belarus & W. Russia</li>
      </ul>

      <h4 style="color: var(--accent-teal); margin: 0 0 10px;">Awards At-a-Glance</h4>
      <ul style="font-size: 13px; line-height: 1.9; padding-left: 20px; margin-bottom: 20px;">
        <li>Padma Awards: Instituted 1954 | Latest batch: 131 (5+13+113)</li>
        <li>Khel Ratna: Rs 25L | First recipient: Viswanathan Anand (1991-92)</li>
        <li>Arjuna Award: 1961 | Rs 15L | 4 years consistent performance</li>
        <li>Jnanpith: 1961 | First awarded 1965 | Rs 11L | G. Sankara Kurup</li>
      </ul>

      <h4 style="color: var(--accent-teal); margin: 0 0 10px;">Schemes Quick Matrix</h4>
      <ul style="font-size: 13px; line-height: 1.9; padding-left: 20px;">
        <li>PM-VISHWAKARMA — MSME | 18 crafts | Rs 13,000 Cr | 5% loan</li>
        <li>PM-SURYA GHAR — New Energy | 1 Cr homes | 300 units free/month</li>
        <li>PM-PRANAM — Chemicals | Reduce chemical fertilizers</li>
        <li>LAKHPATI DIDI — Rural Dev | 3 Cr women | Rs 1 Lakh/year min</li>
      </ul>
    `
  },
  {
    id: "sec-additional-notes",
    title: "Additional Notes",
    icon: "📰",
    content: `

<div class="mnemonic-image-container">
  <img src="images/ca_trophy_mnemonic_1783710245953.jpg" class="mnemonic-image" alt="Golden Sports Trophy">
  <div class="mnemonic-caption">Sports Tournaments & National Awards</div>
</div>
<div class="fact-block">
  <div class="fact-title">Current Affairs & Government Schemes</div>
  <ul>
    <li><strong>Key Appointments:</strong> Focus on <span class="memory-highlight">Chief Justice of India</span>, CAG, Chief Election Commissioner, ISRO/DRDO Heads.</li>
    <li><strong>Sports Tournaments:</strong> Winners of Grand Slams, National Games, and recent Olympic/Paralympic milestones.</li>
    <li><strong>Government Schemes:</strong> Direct objective launches like PM-Kisan, Ayushman Bharat, PM VISHWAKARMA, and <span class="memory-highlight">Lakhpati Didi</span>.</li>
  </ul>
</div>

    `
  },

];

// =====================================================================
// 15 Authentic SSC CGL PYQ-Style MCQs — Current Affairs 2025-26
// =====================================================================

export const CURRENT_AFFAIRS_PYQ_DATA = [
  {
    id: 1,
    section: "A",
    sectionTitle: "Sports 2025-2026",
    question: "Which team won the ICC Under-19 Men's Cricket World Cup 2026, held in Zimbabwe and Namibia?",
    options: ["(A) Australia", "(B) England", "(C) India", "(D) South Africa"],
    answer: 2,
    answerLabel: "(C) India"
  },
  {
    id: 2,
    section: "A",
    sectionTitle: "Sports 2025-2026",
    question: "Which franchise won the Women's Premier League (WPL) 2026 title?",
    options: ["(A) Mumbai Indians", "(B) Delhi Capitals", "(C) UP Warriorz", "(D) Royal Challengers Bengaluru"],
    answer: 3,
    answerLabel: "(D) Royal Challengers Bengaluru"
  },
  {
    id: 3,
    section: "A",
    sectionTitle: "Sports 2025-2026",
    question: "Which team won the Men's title in the Hockey India League (HIL) 2025-26 season?",
    options: ["(A) Soorma Hockey Club", "(B) Kalinga Lancers", "(C) Punjab Warriors", "(D) Delhi Waveriders"],
    answer: 1,
    answerLabel: "(B) Kalinga Lancers"
  },
  {
    id: 4,
    section: "A",
    sectionTitle: "Sports 2025-2026",
    question: "India's javelin thrower Neeraj Chopra was conferred which honorary military rank by the President of India in the Territorial Army?",
    options: ["(A) Major", "(B) Colonel", "(C) Lieutenant Colonel", "(D) Brigadier"],
    answer: 2,
    answerLabel: "(C) Lieutenant Colonel"
  },
  {
    id: 5,
    section: "A",
    sectionTitle: "Sports 2025-2026",
    question: "India topped the medal standings in the ISSF Junior World Championship 2026 with 25 medals (7 Gold). This championship was held in which city in Germany?",
    options: ["(A) Munich", "(B) Berlin", "(C) Hamburg", "(D) Suhl"],
    answer: 3,
    answerLabel: "(D) Suhl"
  },
  {
    id: 6,
    section: "A",
    sectionTitle: "Sports 2025-2026",
    question: "Which Indian badminton doubles pair won the Men's Doubles title at the Singapore Open 2026?",
    options: ["(A) Chirag Shetty & Suhas Yathiraj", "(B) Satwiksairaj Rankireddy & Chirag Shetty", "(C) Manu Attri & B. Sumeeth Reddy", "(D) Krishna Prasad & Vishnuvardhan Goud"],
    answer: 1,
    answerLabel: "(B) Satwiksairaj Rankireddy & Chirag Shetty"
  },
  {
    id: 7,
    section: "A",
    sectionTitle: "Sports 2025-2026",
    question: "Magnus Carlsen won the Freestyle Chess World Championship 2026. What is the defining feature of Freestyle Chess format?",
    options: ["(A) Players can skip their turn once", "(B) No time controls are used during the game", "(C) Starting positions are randomly shuffled, eliminating opening theory", "(D) Players may consult chess engines during the match"],
    answer: 2,
    answerLabel: "(C) Starting positions are randomly shuffled, eliminating opening theory"
  },
  {
    id: 8,
    section: "B",
    sectionTitle: "Military Exercises",
    question: "The multilateral naval exercise MILAN 2026, involving 50+ nations, was held at which Indian port city with its closing ceremony on board INS Vikrant?",
    options: ["(A) Mumbai", "(B) Kochi", "(C) Chennai", "(D) Visakhapatnam"],
    answer: 3,
    answerLabel: "(D) Visakhapatnam"
  },
  {
    id: 9,
    section: "B",
    sectionTitle: "Military Exercises",
    question: "The Indo-Japan joint military exercise 'Dharma Guardian 2025' was conducted at which iconic location in Japan?",
    options: ["(A) Hokkaido", "(B) Mount Fuji", "(C) Okinawa", "(D) Nagasaki"],
    answer: 1,
    answerLabel: "(B) Mount Fuji"
  },
  {
    id: 10,
    section: "B",
    sectionTitle: "Military Exercises",
    question: "The joint military exercise 'Maitree' between India and Thailand saw participation of which Indian Army Regiment, and was held in which state?",
    options: ["(A) Rajputana Rifles | Rajasthan", "(B) Madras Regiment | Meghalaya", "(C) Gurkha Regiment | Uttarakhand", "(D) Sikh Regiment | Punjab"],
    answer: 1,
    answerLabel: "(B) Madras Regiment | Meghalaya"
  },
  {
    id: 11,
    section: "B",
    sectionTitle: "Military Exercises",
    question: "'Dustlik 2025' is a counter-terrorism joint exercise between India and which country, held in Pune, India?",
    options: ["(A) Kazakhstan", "(B) Tajikistan", "(C) Uzbekistan", "(D) Kyrgyzstan"],
    answer: 2,
    answerLabel: "(C) Uzbekistan"
  },
  {
    id: 12,
    section: "C",
    sectionTitle: "Awards & Honours",
    question: "Who was the FIRST ever recipient of the Major Dhyan Chand Khel Ratna Award (then called Rajiv Gandhi Khel Ratna), conferred in 1991-92?",
    options: ["(A) Sachin Tendulkar", "(B) P.T. Usha", "(C) Viswanathan Anand", "(D) Leander Paes"],
    answer: 2,
    answerLabel: "(C) Viswanathan Anand"
  },
  {
    id: 13,
    section: "C",
    sectionTitle: "Awards & Honours",
    question: "The Jnanpith Award — India's highest literary award — was FIRST awarded in 1965. Who was its first recipient?",
    options: ["(A) Mahadevi Varma", "(B) Sumitranandan Pant", "(C) G. Sankara Kurup", "(D) Amrita Pritam"],
    answer: 2,
    answerLabel: "(C) G. Sankara Kurup"
  },
  {
    id: 14,
    section: "D",
    sectionTitle: "Central Government Schemes",
    question: "The PM-SURYA GHAR (Muft Bijli Yojana) scheme falls under which Ministry and provides how many units of free electricity per month to beneficiary households?",
    options: ["(A) Ministry of Power | 200 units", "(B) Ministry of New & Renewable Energy | 300 units", "(C) Ministry of MSME | 400 units", "(D) Ministry of Finance | 250 units"],
    answer: 1,
    answerLabel: "(B) Ministry of New & Renewable Energy | 300 units"
  },
  {
    id: 15,
    section: "D",
    sectionTitle: "Central Government Schemes",
    question: "The 'Lakhpati Didi' scheme, targeting 3 Crore rural women SHG members, is administered by which Ministry and aims to ensure what minimum annual income?",
    options: ["(A) Women & Child Development | Rs 50,000/year", "(B) Ministry of Finance | Rs 1.5 Lakh/year", "(C) Ministry of Rural Development | Rs 1 Lakh/year", "(D) Skill Development | Rs 2 Lakh/year"],
    answer: 2,
    answerLabel: "(C) Ministry of Rural Development | Rs 1 Lakh/year"
  }
];
