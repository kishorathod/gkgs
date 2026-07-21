import React from 'react';
import { MemoryTrick } from '../../types/study-material';

interface MemoryTricksProps {
  tricks?: MemoryTrick[];
}

export const MemoryTipsSection: React.FC<MemoryTricksProps> = ({ tricks }) => {
  if (!tricks || tricks.length === 0) return null;

  return (
    <div className="memory-tricks-section">
      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-main)' }}>
        🧠 Memory Tricks & Mnemonics
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {tricks.map((item, idx) => (
          <div key={idx} className="trick-card glass-card" style={{ padding: '16px', borderLeft: '4px solid var(--accent-cyan)' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)' }}>{item.concept}</span>
            <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--accent-cyan)', margin: '4px 0' }}>{item.mnemonic}</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>{item.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
