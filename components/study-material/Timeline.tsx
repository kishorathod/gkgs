import React from 'react';
import { TimelineItem } from '../../types/study-material';

interface TimelineProps {
  timeline?: TimelineItem[];
}

export const InteractiveTimeline: React.FC<TimelineProps> = ({ timeline }) => {
  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="timeline-section">
      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-main)' }}>
        ⏳ Chronological Timeline
      </h3>
      <div className="timeline-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {timeline.map((item, idx) => (
          <div key={idx} className="timeline-item glass-card" style={{ padding: '16px', borderLeft: '4px solid var(--accent-purple)' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--accent-purple)' }}>{item.year}</span>
            <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)', margin: '4px 0' }}>{item.title}</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 6px 0' }}>{item.shortDescription}</p>
            <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)' }}>🎯 Exam Significance: {item.importance}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
