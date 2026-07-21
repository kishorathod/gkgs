import React, { useState } from 'react';
import { MCQQuestion } from '../../types/study-material';

interface PracticeQuizProps {
  mcqs?: MCQQuestion[];
  onCompleteQuiz?: (score: number, total: number) => void;
}

export const PracticeQuizSection: React.FC<PracticeQuizProps> = ({ mcqs, onCompleteQuiz }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>(mcqs ? new Array(mcqs.length).fill(null) : []);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!mcqs || mcqs.length === 0) return null;

  const q = mcqs[currentIdx];

  const handleSelectOption = (option: string) => {
    if (userAnswers[currentIdx] !== null) return; // Already answered

    const newAnswers = [...userAnswers];
    newAnswers[currentIdx] = option;
    setUserAnswers(newAnswers);

    let newScore = score;
    if (option === q.correctAnswer) {
      newScore += 1;
      setScore(newScore);
    }

    if (currentIdx === mcqs.length - 1 && onCompleteQuiz) {
      onCompleteQuiz(newScore, mcqs.length);
    }
  };

  return (
    <div className="practice-quiz-section glass-card" style={{ padding: '20px' }}>
      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-main)' }}>
        🎯 Practice Quiz ({mcqs.length} MCQs)
      </h3>

      {!isFinished ? (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '13px', color: 'var(--text-muted)' }}>
            <span>Question {currentIdx + 1} of {mcqs.length}</span>
            <span style={{ color: 'var(--accent-purple)', fontWeight: '700' }}>Tag: {q.topicTag || 'General'}</span>
          </div>

          <p style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-main)', marginBottom: '16px' }}>{q.question}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
            {q.options.map((opt, i) => {
              const selected = userAnswers[currentIdx] === opt;
              const isAnswered = userAnswers[currentIdx] !== null;
              const isCorrect = opt === q.correctAnswer;

              let btnBg = 'rgba(255,255,255,0.03)';
              let border = '1px solid var(--border-glass)';

              if (isAnswered) {
                if (isCorrect) {
                  btnBg = 'rgba(16,185,129,0.15)';
                  border = '1px solid rgba(16,185,129,0.3)';
                } else if (selected && !isCorrect) {
                  btnBg = 'rgba(239,68,68,0.15)';
                  border = '1px solid rgba(239,68,68,0.3)';
                }
              }

              return (
                <button
                  key={i}
                  className="btn"
                  onClick={() => handleSelectOption(opt)}
                  disabled={isAnswered}
                  style={{ textAlign: 'left', padding: '12px 16px', background: btnBg, border: border, color: 'var(--text-main)' }}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {userAnswers[currentIdx] !== null && (
            <div style={{ padding: '12px', borderRadius: '6px', background: 'rgba(99,102,241,0.08)', marginBottom: '16px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              💡 <strong>Explanation:</strong> {q.explanation}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              className="btn btn-secondary"
              onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
            >
              ← Previous
            </button>

            {currentIdx < mcqs.length - 1 ? (
              <button className="btn btn-primary" onClick={() => setCurrentIdx(prev => prev + 1)}>
                Next →
              </button>
            ) : (
              <button className="btn btn-primary" onClick={() => setIsFinished(true)}>
                View Results 🏆
              </button>
            )}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '24px' }}>
          <h4>Quiz Completed! 🎉</h4>
          <p style={{ fontSize: '20px', fontWeight: '700', color: 'var(--accent-purple)' }}>
            Your Score: {score} / {mcqs.length} ({((score / mcqs.length) * 100).toFixed(0)}%)
          </p>
          <button className="btn btn-primary" onClick={() => { setIsFinished(false); setCurrentIdx(0); setUserAnswers(new Array(mcqs.length).fill(null)); setScore(0); }}>
            Retry Quiz
          </button>
        </div>
      )}
    </div>
  );
};
