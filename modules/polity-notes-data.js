/* ==========================================================================
   Polity Detailed Exam Notes Data (modules/polity-notes-data.js)
   Every word from the user's SSC CGL Polity Notes — verbatim.
   ========================================================================== */

export const POLITY_NOTES_SECTIONS = [
  // ======================================================================
  // SECTION 0: TCS Question Trends
  // ======================================================================
  {
    id: "tcs-trends",
    icon: "📊",
    title: "TCS Question Trends & Distribution",
    type: "info",
    content: `
      <ul>
        <li><strong>Tier-1:</strong> 3 to 5 questions per shift (highly factual, focused on Fundamental Rights, Articles, and Parliamentary terms).</li>
        <li><strong>Tier-2 (Revised Pattern):</strong> 2 to 3 statement-based or match-the-following questions per shift (requires conceptual clarity on executive powers and structural features).</li>
      </ul>
    `
  },

  // ======================================================================
  // SECTION 1: Essential Constitutional Framework
  // ======================================================================
  {
    id: "constitutional-framework",
    icon: "📜",
    title: "1. Essential Constitutional Framework",
    type: "notes",
    content: `
      <h4>Making of the Constitution</h4>
      <p>The Constituent Assembly took <strong>2 years, 11 months, and 18 days</strong>. <strong>Dr. B.R. Ambedkar</strong> is the Father of the Constitution. <strong>Adopted:</strong> Nov 26, 1949; <strong>Effected:</strong> Jan 26, 1950</p>

      <h4>Preamble</h4>
      <p>Amended only once (<strong>42nd Amendment, 1976</strong>), adding <strong>Socialist, Secular, and Integrity</strong>. The ideals of <strong>Liberty, Equality, and Fraternity</strong> are borrowed from the <strong>French Revolution</strong>.</p>

      <h4>Schedules</h4>
      <p>Total <strong>12 schedules</strong>.</p>
      <ul>
        <li><strong>4th Schedule:</strong> Allocation of Rajya Sabha seats.</li>
        <li><strong>8th Schedule:</strong> Recognized languages (22 languages).</li>
        <li><strong>10th Schedule:</strong> Anti-defection law (added by 52nd Amendment).</li>
        <li><strong>11th & 12th Schedules:</strong> Panchayats (73rd Amendment) and Municipalities (74th Amendment).</li>
      </ul>
    `
  },

  // ======================================================================
  // SECTION 2: Fundamental Rights, Duties & DPSP
  // ======================================================================
  {
    id: "fundamental-rights",
    icon: "⚖️",
    title: "2. Fundamental Rights, Duties & DPSP",
    type: "notes",
    content: `
      <h4>Fundamental Rights (Part III, Art 12-35, borrowed from USA)</h4>
      <ul>
        <li><strong>Art 14:</strong> Equality before law and equal protection of laws.</li>
        <li><strong>Art 17:</strong> Abolition of Untouchability.</li>
        <li><strong>Art 18:</strong> Abolition of titles.</li>
        <li><strong>Art 21:</strong> Right to Life and Personal Liberty (cannot be suspended during emergency).</li>
      </ul>

      <h4>Directive Principles of State Policy (Part IV, Art 36-51, borrowed from Ireland)</h4>
      <ul>
        <li><strong>Art 40:</strong> Organization of Village Panchayats.</li>
      </ul>

      <h4>Fundamental Duties (Part IV-A, Art 51-A, borrowed from USSR)</h4>
      <p><strong>Swaran Singh Committee</strong> recommended them. Added via <strong>42nd Amendment (1976)</strong>. Originally <strong>10</strong>, currently <strong>11 duties</strong>.</p>
    `
  },

  // ======================================================================
  // SECTION 3: Union & State Executive
  // ======================================================================
  {
    id: "union-state-executive",
    icon: "🏛️",
    title: "3. Union & State Executive (President, PM, Judiciary)",
    type: "notes",
    content: `
      <h4>President</h4>
      <p>Ceremonial head similar to the British Monarch. Impeachment requires a <strong>14-day prior notice</strong> and must be passed by both houses of Parliament. Oath administered by the <strong>Chief Justice of India</strong> (or senior-most SC judge).</p>

      <h4>Emergency Provisions</h4>
      <ul>
        <li><strong>National (Art 352)</strong></li>
        <li><strong>President's Rule / State Emergency (Art 356)</strong></li>
        <li><strong>Financial (Art 360)</strong></li>
      </ul>

      <h4>Judiciary</h4>
      <p>Judicial Review borrowed from the USA. Retirement age of High Court Judges increased from 60 to 62 (<strong>15th Amendment</strong>).</p>
    `
  },

  // ======================================================================
  // SECTION 4: Constitutional Bodies & Key Officials
  // ======================================================================
  {
    id: "constitutional-bodies",
    icon: "🏢",
    title: "4. Constitutional Bodies & Key Officials",
    type: "notes",
    content: `
      <ul>
        <li><strong>Election Commission (Art 324):</strong> Conducts elections to Parliament and State Legislatures.</li>
        <li><strong>Finance Commission (Art 280):</strong> Recommends distribution of financial resources.</li>
      </ul>

      <h4>Appointments & Resignations (Frequently Asked)</h4>
      <ul>
        <li><strong>Attorney General:</strong> Appointed by President.</li>
        <li><strong>CAG:</strong> Appointed by President.</li>
        <li><strong>Speaker of Lok Sabha:</strong> Submits resignation to Deputy Speaker.</li>
        <li><strong>Vote on Account:</strong> Valid for 2 months (except election years).</li>
      </ul>
    `
  },

  // ======================================================================
  // SECTION 5: Most Repeated PYQs
  // ======================================================================
  {
    id: "most-repeated-pyqs",
    icon: "🔥",
    title: "5. Most Repeated PYQs",
    type: "highlight",
    content: `
      <ol>
        <li>
          <strong>Which Constitutional Amendment is known as 'Mini Constitution'?</strong>
          <div class="pyq-answer">Ans: <strong>42nd Amendment Act.</strong></div>
        </li>
        <li>
          <strong>Which Amendment lowered the voting age from 21 to 18 years?</strong>
          <div class="pyq-answer">Ans: <strong>61st Amendment Act, 1989.</strong></div>
        </li>
        <li>
          <strong>Right to Property is no longer a Fundamental Right. It is a legal right under which Article?</strong>
          <div class="pyq-answer">Ans: <strong>Article 300A</strong> (removed by 44th Amendment, 1978).</div>
        </li>
        <li>
          <strong>Who among the following appoints the Chief Information Commissioner of a State?</strong>
          <div class="pyq-answer">Ans: <strong>Governor.</strong></div>
        </li>
      </ol>
    `
  },

  // ======================================================================
  // SECTION 6: Historical Background & British Acts
  // ======================================================================
  {
    id: "historical-background",
    icon: "🇬🇧",
    title: "6. Historical Background & British Acts",
    type: "notes",
    content: `
      <p>TCS frequently asks about the stepping stones of the Indian Constitution.</p>
      <ul>
        <li><strong>Regulating Act of 1773:</strong> Designated the Governor of Bengal as the Governor-General of Bengal (Warren Hastings). Established the Supreme Court at Calcutta (1774).</li>
        <li><strong>Pitt's India Act of 1784:</strong> Separated the commercial and political functions of the East India Company.</li>
        <li><strong>Charter Act of 1833:</strong> Made the Governor-General of Bengal the Governor-General of India (Lord William Bentinck).</li>
        <li><strong>Government of India Act 1858:</strong> Transferred power from the Company to the British Crown. Created the post of Secretary of State for India.</li>
        <li><strong>Government of India Act 1919 (Montagu-Chelmsford Reforms):</strong> Introduced Dyarchy (dual rule) in the provinces and bicameralism at the Centre.</li>
        <li><strong>Government of India Act 1935:</strong> Detailed blueprint of our Constitution. Introduced Provincial Autonomy, a Federal Court, and divided powers into Federal, Provincial, and Concurrent lists.</li>
      </ul>
    `
  },

  // ======================================================================
  // SECTION 7: State Executive & State Legislature
  // ======================================================================
  {
    id: "state-executive",
    icon: "🏛️",
    title: "7. State Executive & State Legislature",
    type: "notes",
    content: `
      <p>Questions here often mirror the Union executive but focus on distinct differences.</p>

      <h4>The Governor (Articles 153–162)</h4>
      <p>Appointed by the President. Holds office during the pleasure of the President. Minimum age is <strong>35 years</strong>.</p>

      <h4>Ordinance Power</h4>
      <p>The Governor issues ordinances under <strong>Article 213</strong> (President uses Article 123).</p>

      <h4>Bicameral States</h4>
      <p>Only <strong>6 states</strong> have a bicameral legislature (both Legislative Assembly/Vidhan Sabha and Legislative Council/Vidhan Parishad):</p>
      <ul>
        <li><strong>Andhra Pradesh, Bihar, Karnataka, Maharashtra, Telangana, and Uttar Pradesh.</strong></li>
      </ul>

      <h4>Legislative Council (Vidhan Parishad)</h4>
      <p>Maximum strength cannot exceed <strong>1/3rd</strong> of the total assembly strength, and minimum strength cannot be less than <strong>40</strong>.</p>
    `
  },

  // ======================================================================
  // SECTION 8: Local Self-Government
  // ======================================================================
  {
    id: "local-self-government",
    icon: "🏘️",
    title: "8. Local Self-Government (Panchayats & Municipalities)",
    type: "notes",
    content: `
      <p>This is a highly repeated topic in recent Tier-1 and Tier-2 exams.</p>
      <ul>
        <li><strong>Balwant Rai Mehta Committee (1957):</strong> Recommended a 3-tier Panchayati Raj system (Gram Panchayat, Panchayat Samiti, Zilla Parishad).</li>
        <li><strong>First Panchayat:</strong> Inaugurated in Nagaur, Rajasthan on October 2, 1959, by Jawaharlal Nehru.</li>
        <li><strong>73rd Constitutional Amendment Act (1992):</strong> Added Part IX and the 11th Schedule (contains 29 functional items for Panchayats).</li>
        <li><strong>74th Constitutional Amendment Act (1992):</strong> Added Part IX-A and the 12th Schedule (contains 18 functional items for Municipalities).</li>
        <li><strong>Reservations:</strong> 1/3rd (33%) of total seats must be reserved for women in Panchayats. Minimum age to contest Panchayat elections is <strong>21 years</strong>.</li>
      </ul>
    `
  },

  // ======================================================================
  // SECTION 9: Constitutional vs. Non-Constitutional Bodies
  // ======================================================================
  {
    id: "const-vs-non-const",
    icon: "⚔️",
    title: "9. Constitutional vs. Non-Constitutional Bodies",
    type: "table",
    content: `
      <p>SSC loves to ask, "Which of the following is a non-constitutional body?" Memorise this classification:</p>
      <table>
        <thead>
          <tr>
            <th>Constitutional Bodies (Mentioned in Articles)</th>
            <th>Non-Constitutional / Statutory Bodies (Passed by Law/Executive Order)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Comptroller and Auditor General (CAG): Art 148</td>
            <td>NITI Aayog: Replaced Planning Commission (Executive Order)</td>
          </tr>
          <tr>
            <td>Attorney General of India: Art 76</td>
            <td>National Human Rights Commission (NHRC): Statutory</td>
          </tr>
          <tr>
            <td>Union Public Service Commission (UPSC): Art 315</td>
            <td>Central Vigilance Commission (CVC): Statutory</td>
          </tr>
          <tr>
            <td>Finance Commission: Art 280</td>
            <td>Central Information Commission (CIC): Statutory</td>
          </tr>
          <tr>
            <td>National Commission for SCs / STs / OBCs: Art 338, 338A, 338B</td>
            <td>Lokpal and Lokayuktas: Statutory</td>
          </tr>
        </tbody>
      </table>
    `
  },

  // ======================================================================
  // SECTION 10: Parliamentary Terms & Procedures
  // ======================================================================
  {
    id: "parliamentary-procedures",
    icon: "🏛️",
    title: "10. Parliamentary Terms & Procedures",
    type: "notes",
    content: `
      <h4>Question Hour</h4>
      <p>The first hour of a parliamentary sitting.</p>
      <ul>
        <li><strong>Starred Questions:</strong> Require oral answers; supplementary questions can follow.</li>
        <li><strong>Unstarred Questions:</strong> Require written answers; no supplementary questions.</li>
      </ul>

      <h4>Zero Hour</h4>
      <p>Starts immediately after Question Hour (around 12 PM). It is an <strong>Indian innovation</strong> (not in the rules of procedure) to raise matters without prior notice.</p>

      <h4>Quorum</h4>
      <p>The minimum number of members required to transact business. It is <strong>1/10th</strong> of the total membership of the House (including the Speaker/Chairman).</p>

      <h4>Joint Sitting (Article 108)</h4>
      <p>Called by the President to resolve a deadlock between both houses. It is presided over by the <strong>Speaker of Lok Sabha</strong> (not the Vice-President).</p>
    `
  },

  // ======================================================================
  // SECTION 11: Citizenship & Union and its Territory
  // ======================================================================
  {
    id: "citizenship",
    icon: "🇮🇳",
    title: "11. Citizenship & Union and its Territory",
    type: "notes",
    content: `
      <h4>Part I (Articles 1–4)</h4>
      <p>Parliament can change state boundaries or create new states by a <strong>Simple Majority</strong>.</p>

      <h4>Part II (Articles 5–11)</h4>
      <p>Deals with Citizenship. <strong>Single citizenship</strong> is borrowed from the <strong>UK</strong>.</p>

      <h4>Citizenship Act, 1955</h4>
      <p>Prescribes <strong>5 ways to acquire citizenship</strong> (Birth, Descent, Registration, Naturalization, Incorporation of Territory) and <strong>3 ways to lose it</strong> (Renunciation, Termination, Deprivation).</p>
    `
  },

  // ======================================================================
  // SECTION 12: High-Yield Master Table — Important Articles
  // ======================================================================
  {
    id: "important-articles",
    icon: "⭐",
    title: "12. High-Yield Master Table: Important Articles for SSC CGL",
    type: "highlight",
    content: `
      <p>If you memorize nothing else, memorize these specific article numbers:</p>
      <table>
        <thead>
          <tr><th>Article</th><th>Subject</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Article 32</strong></td><td>Constitutional Remedies (Heart and Soul of the Constitution according to B.R. Ambedkar).</td></tr>
          <tr><td><strong>Article 44</strong></td><td>Uniform Civil Code (UCC).</td></tr>
          <tr><td><strong>Article 51A</strong></td><td>Fundamental Duties.</td></tr>
          <tr><td><strong>Article 61</strong></td><td>Impeachment of the President.</td></tr>
          <tr><td><strong>Article 72</strong></td><td>Pardoning powers of the President.</td></tr>
          <tr><td><strong>Article 110</strong></td><td>Definition of a Money Bill (decided solely by the Lok Sabha Speaker).</td></tr>
          <tr><td><strong>Article 112</strong></td><td>Annual Financial Statement (popularly known as the Budget).</td></tr>
          <tr><td><strong>Article 143</strong></td><td>Power of President to consult the Supreme Court.</td></tr>
          <tr><td><strong>Article 312</strong></td><td>All India Services (IAS, IPS, IFoS).</td></tr>
          <tr><td><strong>Article 368</strong></td><td>Power of Parliament to amend the Constitution.</td></tr>
        </tbody>
      </table>
    `
  },

  // ======================================================================
  // SECTION 13: Tricks — Tricky Exceptions
  // ======================================================================
  {
    id: "tricky-exceptions",
    icon: "🧠",
    title: "13. Tricks: Master the 'Tricky Exceptions' (TCS Favorites)",
    type: "highlight",
    content: `
      <p>TCS heavily targets the exceptions where students confuse Union and State rules. Memorize these specific contrasts:</p>
      <ul>
        <li><strong>The Age Trap:</strong> Minimum age for Lok Sabha/Vidhan Sabha is <strong>25</strong>. For Rajya Sabha/Vidhan Parishad, it is <strong>30</strong>. For President/Vice-President/Governor, it is <strong>35</strong>. For a Panchayat member, it is <strong>21</strong>.</li>
        <li><strong>Removal vs. Appointment:</strong> The Governor appoints State Public Service Commission (SPSC) members, but only the <strong>President can remove them</strong>. Similarly, the Governor appoints High Court judges, but they are removed by the President via Parliament.</li>
        <li><strong>The Joint Sitting Exception:</strong> Money Bills and Constitutional Amendment Bills cannot have a joint sitting. If there is a deadlock, the bill dies (or in the case of a Money Bill, Lok Sabha's decision is final).</li>
        <li><strong>Money Bill Power:</strong> A Money Bill can only be introduced in the Lok Sabha with the prior recommendation of the President. The Rajya Sabha has virtually no power here; it can only delay it for a maximum of <strong>14 days</strong>.</li>
      </ul>
    `
  },

  // ======================================================================
  // SECTION 14: Writs (Article 32 & 226)
  // ======================================================================
  {
    id: "writs",
    icon: "📜",
    title: "14. Learn the Writs (Article 32 & 226)",
    type: "notes",
    content: `
      <p>TCS asks direct definition questions on the 5 types of writs issued by the Supreme Court and High Courts:</p>
      <table>
        <thead>
          <tr><th>Writ</th><th>Meaning</th><th>Usage</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Habeas Corpus</strong></td><td>"To have the body of."</td><td>Used against illegal detention.</td></tr>
          <tr><td><strong>Mandamus</strong></td><td>"We command."</td><td>Issued to a public official to perform their legal duty.</td></tr>
          <tr><td><strong>Prohibition</strong></td><td>"To forbid."</td><td>Issued by a higher court to a lower court to stop it from exceeding its jurisdiction.</td></tr>
          <tr><td><strong>Certiorari</strong></td><td>"To be certified/informed."</td><td>Issued to quash the order of a lower court or transfer a case.</td></tr>
          <tr><td><strong>Quo-Warranto</strong></td><td>"By what authority?"</td><td>Used to prevent illegal usurpation of a public office.</td></tr>
        </tbody>
      </table>
    `
  },

  // ======================================================================
  // SECTION 15: Practice Tip
  // ======================================================================
  {
    id: "practice-tip",
    icon: "💡",
    title: "15. Practice and Eliminate Options",
    type: "info",
    content: `
      <p>Because Polity is completely factual, options are designed to confuse you with similar article numbers (e.g., Art 338 vs Art 338A) or years. The only way to ensure this notes package is "enough" is to instantly test your retention.</p>
    `
  },

  // ======================================================================
  // SECTION 16: "Who Borrowed What" Mnemonics Cheat Sheet
  // ======================================================================
  {
    id: "borrowed-features",
    icon: "🌍",
    title: "16. The Ultimate 'Who Borrowed What' Mnemonics Cheat Sheet",
    type: "mnemonics",
    content: `
      <p>To easily lock in questions 3, 4, 13, 14, 51, and 69, use these simple memory tricks. They map out the exact global sources of the Indian Constitution.</p>

      <div class="mnemonic-card">
        <div class="mnemonic-flag">🇬🇧</div>
        <h5>1. United Kingdom (UK)</h5>
        <div class="mnemonic-keyword">Mnemonic: "PRiBLeS"</div>
        <p>(Think of the UK ruling India with strict rules/pebbles).</p>
        <ul>
          <li><strong>P</strong> ➔ Parliamentary form of government.</li>
          <li><strong>R</strong> ➔ Rule of Law.</li>
          <li><strong>i</strong> ➔ Single Citizenship.</li>
          <li><strong>B</strong> ➔ Bicameralism (Two houses).</li>
          <li><strong>Le</strong> ➔ Legislative Procedure.</li>
          <li><strong>S</strong> ➔ Writs (Subrogative remedies / Prerogative writs).</li>
        </ul>
      </div>

      <div class="mnemonic-card">
        <div class="mnemonic-flag">🇺🇸</div>
        <h5>2. United States of America (USA)</h5>
        <div class="mnemonic-keyword">Mnemonic: "President's Judiciary acts with Independent Rights."</div>
        <p>(The USA focuses heavily on power, rights, and independent courts).</p>
        <ul>
          <li><strong>President</strong> ➔ Impeachment of the President & post of Vice-President.</li>
          <li><strong>Judiciary</strong> ➔ Judicial Review & removal of Supreme Court / High Court judges.</li>
          <li><strong>Independent</strong> ➔ Independence of the Judiciary.</li>
          <li><strong>Rights</strong> ➔ Fundamental Rights (Bill of Rights) & the Preamble structure.</li>
        </ul>
      </div>

      <div class="mnemonic-card">
        <div class="mnemonic-flag">🇮🇪</div>
        <h5>3. Ireland</h5>
        <div class="mnemonic-keyword">Mnemonic: "EleDS"</div>
        <p>(Pronounced like "Elites" — Ireland has elite ideas).</p>
        <ul>
          <li><strong>Ele</strong> ➔ Method of Election of the President.</li>
          <li><strong>D</strong> ➔ Directive Principles of State Policy (DPSP).</li>
          <li><strong>S</strong> ➔ Nomination of members to the Rajya Sabha.</li>
        </ul>
      </div>

      <div class="mnemonic-card">
        <div class="mnemonic-flag">🇨🇦</div>
        <h5>4. Canada</h5>
        <div class="mnemonic-keyword">Mnemonic: "Can-a-Fed"</div>
        <p>(Canada is a tight Federation).</p>
        <ul>
          <li><strong>Fed</strong> ➔ Federation with a strong Centre.</li>
          <li><strong>Res</strong> ➔ Vesting of Residuary powers in the Centre.</li>
          <li><strong>Gov</strong> ➔ Appointment of State Governors by the Centre.</li>
          <li><strong>Adv</strong> ➔ Advisory jurisdiction of the Supreme Court (Art 143).</li>
        </ul>
      </div>

      <div class="mnemonic-card">
        <div class="mnemonic-flag">🇦🇺</div>
        <h5>5. Australia</h5>
        <div class="mnemonic-keyword">Mnemonic: "Trade Jointly on the List"</div>
        <p>(Australia loves open trade and joint cooperation).</p>
        <ul>
          <li><strong>Trade</strong> ➔ Freedom of Trade, commerce, and intercourse.</li>
          <li><strong>Jointly</strong> ➔ Joint sitting of the two Houses of Parliament (Art 108).</li>
          <li><strong>List</strong> ➔ Concurrent List.</li>
        </ul>
      </div>

      <div class="mnemonic-card">
        <div class="mnemonic-flag">🇫🇷</div>
        <h5>6. France</h5>
        <div class="mnemonic-keyword">Mnemonic: "ELIF"</div>
        <p>(The French Revolution values).</p>
        <ul>
          <li><strong>E</strong> ➔ Equality.</li>
          <li><strong>L</strong> ➔ Liberty.</li>
          <li><strong>I</strong> ➔ Integrity / Fraternity.</li>
          <li><strong>F</strong> ➔ Republican structure (Flipped 'R').</li>
        </ul>
      </div>

      <div class="mnemonic-card">
        <div class="mnemonic-flag">🇷🇺</div>
        <h5>7. USSR (Now Russia)</h5>
        <div class="mnemonic-keyword">Mnemonic: "Duties bring Justice"</div>
        <p>(The Soviet socialist mindset).</p>
        <ul>
          <li><strong>Duties</strong> ➔ Fundamental Duties (Art 51A).</li>
          <li><strong>Justice</strong> ➔ Ideals of Justice (Social, Economic, and Political) in the Preamble.</li>
        </ul>
      </div>

      <div class="mnemonic-card">
        <div class="mnemonic-flag">🇩🇪</div>
        <h5>8. Germany (Weimar Constitution)</h5>
        <div class="mnemonic-keyword">Mnemonic: "Hitler suspended Rights"</div>
        <p>(Germany equaled emergency power).</p>
        <ul>
          <li>➔ Suspension of Fundamental Rights during an Emergency.</li>
        </ul>
      </div>

      <div class="mnemonic-card">
        <div class="mnemonic-flag">🇿🇦</div>
        <h5>9. South Africa</h5>
        <div class="mnemonic-keyword">Mnemonic: "Amend & Elect"</div>
        <p>(South Africa works to change things).</p>
        <ul>
          <li>➔ Procedure for Amendment of the Constitution (Art 368).</li>
          <li>➔ Election of members of the Rajya Sabha.</li>
        </ul>
      </div>

      <div class="mnemonic-card">
        <div class="mnemonic-flag">🇯🇵</div>
        <h5>10. Japan</h5>
        <div class="mnemonic-keyword">Mnemonic: "Law Established"</div>
        <ul>
          <li>➔ Concept of "Procedure Established by Law".</li>
        </ul>
      </div>
    `
  },

  // ======================================================================
  // SECTION 17: Micro-Revision Checklist
  // ======================================================================
  {
    id: "micro-revision",
    icon: "✅",
    title: "17. Micro-Revision Checklist for Your Notebook",
    type: "table",
    content: `
      <p>Before stepping into the exam room, test yourself on these 5 high-frequency numeric limits:</p>
      <table>
        <thead>
          <tr>
            <th>Constitutional Position / Action</th>
            <th>Minimum Age</th>
            <th>Maximum Limit / Tenure</th>
            <th>Article Number</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>President of India</td>
            <td>35 Years</td>
            <td>No limit on re-election</td>
            <td>Article 52 / 56</td>
          </tr>
          <tr>
            <td>Rajya Sabha Member</td>
            <td>30 Years</td>
            <td>6 Years Tenure</td>
            <td>Article 80 / 83</td>
          </tr>
          <tr>
            <td>Lok Sabha Member</td>
            <td>25 Years</td>
            <td>5 Years Tenure</td>
            <td>Article 81 / 83</td>
          </tr>
          <tr>
            <td>Panchayat Member</td>
            <td>21 Years</td>
            <td>5 Years Tenure</td>
            <td>Article 243F / 243E</td>
          </tr>
          <tr>
            <td>Supreme Court Judge</td>
            <td>No min. age</td>
            <td>Up to 65 Years of age</td>
            <td>Article 124</td>
          </tr>
        </tbody>
      </table>
    `
  },
  // ======================================================================
  // SECTION 18: Parts Cheat Sheet & Age-Tenure-Resignation Matrix
  // ======================================================================
  {
    id: "parts-age-matrix",
    icon: "📋",
    title: "18. Parts Cheat Sheet & Age-Tenure-Resignation Matrix",
    type: "table",
    content: `
      <h4>Parts Cheat Sheet</h4>
      <p>SSC frequently asks direct questions about which Part an article belongs to. Memorise this sequence to easily use the process of elimination:</p>
      <ul>
        <li><strong>Part V (Articles 52–151):</strong> The Union (President, PM, Parliament, CAG, Supreme Court).</li>
        <li><strong>Part VI (Articles 152–237):</strong> The States (Governor, CM, State Legislature, High Courts).</li>
        <li><strong>Part IX, IX-A, IX-B:</strong> Panchayats (243–243O), Municipalities (243P–243ZG), Co-operatives (243ZH–243ZT).</li>
        <li><strong>Part XIV:</strong> Services under Union & States (UPSC/SPSC - Articles 308–323).</li>
        <li><strong>Part XV:</strong> Elections (Articles 324–329A).</li>
        <li><strong>Part XX:</strong> Amendment of the Constitution (Article 368).</li>
      </ul>

      <h4>Age, Tenure, and Resignation Matrix</h4>
      <p>This is the most common area for negative marking. Scan this matrix to lock in these figures:</p>
      <table>
        <thead>
          <tr>
            <th>Constitutional Position</th>
            <th>Minimum Age</th>
            <th>Retirement Age / Tenure</th>
            <th>Resigns To</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>President / Vice-President</strong></td>
            <td>35 years</td>
            <td>5 years</td>
            <td>Vice-President / President</td>
          </tr>
          <tr>
            <td><strong>Governor</strong></td>
            <td>35 years</td>
            <td>Pleasure of President</td>
            <td>President</td>
          </tr>
          <tr>
            <td><strong>Lok Sabha MP / CM / PM</strong></td>
            <td>25 years</td>
            <td>5 years</td>
            <td>Speaker / Governor / President</td>
          </tr>
          <tr>
            <td><strong>Rajya Sabha MP</strong></td>
            <td>30 years</td>
            <td>6 years (1/3 retire every 2 yrs)</td>
            <td>Chairman (Vice-President)</td>
          </tr>
          <tr>
            <td><strong>Supreme Court Judge / CAG</strong></td>
            <td>No min. age</td>
            <td>65 years (CAG: 6 yrs or 65 age)</td>
            <td>President</td>
          </tr>
          <tr>
            <td><strong>High Court Judge</strong></td>
            <td>No min. age</td>
            <td>62 years</td>
            <td>President</td>
          </tr>
        </tbody>
      </table>
    `
  },
  // ======================================================================
  // SECTION 19: Bodies Classification & Parliamentary Traps
  // ======================================================================
  {
    id: "bodies-parliamentary-traps",
    icon: "⚔️",
    title: "19. Bodies Classification & Parliamentary Traps",
    type: "highlight",
    content: `
      <h4>Constitutional vs. Non-Constitutional Bodies</h4>
      <p>SSC loves to ask: <em>"Which of the following is NOT a constitutional body?"</em></p>
      <ul>
        <li><strong>Constitutional (Mentioned in Articles):</strong> Election Commission (324), UPSC/SPSC (315), Finance Commission (280), CAG (148), National Commission for SCs (338), STs (338A), and BCs (338B), Attorney General (76), Advocate General (165).</li>
        <li><strong>Non-Constitutional / Statutory / Executive (Created by Acts/Orders):</strong> NITI Aayog (Executive Resolution), National Human Rights Commission (NHRC), Central Information Commission (CIC), Central Vigilance Commission (CVC), CBI, Lokpal.</li>
      </ul>

      <h4>Parliamentary "Trap" Data</h4>
      <ul>
        <li><strong>Quorum:</strong> 1/10th of the total membership of the House is required to transact business (including the Speaker/Chairman).</li>
        <li><strong>Joint Sitting (Article 108):</strong> Summoned by the President, but always presided over by the Speaker of Lok Sabha (if absent, the Deputy Speaker; if absent, the Deputy Chairman of Rajya Sabha. <strong>Note:</strong> The Vice-President never presides over a joint sitting).</li>
        <li><strong>Money Bill (Article 110):</strong> Can only be introduced in Lok Sabha with the President's prior recommendation. The Speaker has the final authority to decide if a bill is a Money Bill. Rajya Sabha can only delay it for 14 days.</li>
      </ul>

      <h4>Quick Sources of the Constitution Add-ons</h4>
      <p>Beyond the basic ones, add these frequently tested sources:</p>
      <ul>
        <li><strong>Australia:</strong> Concurrent List, Freedom of trade, Joint sitting of Parliament.</li>
        <li><strong>Germany (Weimar):</strong> Suspension of Fundamental Rights during Emergency.</li>
        <li><strong>Canada:</strong> Federation with a strong Centre, Vesting of residuary powers in the Centre, Appointment of state governors by the Centre.</li>
        <li><strong>France:</strong> Republic, ideals of Liberty, Equality, and Fraternity in the Preamble.</li>
      </ul>
    `
  },
  // ======================================================================
  // SECTION 20: Parliament (Extra Points): Bills, Majorities & Terms
  // ======================================================================
  {
    id: "parliament-extra-points",
    icon: "⚖️",
    title: "20. Parliament (Extra Points): Bills, Majorities & Terms",
    type: "notes",
    content: `
      <h4>Types of Bills</h4>
      <ul>
        <li><strong>Ordinary Bill:</strong> Can be introduced in either House. Simple majority. Joint Sitting possible.</li>
        <li><strong>Money Bill (Article 110):</strong> Only in Lok Sabha. Prior recommendation of President. Speaker decides whether it is a Money Bill. Rajya Sabha can delay only 14 days. No Joint Sitting.</li>
        <li><strong>Financial Bill:</strong> Deals with financial matters but not purely a Money Bill. President's recommendation required in some cases.</li>
        <li><strong>Private Member Bill:</strong> Introduced by an MP who is not a Minister.</li>
      </ul>

      <h4>Types of Majority</h4>
      <ul>
        <li><strong>Simple Majority:</strong> More than 50% of members present and voting.</li>
        <li><strong>Absolute Majority:</strong> More than 50% of total membership.</li>
        <li><strong>Effective Majority:</strong> More than 50% of effective strength.</li>
        <li><strong>Special Majority:</strong> Required for Constitutional Amendments.</li>
      </ul>

      <h4>Parliamentary Terms</h4>
      <ul>
        <li><strong>Adjournment:</strong> Ends a sitting for a short time.</li>
        <li><strong>Adjournment Sine Die:</strong> Ends the session without a fixed date.</li>
        <li><strong>Prorogation:</strong> Ends the session (President).</li>
        <li><strong>Dissolution:</strong> Ends Lok Sabha completely.</li>
      </ul>
    `
  },
  // ======================================================================
  // SECTION 21: Important Amendments & Extra Bodies
  // ======================================================================
  {
    id: "amendments-extra-bodies",
    icon: "⚙️",
    title: "21. Important Amendments & Extra Bodies",
    type: "notes",
    content: `
      <h4>Important Constitutional Amendments</h4>
      <ul>
        <li><strong>42nd (1976):</strong> Mini Constitution, Fundamental Duties, Socialist, Secular, Integrity.</li>
        <li><strong>44th (1978):</strong> Right to Property became Legal Right.</li>
        <li><strong>52nd (1985):</strong> Anti-Defection Law.</li>
        <li><strong>61st (1989):</strong> Voting age 21 ➔ 18.</li>
        <li><strong>73rd (1992):</strong> Panchayats.</li>
        <li><strong>74th (1992):</strong> Municipalities.</li>
        <li><strong>86th (2002):</strong> Right to Education (Article 21A).</li>
        <li><strong>97th (2011):</strong> Cooperative Societies.</li>
        <li><strong>101st (2016):</strong> GST.</li>
        <li><strong>103rd (2019):</strong> 10% EWS Reservation.</li>
        <li><strong>104th (2020):</strong> Ended Anglo-Indian reservation in Lok Sabha/Assemblies.</li>
      </ul>

      <h4>Other Important Bodies</h4>
      <ul>
        <li><strong>GST Council:</strong> Article 279A (Chairman ➔ Union Finance Minister).</li>
        <li><strong>Inter-State Council:</strong> Article 263.</li>
        <li><strong>National Commission for Women:</strong> Statutory Body.</li>
        <li><strong>National Commission for Minorities:</strong> Statutory Body.</li>
      </ul>
    `
  },
  // ======================================================================
  // SECTION 22: High-Yield Articles Cheat Sheet
  // ======================================================================
  {
    id: "high-yield-articles-cheat",
    icon: "⭐",
    title: "22. High-Yield Articles (Must Memorize)",
    type: "highlight",
    content: `
      <p>Ensure you have absolute mastery of these direct high-frequency articles:</p>
      <table>
        <thead>
          <tr>
            <th>Article</th>
            <th>Subject Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><strong>Article 14</strong></td><td>Equality before law</td></tr>
          <tr><td><strong>Article 17</strong></td><td>Abolition of Untouchability</td></tr>
          <tr><td><strong>Article 19</strong></td><td>Six Freedoms (Speech, Assembly, Association, Movement, Residence, Profession)</td></tr>
          <tr><td><strong>Article 21</strong></td><td>Right to Life</td></tr>
          <tr><td><strong>Article 21A</strong></td><td>Right to Education</td></tr>
          <tr><td><strong>Article 24</strong></td><td>Child Labour Prohibited</td></tr>
          <tr><td><strong>Article 25</strong></td><td>Freedom of Religion</td></tr>
          <tr><td><strong>Article 30</strong></td><td>Minority Educational Rights</td></tr>
          <tr><td><strong>Article 32</strong></td><td>Constitutional Remedies (Writs)</td></tr>
          <tr><td><strong>Article 39A</strong></td><td>Free Legal Aid</td></tr>
          <tr><td><strong>Article 44</strong></td><td>Uniform Civil Code</td></tr>
          <tr><td><strong>Article 50</strong></td><td>Separation of Judiciary & Executive</td></tr>
          <tr><td><strong>Article 51A</strong></td><td>Fundamental Duties</td></tr>
          <tr><td><strong>Article 61</strong></td><td>Impeachment of President</td></tr>
          <tr><td><strong>Article 72</strong></td><td>President's Pardoning Power</td></tr>
          <tr><td><strong>Article 76</strong></td><td>Attorney General of India</td></tr>
          <tr><td><strong>Article 110</strong></td><td>Money Bill</td></tr>
          <tr><td><strong>Article 112</strong></td><td>Budget (Annual Financial Statement)</td></tr>
          <tr><td><strong>Article 123</strong></td><td>President's Ordinance Power</td></tr>
          <tr><td><strong>Article 143</strong></td><td>Advisory Jurisdiction of Supreme Court</td></tr>
          <tr><td><strong>Article 148</strong></td><td>Comptroller and Auditor General (CAG)</td></tr>
          <tr><td><strong>Article 163</strong></td><td>Governor's Council of Ministers</td></tr>
          <tr><td><strong>Article 165</strong></td><td>Advocate General of the State</td></tr>
          <tr><td><strong>Article 280</strong></td><td>Finance Commission</td></tr>
          <tr><td><strong>Article 312</strong></td><td>All India Services</td></tr>
          <tr><td><strong>Article 324</strong></td><td>Election Commission</td></tr>
          <tr><td><strong>Article 326</strong></td><td>Adult Suffrage (Right to vote at 18)</td></tr>
        </tbody>
      </table>
    `
  }
];

