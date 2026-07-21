import React from 'react';
import { RelatedTopicsData } from '../../types/study-material';

interface RelatedTopicsProps {
  data?: RelatedTopicsData;
  onSelectTopic?: (topicName: string) => void;
}

export const RelatedTopicsSection: React.FC<RelatedTopicsProps> = ({ data, onSelectTopic }) => {
  if (!data) return null;

  return (
    <div className="related-topics-section glass-card" style={{ padding: '20px' }}>
      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-main)' }}>
        🔗 Chapter Navigation & Related Topics
      </h3>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {data.previousTopic && (
          <button className="btn btn-secondary" onClick={() => onSelectTopic && onSelectTopic(data.previousTopic!)}>
            ← {data.previousTopic}
          </button>
        )}
        {data.nextTopic && (
          <button className="btn btn-primary" onClick={() => onSelectTopic && onSelectTopic(data.nextTopic!)}>
            {data.nextTopic} →
          </button>
        )}
      </div>

      {data.relatedChapters && data.relatedChapters.length > 0 && (
        <div>
          <h4 style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Related High-Yield Chapters:</h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {data.relatedChapters.map((ch, idx) => (
              <span key={idx} style={{ padding: '4px 10px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-glass)', borderRadius: '12px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                📖 {ch}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
