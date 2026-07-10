/* ==========================================================================
   Static GK Detailed Exam Notes Data (modules/static-gk-notes-data.js)
   Every word from the user's SSC CGL Static GK Notes — verbatim.
   Covers Classical Dances, Exponents, Instruments, Census 2011,
   National Parks, Festivals + 15 custom CGL PYQs.
   ========================================================================== */

export const STATIC_GK_NOTES_SECTIONS = [
  // =====================================================================
  // SECTION 1: Classical Dances & Exponents
  // =====================================================================
  {
    id: "gk-dances",
    icon: "💃",
    title: "1. 8 Classical Dances & Origin States",
    type: "notes",
    content: `
      <p>The <strong>Sangeet Natak Akademi</strong> recognizes 8 classical dances (the Ministry of Culture sometimes includes Chhau as the 9th):</p>
      
      <div class="notes-table-wrapper">
        <table class="notes-data-table">
          <thead>
            <tr>
              <th>Classical Dance</th>
              <th>State of Origin</th>
              <th>Core TCS Key Facts</th>
            </tr>
          </thead>
          <tbody>
            <tr class="highlight-row">
              <td><strong>Bharatanatyam</strong></td>
              <td>Tamil Nadu</td>
              <td>Oldest dance; traditionally performed by Devadasis (Sadir Attam); uses <strong>Ekaharya</strong> (one dancer plays multiple roles).</td>
            </tr>
            <tr>
              <td><strong>Kathak</strong></td>
              <td>Uttar Pradesh / North India</td>
              <td>Name from <em>Katha</em> (storyteller); known for intense footwork (<strong>Tatkar</strong>) and lightning-fast spins (<strong>Chakkars</strong>).</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>Kathakali</strong></td>
              <td>Kerala</td>
              <td>Dance-drama featuring heavy, colorful makeup and masks; features green face (<strong>Pacha</strong>) for noble characters.</td>
            </tr>
            <tr>
              <td><strong>Kuchipudi</strong></td>
              <td>Andhra Pradesh</td>
              <td>Features <strong>Tarangam</strong> (dancing on brass plate edges with a water pot balanced on the head).</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>Odissi</strong></td>
              <td>Odisha</td>
              <td>Characterized by the <strong>Tribhanga</strong> posture (three-bend body curve); based heavily on the <em>Gita Govinda</em>.</td>
            </tr>
            <tr>
              <td><strong>Manipuri</strong></td>
              <td>Manipur</td>
              <td>Centered on <strong>Raas Leela</strong> (Radha-Krishna devotion); dancers wear a unique barrel-shaped skirt called a <strong>Kumil</strong>.</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>Mohiniyattam</strong></td>
              <td>Kerala</td>
              <td>Solo dance performed by women; dominant theme is <strong>Lasya</strong> (graceful, feminine movements).</td>
            </tr>
            <tr>
              <td><strong>Sattriya</strong></td>
              <td>Assam</td>
              <td>Introduced by Vaishnava saint <strong>Mahapurush Sankaradeva</strong> in the 15th century inside monasteries (<strong>Sattras</strong>).</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4>Award-Winning Classical Dance Exponents</h4>
      <p>TCS regularly tests specific award categories (Padma Shri, Padma Bhushan, Padma Vibhushan) tied to major legends:</p>
      <ul>
        <li><strong>Bharatanatyam Exponents:</strong>
          <ul>
            <li><strong>Rukmini Devi Arundale:</strong> Revived the dance form; first woman nominated to Rajya Sabha.</li>
            <li><strong>Padma Subrahmanyam:</strong> Creator of <em>Bharata Nrityam</em>; won Padma Bhushan (2003) and Padma Vibhushan (2024).</li>
            <li><strong>Tanjore Balasaraswati:</strong> Legend who popularized the dance globally; awarded Padma Vibhushan (1977).</li>
            <li><strong>Yamini Krishnamurthy:</strong> Famous exponent of both Bharatanatyam and Kuchipudi.</li>
          </ul>
        </li>
        <li><strong>Kathak Exponents:</strong>
          <ul>
            <li><strong>Pandit Birju Maharaj:</strong> Doyen of the Kalka-Bindadin gharana (Lucknow); awarded Padma Vibhushan (1986).</li>
            <li><strong>Sitara Devi:</strong> Described as the "Nritya Samragni" (Empress of Dance) by Rabindranath Tagore.</li>
            <li><strong>Shovana Narayan:</strong> Famous disciple of Birju Maharaj; youngest dancer to receive Padma Shri (1992).</li>
          </ul>
        </li>
        <li><strong>Odissi Exponents:</strong>
          <ul>
            <li><strong>Kelucharan Mohapatra:</strong> Credited with revitalizing modern Odissi; the first ever person from Odisha to receive the Padma Vibhushan (2000).</li>
            <li><strong>Sonal Mansingh:</strong> Youngest recipient of the Padma Bhushan (1992) and later awarded Padma Vibhushan (2003).</li>
          </ul>
        </li>
      </ul>
    `
  },

  // =====================================================================
  // SECTION 2: Musical Instruments
  // =====================================================================
  {
    id: "gk-maestros",
    icon: "🪕",
    title: "2. Indian Musical Instruments and Maestros",
    type: "highlight",
    content: `
      <p>Memorize these specific instruments and their associated legendary masters:</p>
      
      <div class="maestro-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 16px;">
        <div class="glass-card" style="padding: 16px;">
          <h5>🎵 Sitar</h5>
          <p><strong>Pandit Ravi Shankar</strong> (India's 1st Grammy winner), Vilayat Khan, Shahid Parvez, Anoushka Shankar.</p>
        </div>
        <div class="glass-card" style="padding: 16px;">
          <h5>🎵 Santoor</h5>
          <p><strong>Pandit Shivkumar Sharma</strong> (pioneered santoor into classical music), Bhajan Sopori.</p>
        </div>
        <div class="glass-card" style="padding: 16px;">
          <h5>🎵 Sarod</h5>
          <p><strong>Amjad Ali Khan</strong> (and his sons Aman &amp; Ayan Ali), Ustad Alauddin Khan, Ali Akbar Khan.</p>
        </div>
        <div class="glass-card" style="padding: 16px;">
          <h5>🎵 Shehnai</h5>
          <p><strong>Ustad Bismillah Khan</strong> (played at Red Fort in 1947; received Bharat Ratna in 2001).</p>
        </div>
        <div class="glass-card" style="padding: 16px;">
          <h5>🎵 Flute (Bansuri)</h5>
          <p><strong>Hariprasad Chaurasia</strong>, Pannalal Ghosh.</p>
        </div>
        <div class="glass-card" style="padding: 16px;">
          <h5>🎵 Tabla</h5>
          <p><strong>Zakir Hussain</strong> (Padma Vibhushan 2023), Alla Rakha Khan, Pandit Kishan Maharaj.</p>
        </div>
      </div>
    `
  },

  // =====================================================================
  // SECTION 3: Census 2011
  // =====================================================================
  {
    id: "gk-census",
    icon: "📊",
    title: "3. Census 2011 Data (Extremes)",
    type: "table",
    content: `
      <p>Key demographics and extreme values from the Census 2011:</p>
      
      <div class="notes-table-wrapper">
        <table class="notes-data-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Overall India</th>
              <th>Highest State / UT</th>
              <th>Lowest State / UT</th>
            </tr>
          </thead>
          <tbody>
            <tr class="highlight-row">
              <td><strong>Literacy Rate</strong></td>
              <td>74.04%</td>
              <td><strong>Kerala</strong> (94.00%)<br><em>UT: Lakshadweep</em></td>
              <td><strong>Bihar</strong> (61.80%)<br><em>UT: Dadra &amp; Nagar Haveli</em></td>
            </tr>
            <tr>
              <td><strong>Sex Ratio</strong></td>
              <td>940 females / 1000 males</td>
              <td><strong>Kerala</strong> (1084)<br><em>UT: Puducherry</em> (1037)</td>
              <td><strong>Haryana</strong> (879)<br><em>UT: Daman &amp; Diu</em> (618)</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>Population Density</strong></td>
              <td>382 persons / sq km</td>
              <td><strong>Bihar</strong> (1106)<br><em>UT: Delhi</em> (11,320)</td>
              <td><strong>Arunachal Pradesh</strong> (17)<br><em>UT: Andaman &amp; Nicobar</em> (46)</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },

  // =====================================================================
  // SECTION 4: National Parks
  // =====================================================================
  {
    id: "gk-parks",
    icon: "🏞️",
    title: "4. National Parks & Biosphere Reserves",
    type: "notes",
    content: `
      <p>High-yield national parks featuring unique ecosystems:</p>
      <ul>
        <li><strong>Jim Corbett National Park (Uttarakhand):</strong>
          <ul>
            <li>India's first national park (established in 1936 as <strong>Hailey National Park</strong>).</li>
            <li>Birthplace of <strong>Project Tiger (1973)</strong>.</li>
            <li>The <strong>Ramganga River</strong> flows directly through it.</li>
          </ul>
        </li>
        <li><strong>Hemis National Park (Ladakh):</strong>
          <ul>
            <li>India's <strong>largest national park</strong> by area (4,400 sq km).</li>
            <li>Famous as the global capital for the endangered <strong>Snow Leopard</strong>.</li>
          </ul>
        </li>
        <li><strong>Keibul Lamjao National Park (Manipur):</strong>
          <ul>
            <li>The world's <strong>only floating national park</strong>, situated on <strong>Loktak Lake</strong>.</li>
            <li>Home to the endangered, dancing <strong>Sangai deer</strong> (brow-antlered deer).</li>
            <li>It floats due to decomposing mass vegetation chunks called <strong>phumdis</strong>.</li>
          </ul>
        </li>
      </ul>
    `
  },

  // =====================================================================
  // SECTION 5: Traditional Festivals
  // =====================================================================
  {
    id: "gk-festivals",
    icon: "🎉",
    title: "5. Traditional Indian Festivals & Harvest Festivals",
    type: "highlight",
    content: `
      <h4>Major Traditional Festivals</h4>
      <ul>
        <li><strong>Hornbill Festival (Nagaland):</strong> Celebrated every year from Dec 1-10; popularly called the <strong>"Festival of Festivals"</strong>. Organised in Kohima to promote inter-tribal interaction.</li>
        <li><strong>Ambubachi Mela (Assam):</strong> Held at the <strong>Kamakhya Temple</strong> in Guwahati; celebrates the annual menstruation course of the goddess Kamakhya during the monsoon season.</li>
        <li><strong>Losar Festival:</strong> The traditional New Year festival celebrated by the <strong>Monpa tribe</strong> in Arunachal Pradesh and Ladakh.</li>
      </ul>

      <h4>Harvest Festivals to Remember</h4>
      <div class="notes-table-wrapper">
        <table class="notes-data-table">
          <thead>
            <tr>
              <th>Harvest Festival</th>
              <th>Primary State / Region</th>
            </tr>
          </thead>
          <tbody>
            <tr class="highlight-row">
              <td><strong>Makar Sankranti</strong></td>
              <td>North India / Pan-India</td>
            </tr>
            <tr>
              <td><strong>Pongal</strong></td>
              <td>Tamil Nadu</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>Onam</strong></td>
              <td>Kerala</td>
            </tr>
            <tr>
              <td><strong>Bihu</strong></td>
              <td>Assam</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>Baisakhi</strong></td>
              <td>Punjab</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  }
];

