import React from 'react';
import { QuickFact } from '../../types/study-material';

interface QuickFactsGridProps {
  facts?: QuickFact[];
}

export const QuickFactsGrid: React.FC<QuickFactsGridProps> = ({ facts }) => {
  if (!facts || facts.length === 0) return null;

  return (
    <div className="quick-facts-section">
      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-main)' }}>
        ⚡ High-Yield Quick Facts
      </h3>
      <div className="quick-facts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
        {facts.map((item, idx) => (
          <div key={idx} className="quick-fact-card glass-card" style={{ padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              <strong style={{ fontSize: '13px', color: 'var(--accent-purple)' }}>{item.heading}</strong>
            </div>
            <p style={{ fontSize: '13.5px', color: 'var(--text-main)', margin: 0, lineHeight: '1.4' }}>{item.fact}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
