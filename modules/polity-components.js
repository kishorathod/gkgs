/* ==========================================================================
   Polity UI Components (modules/polity-components.js)
   Reusable rendering components that receive independent data slices.
   ========================================================================== */

export class HeroCard {
  constructor(containerId) {
    this.containerId = containerId;
  }
  render(data) {
    if (!data) return;
    const titleEl = document.querySelector(`#${this.containerId} .study-hero-title`);
    const descEl = document.querySelector(`#${this.containerId} .study-hero-desc`);
    const badgeEl = document.querySelector(`#${this.containerId} .study-hero-badge`);

    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.subtitle;
    if (badgeEl) badgeEl.textContent = `📚 Polity — TOPIC MODULE`;

    const chipVals = document.querySelectorAll(`#${this.containerId} .study-hero-metrics .chip-val`);
    if (chipVals.length >= 4) {
      if (data.sscWeightage || data.weightage) chipVals[0].textContent = data.sscWeightage || data.weightage;
      if (data.expectedQuestions) chipVals[1].textContent = data.expectedQuestions;
      if (data.difficulty) chipVals[2].textContent = data.difficulty;
      if (data.estimatedReadingTime) chipVals[3].textContent = `⏱️ ~${data.estimatedReadingTime}`;
    }
  }
}

export class OverviewSection {
  constructor(containerId, subject = 'polity') {
    this.containerId = containerId;
    this.subject = subject;
  }
  render(data) {
    // data is an object like { hero: {...}, quickFacts: [...], personalities: [...], terms: [...] }
    // In Phase 2, this might just be the overview data slice.
    const pane = document.getElementById(`${this.subject}-subtab-overview`);
    if (!pane) return;

    let html = '';

    if (data.hero?.whyItMatters) {
      html += `
        <div class="learning-card card-concept" style="margin-bottom: 20px;">
          <span class="learning-card-tag">💡 Why This Topic Matters in SSC CGL</span>
          <p style="font-size: 14px; line-height: 1.6; color: var(--text-main); margin-top: 6px;">${data.hero.whyItMatters}</p>
        </div>
      `;
    }

    if (data.quickFacts && data.quickFacts.length > 0) {
      html += `
        <div class="quick-facts-section" style="margin-bottom: 24px;">
          <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 14px;">⚡ High-Yield Quick Facts</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 14px;">
            ${data.quickFacts.map(f => `
              <div class="glass-card" style="padding: 14px; border: 1px solid var(--border-glass); border-radius: var(--radius-md);">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                  <span style="font-size: 18px;">${f.icon || '📌'}</span>
                  <strong style="font-size: 12.5px; color: var(--accent-purple);">${f.heading || 'Fact'}</strong>
                </div>
                <p style="font-size: 13px; color: var(--text-main); margin: 0; line-height: 1.4;">${f.fact}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (data.personalities && data.personalities.length > 0) {
      html += `
        <div class="personalities-section" style="margin-bottom: 24px;">
          <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 14px;">👤 Key Personalities &amp; Leaders</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px;">
            ${data.personalities.map(p => `
              <div class="glass-card" style="padding: 16px; border-radius: var(--radius-lg);">
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                  <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main); margin: 0;">${p.name}</h4>
                  <span style="font-size: 11px; color: var(--accent-pink); font-weight: 700;">${p.role}</span>
                </div>
                <p style="font-size: 12.5px; color: var(--text-secondary); margin-bottom: 8px; line-height: 1.4;">${p.majorContributions}</p>
                ${p.sscTrick ? `
                  <div style="background: rgba(99,102,241,0.1); padding: 6px 10px; border-radius: 6px; font-size: 11.5px; color: var(--accent-purple); font-weight: 600;">
                    💡 SSC Trick: ${p.sscTrick}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (data.terms && data.terms.length > 0) {
      html += `
        <div class="terms-section" style="margin-bottom: 24px;">
          <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 14px;">📖 High-Yield Glossary &amp; Terms</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px;">
            ${data.terms.map(t => `
              <div class="glass-card" style="padding: 14px; border-radius: var(--radius-md);">
                <h5 style="font-size: 13.5px; font-weight: 700; color: var(--accent-cyan); margin: 0 0 4px 0;">${t.term}</h5>
                <p style="font-size: 12.5px; color: var(--text-secondary); margin: 0; line-height: 1.4;">${t.definition || t.meaning}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    pane.innerHTML = html;
  }
}

export class ArticleExplorer {
  constructor(subject = 'polity') {
    this.subject = subject;
  }
  render(data) {
    const pane = document.getElementById(`${this.subject}-subtab-article-explorer`);
    if (!pane) return;
    
    const grid = document.getElementById(`${this.subject}-articles-explorer-grid`);
    if (!grid) return;

    if (!data || data.length === 0) {
      grid.innerHTML = `<div style="padding: 24px; color: var(--text-muted); text-align: center;">No articles available in this module.</div>`;
      return;
    }

    grid.innerHTML = data.map(art => `
      <div class="glass-card article-explorer-card" style="padding: 16px; border-radius: var(--radius-lg); cursor: pointer; transition: all 0.2s; border: 1px solid var(--border-glass);" 
           onclick="document.dispatchEvent(new CustomEvent('load-topic', {detail: '${art.topicId}'}))"
           onmouseover="this.style.borderColor='var(--accent-cyan)'; this.style.transform='translateY(-2px)'"
           onmouseout="this.style.borderColor='var(--border-glass)'; this.style.transform='translateY(0)'">
        
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
          <h3 style="font-size: 18px; font-weight: 800; color: var(--accent-cyan); margin: 0;">${art.article}</h3>
          <span style="font-size: 11px; background: rgba(99,102,241,0.1); color: var(--accent-purple); padding: 4px 8px; border-radius: 12px; font-weight: 700;">
            ${art.difficulty}
          </span>
        </div>
        
        <h4 style="font-size: 14.5px; font-weight: 700; color: var(--text-main); margin: 0 0 12px 0; line-height: 1.3;">${art.title}</h4>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 16px;">
          <div style="background: rgba(255,255,255,0.03); padding: 8px; border-radius: 6px;">
            <div style="font-size: 10px; color: var(--text-muted); text-transform: uppercase; margin-bottom: 2px;">SSC Weightage</div>
            <div style="font-size: 13px; color: var(--accent-pink); font-weight: 700;">${art.weightage}</div>
          </div>
          <div style="background: rgba(255,255,255,0.03); padding: 8px; border-radius: 6px;">
            <div style="font-size: 10px; color: var(--text-muted); text-transform: uppercase; margin-bottom: 2px;">PYQs Asked</div>
            <div style="font-size: 13px; color: var(--accent-cyan); font-weight: 700;">${art.pyqCount} Questions</div>
          </div>
        </div>
        
        <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-glass); padding-top: 12px; margin-top: auto;">
          <span style="font-size: 12px; color: var(--text-secondary);">${art.frequentlyAsked ? '🔥 Frequently Asked' : '📚 Standard Study'}</span>
          <span style="font-size: 12px; color: var(--accent-cyan); font-weight: 600;">Read Deep Dive →</span>
        </div>
      </div>
    `).join('');
  }
}

export class NotesSection {
  constructor(subject = 'polity') {
    this.subject = subject;
  }
  render(data) {
    const container = document.getElementById(`${this.subject}-notes-accordion-container`);
    if (!container) return;

    let html = '';

    if (data.notes && data.notes.length > 0) {
      html += data.notes.map((note, idx) => `
        <div class="accordion-item ${idx === 0 ? 'expanded' : ''}" id="${this.subject}-acc-${idx}">
          <div class="accordion-header">
            <div class="accordion-title-wrap">
              <span class="accordion-icon">📖</span>
              <span class="accordion-title">${note.heading}</span>
            </div>
            <span class="accordion-chevron">▼</span>
          </div>
          <div class="accordion-body">
            <p style="font-size: 14px; line-height: 1.6; color: var(--text-secondary);">${note.explanation}</p>
            ${note.keyTakeaways && note.keyTakeaways.length > 0 ? `
              <div class="learning-card card-concept">
                <span class="learning-card-tag">💡 Key Takeaways</span>
                <ul style="margin: 0; padding-left: 20px;">${note.keyTakeaways.map(t => `<li style="font-size: 13px;">${t}</li>`).join('')}</ul>
              </div>
            ` : ''}
            ${note.importantExamPoints && note.importantExamPoints.length > 0 ? `
              <div class="learning-card card-facts">
                <span class="learning-card-tag">📌 Important Exam Points</span>
                <ul style="margin: 0; padding-left: 20px;">${note.importantExamPoints.map(p => `<li style="font-size: 13px;">${p}</li>`).join('')}</ul>
              </div>
            ` : ''}
            ${note.commonStudentMistakes && note.commonStudentMistakes.length > 0 ? `
              <div class="learning-card card-trap">
                <span class="learning-card-tag">⚠️ Common Student Mistakes</span>
                <ul style="margin: 0; padding-left: 20px;">${note.commonStudentMistakes.map(m => `<li style="font-size: 13px; color:#f87171;">${m}</li>`).join('')}</ul>
              </div>
            ` : ''}
          </div>
        </div>
      `).join('');
    }

    if (data.memoryTricks && data.memoryTricks.length > 0) {
      html += `
        <div style="margin-top: 24px;">
          <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 14px;">🧠 Memory Tricks &amp; Mnemonics</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px;">
            ${data.memoryTricks.map(m => `
              <div class="learning-card card-trick">
                <span class="learning-card-tag">💡 ${m.concept}</span>
                <h4 style="font-size: 14px; font-weight: 700; color: var(--accent-cyan); margin: 6px 0;">${m.mnemonic}</h4>
                <p style="font-size: 12.5px; color: var(--text-secondary); margin: 0; line-height: 1.4;">${m.explanation}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (data.examTraps && (data.examTraps.length > 0 || data.examTraps.traps)) {
      const traps = data.examTraps.traps || data.examTraps;
      html += `
        <div style="margin-top: 24px;">
          <h3 style="font-size: 16px; font-weight: 700; color: #f87171; margin-bottom: 14px;">⚠️ High-Frequency SSC Exam Traps</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${traps.map(t => `
              <div class="learning-card card-trap">
                <span class="learning-card-tag">⚠️ Trap: ${t.topic || t.confusedPair}</span>
                <p style="font-size: 13px; color: #f87171; margin: 4px 0;">❌ <strong>Common Mistake:</strong> ${t.trap || t.explanation}</p>
                ${t.correction ? `<p style="font-size: 13px; color: #34d399; margin: 0;">✅ <strong>Correct Concept:</strong> ${t.correction}</p>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (data.tables && data.tables.length > 0) {
      html += `
        <div style="margin-top: 24px;">
          <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 14px;">📊 Comparison &amp; Reference Tables</h3>
          ${data.tables.map(tbl => `
            <div class="glass-card" style="padding: 16px; margin-bottom: 16px; overflow-x: auto;">
              <h4 style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 12px;">${tbl.title || tbl.tableName}</h4>
              <table style="width: 100%; border-collapse: collapse; font-size: 12.5px;">
                <thead>
                  <tr style="background: rgba(255,255,255,0.04); border-bottom: 1px solid var(--border-glass);">
                    ${tbl.headers.map(h => `<th style="padding: 10px; text-align: left; color: var(--accent-purple); font-weight: 700;">${h}</th>`).join('')}
                  </tr>
                </thead>
                <tbody>
                  ${tbl.rows.map(row => `
                    <tr style="border-bottom: 1px solid var(--border-glass);">
                      ${row.map(cell => `<td style="padding: 10px; color: var(--text-secondary);">${cell}</td>`).join('')}
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `).join('')}
        </div>
      `;
    }

    container.innerHTML = html;
  }
}

export class TimelineSection {
  constructor(subject = 'polity') {
    this.subject = subject;
  }
  render(data) {
    const pane = document.getElementById(`${this.subject}-subtab-timeline`);
    if (!pane) return;

    if (!data || data.length === 0) {
      pane.innerHTML = `<div style="padding: 24px; color: var(--text-muted); text-align: center;">No visual timeline available for this topic.</div>`;
      return;
    }

    pane.innerHTML = `
      <div class="timeline-container">
        <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 16px;">⏱️ Topic Chronology</h3>
        <div style="display: flex; flex-direction: column; gap: 14px;">
          ${data.map(t => `
            <div class="timeline-event-card glass-card" style="padding: 16px; border-left: 4px solid var(--accent-purple);">
              <span style="font-size: 12px; font-weight: 700; color: var(--accent-purple);">${t.year}</span>
              <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main); margin: 4px 0;">${t.title}</h4>
              <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 6px; line-height: 1.5;">${t.shortDescription}</p>
              <span style="font-size: 11.5px; font-weight: 600; color: var(--text-muted);">🎯 Significance: ${t.importance}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}
