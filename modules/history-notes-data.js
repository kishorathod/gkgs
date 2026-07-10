/* ==========================================================================
   Modern History Detailed Exam Notes Data (modules/history-notes-data.js)
   Every word from the user's SSC CGL Modern History Notes — verbatim.
   ========================================================================== */

export const HISTORY_NOTES_SECTIONS = [
  // ======================================================================
  // SECTION 0: TCS Trends
  // ======================================================================
  {
    id: "hist-tcs-trends",
    icon: "📊",
    title: "TCS Modern History Trends & Weightage",
    type: "info",
    content: `
      <p>Modern History holds the highest weightage within the History section for SSC CGL (usually accounting for <strong>2 to 3 direct questions in Tier-1</strong> and critical statement-based questions in Tier-2).</p>
      <p>TCS heavily targets the Governor-Generals/Viceroys, Socio-Religious Movements, Revolutionary Organizations, and the Gandhian Era (1917–1947).</p>
    `
  },

  // ======================================================================
  // SECTION 1: Arrival of Europeans & British Rise
  // ======================================================================
  {
    id: "europeans-british-rise",
    icon: "⛵",
    title: "1. Arrival of Europeans & British Conquests",
    type: "notes",
    content: `
      <h4>Arrival of Europeans</h4>
      <p>The chronological order of arrival in India is:</p>
      <div class="notes-hero-banner" style="padding: 12px; margin-bottom: 16px; justify-content: center; font-weight: bold;">
        Portuguese (1498) ➔ Dutch (1605) ➔ English (1608) ➔ French (1664)
      </div>
      <ul>
        <li><strong>Battle of Bedara (1759):</strong> British crushed the Dutch forces.</li>
        <li><strong>Battle of Wandiwash (1760):</strong> British crushed the French forces, ending French dreams of empire in India.</li>
      </ul>

      <h4>Establishment of British Empire</h4>
      <ul>
        <li><strong>Battle of Plassey (June 23, 1757):</strong> Robert Clive defeated Nawab Siraj-ud-Daulah of Bengal. Clive bribed Mir Jafar, Siraj's commander.</li>
        <li><strong>Battle of Buxar (October 22, 1764):</strong> Hector Munro defeated the combined forces of Mir Qasim (Bengal), Shuja-ud-Daulah (Awadh), and Shah Alam II (Mughal Emperor). This led to the <strong>Treaty of Allahabad (1765)</strong> and the launch of the Dual Government in Bengal.</li>
      </ul>
    `
  },

  // ======================================================================
  // SECTION 2: Socio-Religious Movements
  // ======================================================================
  {
    id: "socio-religious-movements",
    icon: "📿",
    title: "2. Socio-Religious Movements",
    type: "notes",
    content: `
      <ul>
        <li><strong>Brahmo Samaj (1828):</strong> Founded by Raja Ram Mohan Roy in Calcutta. He strongly opposed idolatry and the caste system. Sati was abolished in <strong>1829</strong> via Regulation XVII under Lord William Bentinck, heavily aided by Roy's activism.</li>
        <li><strong>Arya Samaj (1875):</strong> Founded by Swami Dayanand Saraswati in Bombay. He coined the slogan <strong>"Go back to Vedas"</strong>, wrote the seminal book <em>Satyarth Prakash</em>, and his original childhood name was Mul Shankar.</li>
        <li><strong>Satyashodhak Samaj (1873):</strong> Founded by Jyotirao Phule in Maharashtra. He authored the famous book <em>Gulamgiri</em> (Slavery) in 1873, focusing on lower caste struggles.</li>
      </ul>
    `
  },

  // ======================================================================
  // SECTION 3: High-Yield Governor-Generals & Viceroys
  // ======================================================================
  {
    id: "gg-viceroys-details",
    icon: "👑",
    title: "3. High-Yield Governor-Generals & Viceroys",
    type: "notes",
    content: `
      <ul>
        <li><strong>Warren Hastings:</strong> Introduced Quinquennial (5-year) settlement; abolished Robert Clive's Dual Government system in Bengal. First Governor-General of Bengal under Regulating Act 1773.</li>
        <li><strong>Lord Cornwallis:</strong> Introduced the Permanent Settlement of Bengal (1793); widely known as the <strong>"Father of Civil Services in India"</strong>.</li>
        <li><strong>Lord Wellesley:</strong> Introduced the <strong>Subsidiary Alliance system</strong> (Hyderabad was the first state to accept it in 1798).</li>
        <li><strong>Lord Dalhousie:</strong> Introduced the controversial <strong>Doctrine of Lapse</strong> (Satara was annexed first in 1848, Jhansi in 1853, and Awadh on grounds of misgovernance in 1856). He started the first railway line (Bombay to Thane, 1853) and the telegraph line.</li>
        <li><strong>Lord Canning:</strong> The last Governor-General and first Viceroy of India. Presided over the Revolt of 1857. Handled the transition under the Government of India Act 1858.</li>
        <li><strong>Lord Ripon:</strong> Known as the <strong>Father of Local Self-Government in India</strong>. Repealed the Vernacular Press Act and introduced the controversial Ilbert Bill.</li>
        <li><strong>Lord Curzon:</strong> Passed the Partition of Bengal (1905), which triggered the Swadeshi Movement.</li>
      </ul>
    `
  },

  // ======================================================================
  // SECTION 4: Governor-General & Viceroy "Key Action" Matrix
  // ======================================================================
  {
    id: "gg-viceroy-matrix",
    icon: "📋",
    title: "4. Governor-General & Viceroy \"Key Action\" Matrix",
    type: "table",
    content: `
      <p>TCS loves matching questions on who did what. Memorise these specific pairings:</p>
      <table>
        <thead>
          <tr>
            <th>Governor-General / Viceroy</th>
            <th>Key Action / Milestone Event</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><strong>Robert Clive</strong></td><td>Dual Government in Bengal (1765)</td></tr>
          <tr><td><strong>Warren Hastings</strong></td><td>Abolished Dual Government | Regulating Act (1773)</td></tr>
          <tr><td><strong>Lord Cornwallis</strong></td><td>Permanent Settlement (1793) | Civil Services Founder</td></tr>
          <tr><td><strong>Lord Wellesley</strong></td><td>Subsidiary Alliance (1798)</td></tr>
          <tr><td><strong>Lord William Bentinck</strong></td><td>Abolished Sati (1829) | English Education Act (1835)</td></tr>
          <tr><td><strong>Lord Dalhousie</strong></td><td>Doctrine of Lapse (1848) | First Railway Line (1853)</td></tr>
          <tr><td><strong>Lord Canning</strong></td><td>Last Governor-General & First Viceroy | Revolt of 1857</td></tr>
          <tr><td><strong>Lord Lytton</strong></td><td>Vernacular Press Act (1878) | Arms Act (1878)</td></tr>
          <tr><td><strong>Lord Ripon</strong></td><td>Repealed Vernacular Press Act | First Factory Act (1881) | Father of Local Self-Govt</td></tr>
          <tr><td><strong>Lord Dufferin</strong></td><td>INC Formation (1885)</td></tr>
          <tr><td><strong>Lord Curzon</strong></td><td>Partition of Bengal (1905)</td></tr>
          <tr><td><strong>Lord Irwin</strong></td><td>Simon Commission (1928) | Dandi March (1930) | Gandhi-Irwin Pact (1931)</td></tr>
          <tr><td><strong>Lord Linlithgow</strong></td><td>August Offer (1940) | Quit India Movement (1942)</td></tr>
          <tr><td><strong>Lord Mountbatten</strong></td><td>June 3rd Plan | Last Viceroy of British India</td></tr>
        </tbody>
      </table>
    `
  },

  // ======================================================================
  // SECTION 5: Socio-Religious Organizations
  // ======================================================================
  {
    id: "socio-orgs-table",
    icon: "🏫",
    title: "5. Socio-Religious Organizations & Founders",
    type: "table",
    content: `
      <p>This is a standard 1-mark question in almost every Tier-1 shift. Memorize this table:</p>
      <table>
        <thead>
          <tr>
            <th>Organization</th>
            <th>Year</th>
            <th>Founder</th>
            <th>Location</th>
            <th>Key Detail / Book</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><strong>Atmiya Sabha</strong></td><td>1814</td><td>Raja Ram Mohan Roy</td><td>Calcutta</td><td>Monotheism</td></tr>
          <tr><td><strong>Brahmo Samaj</strong></td><td>1828</td><td>Raja Ram Mohan Roy</td><td>Calcutta</td><td>Opposed idolatry & caste system</td></tr>
          <tr><td><strong>Tatvabodhini Sabha</strong></td><td>1839</td><td>Debendranath Tagore</td><td>Calcutta</td><td>Propagated Roy's ideas</td></tr>
          <tr><td><strong>Prarthana Samaj</strong></td><td>1867</td><td>Atmaram Pandurang</td><td>Bombay</td><td>Aided by M.G. Ranade</td></tr>
          <tr><td><strong>Satyashodhak Samaj</strong></td><td>1873</td><td>Jyotirao Phule</td><td>Maharashtra</td><td>Book: Gulamgiri</td></tr>
          <tr><td><strong>Arya Samaj</strong></td><td>1875</td><td>Swami Dayanand Saraswati</td><td>Bombay</td><td>Slogan: "Go back to Vedas"</td></tr>
          <tr><td><strong>Theosophical Society</strong></td><td>1875</td><td>Madame Blavatsky & Olcott</td><td>New York / Adyar</td><td>Later led by Annie Besant</td></tr>
          <tr><td><strong>Ramakrishna Mission</strong></td><td>1897</td><td>Swami Vivekananda</td><td>Belur Math</td><td>Humanitarian work</td></tr>
          <tr><td><strong>Servants of India Society</strong></td><td>1905</td><td>Gopal Krishna Gokhale</td><td>Pune</td><td>Trained national missionaries</td></tr>
        </tbody>
      </table>
    `
  },

  // ======================================================================
  // SECTION 6: INC & Early Nationalists
  // ======================================================================
  {
    id: "inc-sessions",
    icon: "🎪",
    title: "6. Indian National Congress (INC) & Sessions",
    type: "notes",
    content: `
      <h4>INC Foundation</h4>
      <p>Founded in December 1885 at Gokuldas Tejpal Sanskrit College, Bombay, by A.O. Hume.</p>
      <ul>
        <li><strong>First President:</strong> W.C. Bonnerjee (attended by 72 delegates).</li>
        <li><strong>Viceroy at the time:</strong> Lord Dufferin (who dismissed INC as a "microscopic minority").</li>
      </ul>

      <h4>Milestone INC Sessions</h4>
      <p>Keep these specific session locations, leaders, and triggers on your fingertips:</p>
      <ul>
        <li><strong>1885 (Bombay):</strong> W.C. Bonnerjee // First session, 72 delegates.</li>
        <li><strong>1886 (Calcutta):</strong> Dadabhai Naoroji // First Parsi President.</li>
        <li><strong>1887 (Madras):</strong> Badruddin Tyabji // First Muslim President.</li>
        <li><strong>1888 (Allahabad):</strong> George Yule // First Foreign/British President.</li>
        <li><strong>1896 (Calcutta):</strong> Rahimtullah M. Sayani // Vande Mataram sung for the first time.</li>
        <li><strong>1907 (Surat Split):</strong> Rash Behari Ghosh // Congress splits into Moderates & Extremists over agitation methods.</li>
        <li><strong>1911 (Calcutta):</strong> Bishan Narayan Dhar // Jana Gana Mana sung for the first time.</li>
        <li><strong>1916 (Lucknow Pact):</strong> Ambica Charan Majumdar // Moderates & Extremists reunite; INC-Muslim League Pact signed.</li>
        <li><strong>1917 (Calcutta):</strong> Annie Besant // First Woman President.</li>
        <li><strong>1924 (Belgaum):</strong> Mahatma Gandhi // Only session presided over by Gandhi.</li>
        <li><strong>1925 (Kanpur):</strong> Sarojini Naidu // First Indian Woman President.</li>
        <li><strong>1929 (Lahore):</strong> Jawaharlal Nehru // Passed Poorna Swaraj (Complete Independence) resolution.</li>
        <li><strong>1938 (Haripura):</strong> Subhas Chandra Bose // National Planning Committee set up.</li>
        <li><strong>1939 (Tripuri):</strong> Subhas Chandra Bose // Bose resigned due to rifts with Gandhi; Rajendra Prasad took over.</li>
      </ul>
    `
  },

  // ======================================================================
  // SECTION 7: The Gandhian Era & Mass Movements
  // ======================================================================
  {
    id: "gandhian-mass-movements",
    icon: "🎴",
    title: "7. The Gandhian Era & Mass Movements",
    type: "notes",
    content: `
      <h4>Early Satyagrahas</h4>
      <p>Gandhi returned from South Africa on January 9, 1915 (celebrated as Pravasi Bharatiya Divas). His regional movements were:</p>
      <ol>
        <li><strong>Champaran Satyagraha (1917):</strong> Against the Tinkathia system (indigo cultivation). Gandhi's first civil disobedience in India.</li>
        <li><strong>Ahmedabad Mill Strike (1918):</strong> First hunger strike over a plague bonus dispute (demanding 35% wage increase).</li>
        <li><strong>Kheda Satyagraha (1918):</strong> First non-cooperation movement over revenue assessment during crop failure.</li>
      </ol>

      <h4>Mass Movements</h4>
      <ul>
        <li><strong>Non-Cooperation Movement (1920):</strong> Launched alongside the Khilafat Movement. Called off due to the violent Chauri Chaura incident (Feb 5, 1922) where a mob burned a police station with 22 policemen.</li>
        <li><strong>Civil Disobedience Movement (1930):</strong> Launched with the Dandi March (March 12 – April 6, 1930) from Sabarmati Ashram to Dandi (240 miles) to break the salt monopoly.</li>
        <li><strong>Quit India Movement (August 1942):</strong> Launched at Gowalia Tank, Bombay. Gandhi gave the slogan "Do or Die" (Karo ya Maro).</li>
      </ul>
    `
  },

  // ======================================================================
  // SECTION 8: Gandhian Era Timeline
  // ======================================================================
  {
    id: "gandhian-timeline",
    icon: "⏰",
    title: "8. Chronological Chain of the Gandhian Era (1915–1947)",
    type: "notes",
    content: `
      <p>TCS Tier-2 frequently lists 4 events and asks you to arrange them chronologically. Study this exact timeline:</p>
      <ol>
        <li><strong>Jan 1915:</strong> Gandhi returns from South Africa.</li>
        <li><strong>1917:</strong> Champaran Satyagraha (First Civil Disobedience - Indigo farmers).</li>
        <li><strong>Feb 1918:</strong> Ahmedabad Mill Strike (First Hunger Strike - 35% bonus).</li>
        <li><strong>March 1918:</strong> Kheda Satyagraha (First Non-Cooperation - Crop failure).</li>
        <li><strong>March 1919:</strong> Rowlatt Act passed (Black Act).</li>
        <li><strong>April 13, 1919:</strong> Jallianwala Bagh Massacre (General Dyer ordered firing).</li>
        <li><strong>1920:</strong> Launch of Non-Cooperation & Khilafat Movements.</li>
        <li><strong>Feb 5, 1922:</strong> Chauri Chaura incident (Non-Cooperation withdrawn).</li>
        <li><strong>1923:</strong> Swaraj Party formed by C.R. Das and Motilal Nehru.</li>
        <li><strong>Nov 1927:</strong> Simon Commission appointed (arrived in India in Feb 1928).</li>
        <li><strong>1928:</strong> Nehru Report submitted (demanded Dominion Status).</li>
        <li><strong>March 12 – April 6, 1930:</strong> Dandi March (Launched Civil Disobedience).</li>
        <li><strong>March 1931:</strong> Gandhi-Irwin Pact signed (Civil Disobedience suspended).</li>
        <li><strong>Sept 1932:</strong> Poona Pact signed between Gandhi & Dr. B.R. Ambedkar.</li>
        <li><strong>Aug 1940:</strong> August Offer by Lord Linlithgow.</li>
        <li><strong>March 1942:</strong> Cripps Mission arrives (referred to as a "Post-dated cheque").</li>
        <li><strong>Aug 1942:</strong> Quit India Movement launched ("Do or Die").</li>
        <li><strong>1945:</strong> Wavell Plan & Shimla Conference.</li>
        <li><strong>1946:</strong> Cabinet Mission Plan arrives (Framework for Constituent Assembly).</li>
        <li><strong>June 3, 1947:</strong> Mountbatten Plan (Partition plan).</li>
      </ol>
    `
  },

  // ======================================================================
  // SECTION 9: Revolutionary Outfits & Newspapers
  // ======================================================================
  {
    id: "revolutionary-outfits-press",
    icon: "📰",
    title: "9. Revolutionary Movements & Famous Press",
    type: "notes",
    content: `
      <h4>Key Revolutionary Organizations</h4>
      <ul>
        <li><strong>Mitra Mela (1899) / Abhinav Bharat Society (1904):</strong> Founded by V.D. Savarkar & G.D. Savarkar in Nasik.</li>
        <li><strong>Anushilan Samiti (1902):</strong> Founded by Pramatha Nath Mitra, Barindra Kumar Ghosh, and Jatindranath Banerjee in Calcutta.</li>
        <li><strong>Ghadar Party (1913):</strong> Founded by Lala Hardayal, Sohan Singh Bhakna, and Taraknath Das in San Francisco (Yugantar Ashram).</li>
        <li><strong>Hindustan Republican Association (HRA - 1924):</strong> Founded by Sachin Sanyal and Ram Prasad Bismil in Kanpur (executed Kakori Train Robbery in 1925).</li>
        <li><strong>Hindustan Socialist Republican Association (HSRA - 1928):</strong> Founded by Chandrashekhar Azad and Bhagat Singh at Feroz Shah Kotla, Delhi.</li>
      </ul>

      <h4>High-Yield Historical Press & Journals</h4>
      <p>TCS heavily targets the journals used to distribute anti-colonial thoughts:</p>
      <ul>
        <li><strong>Bengal Gazette (1780):</strong> James Augustus Hicky (First newspaper in India).</li>
        <li><strong>Sambad Kaumudi:</strong> Raja Ram Mohan Roy (Persian/Bengali).</li>
        <li><strong>Rast Goftar:</strong> Dadabhai Naoroji (Gujarati paper).</li>
        <li><strong>Kesari (Marathi) & The Mahratta (English):</strong> Bal Gangadhar Tilak.</li>
        <li><strong>Al-Hilal:</strong> Maulana Abul Kalam Azad (Urdu weekly).</li>
        <li><strong>Harijan / Young India / Navjivan:</strong> Mahatma Gandhi.</li>
        <li><strong>New India / Commonweal:</strong> Annie Besant.</li>
        <li><strong>Independent:</strong> Motilal Nehru.</li>
      </ul>
    `
  },

  // ======================================================================
  // SECTION 10: Chronology of Major Events
  // ======================================================================
  {
    id: "chronology-major-events",
    icon: "⭐",
    title: "10. Chronology of Major Events (1905–1946)",
    type: "table",
    content: `
      <p>TCS frequently asks chronological arrangement questions in Tier-2. Memorize this exact sequence:</p>
      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Year</th>
            <th>Key Detail</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><strong>Partition of Bengal</strong></td><td>1905</td><td>Initiated by Lord Curzon; led to Boycott/Swadeshi movement.</td></tr>
          <tr><td><strong>Morley-Minto Reforms</strong></td><td>1909</td><td>Introduced separate electorates for Muslims.</td></tr>
          <tr><td><strong>Ghadar Movement</strong></td><td>1913</td><td>Headquarters at Yugantar Ashram, San Francisco.</td></tr>
          <tr><td><strong>Lucknow Pact</strong></td><td>1916</td><td>Joint session of Congress and Muslim League.</td></tr>
          <tr><td><strong>Rowlatt Act & Jallianwala Bagh</strong></td><td>1919</td><td>General Dyer ordered firing on April 13, 1919.</td></tr>
          <tr><td><strong>Simon Commission</strong></td><td>1927</td><td>All-white commission; boycotted by Indians.</td></tr>
          <tr><td><strong>Poona Pact</strong></td><td>1932</td><td>Signed between B.R. Ambedkar and Mahatma Gandhi.</td></tr>
          <tr><td><strong>Cabinet Mission Plan</strong></td><td>1946</td><td>Formulated the framework for the Constituent Assembly.</td></tr>
        </tbody>
      </table>
    `
  },
  {
    id: "sec-ancient--medieval-history",
    title: "Ancient & Medieval History",
    icon: "🏛️",
    content: `

<div class="mnemonic-image-container">
  <img src="images/history_ivc_mnemonic_1783710216395.jpg" class="mnemonic-image" alt="Indus Valley Civilization">
  <div class="mnemonic-caption">Indus Valley Civilization & Great Bath</div>
</div>
<div class="fact-block">
  <div class="fact-title">Indus Valley Civilisation (IVC)</div>
  <ul>
    <li><strong>Harappa:</strong> First site discovered (<span class="memory-highlight">1921, Daya Ram Sahni</span>) on the Ravi river.</li>
    <li><strong>Mohenjo-daro:</strong> Holds the Great Bath and <span class="memory-highlight">Bronze Dancing Girl</span> (R.D. Banerjee).</li>
    <li><strong>Lothal:</strong> The ancient artificial dockyard site (Gujarat).</li>
    <li><strong>Kalibangan:</strong> Evidence of ploughed fields and camel bones (Rajasthan).</li>
  </ul>
</div>
<div class="fact-block">
  <div class="fact-title">Buddhism & Jainism</div>
  <ul>
    <li><strong>Buddha's Life:</strong> Born in Lumbini, Enlightenment at Bodh Gaya, First Sermon at Sarnath (Dhammachakkapavattana), Death at Kushinagar (Mahaparinirvana).</li>
    <li><strong>Buddhist Councils:</strong> 1st at Rajgriha (Ajatashatru), 2nd at Vaishali (Kalasoka), 3rd at Pataliputra (Ashoka), 4th at Kashmir (Kanishka - where Buddhism split into Hinayana and Mahayana).</li>
  </ul>
</div>
<div class="fact-block">
  <div class="fact-title">Delhi Sultanate & Mughal Chronology</div>
  <ul>
    <li><strong>Sultanate Dynasties:</strong> <span class="memory-highlight">Slave ➔ Khalji ➔ Tughlaq ➔ Sayyid ➔ Lodi</span> (Trick: Sahi Khel Tum Shuru Lao).</li>
    <li><strong>Key Rulers:</strong> Al-Aud-din Khalji introduced market reforms (Daag and Chehra systems). Mohammad bin Tughlaq shifted the capital to Daulatabad and introduced token currency.</li>
    <li><strong>Mughal Battles:</strong> Babur won the 1st Battle of Panipat (1526) using Tulughma strategy against Ibrahim Lodi. Akbar won the 2nd Battle of Panipat (1556) against Hemu.</li>
  </ul>
</div>

    `
  },

];

