import React from 'react';

interface RevisionSheetProps {
  sheet?: string[];
}

export const RevisionSummaryCard: React.FC<RevisionSheetProps> = ({ sheet }) => {
  if (!sheet || sheet.length === 0) return null;

  return (
    <div className="revision-sheet-section glass-card" style={{ padding: '20px', border: '1px solid var(--accent-emerald)' }}>
      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: 'var(--accent-emerald)' }}>
        📝 1-Page Exam Revision Summary
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '10px' }}>
        {sheet.map((item, idx) => (
          <div key={idx} style={{ padding: '8px 12px', background: 'rgba(16,185,129,0.06)', borderRadius: '6px', fontSize: '13px', color: 'var(--text-main)' }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
