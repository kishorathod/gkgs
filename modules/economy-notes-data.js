/* ==========================================================================
   Indian Economy Detailed Exam Notes Data (modules/economy-notes-data.js)
   Every word from the user's SSC CGL Economy Notes — verbatim.
   Covers Sectors, National Income, Five-Year Plans, RBI Monetary Policy,
   Inflation, Deficits + 12 authentic CGL PYQs.
   ========================================================================== */

export const ECONOMY_NOTES_SECTIONS = [
  // =====================================================================
  // SECTION 0: TCS Trends
  // =====================================================================
  {
    id: "eco-tcs-trends",
    icon: "📊",
    title: "TCS Economy Trends & Weightage",
    type: "info",
    content: `
      <p>Indian Economy is a highly scoring area for SSC CGL. Under the TCS pattern, questions are heavily concentrated on three main blocks:</p>
      <ul>
        <li><strong>Five-Year Plans (FYP):</strong> Key models, objectives, periods, and historical milestones.</li>
        <li><strong>Monetary Policy Tools (RBI):</strong> Reserve parameters (Repo, Reverse Repo, CRR, SLR) and their effects on liquidity.</li>
        <li><strong>National Income Aggregates:</strong> GDP, NDP, GNP, and NNP at Factor Cost.</li>
      </ul>
    `
  },

  // =====================================================================
  // SECTION 1: Economy Framework
  // =====================================================================
  {
    id: "eco-framework",
    icon: "🏗️",
    title: "1. Essential Indian Economy Framework",
    type: "notes",
    content: `
      <h4>Sectors of the Economy</h4>
      <p>The economic activities of India are broadly classified into three main sectors:</p>
      <div class="notes-table-wrapper">
        <table class="notes-data-table">
          <thead>
            <tr>
              <th>Sector</th>
              <th>Description</th>
              <th>Examples</th>
            </tr>
          </thead>
          <tbody>
            <tr class="highlight-row">
              <td><strong>Primary Sector</strong></td>
              <td>Direct use or extraction of natural resources.</td>
              <td>Agriculture, Mining, Forestry, Fishing.</td>
            </tr>
            <tr>
              <td><strong>Secondary Sector</strong></td>
              <td>Manufacturing, processing, and construction. Transforms raw materials into goods.</td>
              <td>Factories, Construction, Electricity, Gas &amp; Water supply.</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>Tertiary Sector</strong></td>
              <td>Service sector providing support to other sectors. <strong>Contributes the highest share to India's GDP.</strong></td>
              <td>Banking, IT, Tourism, Education, Transport.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4>National Income Aggregates &amp; Equations</h4>
      <p>Understand these key macroeconomic accounting definitions commonly targeted by TCS:</p>
      <ul>
        <li><strong>Gross Domestic Product (GDP):</strong> Total money value of all final goods and services produced within the geographical boundaries of a country in a financial year.</li>
        <li><strong>Net Domestic Product (NDP):</strong> Calculated by subtracting physical wear and tear from total production.
          <div class="equation-box">$$\text{NDP} = \text{GDP} - \text{Depreciation}$$</div>
        </li>
        <li><strong>Gross National Product (GNP):</strong> Measures the total value produced by the citizens of a country, regardless of geography.
          <div class="equation-box">$$\text{GNP} = \text{GDP} + \text{Net Factor Income from Abroad (NFIA)}$$</div>
        </li>
        <li><strong>National Income (NI):</strong> Formally defined as Net National Product at Factor Cost.
          <div class="equation-box">$$\text{National Income (NI)} = \text{NNP}_{\text{FC}}$$</div>
        </li>
      </ul>
    `
  },

  // =====================================================================
  // SECTION 2: Five-Year Plans
  // =====================================================================
  {
    id: "eco-fyp",
    icon: "📅",
    title: "2. High-Yield Five-Year Plans (FYP) Matrix",
    type: "table",
    content: `
      <p>TCS heavily targets the core models, targets, and structural shifts of the initial Five-Year Plans. Memorize this matrix:</p>
      <div class="notes-table-wrapper">
        <table class="notes-data-table">
          <thead>
            <tr>
              <th>Plan / Period</th>
              <th>Core Economic Model</th>
              <th>Primary Focus / Objective</th>
              <th>Key Historic Milestone</th>
            </tr>
          </thead>
          <tbody>
            <tr class="highlight-row">
              <td><strong>1st FYP</strong><br>(1951–56)</td>
              <td><strong>Harrod-Domar Model</strong></td>
              <td>Agriculture, irrigation, and power.</td>
              <td>Launch of <strong>Bhakra-Nangal</strong> and <strong>Hirakud</strong> dams.</td>
            </tr>
            <tr>
              <td><strong>2nd FYP</strong><br>(1956–61)</td>
              <td><strong>Mahalanobis Model</strong></td>
              <td>Rapid industrialisation &amp; heavy industries.</td>
              <td>Setup of <strong>Bhilai, Durgapur, and Rourkela</strong> steel plants.</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>3rd FYP</strong><br>(1961–66)</td>
              <td><strong>Gadgil Yojana</strong></td>
              <td>Self-reliant and self-generating economy.</td>
              <td><strong>Failed</strong> due to Indo-China (1962) &amp; Indo-Pak (1965) wars.</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>Plan Holidays</strong><br>(1966–69)</td>
              <td>Three Annual Plans</td>
              <td>Devaluation of rupee; focus on agriculture.</td>
              <td>Launch of the <strong>Green Revolution</strong> in India.</td>
            </tr>
            <tr>
              <td><strong>4th FYP</strong><br>(1969–74)</td>
              <td><strong>Ashok Rudra Model</strong></td>
              <td>Growth with stability and progressive self-reliance.</td>
              <td><strong>Nationalisation of 14 banks</strong> (1969); <strong>Pokhran-1 (Smiling Buddha)</strong> nuclear test (1974).</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>5th FYP</strong><br>(1974–79)</td>
              <td><strong>C. Subramaniam / D.D. Dhar</strong></td>
              <td><strong>Garibi Hatao</strong> (Poverty eradication) &amp; Self-reliance.</td>
              <td><strong>Terminated 1 year early</strong> by the newly elected Janata Party government.</td>
            </tr>
            <tr>
              <td><strong>Rolling Plan</strong><br>(1978–80)</td>
              <td>Gunnar Myrdal concept</td>
              <td>Reviewed and revised every year.</td>
              <td>Introduced by Morarji Desai's Janata government.</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },

  // =====================================================================
  // SECTION 3: Monetary Policy Tools
  // =====================================================================
  {
    id: "eco-rbi-tools",
    icon: "🏦",
    title: "3. Monetary Policy Tools (RBI Reserve Parameters)",
    type: "highlight",
    content: `
      <p>TCS tests the direct operational definitions of the Reserve Bank of India's tools to manage market liquidity and control inflation:</p>
      
      <div class="policy-card-grid">
        <div class="policy-card-item">
          <h5>⚡ Repo Rate</h5>
          <p>The interest rate at which the RBI lends short-term money to commercial banks against government securities. <strong>Increasing Repo Rate cools down inflation</strong> by making borrowing expensive.</p>
        </div>
        <div class="policy-card-item">
          <h5>⚡ Reverse Repo Rate</h5>
          <p>The interest rate at which the RBI borrows short-term funds from commercial banks. Increasing this incentivizes banks to park funds with RBI rather than lending to the public.</p>
        </div>
        <div class="policy-card-item">
          <h5>⚡ Bank Rate</h5>
          <p>The interest rate at which the RBI provides long-term loans to commercial banks <strong>without any collateral</strong> securities.</p>
        </div>
        <div class="policy-card-item">
          <h5>⚡ Cash Reserve Ratio (CRR)</h5>
          <p>The specific percentage of total deposits (Net Demand and Time Liabilities / NDTL) that commercial banks must keep with the RBI in the form of <strong>liquid cash</strong>. Banks earn zero interest on this reserve.</p>
        </div>
        <div class="policy-card-item">
          <h5>⚡ Statutory Liquidity Ratio (SLR)</h5>
          <p>The specific percentage of deposits that commercial banks must maintain with themselves in liquid assets like <strong>cash, gold, or unencumbered government securities</strong> before lending.</p>
        </div>
      </div>
    `
  },

  // =====================================================================
  // SECTION 4: Inflation & Deficits
  // =====================================================================
  {
    id: "eco-inflation-deficits",
    icon: "📈",
    title: "High-Yield Cheat Sheet: Inflation Types & Deficit Equations",
    type: "notes",
    content: `
      <h4>Types of Inflation</h4>
      <ul>
        <li><strong>Creeping Inflation:</strong> Slow and predictable price rise (1% to 3% annually); considered healthy for growth.</li>
        <li><strong>Walking / Trotting Inflation:</strong> Single to double-digit price rise (3% to 10% annually); warning signal for policymakers.</li>
        <li><strong>Running / Galloping Inflation:</strong> Extremely rapid price rise (20% to 100% or more annually); economy breaks down.</li>
        <li><strong>Stagflation:</strong> A toxic combination of <strong>High Inflation + Low Economic Growth + High Unemployment</strong>.</li>
        <li><strong>Core Inflation:</strong> Inflation calculated by completely <strong>excluding volatile items</strong> like food and fuel energy.</li>
      </ul>

      <h4>Deficit Equations</h4>
      <p>Memorize these definitions, which are high-frequency targets for numeric matching questions:</p>
      <ul>
        <li><strong>Fiscal Deficit:</strong> Measures total borrowing requirements of the government.
          <div class="equation-box">$$\text{Fiscal Deficit} = \text{Total Expenditure} - \text{Total Receipts (excluding borrowings)}$$</div>
        </li>
        <li><strong>Revenue Deficit:</strong> Measures shortfall in day-to-day operations.
          <div class="equation-box">$$\text{Revenue Deficit} = \text{Revenue Expenditure} - \text{Revenue Receipts}$$</div>
        </li>
        <li><strong>Primary Deficit:</strong> Measures current year's fiscal imbalance, excluding interest on past debts.
          <div class="equation-box">$$\text{Primary Deficit} = \text{Fiscal Deficit} - \text{Interest Payments}$$</div>
        </li>
      </ul>
    `
  },
  {
    id: "sec-high-yield-economy-revision",
    title: "High-Yield Economy Revision",
    icon: "📈",
    content: `

<div class="fact-block">
  <div class="fact-title">Economy High-Yield Revision Sheet</div>
  <p><strong>Inflation vs. Deflation vs. Disinflation</strong></p>
  <ul>
    <li><strong>Inflation:</strong> Persistent increase in the general price level.</li>
    <li><strong>Deflation:</strong> Persistent decrease in the general price level.</li>
    <li><strong>Disinflation:</strong> Slowdown in the rate of price inflation.</li>
  </ul>
  <p><strong>Monetary Policy vs. Fiscal Policy</strong></p>
  <ul>
    <li><strong>Monetary Policy:</strong> Managed by RBI to control money supply (Repo rate, Reverse repo rate, CRR, SLR).</li>
    <li><strong>Fiscal Policy:</strong> Managed by the Government using taxation/spending (Union Budget, public expenditure, government borrowing).</li>
  </ul>
  <p><strong>Direct Tax vs. Indirect Tax</strong></p>
  <ul>
    <li><strong>Direct Tax:</strong> Paid directly by individuals/corporations (Income Tax, Corporate Tax, Capital Gains Tax).</li>
    <li><strong>Indirect Tax:</strong> Passed on to the end consumer (GST, Customs Duty, Excise Duty).</li>
  </ul>
  <p><strong>GST Basics</strong></p>
  <ul>
    <li><strong>Amendment:</strong> Introduced via the 101st Constitutional Amendment Act.</li>
    <li><strong>Article:</strong> Governed under Article 279A (GST Council).</li>
    <li><strong>Chairman:</strong> Headed by the Union Finance Minister.</li>
    <li><strong>Slabs:</strong> Divided into 0%, 5%, 12%, 18%, 28%.</li>
  </ul>
  <p><strong>Key Financial & Development Banks</strong></p>
  <ul>
    <li><strong>SEBI:</strong> Regulates securities and capital markets (Est. 1988, Statutory 1992).</li>
    <li><strong>NABARD:</strong> Provides rural and agricultural credit (Est. 1982, Shivaraman Committee).</li>
    <li><strong>SIDBI:</strong> Financial aid for MSME sector growth (Est. 1990, HQ Lucknow).</li>
    <li><strong>EXIM Bank:</strong> Coordinates foreign trade financing operations (Est. 1982).</li>
  </ul>
  <p><strong>International Economic Organizations</strong></p>
  <ul>
    <li><strong>IMF:</strong> Maintains global financial stability and balance of payments.</li>
    <li><strong>World Bank:</strong> Provides long-term loans for developmental projects.</li>
    <li><strong>WTO:</strong> Regulates international trade rules (Est. 1995, replaced GATT).</li>
  </ul>
  <p><strong>Money Market vs. Capital Market</strong></p>
  <ul>
    <li><strong>Money Market:</strong> Short-term credit market (maturity up to 1 year). Instruments: Treasury Bills, Commercial Paper, Certificate of Deposit.</li>
    <li><strong>Capital Market:</strong> Long-term credit market (maturity exceeding 1 year). Instruments: Shares, bonds, debentures, government securities.</li>
  </ul>
  <p><strong>Core Economic Indicators</strong></p>
  <ul>
    <li><strong>Green GDP:</strong> GDP adjusted for environmental damage and depletion.</li>
    <li><strong>PCI:</strong> Per Capita Income measures average income per person (National Income / Population).</li>
    <li><strong>MSP:</strong> Minimum Support Price guaranteed price for agricultural produce. Announced by CACP before the sowing season.</li>
  </ul>
</div>

    `
  },

];

// =========================================================================
// ECONOMY PYQ DATA — 12 Authentic CGL Questions
// =========================================================================
export const ECONOMY_PYQ_DATA = [
  {
    id: 1,
    section: "A",
    sectionTitle: "Five-Year Plans & Economic Planning",
    question: "The Second Five-Year Plan (1956–1961) of India was structurally based on the economic model proposed by which statistician?",
    options: ["(A) Harrod-Domar", "(B) P.C. Mahalanobis", "(C) John W. Miller", "(D) Gunnar Myrdal"],
    answer: 1,
    answerLabel: "(B) P.C. Mahalanobis"
  },
  {
    id: 2,
    section: "A",
    sectionTitle: "Five-Year Plans & Economic Planning",
    question: "In which year did the Government of India introduce the historic 'Plan Holidays' after the structural failure of the Third Five-Year Plan?",
    options: ["(A) 1961–1964", "(B) 1966–1969", "(C) 1969–1972", "(D) 1978–1980"],
    answer: 1,
    answerLabel: "(B) 1966–1969"
  },
  {
    id: 3,
    section: "A",
    sectionTitle: "Five-Year Plans & Economic Planning",
    question: "The political slogan 'Garibi Hatao' (Remove Poverty) was integrated into the core strategy of which specific Five-Year Plan?",
    options: ["(A) Third Five-Year Plan", "(B) Fourth Five-Year Plan", "(C) Fifth Five-Year Plan", "(D) Sixth Five-Year Plan"],
    answer: 2,
    answerLabel: "(C) Fifth Five-Year Plan"
  },
  {
    id: 4,
    section: "A",
    sectionTitle: "Five-Year Plans & Economic Planning",
    question: "Which extra-constitutional statutory body officially replaced the decades-old Planning Commission of India on January 1, 2015?",
    options: ["(A) National Development Council", "(B) NITI Aayog", "(C) Finance Commission", "(D) Competition Commission of India"],
    answer: 1,
    answerLabel: "(B) NITI Aayog"
  },
  {
    id: 5,
    section: "B",
    sectionTitle: "Banking, RBI & Monetary Policy",
    question: "In which year was the Reserve Bank of India (RBI) officially nationalised, transforming it into a complete state-owned monetary authority?",
    options: ["(A) 1935", "(B) 1947", "(C) 1949", "(D) 1969"],
    answer: 2,
    answerLabel: "(C) 1949"
  },
  {
    id: 6,
    section: "B",
    sectionTitle: "Banking, RBI & Monetary Policy",
    question: "What term is used to define the fixed percentage of net deposits that commercial banks are legally mandated to keep with the RBI in cash form?",
    options: ["(A) Statutory Liquidity Ratio (SLR)", "(B) Cash Reserve Ratio (CRR)", "(C) Bank Rate", "(D) Repo Rate"],
    answer: 1,
    answerLabel: "(B) Cash Reserve Ratio (CRR)"
  },
  {
    id: 7,
    section: "B",
    sectionTitle: "Banking, RBI & Monetary Policy",
    question: "When the Reserve Bank of India wants to increase the overall liquidity (money supply) in the market to boost growth, what action does it take?",
    options: ["(A) Increases the Repo Rate", "(B) Decreases the Cash Reserve Ratio (CRR)", "(C) Increases the Statutory Liquidity Ratio (SLR)", "(D) Sells government securities in the open market"],
    answer: 1,
    answerLabel: "(B) Decreases the Cash Reserve Ratio (CRR)"
  },
  {
    id: 8,
    section: "B",
    sectionTitle: "Banking, RBI & Monetary Policy",
    question: "Under which economic phenomenon does the value of currency systematically fall while the general price level of goods and services rapidly rises?",
    options: ["(A) Deflation", "(B) Stagflation", "(C) Inflation", "(D) Recession"],
    answer: 2,
    answerLabel: "(C) Inflation"
  },
  {
    id: 9,
    section: "C",
    sectionTitle: "National Income & Public Finance",
    question: "Economically, 'National Income' of India is defined as which of the following accounting parameters?",
    options: ["(A) GDP at Market Price (GDP_MP)", "(B) NNP at Market Price (NNP_MP)", "(C) NNP at Factor Cost (NNP_FC)", "(D) NDP at Factor Cost (NDP_FC)"],
    answer: 2,
    answerLabel: "(C) NNP at Factor Cost (NNP_FC)"
  },
  {
    id: 10,
    section: "C",
    sectionTitle: "National Income & Public Finance",
    question: "What is subtracted from Gross Domestic Product (GDP) to calculate the Net Domestic Product (NDP) of an economy?",
    options: ["(A) Inflation rate", "(B) Subsidies", "(C) Direct Taxes", "(D) Depreciation"],
    answer: 3,
    answerLabel: "(D) Depreciation"
  },
  {
    id: 11,
    section: "C",
    sectionTitle: "National Income & Public Finance",
    question: "Which type of deficit is calculated by subtracting the total estimated receipts of the government from its total estimated expenditures in a budget?",
    options: ["(A) Revenue Deficit", "(B) Fiscal Deficit", "(C) Primary Deficit", "(D) Budgetary Deficit"],
    answer: 1,
    answerLabel: "(B) Fiscal Deficit"
  },
  {
    id: 12,
    section: "C",
    sectionTitle: "National Income & Public Finance",
    question: "Which type of unemployment is highly prevalent in the Indian agriculture sector, where more people are working than what is actually required?",
    options: ["(A) Structural Unemployment", "(B) Frictional Unemployment", "(C) Disguised Unemployment", "(D) Cyclical Unemployment"],
    answer: 2,
    answerLabel: "(C) Disguised Unemployment"
  }
];
