import React from 'react';
import { TermDefinition } from '../../types/study-material';

interface GlossaryProps {
  terms?: TermDefinition[];
}

export const GlossaryCards: React.FC<GlossaryProps> = ({ terms }) => {
  if (!terms || terms.length === 0) return null;

  return (
    <div className="glossary-section">
      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-main)' }}>
        📖 Key Terms & Glossary
      </h3>
      <div className="glossary-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
        {terms.map((item, idx) => (
          <div key={idx} className="glossary-card glass-card" style={{ padding: '16px', borderRadius: 'var(--radius-md)' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--accent-cyan)', marginBottom: '6px' }}>{item.term}</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>{item.definition}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
