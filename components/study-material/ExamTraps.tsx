import React from 'react';
import { ExamTrap } from '../../types/study-material';

interface ExamTrapsProps {
  traps?: ExamTrap[];
}

export const ExamTrapCards: React.FC<ExamTrapsProps> = ({ traps }) => {
  if (!traps || traps.length === 0) return null;

  return (
    <div className="exam-traps-section">
      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#f87171' }}>
        ⚠️ Common SSC Traps to Avoid
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {traps.map((item, idx) => (
          <div key={idx} className="trap-card glass-card" style={{ padding: '16px', borderLeft: '4px solid #ef4444', background: 'rgba(239,68,68,0.04)' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>{item.topic}</h4>
            <p style={{ fontSize: '13px', color: '#f87171', marginBottom: '6px' }}>❌ <strong>Trap:</strong> {item.trap}</p>
            <p style={{ fontSize: '13px', color: '#34d399', margin: 0 }}>✅ <strong>Correction:</strong> {item.correction}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
