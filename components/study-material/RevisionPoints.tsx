import React from 'react';

interface RevisionPointsProps {
  points?: string[];
}

export const OneLinerRevision: React.FC<RevisionPointsProps> = ({ points }) => {
  if (!points || points.length === 0) return null;

  return (
    <div className="revision-points-section">
      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-main)' }}>
        ⚡ One-Liner Quick Revision ({points.length} Points)
      </h3>
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {points.map((pt, idx) => (
          <li key={idx} className="glass-card" style={{ padding: '10px 14px', fontSize: '13.5px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🔹</span>
            <span>{pt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
