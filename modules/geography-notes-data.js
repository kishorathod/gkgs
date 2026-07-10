/* ==========================================================================
   Indian Geography Detailed Exam Notes Data (modules/geography-notes-data.js)
   Every word from the user's SSC CGL Geography Notes — verbatim.
   Covers Physiography, Rivers (Himalayan + Peninsular), Lakes + 22 PYQs.
   ========================================================================== */

export const GEOGRAPHY_NOTES_SECTIONS = [

  // =====================================================================
  // SECTION 0: TCS Trends
  // =====================================================================
  {
    id: "geo-tcs-trends",
    icon: "📊",
    title: "TCS Geography Trends & Weightage",
    type: "info",
    content: `
      <p>Indian Geography is one of the <strong>highest-yielding subjects for SSC CGL</strong>. Under the TCS pattern, questions are extremely specific, focusing on:</p>
      <ul>
        <li>River Tributaries &amp; Left/Right Bank Classifications</li>
        <li>National Lakes and their special features</li>
        <li>Peak Heights and Mountain Passes</li>
        <li>Physiographic Divisions and their characteristics</li>
      </ul>
    `
  },

  // =====================================================================
  // SECTION 1: Physiographic Divisions
  // =====================================================================
  {
    id: "geo-physiographic",
    icon: "🏔️",
    title: "1. Essential Indian Geography Framework",
    type: "notes",
    content: `
      <h4>Physiographic Divisions</h4>
      <p>India is divided into <strong>six main physiographic regions</strong>:</p>
      <ol>
        <li>The Northern Mountains (Himalayas)</li>
        <li>The Northern Plains</li>
        <li>The Peninsular Plateau</li>
        <li>The Indian Desert</li>
        <li>The Coastal Plains</li>
        <li>The Islands</li>
      </ol>

      <h4>The Himalayas — Three Parallel Ranges</h4>
      <div class="notes-table-wrapper">
        <table class="notes-data-table">
          <thead><tr><th>Range</th><th>Also Called</th><th>Key Feature</th></tr></thead>
          <tbody>
            <tr class="highlight-row">
              <td><strong>Himadri</strong></td>
              <td>Great Himalayas (innermost)</td>
              <td>Contains the highest peaks — Mt. Everest, Kanchenjunga</td>
            </tr>
            <tr>
              <td><strong>Himachal</strong></td>
              <td>Lesser Himalayas (middle)</td>
              <td>Famous for hill stations; contains the <strong>Pir Panjal range</strong></td>
            </tr>
            <tr>
              <td><strong>Shiwaliks</strong></td>
              <td>Outer Himalayas (southernmost)</td>
              <td>Youngest range; made of <strong>unconsolidated sediments</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4>Peninsular Plateau — Key Mountain Ranges &amp; Peaks</h4>
      <p>The <strong>oldest landmass of India</strong>, bounded by:</p>
      <div class="notes-table-wrapper">
        <table class="notes-data-table">
          <thead><tr><th>Range</th><th>Key Detail</th><th>Highest Peak</th></tr></thead>
          <tbody>
            <tr class="highlight-row">
              <td><strong>Aravallis</strong></td>
              <td>Oldest fold mountains in India</td>
              <td><strong>Guru Shikhar</strong> (Mount Abu, Rajasthan)</td>
            </tr>
            <tr>
              <td><strong>Western Ghats (Sahyadri)</strong></td>
              <td>Continuous range along west coast</td>
              <td><strong>Anamudi</strong> (highest peak in peninsular India)</td>
            </tr>
            <tr>
              <td><strong>Eastern Ghats</strong></td>
              <td>Discontinuous range along east coast</td>
              <td><strong>Jindhagada / Mahendragiri</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },

  // =====================================================================
  // SECTION 2: Indus River System
  // =====================================================================
  {
    id: "geo-indus",
    icon: "🌊",
    title: "2A. Indus River System",
    type: "notes",
    content: `
      <ul>
        <li><strong>Origin:</strong> Near Lake Mansarovar (Tibet) at the <strong>Bokhar Chu glacier</strong>.</li>
        <li><strong>Key Detail:</strong> Enters India through <strong>Ladakh</strong>. The Five Rivers of Punjab (Jhelum, Chenab, Ravi, Beas, Sutlej) meet Indus at <strong>Mithankot</strong> in Pakistan.</li>
      </ul>

      <h4>Tributaries — Left &amp; Right Bank Matrix</h4>
      <div class="notes-table-wrapper">
        <table class="notes-data-table">
          <thead><tr><th>Bank</th><th>Tributaries</th></tr></thead>
          <tbody>
            <tr class="highlight-row">
              <td><strong>Right Bank</strong></td>
              <td>Shyok, Gilgit, Kabul, Kurram</td>
            </tr>
            <tr>
              <td><strong>Left Bank</strong></td>
              <td>Zanskar, Jhelum, <strong>Chenab</strong> (largest tributary), Ravi, Beas, Sutlej</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },

  // =====================================================================
  // SECTION 3: Ganga River System
  // =====================================================================
  {
    id: "geo-ganga",
    icon: "🌊",
    title: "2B. Ganga River System",
    type: "notes",
    content: `
      <ul>
        <li><strong>Origin:</strong> Formed by the confluence of <strong>Alaknanda</strong> and <strong>Bhagirathi</strong> at <strong>Devprayag</strong>.</li>
        <li><strong>Key Detail:</strong> Enters plains at <strong>Haridwar</strong>. Flows into Bangladesh as the <strong>Padma</strong> and merges with Brahmaputra to form the <strong>Meghna</strong>, creating the <strong>Sundarbans Delta</strong>.</li>
      </ul>

      <h4>Tributaries — Left &amp; Right Bank Matrix</h4>
      <div class="notes-table-wrapper">
        <table class="notes-data-table">
          <thead><tr><th>Bank</th><th>Tributaries</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>Left Bank</strong></td>
              <td>Ramganga, Gomti, Ghaghara, Gandak, <strong>Kosi</strong> (Sorrow of Bihar), Mahananda</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>Right Bank</strong></td>
              <td><strong>Yamuna</strong> (largest tributary; originates at Yamunotri), Son, Punpun</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },

  // =====================================================================
  // SECTION 4: Brahmaputra River System
  // =====================================================================
  {
    id: "geo-brahmaputra",
    icon: "🌊",
    title: "2C. Brahmaputra River System",
    type: "notes",
    content: `
      <ul>
        <li><strong>Origin:</strong> Chemayungdung glacier near Mansarovar (Tibet), where it is called <strong>Tsangpo</strong>.</li>
        <li><strong>Key Detail:</strong> Enters India via Arunachal Pradesh through the <strong>Namcha Barwa hairpin turn</strong> as the <strong>Dihang</strong>. Forms <strong>Majuli</strong>, the world's largest river island, in Assam.</li>
      </ul>

      <h4>Tributaries — Left &amp; Right Bank Matrix</h4>
      <div class="notes-table-wrapper">
        <table class="notes-data-table">
          <thead><tr><th>Bank</th><th>Tributaries</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>Left Bank</strong></td>
              <td>Dibang, Lohit, Dhansiri</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>Right Bank</strong></td>
              <td>Subansiri, Kameng, Manas, Teesta</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },

  // =====================================================================
  // SECTION 5: Peninsular Rivers
  // =====================================================================
  {
    id: "geo-peninsular-rivers",
    icon: "🏞️",
    title: "2D. Peninsular Rivers (East vs. West Flowing)",
    type: "notes",
    content: `
      <h4>West-Flowing Rivers — Form Estuaries (NOT Deltas)</h4>
      <ul>
        <li><strong>Narmada:</strong> Originates at Amarkantak (MP); flows through a <strong>rift valley</strong> between Vindhyas and Satpuras; forms <strong>Dhuandhar Falls</strong>.</li>
        <li><strong>Tapi:</strong> Originates in Betul (MP); flows parallel to Narmada.</li>
        <li><strong>Mahi:</strong> Crosses the <strong>Tropic of Cancer twice</strong>.</li>
        <li><strong>Others:</strong> Sabarmati, Luni (inland drainage).</li>
      </ul>

      <h4>East-Flowing Rivers — Form Deltas</h4>
      <div class="notes-table-wrapper">
        <table class="notes-data-table">
          <thead><tr><th>River</th><th>Origin</th><th>Key Tributaries</th><th>Special Feature</th></tr></thead>
          <tbody>
            <tr class="highlight-row">
              <td><strong>Godavari</strong></td>
              <td>Trimbakeshwar, Nashik</td>
              <td>Penganga, Wainganga, Indravati, Pranhita</td>
              <td>Largest Peninsular River — <strong>Dakshin Ganga</strong></td>
            </tr>
            <tr>
              <td><strong>Krishna</strong></td>
              <td>Mahabaleshwar</td>
              <td>Tungabhadra, Bhima, Koyna, <strong>Musi</strong></td>
              <td>Hyderabad is on the Musi tributary</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>Kaveri</strong></td>
              <td>Talakaveri, Kodagu</td>
              <td>Arkavati, Bhavani, Kabini, Amaravati</td>
              <td><strong>Ganga of the South</strong> — perennial (both monsoons)</td>
            </tr>
            <tr>
              <td><strong>Mahanadi</strong></td>
              <td>Chhattisgarh</td>
              <td>Seonath, Hasdeo</td>
              <td>Heavy silt-depositing river; Hirakud Dam</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },

  // =====================================================================
  // SECTION 6: Important Lakes of India
  // =====================================================================
  {
    id: "geo-lakes",
    icon: "🏞️",
    title: "3. Important Lakes of India",
    type: "table",
    content: `
      <p>TCS asks <strong>direct location and feature questions</strong> on these specific bodies of water:</p>
      <div class="notes-table-wrapper">
        <table class="notes-data-table">
          <thead>
            <tr>
              <th>Lake Name</th>
              <th>State / UT</th>
              <th>Type / Special Feature</th>
            </tr>
          </thead>
          <tbody>
            <tr class="highlight-row">
              <td><strong>Wular Lake</strong></td>
              <td>Jammu &amp; Kashmir</td>
              <td><strong>Largest freshwater lake in India</strong> (formed by tectonic activity)</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>Chilika Lake</strong></td>
              <td>Odisha</td>
              <td><strong>Largest brackish water lagoon in India</strong>; first Ramsar site</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>Vembanad Lake</strong></td>
              <td>Kerala</td>
              <td><strong>Longest lake in India</strong>; famous for the Nehru Trophy Boat Race</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>Loktak Lake</strong></td>
              <td>Manipur</td>
              <td>Largest freshwater lake in Northeast; features <strong>Keibul Lamjao National Park</strong> (world's only floating national park)</td>
            </tr>
            <tr>
              <td><strong>Sambhar Lake</strong></td>
              <td>Rajasthan</td>
              <td><strong>Largest inland saltwater lake in India</strong></td>
            </tr>
            <tr>
              <td><strong>Lonar Lake</strong></td>
              <td>Maharashtra</td>
              <td>National Geo-heritage site; a <strong>crater lake formed by a meteorite impact</strong></td>
            </tr>
            <tr>
              <td><strong>Pulicat Lake</strong></td>
              <td>Andhra / TN border</td>
              <td>Brackish water lagoon; houses the <strong>Satish Dhawan Space Centre (Sriharikota)</strong></td>
            </tr>
            <tr>
              <td><strong>Kolleru Lake</strong></td>
              <td>Andhra Pradesh</td>
              <td>Large freshwater lake located between the <strong>Krishna and Godavari deltas</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },

  // =====================================================================
  // SECTION 7: Mountain Passes Cheat Sheet
  // =====================================================================
  {
    id: "geo-mountain-passes",
    icon: "⛰️",
    title: "High-Yield Cheat Sheet: Indian Mountain Passes",
    type: "highlight",
    content: `
      <p>Memorize these five pass clusters to ace matching questions under the TCS pattern:</p>

      <h4>🗺️ Jammu &amp; Kashmir / Ladakh</h4>
      <ul>
        <li><strong>Zoji La:</strong> Connects Srinagar with Leh.</li>
        <li><strong>Banihal Pass:</strong> Connects Jammu with Srinagar (Jawahar Tunnel).</li>
        <li><strong>Kardung La:</strong> Highest motorable pass route in Ladakh.</li>
      </ul>

      <h4>🗺️ Himachal Pradesh</h4>
      <ul>
        <li><strong>Bara-Lacha La:</strong> Connects Mandi with Leh.</li>
        <li><strong>Shipki La:</strong> Sutlej river enters India through this pass from Tibet.</li>
        <li><strong>Rohtang Pass:</strong> Connects Kullu valley with Lahaul and Spiti valleys.</li>
      </ul>

      <h4>🗺️ Uttarakhand</h4>
      <ul>
        <li><strong>Mana Pass / Niti Pass / Lipulekh:</strong> Key gateways for trade and pilgrims into Tibet.</li>
      </ul>

      <h4>🗺️ Sikkim</h4>
      <ul>
        <li><strong>Nathu La / Jelep La:</strong> Historic Silk Route branches connecting Sikkim with Chumbi Valley (Tibet).</li>
      </ul>

      <h4>🗺️ Arunachal Pradesh</h4>
      <ul>
        <li><strong>Bomdi La:</strong> Connects Arunachal Pradesh with Lhasa (Tibet).</li>
        <li><strong>Diphu Pass:</strong> Tri-junction pass between India, China, and Myanmar.</li>
      </ul>

      <div class="mnemonic-card">
        <span class="mnemonic-flag">🧠 TCS TIP</span>
        <strong>Channels to remember:</strong> 10° Channel separates Little Andaman from Car Nicobar. 9° Channel separates Lakshadweep from Minicoy. 8° Channel separates Minicoy from the Maldives.
      </div>
    `
  },
  {
    id: "sec-high-yield-geography",
    title: "High-Yield Geography",
    icon: "🌍",
    content: `

<div class="mnemonic-image-container">
  <img src="images/geography_map_mnemonic_1783710225202.jpg" class="mnemonic-image" alt="Topographical Map of India">
  <div class="mnemonic-caption">Major Rivers, Mountains & Dams of India</div>
</div>
<div class="fact-block">
  <div class="fact-title">World Geography Basics</div>
  <ul>
    <li><strong>Radcliffe Line:</strong> India and Pakistan.</li>
    <li><strong>McMahon Line:</strong> India and China.</li>
    <li><strong>Durand Line:</strong> Pakistan and Afghanistan.</li>
    <li><strong>38th Parallel:</strong> North Korea and South Korea.</li>
    <li><strong><span class="memory-highlight">49th Parallel</span>:</strong> USA and Canada (longest undefended border).</li>
  </ul>
  <br>
  <ul>
    <li><strong>Palk Strait:</strong> Connects the Bay of Bengal with Palk Bay (separates India and Sri Lanka).</li>
    <li><strong>Deepest Point:</strong> <span class="memory-highlight">Mariana Trench</span> (Challenger Deep) in the Pacific Ocean.</li>
    <li><strong>Highest/Oldest:</strong> Tibet is the "Roof of the World".</li>
  </ul>
</div>
<div class="fact-block">
  <div class="fact-title">Geography High-Yield Revision Sheet</div>
  <p><strong>National Parks & Biosphere Reserves</strong></p>
  <ul>
    <li><strong>Jim Corbett:</strong> India's first national park (1936), located in Uttarakhand.</li>
    <li><strong>Hemis National Park:</strong> Largest national park in India, located in Ladakh.</li>
    <li><strong>South Button Island:</strong> Smallest national park in India, located in Andaman & Nicobar.</li>
    <li><strong>Kaziranga:</strong> Famous Assam reserves; known for one-horned rhinoceros.</li>
    <li><strong>Nilgiri Biosphere Reserve:</strong> <span class="memory-highlight">India's first designated biosphere reserve</span> (TN, Kerala, Karnataka).</li>
    <li><strong>Total Biosphere Reserves:</strong> 18 recognized reserves across the country.</li>
  </ul>
  <p><strong>Major Dams</strong></p>
  <ul>
    <li><strong>Bhakra Dam:</strong> Concrete gravity dam built across the Sutlej River (Himachal/Punjab).</li>
    <li><strong>Hirakud Dam:</strong> Longest major earthen dam in India, built on the Mahanadi River (Odisha).</li>
    <li><strong>Tehri Dam:</strong> Tallest dam in India, constructed on the Bhagirathi River (Uttarakhand).</li>
    <li><strong>Sardar Sarovar Dam:</strong> Large gravity dam built on the Narmada River (Gujarat).</li>
    <li><strong>Nagarjuna Sagar Dam:</strong> Major masonry dam constructed across the Krishna River.</li>
  </ul>
  <p><strong>Soil Types</strong></p>
  <ul>
    <li><strong>Alluvial Soil:</strong> Most widespread type; covers northern plains; highly fertile.</li>
    <li><strong>Black Soil (Regur):</strong> Retains moisture efficiently; ideal for growing cotton crops.</li>
    <li><strong>Red & Yellow Soil:</strong> Developed over crystalline igneous rocks; red from iron diffusion.</li>
    <li><strong>Laterite Soil:</strong> Formed under high temperature and leaching; used for cashew nuts.</li>
  </ul>
  <p><strong>Major Crops & Producing States</strong></p>
  <ul>
    <li><strong>Rice:</strong> Leading Kharif crop; top producing state is West Bengal.</li>
    <li><strong>Wheat:</strong> Leading Rabi crop; top producing state is Uttar Pradesh.</li>
    <li><strong>Cotton:</strong> Major cash crop; top producing states are Gujarat and Maharashtra.</li>
    <li><strong>Sugarcane:</strong> High water-demand cash crop; top producer is Uttar Pradesh.</li>
  </ul>
  <p><strong>Monsoon Basics</strong></p>
  <ul>
    <li><strong>South-West Monsoon:</strong> Primary rain-bearing system; advances from June to September. Splits into Arabian Sea branch and Bay of Bengal branch.</li>
    <li><strong>Retreating Monsoon:</strong> North-East winds bring winter rains to Tamil Nadu coast.</li>
    <li><strong>Western Disturbances:</strong> Shallow Mediterranean depressions causing winter rain in northwest India.</li>
  </ul>
  <p><strong>Important Straits & Channels</strong></p>
  <ul>
    <li><strong>Palk Strait:</strong> Narrow maritime passage separating India from Sri Lanka.</li>
    <li><strong>10 Degree Channel:</strong> Separates Andaman Islands from the Nicobar Islands.</li>
    <li><strong>9 Degree Channel:</strong> Separates Laccadive Islands from Minicoy Island.</li>
    <li><strong>8 Degree Channel:</strong> Separates Minicoy Island from the Maldives.</li>
  </ul>
  <p><strong>UNESCO Natural Sites</strong></p>
  <ul>
    <li><strong>Kaziranga National Park:</strong> World Heritage natural site located in Assam.</li>
    <li><strong>Keoladeo National Park:</strong> Important bird habitat located in Bharatpur, Rajasthan.</li>
    <li><strong>Manas Wildlife Sanctuary:</strong> Noted biodiversity hotspot located in Assam.</li>
    <li><strong>Sundarbans National Park:</strong> Massive mangrove forest ecosystem located in West Bengal.</li>
    <li><strong>Western Ghats:</strong> Continuous mountain chain stretching along India's western coast.</li>
  </ul>
  <p><strong>Ramsar Sites & Minerals</strong></p>
  <ul>
    <li><strong>Total Ramsar Sites:</strong> 99 internationally recognized wetland sites across India.</li>
    <li><strong>Coal:</strong> Largest deposits and producer found in Jharkhand, Odisha, Chhattisgarh.</li>
    <li><strong>Iron Ore:</strong> High-grade hematite deposits; top producer is Odisha.</li>
    <li><strong>Mica:</strong> World-class deposits; leading producer state is Andhra Pradesh (Nellore).</li>
    <li><strong>Bauxite:</strong> Principal aluminum ore; leading producer state is Odisha.</li>
  </ul>
</div>

    `
  },

];

// =========================================================================
// GEOGRAPHY PYQ DATA — 22 Authentic SSC CGL Questions
// =========================================================================
export const GEOGRAPHY_PYQ_DATA = [
  {
    id: 1,
    section: "A",
    sectionTitle: "Physiographic Divisions & Mountain Passes",
    question: "Which range forms the southernmost parallel range of the Himalayas, composed mainly of loose, unconsolidated sediments?",
    options: ["(A) Himadri", "(B) Himachal", "(C) Shiwalik", "(D) Karakoram"],
    answer: 2,
    answerLabel: "(C) Shiwalik"
  },
  {
    id: 2,
    section: "A",
    sectionTitle: "Physiographic Divisions & Mountain Passes",
    question: "What is the name of the highest peak of the old Aravalli fold mountain range?",
    options: ["(A) Doda Betta", "(B) Anamudi", "(C) Guru Shikhar", "(D) Mahendragiri"],
    answer: 2,
    answerLabel: "(C) Guru Shikhar"
  },
  {
    id: 3,
    section: "A",
    sectionTitle: "Physiographic Divisions & Mountain Passes",
    question: "Which mountain pass connects the valley of Kashmir with the Jammu region and hosts the famous Jawahar Tunnel?",
    options: ["(A) Shipki La", "(B) Nathu La", "(C) Banihal Pass", "(D) Bomdi La"],
    answer: 2,
    answerLabel: "(C) Banihal Pass"
  },
  {
    id: 4,
    section: "A",
    sectionTitle: "Physiographic Divisions & Mountain Passes",
    question: "The 'Kailash-Mansarovar Yatra' route for Indian pilgrims passes through which high-altitude Himalayan mountain pass in Uttarakhand?",
    options: ["(A) Lipulekh Pass", "(B) Rohtang Pass", "(C) Zoji La", "(D) Jelep La"],
    answer: 0,
    answerLabel: "(A) Lipulekh Pass"
  },
  {
    id: 5,
    section: "A",
    sectionTitle: "Physiographic Divisions & Mountain Passes",
    question: "Which channel or water body directly separates the Andaman Islands chain from the Nicobar Islands chain?",
    options: ["(A) 8 Degree Channel", "(B) 9 Degree Channel", "(C) 10 Degree Channel", "(D) Duncan Passage"],
    answer: 2,
    answerLabel: "(C) 10 Degree Channel"
  },
  {
    id: 6,
    section: "B",
    sectionTitle: "The Himalayan River Systems",
    question: "At which specific geographic location do the Alaknanda and Bhagirathi rivers meet to officially form the River Ganga?",
    options: ["(A) Rudraprayag", "(B) Devprayag", "(C) Karnaprayag", "(D) Vishnuprayag"],
    answer: 1,
    answerLabel: "(B) Devprayag"
  },
  {
    id: 7,
    section: "B",
    sectionTitle: "The Himalayan River Systems",
    question: "Which of the following is strictly a Right Bank tributary of the River Ganga?",
    options: ["(A) Gomti", "(B) Ghaghara", "(C) Kosi", "(D) Son"],
    answer: 3,
    answerLabel: "(D) Son"
  },
  {
    id: 8,
    section: "B",
    sectionTitle: "The Himalayan River Systems",
    question: "Which Himalayan river is infamously designated as the 'Sorrow of Bihar' due to its frequent course-changing habits and regular flooding?",
    options: ["(A) Gandak", "(B) Ghaghara", "(C) Kosi", "(D) Ramganga"],
    answer: 2,
    answerLabel: "(C) Kosi"
  },
  {
    id: 9,
    section: "B",
    sectionTitle: "The Himalayan River Systems",
    question: "The River Brahmaputra is known by which distinct name when it flows through the territory of Tibet before entering India?",
    options: ["(A) Dihang", "(B) Tsangpo", "(C) Jamuna", "(D) Padma"],
    answer: 1,
    answerLabel: "(B) Tsangpo"
  },
  {
    id: 10,
    section: "B",
    sectionTitle: "The Himalayan River Systems",
    question: "Which river is recognized as the largest and longest tributary of the Indus River system inside the Indian territory?",
    options: ["(A) Jhelum", "(B) Chenab", "(C) Sutlej", "(D) Ravi"],
    answer: 1,
    answerLabel: "(B) Chenab"
  },
  {
    id: 11,
    section: "B",
    sectionTitle: "The Himalayan River Systems",
    question: "Majuli, recognized as the world's largest inhabited riverine island, is formed by which river system in Assam?",
    options: ["(A) Ganga", "(B) Brahmaputra", "(C) Meghna", "(D) Hooghly"],
    answer: 1,
    answerLabel: "(B) Brahmaputra"
  },
  {
    id: 12,
    section: "B",
    sectionTitle: "The Himalayan River Systems",
    question: "Which of the following rivers does NOT belong to the 'Panjnad' (Five Rivers of Punjab) group that joins the Indus at Mithankot?",
    options: ["(A) Beas", "(B) Ravi", "(C) Shyok", "(D) Jhelum"],
    answer: 2,
    answerLabel: "(C) Shyok"
  },
  {
    id: 13,
    section: "C",
    sectionTitle: "The Peninsular River Systems",
    question: "Which is the longest peninsular river in India, frequently referred to as 'Dakshin Ganga'?",
    options: ["(A) Krishna", "(B) Kaveri", "(C) Godavari", "(D) Mahanadi"],
    answer: 2,
    answerLabel: "(C) Godavari"
  },
  {
    id: 14,
    section: "C",
    sectionTitle: "The Peninsular River Systems",
    question: "The rivers Narmada and Tapi are unique because they flow westwards into the Arabian Sea. Through what structural feature do they flow?",
    options: ["(A) Tectonic depressions", "(B) Rift Valleys", "(C) Hanging Valleys", "(D) Glacial Troughs"],
    answer: 1,
    answerLabel: "(B) Rift Valleys"
  },
  {
    id: 15,
    section: "C",
    sectionTitle: "The Peninsular River Systems",
    question: "The famous Dhuandhar Falls (Marble Rocks) is created by which river near Jabalpur in Madhya Pradesh?",
    options: ["(A) Tapi", "(B) Narmada", "(C) Mahi", "(D) Betwa"],
    answer: 1,
    answerLabel: "(B) Narmada"
  },
  {
    id: 16,
    section: "C",
    sectionTitle: "The Peninsular River Systems",
    question: "Which river has the distinction of crossing the Tropic of Cancer twice during its flow path across India?",
    options: ["(A) Luni", "(B) Sabarmati", "(C) Mahi", "(D) Chambal"],
    answer: 2,
    answerLabel: "(C) Mahi"
  },
  {
    id: 17,
    section: "C",
    sectionTitle: "The Peninsular River Systems",
    question: "The historic city of Hyderabad is situated on the banks of which tributary of the Krishna River?",
    options: ["(A) Tungabhadra", "(B) Musi", "(C) Bhima", "(D) Koyna"],
    answer: 1,
    answerLabel: "(B) Musi"
  },
  {
    id: 18,
    section: "C",
    sectionTitle: "The Peninsular River Systems",
    question: "Which peninsular river is known as the 'Ganga of the South' and maintains a semi-perennial nature due to receiving rainfall from both monsoons?",
    options: ["(A) Godavari", "(B) Krishna", "(C) Kaveri", "(D) Pennar"],
    answer: 2,
    answerLabel: "(C) Kaveri"
  },
  {
    id: 19,
    section: "D",
    sectionTitle: "Lakes & Water Resources",
    question: "Keibul Lamjao, the world's only floating national park containing phumdis, is located on which lake in India?",
    options: ["(A) Chilika Lake", "(B) Loktak Lake", "(C) Wular Lake", "(D) Pulicat Lake"],
    answer: 1,
    answerLabel: "(B) Loktak Lake"
  },
  {
    id: 20,
    section: "D",
    sectionTitle: "Lakes & Water Resources",
    question: "Lonar Lake, a unique water body and a notified national geo-heritage site, was created by what geological phenomenon?",
    options: ["(A) Volcanic eruption", "(B) Meteorite impact crater", "(C) Glacial scraping", "(D) Tectonic faulting"],
    answer: 1,
    answerLabel: "(B) Meteorite impact crater"
  },
  {
    id: 21,
    section: "D",
    sectionTitle: "Lakes & Water Resources",
    question: "Which is the longest lake in India, hosting the famous Nehru Trophy snake boat race every year?",
    options: ["(A) Vembanad Lake", "(B) Chilika Lake", "(C) Kolleru Lake", "(D) Pangong Tso"],
    answer: 0,
    answerLabel: "(A) Vembanad Lake"
  },
  {
    id: 22,
    section: "D",
    sectionTitle: "Lakes & Water Resources",
    question: "Which island separates the brackish water lagoon of Pulicat Lake from the Bay of Bengal?",
    options: ["(A) Wheeler Island", "(B) Sriharikota Island", "(C) Pamban Island", "(D) Sagar Island"],
    answer: 1,
    answerLabel: "(B) Sriharikota Island"
  }
];
