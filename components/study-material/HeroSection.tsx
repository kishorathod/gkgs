import React from 'react';
import { HeroData } from '../../types/study-material';

interface HeroSectionProps {
  data?: HeroData;
  onStartQuiz?: () => void;
  onContinueReading?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ data, onStartQuiz, onContinueReading }) => {
  if (!data) return null;

  return (
    <div className="study-hero glass-card">
      <div className="study-hero-top">
        <div>
          <span className="study-hero-badge">⭐ SSC Weightage: {data.sscWeightage}</span>
          <h1 className="study-hero-title">{data.title}</h1>
          <p className="study-hero-desc">{data.subtitle}</p>
          {data.whyItMatters && (
            <p className="study-hero-why" style={{ marginTop: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
              💡 <strong>Why it matters:</strong> {data.whyItMatters}
            </p>
          )}
        </div>
        <div className="study-hero-actions">
          {onContinueReading && (
            <button className="btn btn-primary" onClick={onContinueReading}>
              Continue Reading 📖
            </button>
          )}
          {onStartQuiz && (
            <button className="btn btn-secondary" onClick={onStartQuiz}>
              Start Quiz 🎯
            </button>
          )}
        </div>
      </div>

      <div className="study-hero-metrics">
        <div className="study-metric-chip">
          <span className="chip-label">Difficulty</span>
          <span className="chip-val">{data.difficulty}</span>
        </div>
        <div className="study-metric-chip">
          <span className="chip-label">Reading Time</span>
          <span className="chip-val">{data.estimatedReadingTime}</span>
        </div>
        <div className="study-metric-chip">
          <span className="chip-label">Expected Questions</span>
          <span className="chip-val">{data.expectedQuestions}</span>
        </div>
        <div className="study-metric-chip">
          <span className="chip-label">Last Updated</span>
          <span className="chip-val">{data.lastUpdated}</span>
        </div>
      </div>
    </div>
  );
};