// ======================================================================
// HISTORY PYQ QUIZ DATA: 50 MCQs with Answer Key
// ======================================================================
export const HISTORY_PYQ_DATA = [
  // Section A: Arrival of Europeans & Early British Conquests (Q1-5)
  {
    id: 1,
    section: "A",
    sectionTitle: "Arrival of Europeans & Early British Conquests",
    question: "Who among the following Portuguese Governors in India captured Goa from the Sultan of Bijapur in 1510 AD?",
    options: [
      "(A) Francisco de Almeida",
      "(B) Alfonso de Albuquerque",
      "(C) Nino da Cunha",
      "(D) Vasco da Gama"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 2,
    section: "A",
    sectionTitle: "Arrival of Europeans & Early British Conquests",
    question: "Chronologically arrange the following battles fought by the British East India Company: 1. Battle of Buxar, 2. Battle of Plassey, 3. Battle of Wandiwash, 4. Battle of Bedara",
    options: [
      "(A) 2-4-3-1",
      "(B) 4-2-1-3",
      "(C) 2-3-4-1",
      "(D) 4-1-2-3"
    ],
    answer: 0,
    answerLabel: "(A)"
  },
  {
    id: 3,
    section: "A",
    sectionTitle: "Arrival of Europeans & Early British Conquests",
    question: "The famous Treaty of Allahabad was signed in 1765 following which historic battle?",
    options: [
      "(A) Battle of Plassey",
      "(B) Battle of Buxar",
      "(C) Third Battle of Panipat",
      "(D) Battle of Wandiwash"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 4,
    section: "A",
    sectionTitle: "Arrival of Europeans & Early British Conquests",
    question: "Who was the Nawab of Bengal during the Battle of Plassey in 1757?",
    options: [
      "(A) Mir Jafar",
      "(B) Mir Qasim",
      "(C) Siraj-ud-Daulah",
      "(D) Alivardi Khan"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 5,
    section: "A",
    sectionTitle: "Arrival of Europeans & Early British Conquests",
    question: "Under the Dual Government system established in Bengal by Robert Clive, the 'Diwani' rights stood for which of the following administrative powers?",
    options: [
      "(A) Police and Judicial powers",
      "(B) Military defense powers",
      "(C) Right to collect land revenue",
      "(D) Social welfare management"
    ],
    answer: 2,
    answerLabel: "(C)"
  },

  // Section B: Governor-Generals, Viceroys & British Policies (Q6-14)
  {
    id: 6,
    section: "B",
    sectionTitle: "Governor-Generals, Viceroys & British Policies",
    question: "Who was the first Governor-General of Bengal appointed under the Regulating Act of 1773?",
    options: [
      "(A) Robert Clive",
      "(B) Warren Hastings",
      "(C) Lord Cornwallis",
      "(D) Lord Wellesley"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 7,
    section: "B",
    sectionTitle: "Governor-Generals, Viceroys & British Policies",
    question: "Which Governor-General of India introduced the Permanent Settlement system of land revenue in Bengal in 1793?",
    options: [
      "(A) Lord Cornwallis",
      "(B) Warren Hastings",
      "(C) Lord Wellesley",
      "(D) Lord William Bentinck"
    ],
    answer: 0,
    answerLabel: "(A)"
  },
  {
    id: 8,
    section: "B",
    sectionTitle: "Governor-Generals, Viceroys & British Policies",
    question: "The 'Subsidiary Alliance System', a non-intervention policy used to establish British administrative control over Indian princely states, was devised by whom?",
    options: [
      "(A) Lord Dalhousie",
      "(B) Lord Wellesley",
      "(C) Lord Hastings",
      "(D) Lord Canning"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 9,
    section: "B",
    sectionTitle: "Governor-Generals, Viceroys & British Policies",
    question: "Which princely state was the very first to be annexed by Lord Dalhousie under the controversial 'Doctrine of Lapse' in 1848?",
    options: [
      "(A) Jhansi",
      "(B) Nagpur",
      "(C) Satara",
      "(D) Awadh"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 10,
    section: "B",
    sectionTitle: "Governor-Generals, Viceroys & British Policies",
    question: "On what specific grounds did Lord Dalhousie annex the wealthy state of Awadh in the year 1856?",
    options: [
      "(A) Failure to pay tribute",
      "(B) Allegation of Misgovernance (Maladministration)",
      "(C) Absence of a natural male heir",
      "(D) Armed rebellion against the British"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 11,
    section: "B",
    sectionTitle: "Governor-Generals, Viceroys & British Policies",
    question: "Who was the Governor-General of India during the outbreak of the Revolt of 1857, who subsequently became India's first Viceroy?",
    options: [
      "(A) Lord Dalhousie",
      "(B) Lord Elgin",
      "(C) Lord Canning",
      "(D) Lord Lawrence"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 12,
    section: "B",
    sectionTitle: "Governor-Generals, Viceroys & British Policies",
    question: "The Vernacular Press Act of 1878, which severely restricted the freedom of the Indian press, was passed during the tenure of which Viceroy?",
    options: [
      "(A) Lord Ripon",
      "(B) Lord Lytton",
      "(C) Lord Curzon",
      "(D) Lord Dufferin"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 13,
    section: "B",
    sectionTitle: "Governor-Generals, Viceroys & British Policies",
    question: "Who is widely referred to as the 'Father of Local Self-Government' in India due to his progressive administrative resolutions in 1882?",
    options: [
      "(A) Lord Mayo",
      "(B) Lord Ripon",
      "(C) Lord Lytton",
      "(D) Lord Lansdowne"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 14,
    section: "B",
    sectionTitle: "Governor-Generals, Viceroys & British Policies",
    question: "The partition of Bengal announced in 1905, which led to the nationwide Swadeshi Movement, was executed by which Viceroy?",
    options: [
      "(A) Lord Minto",
      "(B) Lord Curzon",
      "(C) Lord Chelmsford",
      "(D) Lord Hardinge"
    ],
    answer: 1,
    answerLabel: "(B)"
  },

  // Section C: Socio-Religious Reform Movements (Q15-19)
  {
    id: 15,
    section: "C",
    sectionTitle: "Socio-Religious Reform Movements",
    question: "In which year did Lord William Bentinck officially abolish the practice of 'Sati' via Regulation XVII, heavily aided by Raja Ram Mohan Roy?",
    options: [
      "(A) 1820",
      "(B) 1828",
      "(C) 1829",
      "(D) 1835"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 16,
    section: "C",
    sectionTitle: "Socio-Religious Reform Movements",
    question: "Swami Dayanand Saraswati founded the Arya Samaj in 1875. What was his original childhood name?",
    options: [
      "(A) Narendra Nath Datta",
      "(B) Mul Shankar",
      "(C) Gadadhar Chattopadhyay",
      "(D) Siddhartha"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 17,
    section: "C",
    sectionTitle: "Socio-Religious Reform Movements",
    question: "The famous book titled 'Gulamgiri' (Slavery), focusing on the plight of lower castes, was authored in 1873 by whom?",
    options: [
      "(A) Dr. B.R. Ambedkar",
      "(B) Jyotirao Phule",
      "(C) Sri Narayana Guru",
      "(D) Periyar E.V. Ramasamy"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 18,
    section: "C",
    sectionTitle: "Socio-Religious Reform Movements",
    question: "Who founded the Ramakrishna Mission in 1897 to promote the humanitarian ideals of his guru?",
    options: [
      "(A) Swami Vivekananda",
      "(B) Ramakrishna Paramahamsa",
      "(C) Devendranath Tagore",
      "(D) Keshab Chandra Sen"
    ],
    answer: 0,
    answerLabel: "(A)"
  },
  {
    id: 19,
    section: "C",
    sectionTitle: "Socio-Religious Reform Movements",
    question: "The Aligarh Movement, aimed at establishing a modern system of education for the Muslim community in India, was started by whom?",
    options: [
      "(A) Mohammad Ali Jinnah",
      "(B) Sir Sayyid Ahmad Khan",
      "(C) Aga Khan",
      "(D) Maulana Abul Kalam Azad"
    ],
    answer: 1,
    answerLabel: "(B)"
  },

  // Section D: Indian National Congress (INC) & Moderate Phase (Q20-25)
  {
    id: 20,
    section: "D",
    sectionTitle: "Indian National Congress (INC) & Moderate Phase",
    question: "In December 1885, the Indian National Congress was founded at Bombay. Who was the British Viceroy of India at that time?",
    options: [
      "(A) Lord Lytton",
      "(B) Lord Ripon",
      "(C) Lord Dufferin",
      "(D) Lord Lansdowne"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 21,
    section: "D",
    sectionTitle: "Indian National Congress (INC) & Moderate Phase",
    question: "Who was elected as the very first President of the Indian National Congress in its inaugural session at Bombay?",
    options: [
      "(A) Dinshaw Wacha",
      "(B) Womesh Chandra Bonnerjee",
      "(C) Dadabhai Naoroji",
      "(D) Badruddin Tyabji"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 22,
    section: "D",
    sectionTitle: "Indian National Congress (INC) & Moderate Phase",
    question: "In which historic session did the Indian National Congress split into two factions—the Moderates and the Extremists?",
    options: [
      "(A) 1905 Benares Session",
      "(B) 1906 Calcutta Session",
      "(C) 1907 Surat Session",
      "(D) 1916 Lucknow Session"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 23,
    section: "D",
    sectionTitle: "Indian National Congress (INC) & Moderate Phase",
    question: "Who was the first woman President of the Indian National Congress, presiding over the Calcutta session in 1917?",
    options: [
      "(A) Sarojini Naidu",
      "(B) Annie Besant",
      "(C) Nellie Sengupta",
      "(D) Kadambini Ganguly"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 24,
    section: "D",
    sectionTitle: "Indian National Congress (INC) & Moderate Phase",
    question: "Mahatma Gandhi presided over a session of the Indian National Congress only once in his entire lifetime. Where was this session held?",
    options: [
      "(A) Kanpur (1925)",
      "(B) Belgaum (1924)",
      "(C) Lahore (1929)",
      "(D) Haripura (1938)"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 25,
    section: "D",
    sectionTitle: "Indian National Congress (INC) & Moderate Phase",
    question: "Who authored the seminal book 'Poverty and Un-British Rule in India', which introduced the famous 'Drain of Wealth' theory?",
    options: [
      "(A) Romesh Chunder Dutt",
      "(B) Dadabhai Naoroji",
      "(C) Gopal Krishna Gokhale",
      "(D) Bal Gangadhar Tilak"
    ],
    answer: 1,
    answerLabel: "(B)"
  },

  // Section E: Revolutionary Nationalism & Radical Phase (Q26-30)
  {
    id: 26,
    section: "E",
    sectionTitle: "Revolutionary Nationalism & Radical Phase",
    question: "The revolutionary organization 'Abhinav Bharat Society' was founded in 1904 by which leader?",
    options: [
      "(A) Vinayak Damodar Savarkar",
      "(B) Barindra Kumar Ghosh",
      "(C) Prafulla Chaki",
      "(D) Bhagat Singh"
    ],
    answer: 0,
    answerLabel: "(A)"
  },
  {
    id: 27,
    section: "E",
    sectionTitle: "Revolutionary Nationalism & Radical Phase",
    question: "The Ghadar Party, an international political movement against British rule in India, was founded in 1913 in San Francisco by whom?",
    options: [
      "(A) Lala Hardayal and Sohan Singh Bhakna",
      "(B) Rash Behari Bose and Sachin Sanyal",
      "(C) Bhagat Singh and Sukhdev",
      "(D) Shyamji Krishna Varma"
    ],
    answer: 0,
    answerLabel: "(A)"
  },
  {
    id: 28,
    section: "E",
    sectionTitle: "Revolutionary Nationalism & Radical Phase",
    question: "The Hindustan Republican Association (HRA), later renamed HSRA, was originally formed in 1924 at which place?",
    options: [
      "(A) Delhi",
      "(B) Kanpur",
      "(C) Lahore",
      "(D) Calcutta"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 29,
    section: "E",
    sectionTitle: "Revolutionary Nationalism & Radical Phase",
    question: "The historic Kakori Train Action (Train Robbery) was executed by the revolutionaries of HRA in which year?",
    options: [
      "(A) 1920",
      "(B) 1922",
      "(C) 1925",
      "(D) 1928"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 30,
    section: "E",
    sectionTitle: "Revolutionary Nationalism & Radical Phase",
    question: "Bhagat Singh, Shivaram Rajguru, and Sukhdev Thapar were hanged in Lahore Central Jail on which historic date?",
    options: [
      "(A) 23rd March 1931",
      "(B) 13th April 1919",
      "(C) 9th August 1925",
      "(D) 30th January 1948"
    ],
    answer: 0,
    answerLabel: "(A)"
  },

  // Section F: The Gandhian Mass Movements (1915–1947) (Q31-40)
  {
    id: 31,
    section: "F",
    sectionTitle: "The Gandhian Mass Movements (1915–1947)",
    question: "Mahatma Gandhi returned to India from South Africa permanently on 9th January 1915. This day is observed nationally as what?",
    options: [
      "(A) National Youth Day",
      "(B) Pravasi Bharatiya Divas",
      "(C) Sadbhavana Divas",
      "(D) Martyr's Day"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 32,
    section: "F",
    sectionTitle: "The Gandhian Mass Movements (1915–1947)",
    question: "Which movement was launched as Mahatma Gandhi’s very first Satyagraha experimental success in India in 1917?",
    options: [
      "(A) Kheda Satyagraha",
      "(B) Ahmedabad Mill Strike",
      "(C) Champaran Satyagraha",
      "(D) Rowlatt Satyagraha"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 33,
    section: "F",
    sectionTitle: "The Gandhian Mass Movements (1915–1947)",
    question: "Mahatma Gandhi undertook his very first hunger strike in India during which of the following disputes?",
    options: [
      "(A) Champaran Satyagraha (1917)",
      "(B) Ahmedabad Mill Strike (1918)",
      "(C) Kheda Satyagraha (1918)",
      "(D) Anti-Rowlatt Movement (1919)"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 34,
    section: "F",
    sectionTitle: "The Gandhian Mass Movements (1915–1947)",
    question: "Who was the British military commander responsible for ordering indiscriminate fire on a peaceful gathering at Jallianwala Bagh on 13th April 1919?",
    options: [
      "(A) General Michael O'Dwyer",
      "(B) Reginald Dyer",
      "(C) Lord Chelmsford",
      "(D) Sir John Simon"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 35,
    section: "F",
    sectionTitle: "The Gandhian Mass Movements (1915–1947)",
    question: "Following the violent Chauri Chaura incident in February 1922, Mahatma Gandhi immediately suspended which pan-India mass movement?",
    options: [
      "(A) Swadeshi Movement",
      "(B) Home Rule Movement",
      "(C) Non-Cooperation Movement",
      "(D) Civil Disobedience Movement"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 36,
    section: "F",
    sectionTitle: "The Gandhian Mass Movements (1915–1947)",
    question: "The famous Dandi March (Salt Satyagraha) was launched from Sabarmati Ashram on 12th March 1930. On which date did Gandhi break the salt law at Dandi?",
    options: [
      "(A) 1st April 1930",
      "(B) 6th April 1930",
      "(C) 13th April 1930",
      "(D) 10th May 1930"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 37,
    section: "F",
    sectionTitle: "The Gandhian Mass Movements (1915–1947)",
    question: "The historic Poona Pact of September 1932 was signed directly between Mahatma Gandhi and which other leader?",
    options: [
      "(A) Mohammad Ali Jinnah",
      "(B) Dr. B.R. Ambedkar",
      "(C) Subhas Chandra Bose",
      "(D) Jawaharlal Nehru"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 38,
    section: "F",
    sectionTitle: "The Gandhian Mass Movements (1915–1947)",
    question: "At which session of the Indian National Congress was the historic 'Poorna Swaraj' (Complete Independence) resolution passed under the presidency of Jawaharlal Nehru?",
    options: [
      "(A) 1920 Nagpur Session",
      "(B) 1927 Madras Session",
      "(C) 1929 Lahore Session",
      "(D) 1931 Karachi Session"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 39,
    section: "F",
    sectionTitle: "The Gandhian Mass Movements (1915–1947)",
    question: "During the launch of the Quit India Movement in August 1942, Mahatma Gandhi gave which iconic slogan to the masses?",
    options: [
      "(A) Jai Hind",
      "(B) Inquilab Zindabad",
      "(C) Do or Die (Karo ya Maro)",
      "(D) Satyameva Jayate"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 40,
    section: "F",
    sectionTitle: "The Gandhian Mass Movements (1915–1947)",
    question: "Who was the British Prime Minister who dispatched the Cripps Mission to India in 1942 to secure Indian cooperation in World War II?",
    options: [
      "(A) Ramsay MacDonald",
      "(B) Winston Churchill",
      "(C) Clement Attlee",
      "(D) Neville Chamberlain"
    ],
    answer: 1,
    answerLabel: "(B)"
  },

  // Section G: Important Historical Journals, Books & Committees (Q41-45)
  {
    id: 41,
    section: "G",
    sectionTitle: "Important Historical Journals, Books & Committees",
    question: "The national journal 'Kesari' (published in Marathi) and 'The Mahratta' (in English) were founded and edited by which nationalist leader?",
    options: [
      "(A) Gopal Krishna Gokhale",
      "(B) Bal Gangadhar Tilak",
      "(C) Lala Lajpat Rai",
      "(D) Bipin Chandra Pal"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 42,
    section: "G",
    sectionTitle: "Important Historical Journals, Books & Committees",
    question: "Which prominent leader published the weekly journals 'Young India' and 'Harijan'?",
    options: [
      "(A) Mahatma Gandhi",
      "(B) Jawaharlal Nehru",
      "(C) Dr. B.R. Ambedkar",
      "(D) Subhas Chandra Bose"
    ],
    answer: 0,
    answerLabel: "(A)"
  },
  {
    id: 43,
    section: "G",
    sectionTitle: "Important Historical Journals, Books & Committees",
    question: "Who was appointed as the chairman of the Boundary Commission tasked with demarcating the borders between India and Pakistan in 1947?",
    options: [
      "(A) Lord Mountbatten",
      "(B) Sir Stafford Cripps",
      "(C) Sir Cyril Radcliffe",
      "(D) Pethick-Lawrence"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 44,
    section: "G",
    sectionTitle: "Important Historical Journals, Books & Committees",
    question: "The Hunter Commission was explicitly appointed by the British Government to investigate which historical incident?",
    options: [
      "(A) The Revolt of 1857",
      "(B) The Jallianwala Bagh Massacre",
      "(C) The Chauri Chaura Violence",
      "(D) Partition of Bengal"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 45,
    section: "G",
    sectionTitle: "Important Historical Journals, Books & Committees",
    question: "Who among the following compiled and edited the newspaper 'Al-Hilal' to influence Urdu-knowing masses?",
    options: [
      "(A) Khan Abdul Ghaffar Khan",
      "(B) Maulana Abul Kalam Azad",
      "(C) Zakir Hussain",
      "(D) Shaukat Ali"
    ],
    answer: 1,
    answerLabel: "(B)"
  },

  // Section H: TCS Shift-Special Factual PYQs (Q46-50)
  {
    id: 46,
    section: "H",
    sectionTitle: "TCS Shift-Special Factual PYQs",
    question: "In which year did the British East India Company officially shift its capital from Calcutta to Delhi?",
    options: [
      "(A) 1905",
      "(B) 1911",
      "(C) 1912",
      "(D) 1919"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 47,
    section: "H",
    sectionTitle: "TCS Shift-Special Factual PYQs",
    question: "Who was the author of the revolutionary book titled 'Bhavani Mandir' published in 1905?",
    options: [
      "(A) Aurobindo Ghosh",
      "(B) Barindra Kumar Ghosh",
      "(C) Bhupendranath Datta",
      "(D) Lala Lajpat Rai"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 48,
    section: "H",
    sectionTitle: "TCS Shift-Special Factual PYQs",
    question: "The Battle of Wandiwash (1760) was a decisive conflict fought between which two European powers in India?",
    options: [
      "(A) British and Portuguese",
      "(B) British and Dutch",
      "(C) British and French",
      "(D) French and Dutch"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 49,
    section: "H",
    sectionTitle: "TCS Shift-Special Factual PYQs",
    question: "The famous 'Lucknow Pact' signed in 1916 achieved a political union between which two entities?",
    options: [
      "(A) Moderates and Extremists",
      "(B) Indian National Congress and the Muslim League",
      "(C) British Govt and Princely States",
      "(D) Swarajists and No-Changers"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 50,
    section: "H",
    sectionTitle: "TCS Shift-Special Factual PYQs",
    question: "Who was the British Viceroy when the Simon Commission visited India in 1928, facing widespread black-flag boycotts?",
    options: [
      "(A) Lord Reading",
      "(B) Lord Irwin",
      "(C) Lord Willingdon",
      "(D) Lord Linlithgow"
    ],
    answer: 1,
    answerLabel: "(B)"
  }
];