// =========================================================================
// STATIC GK PYQ DATA — 15 Authentic CGL Questions
// =========================================================================
export const STATIC_GK_PYQ_DATA = [
  {
    id: 1,
    section: "A",
    sectionTitle: "Classical Dances & Exponents",
    question: "Which of the following classical dance forms is traditionally performed solo and uses the concept of 'Ekaharya', where one dancer plays multiple roles?",
    options: ["(A) Kathakali", "(B) Bharatanatyam", "(C) Sattriya", "(D) Kuchipudi"],
    answer: 1,
    answerLabel: "(B) Bharatanatyam"
  },
  {
    id: 2,
    section: "A",
    sectionTitle: "Classical Dances & Exponents",
    question: "The Vaishnava saint Mahapurush Sankaradeva is credited with introducing which classical dance form inside monasteries in the 15th century?",
    options: ["(A) Kuchipudi", "(B) Sattriya", "(C) Manipuri", "(D) Odissi"],
    answer: 1,
    answerLabel: "(B) Sattriya"
  },
  {
    id: 3,
    section: "A",
    sectionTitle: "Classical Dances & Exponents",
    question: "Which legendary Bharatanatyam dancer was nominated as the first female member of the Rajya Sabha, recognizing her efforts in reviving the dance?",
    options: ["(A) Tanjore Balasaraswati", "(B) Rukmini Devi Arundale", "(C) Padma Subrahmanyam", "(D) Yamini Krishnamurthy"],
    answer: 1,
    answerLabel: "(B) Rukmini Devi Arundale"
  },
  {
    id: 4,
    section: "A",
    sectionTitle: "Classical Dances & Exponents",
    question: "Kelucharan Mohapatra, who was awarded the Padma Vibhushan in 2000, is credited with revitalizing which Indian classical dance form?",
    options: ["(A) Kathak", "(B) Kuchipudi", "(C) Odissi", "(D) Mohiniyattam"],
    answer: 2,
    answerLabel: "(C) Odissi"
  },
  {
    id: 5,
    section: "A",
    sectionTitle: "Classical Dances & Exponents",
    question: "Dancers of which classical dance form wear a unique, rigid barrel-shaped skirt called a 'Kumil'?",
    options: ["(A) Manipuri", "(B) Kathakali", "(C) Kuchipudi", "(D) Bharatanatyam"],
    answer: 0,
    answerLabel: "(A) Manipuri"
  },
  {
    id: 6,
    section: "B",
    sectionTitle: "Musical Instruments & Maestros",
    question: "Pandit Shivkumar Sharma is globally credited with pioneering which folk string instrument into mainstream Hindustani classical music?",
    options: ["(A) Sarod", "(B) Santoor", "(C) Sitar", "(D) Flute"],
    answer: 1,
    answerLabel: "(B) Santoor"
  },
  {
    id: 7,
    section: "B",
    sectionTitle: "Musical Instruments & Maestros",
    question: "Ustad Bismillah Khan, who played the shehnai at the Red Fort on August 15, 1947, was awarded India's highest civilian honor, the Bharat Ratna, in which year?",
    options: ["(A) 1999", "(B) 2001", "(C) 2005", "(D) 1991"],
    answer: 1,
    answerLabel: "(B) 2001"
  },
  {
    id: 8,
    section: "B",
    sectionTitle: "Musical Instruments & Maestros",
    question: "Who was the first Indian musician to win the prestigious Grammy Award, and which string instrument did he play?",
    options: ["(A) Zakir Hussain (Tabla)", "(B) Pandit Ravi Shankar (Sitar)", "(C) Amjad Ali Khan (Sarod)", "(D) Hariprasad Chaurasia (Flute)"],
    answer: 1,
    answerLabel: "(B) Pandit Ravi Shankar (Sitar)"
  },
  {
    id: 9,
    section: "C",
    sectionTitle: "Census 2011 & National Parks",
    question: "According to Census 2011 data, which Indian state has the highest population density of 1,106 persons per square kilometer?",
    options: ["(A) West Bengal", "(B) Bihar", "(C) Uttar Pradesh", "(D) Kerala"],
    answer: 1,
    answerLabel: "(B) Bihar"
  },
  {
    id: 10,
    section: "C",
    sectionTitle: "Census 2011 & National Parks",
    question: "Which state recorded the highest literacy rate of 94.00% and the highest sex ratio of 1084 in the Census 2011?",
    options: ["(A) Mizoram", "(B) Kerala", "(C) Goa", "(D) Tamil Nadu"],
    answer: 1,
    answerLabel: "(B) Kerala"
  },
  {
    id: 11,
    section: "C",
    sectionTitle: "Census 2011 & National Parks",
    question: "Established in 1936 as Hailey National Park, which wildlife sanctuary in Uttarakhand is recognized as India's first national park?",
    options: ["(A) Jim Corbett National Park", "(B) Hemis National Park", "(C) Keibul Lamjao National Park", "(D) Kuno National Park"],
    answer: 0,
    answerLabel: "(A) Jim Corbett National Park"
  },
  {
    id: 12,
    section: "C",
    sectionTitle: "Census 2011 & National Parks",
    question: "The world's only floating national park, Keibul Lamjao, is home to the endangered dancing Sangai deer and floats on which lake?",
    options: ["(A) Chilika Lake", "(B) Wular Lake", "(C) Loktak Lake", "(D) Vembanad Lake"],
    answer: 2,
    answerLabel: "(C) Loktak Lake"
  },
  {
    id: 13,
    section: "D",
    sectionTitle: "Festivals & Harvest Festivals",
    question: "The famous Hornbill Festival, popularly designated as the 'Festival of Festivals', is organized annually in which state?",
    options: ["(A) Mizoram", "(B) Nagaland", "(C) Manipur", "(D) Arunachal Pradesh"],
    answer: 1,
    answerLabel: "(B) Nagaland"
  },
  {
    id: 14,
    section: "D",
    sectionTitle: "Festivals & Harvest Festivals",
    question: "At which temple in Assam is the famous Ambubachi Mela held annually to celebrate the menstruation course of the goddess?",
    options: ["(A) Kamakhya Temple", "(B) Dakshineswar Temple", "(C) Jagannath Temple", "(D) Lingaraj Temple"],
    answer: 0,
    answerLabel: "(A) Kamakhya Temple"
  },
  {
    id: 15,
    section: "D",
    sectionTitle: "Festivals & Harvest Festivals",
    question: "Which of the following harvest festivals is celebrated in Tamil Nadu in mid-January, corresponding to Makar Sankranti in Northern India?",
    options: ["(A) Onam", "(B) Pongal", "(C) Bihu", "(D) Baisakhi"],
    answer: 1,
    answerLabel: "(B) Pongal"
  }
];
