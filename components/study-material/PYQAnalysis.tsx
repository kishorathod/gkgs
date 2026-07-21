import React from 'react';
import { PYQAnalysisData } from '../../types/study-material';

interface PYQAnalysisProps {
  analysis?: PYQAnalysisData;
}

export const PYQInsightsCard: React.FC<PYQAnalysisProps> = ({ analysis }) => {
  if (!analysis) return null;

  return (
    <div className="pyq-analysis-section glass-card" style={{ padding: '20px' }}>
      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-main)' }}>
        📌 PYQ Insights & Exam Pattern
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {analysis.frequentlyTestedConcepts && analysis.frequentlyTestedConcepts.length > 0 && (
          <div>
            <h4 style={{ fontSize: '14px', color: 'var(--accent-purple)', fontWeight: '700' }}>Frequently Tested Concepts</h4>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              {analysis.frequentlyTestedConcepts.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {analysis.repeatedThemes && analysis.repeatedThemes.length > 0 && (
          <div>
            <h4 style={{ fontSize: '14px', color: 'var(--accent-pink)', fontWeight: '700' }}>Repeated Themes</h4>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              {analysis.repeatedThemes.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {analysis.importantAreas && analysis.importantAreas.length > 0 && (
          <div>
            <h4 style={{ fontSize: '14px', color: 'var(--accent-emerald)', fontWeight: '700' }}>Important Areas</h4>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              {analysis.importantAreas.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {analysis.difficultyTrend && (
        <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-glass)', fontSize: '13px', color: 'var(--text-muted)' }}>
          📈 <strong>Difficulty Trend:</strong> {analysis.difficultyTrend}
        </div>
      )}
    </div>
  );
};
