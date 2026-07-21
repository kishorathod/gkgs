import React, { useState } from 'react';
import { NoteSection } from '../../types/study-material';

interface NotesAccordionProps {
  notes?: NoteSection[];
}

export const NotesAccordion: React.FC<NotesAccordionProps> = ({ notes }) => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  if (!notes || notes.length === 0) return null;

  const toggleAccordion = (index: number) => {
    setOpenIndices(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="notes-accordion-section">
      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-main)' }}>
        📚 Detailed Exam Notes
      </h3>
      <div className="accordion-group" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {notes.map((note, idx) => {
          const isOpen = openIndices.includes(idx);
          return (
            <div key={idx} className={`accordion-item glass-card ${isOpen ? 'expanded' : ''}`}>
              <div
                className="accordion-header"
                onClick={() => toggleAccordion(idx)}
                style={{ cursor: 'pointer', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div className="accordion-title-wrap" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="accordion-icon">📖</span>
                  <span className="accordion-title" style={{ fontWeight: '700', fontSize: '15px' }}>{note.heading}</span>
                </div>
                <span className="accordion-chevron" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: '0.3s' }}>▼</span>
              </div>

              {isOpen && (
                <div className="accordion-body" style={{ padding: '20px', borderTop: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>{note.explanation}</p>

                  {note.keyTakeaways && note.keyTakeaways.length > 0 && (
                    <div className="learning-card card-concept">
                      <span className="learning-card-tag">💡 Key Takeaways</span>
                      <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        {note.keyTakeaways.map((item, i) => (
                          <li key={i} style={{ fontSize: '13px', color: 'var(--text-main)' }}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {note.importantExamPoints && note.importantExamPoints.length > 0 && (
                    <div className="learning-card card-facts">
                      <span className="learning-card-tag">📌 Important Exam Points</span>
                      <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        {note.importantExamPoints.map((item, i) => (
                          <li key={i} style={{ fontSize: '13px', color: 'var(--text-main)' }}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {note.commonStudentMistakes && note.commonStudentMistakes.length > 0 && (
                    <div className="learning-card card-trap">
                      <span className="learning-card-tag">⚠️ Common Student Mistakes</span>
                      <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        {note.commonStudentMistakes.map((item, i) => (
                          <li key={i} style={{ fontSize: '13px', color: '#f87171' }}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
