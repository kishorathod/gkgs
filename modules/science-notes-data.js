/* ==========================================================================
   General Science Detailed Exam Notes Data (modules/science-notes-data.js)
   Every word from the user's SSC CGL Science Notes — verbatim.
   Covers Biology, Chemistry, Physics (Core + Advanced Topics) + 15 PYQs.
   ========================================================================== */

export const SCIENCE_NOTES_SECTIONS = [

  // =====================================================================
  // SECTION 0: TCS Trends
  // =====================================================================
  {
    id: "sci-tcs-trends",
    icon: "📊",
    title: "TCS Science Trends & Weightage",
    type: "info",
    content: `
      <p>General Science accounts for <strong>4–6 questions per shift in Tier-1</strong> and features critical assertion-reason questions in Tier-2. You must master the highly factual, everyday applications of Biology, Chemistry, and Physics.</p>
      <div class="notes-hero-banner" style="padding: 12px; margin-top: 12px; justify-content: center;">
        <span style="font-weight:700; font-size: 1.05em;">Biology &gt; Chemistry &gt; Physics</span>&nbsp; (by SSC weightage priority)
      </div>
    `
  },

  // =====================================================================
  // SECTION 1: BIOLOGY — Human Physiological Systems
  // =====================================================================
  {
    id: "bio-human-systems",
    icon: "🩸",
    title: "Biology § 1 — Human Physiological Systems",
    type: "notes",
    content: `
      <h4>The Circulatory System</h4>
      <p>Blood is a <strong>fluid connective tissue</strong> with a normal pH of <strong>7.4</strong> (slightly alkaline).</p>
      <ul>
        <li><strong>Red Blood Cells (RBCs / Erythrocytes):</strong> Formed in <strong>bone marrow</strong>; destroyed in the <strong>Spleen</strong> (the "Graveyard of RBCs"). Life span is <strong>120 days</strong>. They lack a nucleus (except in camels/llamas).</li>
        <li><strong>White Blood Cells (WBCs / Leukocytes):</strong> Act as the body's defense mechanism.</li>
        <li><strong>Blood Groups:</strong> Discovered by <strong>Karl Landsteiner</strong>. <em>O negative</em> is the <strong>universal donor</strong>; <em>AB positive</em> is the <strong>universal acceptor</strong>.</li>
      </ul>

      <h4>The Endocrine System (Hormones &amp; Glands)</h4>
      <ul>
        <li><strong>Pituitary Gland:</strong> Known as the <strong>Master Gland</strong>, located at the base of the brain.</li>
        <li><strong>Pancreas:</strong> A <strong>mixed gland</strong> (both endocrine and exocrine). Insufficient secretion of <strong>Insulin</strong> from its <em>Beta cells</em> causes <strong>Diabetes Mellitus</strong>.</li>
        <li><strong>Adrenal Gland:</strong> Secretes <strong>Adrenaline</strong>, the "Fight or Flight" or "3F" (Fright, Fight, Flight) hormone.</li>
        <li><strong>Thyroid Gland:</strong> Requires <strong>Iodine</strong> to synthesize thyroxine. Deficiency causes <strong>Goitre</strong>.</li>
      </ul>
    `
  },

  // =====================================================================
  // SECTION 2: BIOLOGY — Vitamins & Deficiency Diseases
  // =====================================================================
  {
    id: "bio-vitamins",
    icon: "💊",
    title: "Biology § 2 — Vitamins & Deficiency Diseases",
    type: "table",
    content: `
      <p>TCS features <strong>at least one direct question</strong> on chemical names or deficiencies in almost every exam cycle.</p>
      <div class="notes-table-wrapper">
        <table class="notes-data-table">
          <thead>
            <tr>
              <th>Vitamin</th>
              <th>Chemical Name</th>
              <th>Type</th>
              <th>Deficiency Disease</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Vitamin A</strong></td>
              <td>Retinol</td>
              <td>Fat Soluble</td>
              <td>Night Blindness / Xerophthalmia</td>
              <td>Carrots, Green vegetables</td>
            </tr>
            <tr>
              <td><strong>Vitamin B1</strong></td>
              <td>Thiamine</td>
              <td>Water Soluble</td>
              <td>Beriberi</td>
              <td>Rice flakes, Unpolished rice</td>
            </tr>
            <tr>
              <td><strong>Vitamin B3</strong></td>
              <td>Niacin</td>
              <td>Water Soluble</td>
              <td>Pellagra</td>
              <td>Meat, Whole grains</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>Vitamin B12</strong></td>
              <td>Cyanocobalamin</td>
              <td>Water Soluble</td>
              <td>Pernicious Anaemia <em>(Contains Cobalt)</em></td>
              <td>Milk, Eggs</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>Vitamin C</strong></td>
              <td>Ascorbic Acid</td>
              <td>Water Soluble</td>
              <td>Scurvy (Bleeding gums)</td>
              <td>Citrus fruits (Amla, Lemon)</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>Vitamin D</strong></td>
              <td>Calciferol</td>
              <td>Fat Soluble</td>
              <td>Rickets (Children) / Osteomalacia (Adults)</td>
              <td>Sunlight, Fish oil</td>
            </tr>
            <tr>
              <td><strong>Vitamin K</strong></td>
              <td>Phylloquinone</td>
              <td>Fat Soluble</td>
              <td>Failure of blood clotting</td>
              <td>Green leafy vegetables</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mnemonic-card">
        <span class="mnemonic-flag">🧠 MNEMONIC</span>
        <strong>Fat-Soluble Vitamins = ADEK</strong> (A, D, E, K) — all others are Water-Soluble.
      </div>
    `
  },

  // =====================================================================
  // SECTION 3: CHEMISTRY — High-Yield Everyday Chemical Compounds
  // =====================================================================
  {
    id: "chem-compounds",
    icon: "⚗️",
    title: "Chemistry § 1 — Everyday Chemical Compounds",
    type: "highlight",
    content: `
      <p>Memorise these exact common names and industrial chemical formulas — directly asked in every CGL shift:</p>
      <div class="notes-table-wrapper">
        <table class="notes-data-table">
          <thead>
            <tr><th>Common Name</th><th>Chemical Name</th><th>Formula</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Baking Soda</strong></td><td>Sodium Bicarbonate</td><td>NaHCO₃</td></tr>
            <tr><td><strong>Washing Soda</strong></td><td>Sodium Carbonate Decahydrate</td><td>Na₂CO₃·10H₂O</td></tr>
            <tr class="highlight-row"><td><strong>Bleaching Powder</strong></td><td>Calcium Oxychloride</td><td>CaOCl₂</td></tr>
            <tr class="highlight-row"><td><strong>Plaster of Paris (POP)</strong></td><td>Calcium Sulphate Hemihydrate</td><td>CaSO₄·½H₂O</td></tr>
            <tr><td><strong>Gypsum</strong></td><td>Calcium Sulphate Dihydrate</td><td>CaSO₄·2H₂O</td></tr>
            <tr><td><strong>Caustic Soda</strong></td><td>Sodium Hydroxide</td><td>NaOH</td></tr>
            <tr class="highlight-row"><td><strong>Laughing Gas</strong></td><td>Nitrous Oxide</td><td>N₂O</td></tr>
            <tr><td><strong>Quick Lime</strong></td><td>Calcium Oxide</td><td>CaO</td></tr>
            <tr><td><strong>Slaked Lime</strong></td><td>Calcium Hydroxide</td><td>Ca(OH)₂</td></tr>
          </tbody>
        </table>
      </div>
    `
  },

  // =====================================================================
  // SECTION 4: CHEMISTRY — Metals, Non-Metals & Important Ores
  // =====================================================================
  {
    id: "chem-metals-ores",
    icon: "⛏️",
    title: "Chemistry § 2 — Metals, Non-Metals & Important Ores",
    type: "notes",
    content: `
      <h4>Special Properties</h4>
      <ul>
        <li><strong>Mercury (Hg)</strong> is the only <em>metal</em> that remains liquid at room temperature.</li>
        <li><strong>Bromine (Br)</strong> is the only <em>non-metal</em> that remains liquid at room temperature.</li>
        <li><strong>Best Conductor:</strong> Silver (Ag) is the best conductor of electricity, followed by Copper (Cu).</li>
      </ul>

      <h4>Crucial Ores (TCS Favorites)</h4>
      <div class="notes-table-wrapper">
        <table class="notes-data-table">
          <thead><tr><th>Metal</th><th>Symbol</th><th>Primary Ore(s)</th></tr></thead>
          <tbody>
            <tr><td><strong>Aluminium</strong></td><td>Al</td><td>Bauxite</td></tr>
            <tr class="highlight-row"><td><strong>Iron</strong></td><td>Fe</td><td>Hematite, Magnetite</td></tr>
            <tr class="highlight-row"><td><strong>Mercury</strong></td><td>Hg</td><td>Cinnabar (HgS)</td></tr>
            <tr><td><strong>Lead</strong></td><td>Pb</td><td>Galena</td></tr>
            <tr><td><strong>Copper</strong></td><td>Cu</td><td>Chalcopyrite, Malachite</td></tr>
          </tbody>
        </table>
      </div>
    `
  },

  // =====================================================================
  // SECTION 5: PHYSICS — Light Phenomena & Applications
  // =====================================================================
  {
    id: "phy-light",
    icon: "💡",
    title: "Physics § 1 — Light Phenomena & Applications",
    type: "notes",
    content: `
      <h4>Total Internal Reflection (TIR)</h4>
      <p>Occurs when light travels from a <strong>denser medium</strong> to a <strong>rarer medium</strong> at an angle greater than the <em>critical angle</em>.</p>
      <ul>
        <li><strong>Applications:</strong> Sparkling of diamonds, Mirages in deserts, and functioning of <strong>Optical Fibres</strong>.</li>
      </ul>

      <h4>Scattering of Light</h4>
      <p>The intensity of scattering is <strong>inversely proportional to the fourth power of the wavelength</strong> (∝ 1/λ⁴).</p>
      <ul>
        <li><strong>Applications:</strong> The blue color of the sky and the red appearance of the sun during sunrise and sunset.</li>
      </ul>

      <h4>Human Eye Defects &amp; Lenses</h4>
      <div class="notes-table-wrapper">
        <table class="notes-data-table">
          <thead><tr><th>Eye Defect</th><th>Problem</th><th>Correction Lens</th></tr></thead>
          <tbody>
            <tr class="highlight-row">
              <td><strong>Myopia (Near-sightedness)</strong></td>
              <td>Cannot see distant objects clearly</td>
              <td><strong>Concave Lens</strong></td>
            </tr>
            <tr>
              <td><strong>Hypermetropia (Far-sightedness)</strong></td>
              <td>Cannot see nearby objects clearly</td>
              <td><strong>Convex Lens</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },

  // =====================================================================
  // SECTION 6: PHYSICS — SI Units & Measuring Instruments
  // =====================================================================
  {
    id: "phy-units-instruments",
    icon: "📏",
    title: "Physics § 2 — SI Units & Measuring Instruments",
    type: "notes",
    content: `
      <h4>High-Yield SI Units</h4>
      <div class="notes-table-wrapper">
        <table class="notes-data-table">
          <thead><tr><th>Quantity</th><th>SI Unit</th><th>Symbol</th></tr></thead>
          <tbody>
            <tr><td>Force</td><td>Newton</td><td>N</td></tr>
            <tr class="highlight-row"><td>Power of Lens</td><td>Dioptre</td><td>D</td></tr>
            <tr><td>Frequency</td><td>Hertz</td><td>Hz</td></tr>
            <tr><td>Electric Resistance</td><td>Ohm</td><td>Ω</td></tr>
            <tr><td>Luminous Intensity</td><td>Candela</td><td>cd</td></tr>
          </tbody>
        </table>
      </div>

      <h4>Scientific Instruments</h4>
      <ul>
        <li><strong>Sextant:</strong> Measures angles between visible objects (used in navigation).</li>
        <li><strong>Pyrometer:</strong> Measures exceptionally high temperatures from a distance.</li>
        <li><strong>Lactometer:</strong> Measures the specific gravity / purity of milk.</li>
      </ul>
    `
  },

  // =====================================================================
  // SECTION 7: HIGH-YIELD EXTRA SCIENCE CHECKLIST
  // =====================================================================
  {
    id: "sci-extra-checklist",
    icon: "✅",
    title: "High-Yield Extra Science Checklist",
    type: "highlight",
    content: `
      <h4>pH Scale Extremes</h4>
      <div class="notes-table-wrapper">
        <table class="notes-data-table">
          <thead><tr><th>Substance</th><th>pH Value</th></tr></thead>
          <tbody>
            <tr><td>Blood</td><td><strong>7.4</strong></td></tr>
            <tr><td>Pure Water</td><td><strong>7.0</strong></td></tr>
            <tr class="highlight-row"><td>Gastric Juice (HCl in stomach)</td><td><strong>1.5 to 2.0</strong></td></tr>
            <tr><td>Milk</td><td><strong>6.5 to 6.7</strong></td></tr>
          </tbody>
        </table>
      </div>

      <h4>Alloys (TCS Favorites)</h4>
      <ul>
        <li><strong>Brass:</strong> Copper (Cu) + Zinc (Zn)</li>
        <li><strong>Bronze:</strong> Copper (Cu) + Tin (Sn)</li>
        <li><strong>Stainless Steel:</strong> Iron (Fe) + Chromium (Cr) + Nickel (Ni)</li>
      </ul>

      <h4>Escape Velocity</h4>
      <p>The minimum speed needed for an object to escape Earth's gravitational field permanently is <strong>11.2 km/s</strong>.</p>
    `
  },

  // =====================================================================
  // SECTION 8: ADVANCED BIOLOGY — Plant Kingdom Classification
  // =====================================================================
  {
    id: "adv-bio-plant-kingdom",
    icon: "🌿",
    title: "Advanced Biology — Plant Kingdom Classification",
    type: "notes",
    content: `
      <p>TCS asks direct classification questions that catch students off guard:</p>
      <div class="notes-table-wrapper">
        <table class="notes-data-table">
          <thead><tr><th>Division</th><th>Key Feature</th><th>Examples</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>Thallophyta</strong></td>
              <td>Simplest plants with an undifferentiated body design (no roots, stems, or leaves)</td>
              <td>Algae: Spirogyra, Chara, Ulva</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>Bryophyta</strong></td>
              <td><strong>Amphibians of the Plant Kingdom.</strong> Lack specialized vascular tissue</td>
              <td>Moss (Funaria), Marchantia</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>Pteridophyta</strong></td>
              <td><strong>First plants to possess vascular tissues</strong> (Xylem for water, Phloem for food)</td>
              <td>Ferns, Marsilea</td>
            </tr>
            <tr>
              <td><strong>Gymnosperms</strong></td>
              <td>Naked-seeded perennial, woody plants</td>
              <td>Pinus, Cycas</td>
            </tr>
            <tr>
              <td><strong>Angiosperms</strong></td>
              <td>Flowering plants with seeds enclosed inside fruits</td>
              <td>Mango, Rose, Wheat</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },

  // =====================================================================
  // SECTION 9: ADVANCED BIOLOGY — Plant Hormones & Diseases
  // =====================================================================
  {
    id: "adv-bio-hormones-diseases",
    icon: "🦠",
    title: "Advanced Biology — Plant Hormones & Disease Pathogens",
    type: "notes",
    content: `
      <h4>Plant Hormones (Phytohormones)</h4>
      <ul>
        <li><strong>Auxin:</strong> Helps in cell elongation and causes phototropism (bending toward light).</li>
        <li><strong>Gibberellins:</strong> Helps in the growth of stems and seed germination.</li>
        <li><strong>Cytokinins:</strong> Promotes rapid cell division (found in high concentrations in fruits and seeds).</li>
        <li><strong>Abscisic Acid:</strong> An inhibitor hormone. It wilts leaves and stops growth.</li>
        <li><strong>Ethylene:</strong> The <em>only gaseous hormone</em>; handles the natural ripening of fruits.</li>
      </ul>

      <h4>Human Deficiencies &amp; Pathogens</h4>
      <div class="notes-table-wrapper">
        <table class="notes-data-table">
          <thead><tr><th>Type</th><th>Diseases</th></tr></thead>
          <tbody>
            <tr><td><strong>Bacterial</strong></td><td>Typhoid (<em>Salmonella typhi</em>), Tuberculosis (<em>Mycobacterium tuberculosis</em>), Cholera, Anthrax</td></tr>
            <tr><td><strong>Viral</strong></td><td>Dengue, Common Cold, Influenza, AIDS, Hepatitis</td></tr>
            <tr><td><strong>Fungal</strong></td><td>Ringworm, Athlete's foot</td></tr>
            <tr class="highlight-row"><td><strong>Protozoan</strong></td><td>Malaria (caused by <em>Plasmodium</em>, carried by <strong>Female Anopheles</strong> mosquito), Kala-azar (<em>Leishmania</em>)</td></tr>
          </tbody>
        </table>
      </div>
    `
  },

  // =====================================================================
  // SECTION 10: ADVANCED CHEMISTRY — Reactions & Periodic Trends
  // =====================================================================
  {
    id: "adv-chem-reactions-periodic",
    icon: "🧪",
    title: "Advanced Chemistry — Reactions & Periodic Table Trends",
    type: "notes",
    content: `
      <h4>Types of Chemical Reactions</h4>
      <ul>
        <li><strong>Combination:</strong> Two or more reactants combine to form a single product (2H₂ + O₂ → 2H₂O).</li>
        <li><strong>Decomposition:</strong> A single reactant breaks down into multiple simpler products (CaCO₃ → CaO + CO₂).</li>
        <li><strong>Displacement:</strong> A more reactive element displaces a less reactive element from its salt solution (Fe + CuSO₄ → FeSO₄ + Cu). Note: Blue Copper Sulphate turns light green.</li>
        <li><strong>Double Displacement:</strong> Exchange of ions between two compounds (Na₂SO₄ + BaCl₂ → BaSO₄↓ + 2NaCl). Forms a <strong>white precipitate of Barium Sulphate</strong>.</li>
      </ul>

      <h4>Periodic Table Trends (Left to Right vs. Top to Bottom)</h4>
      <div class="notes-table-wrapper">
        <table class="notes-data-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Left → Right (Across a Period)</th>
              <th>Top → Bottom (Down a Group)</th>
            </tr>
          </thead>
          <tbody>
            <tr class="highlight-row">
              <td><strong>Atomic Radius / Size</strong></td>
              <td>Decreases (increased nuclear charge)</td>
              <td>Increases (new shells added)</td>
            </tr>
            <tr>
              <td><strong>Metallic Character</strong></td>
              <td>Decreases</td>
              <td>Increases</td>
            </tr>
            <tr>
              <td><strong>Non-Metallic Character</strong></td>
              <td>Increases</td>
              <td>Decreases</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>Electronegativity</strong></td>
              <td>Increases (Fluorine is highest)</td>
              <td>Decreases</td>
            </tr>
            <tr>
              <td><strong>Valency</strong></td>
              <td>Increases 1→4, then decreases to 0</td>
              <td>Remains the Same</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },

  // =====================================================================
  // SECTION 11: ADVANCED PHYSICS — Core Equations & Sound Waves
  // =====================================================================
  {
    id: "adv-phy-equations-sound",
    icon: "⚡",
    title: "Advanced Physics — Core Equations & Sound Waves",
    type: "notes",
    content: `
      <h4>Core Physics Equations (For Basic Numericals)</h4>
      <p>TCS now inserts 1 simple numerical problem in some shifts based on these 4 equations:</p>
      <div class="notes-table-wrapper">
        <table class="notes-data-table">
          <thead><tr><th>Law / Concept</th><th>Formula</th></tr></thead>
          <tbody>
            <tr class="highlight-row"><td><strong>Newton's Second Law</strong></td><td>Force (F) = Mass (m) × Acceleration (a)</td></tr>
            <tr><td><strong>Kinetic Energy</strong></td><td>KE = ½mv²</td></tr>
            <tr><td><strong>Potential Energy</strong></td><td>PE = mgh &nbsp;(g = 9.8 m/s² or 10 m/s²)</td></tr>
            <tr class="highlight-row"><td><strong>Ohm's Law</strong></td><td>Voltage (V) = Current (I) × Resistance (R)</td></tr>
          </tbody>
        </table>
      </div>

      <h4>Sound Waves Parameters</h4>
      <ul>
        <li><strong>Frequency Range:</strong> Human audible range is <strong>20 Hz to 20,000 Hz</strong>.</li>
        <li><strong>Infrasonic:</strong> Below 20 Hz (produced by whales, elephants, earthquakes).</li>
        <li><strong>Ultrasonic:</strong> Above 20,000 Hz (used by bats, dolphins, and in SONAR / Echocardiography).</li>
        <li><strong>Medium Speed:</strong> Sound is a mechanical longitudinal wave; it needs a medium. Speed order: <strong>Solids &gt; Liquids &gt; Gases</strong>. Sound cannot travel through a vacuum.</li>
        <li>Light can travel through a vacuum at <strong>3 × 10⁸ m/s</strong>.</li>
      </ul>
    `
  },
  {
    id: "sec-science-fundamentals",
    title: "Science Fundamentals",
    icon: "🔬",
    content: `

<div class="mnemonic-image-container">
  <img src="images/science_physics_mnemonic_1783710236487.jpg" class="mnemonic-image" alt="Abstract Physics and Networking">
  <div class="mnemonic-caption">Physics Laws & Computer Fundamentals</div>
</div>
<div class="fact-block">
  <div class="fact-title">Computer Fundamentals</div>
  <ul>
    <li><strong>Shortcuts:</strong> <span class="memory-highlight">F5 (Refresh)</span>, F7 (Spelling & Grammar check), Ctrl + K (Insert Hyperlink), Ctrl + Y (Redo), Ctrl + Z (Undo).</li>
    <li><strong>Networking & Memory:</strong> 
      <ul>
        <li>1 Byte = 8 Bits | 1 Nibble = 4 Bits.</li>
        <li>ROM: Non-volatile memory (holds BIOS). RAM: Volatile memory.</li>
        <li>HTTP (Port 80), HTTPS (Port 443): Secure web browsing protocols.</li>
      </ul>
    </li>
  </ul>
</div>
<div class="fact-block">
  <div class="fact-title">General Science Revision Sheet (Part 1)</div>
  <p><strong>Important Scientists & Discoveries</strong></p>
  <ul>
    <li><strong>Isaac Newton:</strong> Gravitation and Laws of Motion.</li>
    <li><strong>Albert Einstein:</strong> Relativity and Photoelectric Effect.</li>
    <li><strong>Marie Curie:</strong> Radioactivity, Radium, and Polonium.</li>
    <li><strong>Alexander Fleming:</strong> Penicillin, the first antibiotic.</li>
    <li><strong>Edward Jenner:</strong> Smallpox vaccine and immunology foundations.</li>
    <li><strong>Gregor Mendel:</strong> Laws of inheritance and modern genetics.</li>
    <li><strong>Charles Darwin:</strong> Theory of evolution by natural selection.</li>
    <li><strong>John Dalton:</strong> Modern atomic theory.</li>
  </ul>
  <p><strong>Scientific Instruments & Uses</strong></p>
  <ul>
    <li><strong>Barometer:</strong> Measures atmospheric pressure conditions.</li>
    <li><strong>Hygrometer:</strong> Measures moisture and humidity in air.</li>
    <li><strong>Anemometer:</strong> Measures wind speed and wind velocity.</li>
    <li><strong>Pyrometer:</strong> Measures extremely high industrial temperatures.</li>
    <li><strong>Sphygmomanometer:</strong> Measures arterial blood pressure.</li>
    <li><strong>Lactometer:</strong> Measures relative purity of milk.</li>
    <li><strong>Hydrometer:</strong> Measures specific gravity of various liquids.</li>
    <li><strong>Geiger Counter:</strong> Detects and measures nuclear radioactivity.</li>
  </ul>
  <p><strong>Important Scientific Laws</strong></p>
  <ul>
    <li><strong>Newton's Laws:</strong> Inertia, force relation <span class="memory-highlight">(F=ma)</span>, action-reaction.</li>
    <li><strong>Archimedes' Principle:</strong> Buoyant force equals displaced fluid weight.</li>
    <li><strong>Ohm's Law:</strong> Voltage equals current multiplied by resistance (V=IR).</li>
    <li><strong>Pascal's Law:</strong> Pressure applies equally throughout confined fluids.</li>
    <li><strong>Bernoulli's Principle:</strong> Higher fluid velocity reduces static pressure.</li>
  </ul>
  <p><strong>Heat & Temperature Basics</strong></p>
  <ul>
    <li><strong>Heat energy:</strong> Thermal energy transfer between objects. SI Unit: Joules.</li>
    <li><strong>Temperature:</strong> Measure of average kinetic energy. SI Unit: Kelvin.</li>
    <li><strong>Absolute Zero:</strong> Lowest possible thermal state (0 K or -273.15°C).</li>
    <li><strong>Conversion Formula:</strong> F = (9/5)C + 32.</li>
    <li><strong>Latent Heat:</strong> Phase transitions occurring without temperature change.</li>
  </ul>
  <p><strong>Acids, Bases & pH Scale</strong></p>
  <ul>
    <li><strong>Acids:</strong> Taste sour, release H+ ions, <span class="memory-highlight">pH &lt; 7</span>. Turns blue litmus to red.</li>
    <li><strong>Bases:</strong> Taste bitter, release OH- ions, pH &gt; 7. Turns red litmus to blue.</li>
    <li><strong>Neutral Point:</strong> Pure water registers exactly pH 7.</li>
    <li><strong>Phenolphthalein:</strong> Turns a distinct bright pink in bases.</li>
    <li><strong>Neutralization:</strong> Acid reacting with base yields salt and water.</li>
  </ul>
  <p><strong>Everyday Inventions</strong></p>
  <ul>
    <li><strong>Electric Bulb:</strong> Thomas Alva Edison.</li>
    <li><strong>Telephone:</strong> Alexander Graham Bell.</li>
    <li><strong>Television:</strong> John Logie Baird.</li>
    <li><strong>Airplane:</strong> Orville and Wilbur Wright.</li>
    <li><strong>Computer:</strong> Designed initially by Charles Babbage.</li>
    <li><strong>Radio:</strong> Guglielmo Marconi.</li>
    <li><strong>X-Ray:</strong> Wilhelm Conrad Röntgen.</li>
  </ul>
  <p><strong>Renewable vs. Non-Renewable Energy</strong></p>
  <ul>
    <li><strong>Renewable:</strong> Infinite replenishment with low environmental impact (Solar, wind, hydroelectric, geothermal).</li>
    <li><strong>Non-renewable:</strong> Finite resources depleted through human consumption (Coal, crude oil, natural gas, uranium).</li>
  </ul>
  <p><strong>Nuclear Radiation Basics</strong></p>
  <ul>
    <li><strong>Alpha Particles:</strong> Helium nuclei with high ionization, low penetration.</li>
    <li><strong>Beta Particles:</strong> High-speed electrons with moderate shielding requirements.</li>
    <li><strong>Gamma Rays:</strong> High-energy photons with massive penetration capabilities.</li>
    <li><strong>Nuclear Fission:</strong> Heavy atomic nuclei splitting into lighter pieces.</li>
    <li><strong>Nuclear Fusion:</strong> Light atomic nuclei combining under extreme heat.</li>
  </ul>
</div>

    `
  },

];

// =========================================================================
// SCIENCE PYQ DATA — 15 Authentic SSC CGL Questions
// =========================================================================
export const SCIENCE_PYQ_DATA = [
  {
    id: 1,
    section: "A",
    sectionTitle: "Biology — Human Systems",
    question: "Which organ in the human body is universally referred to as the \"Graveyard of Red Blood Cells (RBCs)\"?",
    options: ["(A) Liver", "(B) Bone Marrow", "(C) Spleen", "(D) Pancreas"],
    answer: 2,
    answerLabel: "(C) Spleen"
  },
  {
    id: 2,
    section: "A",
    sectionTitle: "Biology — Vitamins",
    question: "Which specific vitamin contains the mineral metal Cobalt as part of its complex biochemical structure?",
    options: ["(A) Vitamin B1", "(B) Vitamin B6", "(C) Vitamin B12", "(D) Vitamin B3"],
    answer: 2,
    answerLabel: "(C) Vitamin B12"
  },
  {
    id: 3,
    section: "A",
    sectionTitle: "Biology — Vitamins",
    question: "Xerophthalmia and Night Blindness are classical deficiency diseases caused by the lack of which vitamin?",
    options: ["(A) Vitamin A", "(B) Vitamin C", "(C) Vitamin D", "(D) Vitamin K"],
    answer: 0,
    answerLabel: "(A) Vitamin A"
  },
  {
    id: 4,
    section: "A",
    sectionTitle: "Biology — Endocrine System",
    question: "Which endocrine gland in the human body is explicitly designated as the \"Master Gland\"?",
    options: ["(A) Thyroid Gland", "(B) Adrenal Gland", "(C) Pituitary Gland", "(D) Thymus Gland"],
    answer: 2,
    answerLabel: "(C) Pituitary Gland"
  },
  {
    id: 5,
    section: "B",
    sectionTitle: "Chemistry — Compounds",
    question: "What is the standard chemical formula for the everyday household compound known as Baking Soda?",
    options: ["(A) Na₂CO₃", "(B) NaHCO₃", "(C) NaOH", "(D) CaOCl₂"],
    answer: 1,
    answerLabel: "(B) NaHCO₃"
  },
  {
    id: 6,
    section: "B",
    sectionTitle: "Chemistry — Ores",
    question: "Cinnabar is a high-yielding natural mineral ore of which of the following metals?",
    options: ["(A) Aluminum", "(B) Iron", "(C) Mercury", "(D) Lead"],
    answer: 2,
    answerLabel: "(C) Mercury"
  },
  {
    id: 7,
    section: "B",
    sectionTitle: "Chemistry — Properties",
    question: "Which of the following is the only non-metal that naturally remains in a liquid state at room temperature?",
    options: ["(A) Mercury", "(B) Bromine", "(C) Chlorine", "(D) Phosphorus"],
    answer: 1,
    answerLabel: "(B) Bromine"
  },
  {
    id: 8,
    section: "B",
    sectionTitle: "Chemistry — Compounds",
    question: "Plaster of Paris (POP), used extensively in construction and bone-setting, is chemically written as which compound?",
    options: ["(A) Calcium Sulphate Dihydrate", "(B) Calcium Sulphate Hemihydrate", "(C) Magnesium Sulphate Heptahydrate", "(D) Calcium Oxychloride"],
    answer: 1,
    answerLabel: "(B) Calcium Sulphate Hemihydrate"
  },
  {
    id: 9,
    section: "C",
    sectionTitle: "Physics — Light",
    question: "The brilliant sparkling of a diamond and the transmission of signals through modern optical fibers are based on which optical phenomenon?",
    options: ["(A) Total Internal Reflection", "(B) Light Scattering", "(C) Double Refraction", "(D) Interference of Light"],
    answer: 0,
    answerLabel: "(A) Total Internal Reflection"
  },
  {
    id: 10,
    section: "C",
    sectionTitle: "Physics — Eye Defects",
    question: "A person suffering from the eye defect Myopia (Near-sightedness) is medically prescribed spectacles containing which type of lens?",
    options: ["(A) Convex Lens", "(B) Concave Lens", "(C) Bifocal Lens", "(D) Cylindrical Lens"],
    answer: 1,
    answerLabel: "(B) Concave Lens"
  },
  {
    id: 11,
    section: "C",
    sectionTitle: "Physics — SI Units",
    question: "What is the standard SI unit used to measure the Power of an optical lens?",
    options: ["(A) Watt", "(B) Lumen", "(C) Candela", "(D) Dioptre"],
    answer: 3,
    answerLabel: "(D) Dioptre"
  },
  {
    id: 12,
    section: "C",
    sectionTitle: "Physics — Instruments",
    question: "Which special scientific instrument is used by meteorologists to measure exceptionally high temperatures from a distance without physical contact?",
    options: ["(A) Pyrometer", "(B) Barometer", "(C) Bolometer", "(D) Hydrometer"],
    answer: 0,
    answerLabel: "(A) Pyrometer"
  },
  {
    id: 13,
    section: "D",
    sectionTitle: "Advanced Biology — Plant Kingdom",
    question: "Amphibians of the plant kingdom lack specialized vascular structural tissues. Which group fits this description?",
    options: ["(A) Thallophyta", "(B) Bryophyta", "(C) Pteridophyta", "(D) Gymnosperms"],
    answer: 1,
    answerLabel: "(B) Bryophyta"
  },
  {
    id: 14,
    section: "D",
    sectionTitle: "Advanced Chemistry — Periodic Trends",
    question: "What happens to the overall atomic radius of elements as you move smoothly from left to right across a standard period?",
    options: ["(A) It systematically increases", "(B) It remains completely unchanged", "(C) It systematically decreases", "(D) It first decreases then rapidly increases"],
    answer: 2,
    answerLabel: "(C) It systematically decreases"
  },
  {
    id: 15,
    section: "D",
    sectionTitle: "Advanced Physics — Equations",
    question: "An object of mass 5 kg is raised to a height of 10 meters above the ground. What is its potential energy? (Take g = 10 m/s²)",
    options: ["(A) 50 J", "(B) 250 J", "(C) 500 J", "(D) 1000 J"],
    answer: 2,
    answerLabel: "(C) 500 J"
  }
];
