import React from 'react';
import { Personality } from '../../types/study-material';

interface PersonalitiesGridProps {
  personalities?: Personality[];
}

export const PersonalitiesGrid: React.FC<PersonalitiesGridProps> = ({ personalities }) => {
  if (!personalities || personalities.length === 0) return null;

  return (
    <div className="personalities-section">
      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-main)' }}>
        👤 Key Historical Personalities
      </h3>
      <div className="personalities-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {personalities.map((item, idx) => (
          <div key={idx} className="personality-card glass-card" style={{ padding: '16px', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>{item.name}</h4>
                <span style={{ fontSize: '12px', color: 'var(--accent-pink)', fontWeight: '600' }}>{item.role}</span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.years}</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '8px' }}>{item.majorContributions}</p>
            {item.sscTrick && (
              <div style={{ background: 'rgba(99,102,241,0.08)', padding: '6px 10px', borderRadius: '6px', fontSize: '12px', color: 'var(--accent-purple)', fontWeight: '600' }}>
                💡 Trick: {item.sscTrick}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