// ======================================================================
// PYQ QUIZ DATA: 70 MCQs with Answer Key
// ======================================================================
export const POLITY_PYQ_DATA = [
  // Section A: Constitutional Framework, Sources & Preamble (Q1-12)
  {
    id: 1,
    section: "A",
    sectionTitle: "Constitutional Framework, Sources & Preamble",
    question: "Which British Act introduced the system of \"Dyarchy\" (dual rule) at the provincial level?",
    options: [
      "(A) Regulating Act, 1773",
      "(B) Indian Councils Act, 1909",
      "(C) Government of India Act, 1919",
      "(D) Government of India Act, 1935"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 2,
    section: "A",
    sectionTitle: "Constitutional Framework, Sources & Preamble",
    question: "Which historical act became the primary blueprint, contributing nearly 60-70% of the structural provisions of the Indian Constitution?",
    options: [
      "(A) Government of India Act, 1858",
      "(B) Indian Councils Act, 1892",
      "(C) Government of India Act, 1919",
      "(D) Government of India Act, 1935"
    ],
    answer: 3,
    answerLabel: "(D)"
  },
  {
    id: 3,
    section: "A",
    sectionTitle: "Constitutional Framework, Sources & Preamble",
    question: "The idealistic trio of \"Liberty, Equality, and Fraternity\" mentioned in our Preamble was borrowed from the revolution of which country?",
    options: [
      "(A) America",
      "(B) France",
      "(C) Russia",
      "(D) Ireland"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 4,
    section: "A",
    sectionTitle: "Constitutional Framework, Sources & Preamble",
    question: "The concept of \"Procedure Established by Law\" was borrowed from which country's constitution?",
    options: [
      "(A) USA",
      "(B) UK",
      "(C) Japan",
      "(D) Germany"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 5,
    section: "A",
    sectionTitle: "Constitutional Framework, Sources & Preamble",
    question: "By which specific Constitutional Amendment Act were the words \"Socialist\", \"Secular\", and \"Integrity\" added to the Preamble?",
    options: [
      "(A) 24th Amendment Act",
      "(B) 42nd Amendment Act",
      "(C) 44th Amendment Act",
      "(D) 86th Amendment Act"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 6,
    section: "A",
    sectionTitle: "Constitutional Framework, Sources & Preamble",
    question: "How many times has the Preamble of the Indian Constitution been amended so far?",
    options: [
      "(A) Once",
      "(B) Twice",
      "(C) Thrice",
      "(D) Never"
    ],
    answer: 0,
    answerLabel: "(A)"
  },
  {
    id: 7,
    section: "A",
    sectionTitle: "Constitutional Framework, Sources & Preamble",
    question: "In which landmark case did the Supreme Court explicitly rule that the Preamble is an integral part of the Constitution and its basic structure cannot be amended?",
    options: [
      "(A) Berubari Union Case (1960)",
      "(B) Golaknath Case (1967)",
      "(C) Kesavananda Bharati Case (1973)",
      "(D) Minerva Mills Case (1980)"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 8,
    section: "A",
    sectionTitle: "Constitutional Framework, Sources & Preamble",
    question: "Which schedule of the Constitution deals with the allocation of seats in the Rajya Sabha to the States and Union Territories?",
    options: [
      "(A) 3rd Schedule",
      "(B) 4th Schedule",
      "(C) 5th Schedule",
      "(D) 6th Schedule"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 9,
    section: "A",
    sectionTitle: "Constitutional Framework, Sources & Preamble",
    question: "The provisions relating to the disqualification of members on the ground of defection (Anti-Defection Law) are explicitly stated in which schedule?",
    options: [
      "(A) 8th Schedule",
      "(B) 9th Schedule",
      "(C) 10th Schedule",
      "(D) 11th Schedule"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 10,
    section: "A",
    sectionTitle: "Constitutional Framework, Sources & Preamble",
    question: "How many functional items are placed within the purview of the Panchayats under the 11th Schedule?",
    options: [
      "(A) 18",
      "(B) 22",
      "(C) 28",
      "(D) 29"
    ],
    answer: 3,
    answerLabel: "(D)"
  },
  {
    id: 11,
    section: "A",
    sectionTitle: "Constitutional Framework, Sources & Preamble",
    question: "Which schedule contains the 22 languages officially recognized by the Indian Constitution?",
    options: [
      "(A) 7th Schedule",
      "(B) 8th Schedule",
      "(C) 9th Schedule",
      "(D) 10th Schedule"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 12,
    section: "A",
    sectionTitle: "Constitutional Framework, Sources & Preamble",
    question: "By which constitutional amendment was the 9th Schedule added to protect land reform laws from judicial review?",
    options: [
      "(A) 1st Amendment Act, 1951",
      "(B) 7th Amendment Act, 1956",
      "(C) 24th Amendment Act, 1971",
      "(D) 44th Amendment Act, 1978"
    ],
    answer: 0,
    answerLabel: "(A)"
  },

  // Section B: Fundamental Rights, Duties & DPSPs (Q13-24)
  {
    id: 13,
    section: "B",
    sectionTitle: "Fundamental Rights, Duties & DPSPs",
    question: "Which Fundamental Right was termed by Dr. B.R. Ambedkar as the \"Heart and Soul of the Constitution\"?",
    options: [
      "(A) Right to Equality (Art 14)",
      "(B) Right to Freedom (Art 19)",
      "(C) Right to Life and Liberty (Art 21)",
      "(D) Right to Constitutional Remedies (Art 32)"
    ],
    answer: 3,
    answerLabel: "(D)"
  },
  {
    id: 14,
    section: "B",
    sectionTitle: "Fundamental Rights, Duties & DPSPs",
    question: "Which two articles of the Fundamental Rights cannot be suspended under any circumstances, even during a National Emergency under Article 352?",
    options: [
      "(A) Articles 14 and 19",
      "(B) Articles 19 and 20",
      "(C) Articles 20 and 21",
      "(D) Articles 21 and 22"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 15,
    section: "B",
    sectionTitle: "Fundamental Rights, Duties & DPSPs",
    question: "Right to Property was deleted from the list of Fundamental Rights by which amendment and under which article is it currently placed as a legal right?",
    options: [
      "(A) 42nd Amendment, Article 31",
      "(B) 44th Amendment, Article 300A",
      "(C) 42nd Amendment, Article 300A",
      "(D) 44th Amendment, Article 31"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 16,
    section: "B",
    sectionTitle: "Fundamental Rights, Duties & DPSPs",
    question: "Which article of the Constitution provides for the \"Abolition of Untouchability\" and strictly forbids its practice in any form?",
    options: [
      "(A) Article 15",
      "(B) Article 16",
      "(C) Article 17",
      "(D) Article 18"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 17,
    section: "B",
    sectionTitle: "Fundamental Rights, Duties & DPSPs",
    question: "The writ issued by a higher court to a lower court or public authority to perform a duty that it has legally failed to perform is called what?",
    options: [
      "(A) Habeas Corpus",
      "(B) Mandamus",
      "(C) Certiorari",
      "(D) Quo-Warranto"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 18,
    section: "B",
    sectionTitle: "Fundamental Rights, Duties & DPSPs",
    question: "Which writ translates literally to \"By what authority or warrant?\" and checks the legality of a person's claim to a public office?",
    options: [
      "(A) Prohibition",
      "(B) Certiorari",
      "(C) Mandamus",
      "(D) Quo-Warranto"
    ],
    answer: 3,
    answerLabel: "(D)"
  },
  {
    id: 19,
    section: "B",
    sectionTitle: "Fundamental Rights, Duties & DPSPs",
    question: "Which article under the Directive Principles of State Policy (DPSP) directs the State to organize village panchayats as units of self-government?",
    options: [
      "(A) Article 39",
      "(B) Article 40",
      "(C) Article 44",
      "(D) Article 48"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 20,
    section: "B",
    sectionTitle: "Fundamental Rights, Duties & DPSPs",
    question: "The provision for a \"Uniform Civil Code\" for all citizens throughout the territory of India is contained under which article?",
    options: [
      "(A) Article 40",
      "(B) Article 44",
      "(C) Article 45",
      "(D) Article 50"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 21,
    section: "B",
    sectionTitle: "Fundamental Rights, Duties & DPSPs",
    question: "Which article mandates the separation of the Judiciary from the Executive in the public services of the State?",
    options: [
      "(A) Article 48",
      "(B) Article 49",
      "(C) Article 50",
      "(D) Article 51"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 22,
    section: "B",
    sectionTitle: "Fundamental Rights, Duties & DPSPs",
    question: "On the recommendation of which committee were the Fundamental Duties incorporated into the Indian Constitution?",
    options: [
      "(A) Sarkaria Commission",
      "(B) Balwant Rai Mehta Committee",
      "(C) Swaran Singh Committee",
      "(D) Kothari Commission"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 23,
    section: "B",
    sectionTitle: "Fundamental Rights, Duties & DPSPs",
    question: "How many Fundamental Duties were originally added to the Constitution in 1976, and how many exist today?",
    options: [
      "(A) 10 originally, 10 today",
      "(B) 9 originally, 11 today",
      "(C) 10 originally, 11 today",
      "(D) 11 originally, 11 today"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 24,
    section: "B",
    sectionTitle: "Fundamental Rights, Duties & DPSPs",
    question: "Which constitutional amendment added the 11th Fundamental Duty, making it the duty of a parent or guardian to provide education opportunities to their child aged 6–14 years?",
    options: [
      "(A) 42nd Amendment Act",
      "(B) 44th Amendment Act",
      "(C) 86th Amendment Act",
      "(D) 91st Amendment Act"
    ],
    answer: 2,
    answerLabel: "(C)"
  },

  // Section C: Union Executive & Parliament (Q25-40)
  {
    id: 25,
    section: "C",
    sectionTitle: "Union Executive & Parliament",
    question: "Who administers the oath of office to the President of India?",
    options: [
      "(A) Vice-President of India",
      "(B) Prime Minister of India",
      "(C) Speaker of Lok Sabha",
      "(D) Chief Justice of India"
    ],
    answer: 3,
    answerLabel: "(D)"
  },
  {
    id: 26,
    section: "C",
    sectionTitle: "Union Executive & Parliament",
    question: "If both the President and Vice-President offices fall vacant simultaneously, who acts as the President of India?",
    options: [
      "(A) Prime Minister of India",
      "(B) Chief Justice of India",
      "(C) Senior-most Lok Sabha Member",
      "(D) Union Home Minister"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 27,
    section: "C",
    sectionTitle: "Union Executive & Parliament",
    question: "What is the minimum age required to contest elections for the office of the President of India?",
    options: [
      "(A) 25 years",
      "(B) 30 years",
      "(C) 35 years",
      "(D) 40 years"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 28,
    section: "C",
    sectionTitle: "Union Executive & Parliament",
    question: "A resolution for the impeachment of the President must be initiated in which House of Parliament, and how many days of prior notice must be given?",
    options: [
      "(A) Only Lok Sabha, 14 days",
      "(B) Only Rajya Sabha, 30 days",
      "(C) Either House of Parliament, 14 days",
      "(D) Either House of Parliament, 30 days"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 29,
    section: "C",
    sectionTitle: "Union Executive & Parliament",
    question: "Who is the ex-officio Chairman of the Rajya Sabha?",
    options: [
      "(A) President of India",
      "(B) Vice-President of India",
      "(C) Prime Minister of India",
      "(D) Speaker of Lok Sabha"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 30,
    section: "C",
    sectionTitle: "Union Executive & Parliament",
    question: "Who presides over a joint sitting of the two Houses of Parliament when a deadlock occurs over an ordinary bill?",
    options: [
      "(A) President of India",
      "(B) Vice-President of India",
      "(C) Prime Minister of India",
      "(D) Speaker of Lok Sabha"
    ],
    answer: 3,
    answerLabel: "(D)"
  },
  {
    id: 31,
    section: "C",
    sectionTitle: "Union Executive & Parliament",
    question: "Under which article does the President have the sole power to summon a joint sitting of both Houses?",
    options: [
      "(A) Article 100",
      "(B) Article 108",
      "(C) Article 110",
      "(D) Article 112"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 32,
    section: "C",
    sectionTitle: "Union Executive & Parliament",
    question: "What is the minimum statutory \"Quorum\" required to transact business in either House of Parliament?",
    options: [
      "(A) 1/5th of total members",
      "(B) 1/10th of total members",
      "(C) 1/12th of total members",
      "(D) 1/20th of total members"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 33,
    section: "C",
    sectionTitle: "Union Executive & Parliament",
    question: "Who has the final authority to decide whether a particular bill is a \"Money Bill\" or not?",
    options: [
      "(A) President of India",
      "(B) Finance Minister",
      "(C) Speaker of Lok Sabha",
      "(D) Chairman of Rajya Sabha"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 34,
    section: "C",
    sectionTitle: "Union Executive & Parliament",
    question: "A Money Bill can be introduced only in the Lok Sabha and requires the prior recommendation of which authority?",
    options: [
      "(A) Prime Minister",
      "(B) Union Finance Minister",
      "(C) Speaker of Lok Sabha",
      "(D) President of India"
    ],
    answer: 3,
    answerLabel: "(D)"
  },
  {
    id: 35,
    section: "C",
    sectionTitle: "Union Executive & Parliament",
    question: "What is the maximum period for which the Rajya Sabha can delay or detain a Money Bill passed by the Lok Sabha?",
    options: [
      "(A) 14 days",
      "(B) 30 days",
      "(C) 3 months",
      "(D) 6 months"
    ],
    answer: 0,
    answerLabel: "(A)"
  },
  {
    id: 36,
    section: "C",
    sectionTitle: "Union Executive & Parliament",
    question: "What is the maximum valid lifespan of an Ordinance promulgated by the President once the Parliament reassembles?",
    options: [
      "(A) 2 weeks",
      "(B) 6 weeks",
      "(C) 6 months",
      "(D) 6 months and 6 weeks"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 37,
    section: "C",
    sectionTitle: "Union Executive & Parliament",
    question: "What is the maximum permissible time gap between two consecutive sessions of the Indian Parliament?",
    options: [
      "(A) 3 months",
      "(B) 4 months",
      "(C) 6 months",
      "(D) 9 months"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 38,
    section: "C",
    sectionTitle: "Union Executive & Parliament",
    question: "Which parliamentary hour is an Indian innovation, not mentioned in the formal rules of procedure, starting immediately after the Question Hour?",
    options: [
      "(A) Zero Hour",
      "(B) Half-an-Hour discussion",
      "(C) Adjournment Hour",
      "(D) Starred Hour"
    ],
    answer: 0,
    answerLabel: "(A)"
  },
  {
    id: 39,
    section: "C",
    sectionTitle: "Union Executive & Parliament",
    question: "What type of parliamentary question requires an oral answer, thereby allowing supplementary questions to be asked on the spot?",
    options: [
      "(A) Unstarred Question",
      "(B) Starred Question",
      "(C) Short Notice Question",
      "(D) Private Member Question"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 40,
    section: "C",
    sectionTitle: "Union Executive & Parliament",
    question: "The \"Vote on Account\" is passed by the Lok Sabha to meet expenditure for what specific duration in a standard financial year?",
    options: [
      "(A) 1 month",
      "(B) 2 months",
      "(C) 3 months",
      "(D) 6 months"
    ],
    answer: 1,
    answerLabel: "(B)"
  },

  // Section D: State Executive, Local Bodies & Judiciary (Q41-52)
  {
    id: 41,
    section: "D",
    sectionTitle: "State Executive, Local Bodies & Judiciary",
    question: "Who appoints the members of the State Public Service Commission (SPSC), and who alone holds the authority to remove them?",
    options: [
      "(A) Appointed by Governor, Removed by Governor",
      "(B) Appointed by Governor, Removed by President",
      "(C) Appointed by President, Removed by President",
      "(D) Appointed by President, Removed by Governor"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 42,
    section: "D",
    sectionTitle: "State Executive, Local Bodies & Judiciary",
    question: "Under which article is the Governor of a State empowered to promulgate ordinances during the recess of the state legislature?",
    options: [
      "(A) Article 123",
      "(B) Article 213",
      "(C) Article 226",
      "(D) Article 356"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 43,
    section: "D",
    sectionTitle: "State Executive, Local Bodies & Judiciary",
    question: "How many states in India currently possess a bicameral legislature (having both Vidhan Sabha and Vidhan Parishad)?",
    options: [
      "(A) 5 states",
      "(B) 6 states",
      "(C) 7 states",
      "(D) 8 states"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 44,
    section: "D",
    sectionTitle: "State Executive, Local Bodies & Judiciary",
    question: "What is the minimum age required to become a member of the State Legislative Council (Vidhan Parishad)?",
    options: [
      "(A) 21 years",
      "(B) 25 years",
      "(C) 30 years",
      "(D) 35 years"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 45,
    section: "D",
    sectionTitle: "State Executive, Local Bodies & Judiciary",
    question: "The maximum strength of a state's Legislative Council cannot exceed what fraction of the total strength of that state's Legislative Assembly?",
    options: [
      "(A) 1/2",
      "(B) 1/3",
      "(C) 1/4",
      "(D) 1/5"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 46,
    section: "D",
    sectionTitle: "State Executive, Local Bodies & Judiciary",
    question: "Which committee recommended a three-tier Panchayati Raj system for India for the very first time?",
    options: [
      "(A) Ashok Mehta Committee",
      "(B) L.M. Singhvi Committee",
      "(C) Balwant Rai Mehta Committee",
      "(D) G.V.K. Rao Committee"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 47,
    section: "D",
    sectionTitle: "State Executive, Local Bodies & Judiciary",
    question: "Which district in India became the first to officially inaugurate the Panchayati Raj system on 2nd October 1959?",
    options: [
      "(A) Nagaur (Rajasthan)",
      "(B) Satara (Maharashtra)",
      "(C) Guntur (Andhra Pradesh)",
      "(D) Salem (Tamil Nadu)"
    ],
    answer: 0,
    answerLabel: "(A)"
  },
  {
    id: 48,
    section: "D",
    sectionTitle: "State Executive, Local Bodies & Judiciary",
    question: "What is the minimum age prescribed by the Constitution to contest an election for a local Panchayat body?",
    options: [
      "(A) 18 years",
      "(B) 21 years",
      "(C) 25 years",
      "(D) 30 years"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 49,
    section: "D",
    sectionTitle: "State Executive, Local Bodies & Judiciary",
    question: "What percentage of total seats must be strictly reserved for women at all levels of Panchayati Raj Institutions?",
    options: [
      "(A) 25%",
      "(B) 33%",
      "(C) 50%",
      "(D) 66%"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 50,
    section: "D",
    sectionTitle: "State Executive, Local Bodies & Judiciary",
    question: "What is the current retirement age of a Judge of a High Court and a Judge of the Supreme Court of India respectively?",
    options: [
      "(A) 60 years and 65 years",
      "(B) 62 years and 65 years",
      "(C) 65 years and 65 years",
      "(D) 62 years and 70 years"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 51,
    section: "D",
    sectionTitle: "State Executive, Local Bodies & Judiciary",
    question: "The power of the Supreme Court to decide disputes between the Centre and the States falls under which specific jurisdiction?",
    options: [
      "(A) Advisory Jurisdiction",
      "(B) Appellate Jurisdiction",
      "(C) Original Jurisdiction",
      "(D) Writ Jurisdiction"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 52,
    section: "D",
    sectionTitle: "State Executive, Local Bodies & Judiciary",
    question: "Which article empowers the President to seek the advisory opinion of the Supreme Court on any question of public law or fact?",
    options: [
      "(A) Article 131",
      "(B) Article 137",
      "(C) Article 143",
      "(D) Article 148"
    ],
    answer: 2,
    answerLabel: "(C)"
  },

  // Section E: Constitutional, Non-Constitutional Bodies & Provisions (Q53-70)
  {
    id: 53,
    section: "E",
    sectionTitle: "Constitutional, Non-Constitutional Bodies & Provisions",
    question: "Which article provides for the appointment of the Attorney General of India, who is the highest law officer of the country?",
    options: [
      "(A) Article 72",
      "(B) Article 76",
      "(C) Article 148",
      "(D) Article 165"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 54,
    section: "E",
    sectionTitle: "Constitutional, Non-Constitutional Bodies & Provisions",
    question: "Who has the right to speak and take part in the proceedings of either House of Parliament without the right to vote?",
    options: [
      "(A) Chief Justice of India",
      "(B) Comptroller and Auditor General",
      "(C) Solicitor General of India",
      "(D) Attorney General of India"
    ],
    answer: 3,
    answerLabel: "(D)"
  },
  {
    id: 55,
    section: "E",
    sectionTitle: "Constitutional, Non-Constitutional Bodies & Provisions",
    question: "Under which article is the Comptroller and Auditor General (CAG) of India appointed, and what is their official tenure?",
    options: [
      "(A) Article 148, 5 years or 62 age",
      "(B) Article 148, 6 years or 65 age",
      "(C) Article 280, 5 years or 65 age",
      "(D) Article 315, 6 years or 65 age"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 56,
    section: "E",
    sectionTitle: "Constitutional, Non-Constitutional Bodies & Provisions",
    question: "Who is famously designated as the \"Guardian of the Public Purse\" in India?",
    options: [
      "(A) Finance Minister",
      "(B) Prime Minister",
      "(C) Comptroller and Auditor General (CAG)",
      "(D) Governor of RBI"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 57,
    section: "E",
    sectionTitle: "Constitutional, Non-Constitutional Bodies & Provisions",
    question: "Which article deals with the establishment and composition of the Finance Commission by the President?",
    options: [
      "(A) Article 250",
      "(B) Article 280",
      "(C) Article 315",
      "(D) Article 324"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 58,
    section: "E",
    sectionTitle: "Constitutional, Non-Constitutional Bodies & Provisions",
    question: "The Union Public Service Commission (UPSC) submits its annual performance report to which authority?",
    options: [
      "(A) Prime Minister",
      "(B) Parliament",
      "(C) President of India",
      "(D) Union Home Minister"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 59,
    section: "E",
    sectionTitle: "Constitutional, Non-Constitutional Bodies & Provisions",
    question: "Which of the following is NOT a Constitutional Body?",
    options: [
      "(A) Election Commission",
      "(B) NITI Aayog",
      "(C) Finance Commission",
      "(D) GST Council"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 60,
    section: "E",
    sectionTitle: "Constitutional, Non-Constitutional Bodies & Provisions",
    question: "Which article deals with the power of the Parliament to amend the Constitution and its procedures?",
    options: [
      "(A) Article 352",
      "(B) Article 356",
      "(C) Article 360",
      "(D) Article 368"
    ],
    answer: 3,
    answerLabel: "(D)"
  },
  {
    id: 61,
    section: "E",
    sectionTitle: "Constitutional, Non-Constitutional Bodies & Provisions",
    question: "Which structural parts of the Constitution can be amended by a simple majority of Parliament rather than a special majority?",
    options: [
      "(A) Fundamental Rights",
      "(B) Directive Principles of State Policy",
      "(C) Creation or reorganization of new states",
      "(D) Election of the President and its manner"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 62,
    section: "E",
    sectionTitle: "Constitutional, Non-Constitutional Bodies & Provisions",
    question: "Under which article can a National Emergency be declared by the President on the grounds of war, external aggression, or armed rebellion?",
    options: [
      "(A) Article 352",
      "(B) Article 356",
      "(C) Article 360",
      "(D) Article 365"
    ],
    answer: 0,
    answerLabel: "(A)"
  },
  {
    id: 63,
    section: "E",
    sectionTitle: "Constitutional, Non-Constitutional Bodies & Provisions",
    question: "The words \"Internal Disturbance\" were replaced by the words \"Armed Rebellion\" under Article 352 by which constitutional amendment?",
    options: [
      "(A) 42nd Amendment Act, 1976",
      "(B) 44th Amendment Act, 1978",
      "(C) 61st Amendment Act, 1989",
      "(D) 73rd Amendment Act, 1992"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 64,
    section: "E",
    sectionTitle: "Constitutional, Non-Constitutional Bodies & Provisions",
    question: "State Emergency or President's Rule is imposed in a state under which article when constitutional machinery fails?",
    options: [
      "(A) Article 352",
      "(B) Article 356",
      "(C) Article 360",
      "(D) Article 343"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 65,
    section: "E",
    sectionTitle: "Constitutional, Non-Constitutional Bodies & Provisions",
    question: "Which article deals with Financial Emergency, and how many times has it been declared in India so far?",
    options: [
      "(A) Article 356, Once",
      "(B) Article 360, Thrice",
      "(C) Article 360, Never",
      "(D) Article 352, Twice"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 66,
    section: "E",
    sectionTitle: "Constitutional, Non-Constitutional Bodies & Provisions",
    question: "Which article states that the official language of the Union shall be Hindi in the Devanagari script?",
    options: [
      "(A) Article 343",
      "(B) Article 345",
      "(C) Article 348",
      "(D) Article 351"
    ],
    answer: 0,
    answerLabel: "(A)"
  },
  {
    id: 67,
    section: "E",
    sectionTitle: "Constitutional, Non-Constitutional Bodies & Provisions",
    question: "Which constitutional amendment granted constitutional status to cooperative societies by inserting Part IXB?",
    options: [
      "(A) 86th Amendment Act",
      "(B) 91st Amendment Act",
      "(C) 97th Amendment Act",
      "(D) 103rd Amendment Act"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 68,
    section: "E",
    sectionTitle: "Constitutional, Non-Constitutional Bodies & Provisions",
    question: "By which simple legislative mechanism can the Parliament alter the boundaries, rename, or create a new State under Part I?",
    options: [
      "(A) Special majority",
      "(B) Simple majority",
      "(C) Special majority with ratification of half of the states",
      "(D) Executive notification without voting"
    ],
    answer: 1,
    answerLabel: "(B)"
  },
  {
    id: 69,
    section: "E",
    sectionTitle: "Constitutional, Non-Constitutional Bodies & Provisions",
    question: "Single Citizenship in the Indian Constitution is a feature directly adapted from the political framework of which country?",
    options: [
      "(A) USA",
      "(B) Canada",
      "(C) United Kingdom (UK)",
      "(D) Australia"
    ],
    answer: 2,
    answerLabel: "(C)"
  },
  {
    id: 70,
    section: "E",
    sectionTitle: "Constitutional, Non-Constitutional Bodies & Provisions",
    question: "Which article states that any law inconsistent with or in derogation of the Fundamental Rights shall be declared null and void by courts?",
    options: [
      "(A) Article 12",
      "(B) Article 13",
      "(C) Article 32",
      "(D) Article 226"
    ],
    answer: 1,
    answerLabel: "(B)"
  }
];
