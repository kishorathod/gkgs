import React, { useState } from 'react';
import { Flashcard } from '../../types/study-material';

interface FlashcardCarouselProps {
  cards?: Flashcard[];
}

export const FlashcardCarousel: React.FC<FlashcardCarouselProps> = ({ cards }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!cards || cards.length === 0) return null;

  const card = cards[currentIdx];

  return (
    <div className="flashcards-section">
      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-main)' }}>
        🎴 Flashcard Carousel ({cards.length} Cards)
      </h3>

      <div
        className="flashcard-box glass-card"
        onClick={() => setIsFlipped(!isFlipped)}
        style={{
          minHeight: '180px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          cursor: 'pointer',
          border: '1px solid var(--accent-purple)',
          marginBottom: '16px',
          transition: 'transform 0.4s'
        }}
      >
        <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>
          Card {currentIdx + 1} of {cards.length} (Click to flip)
        </span>
        <div style={{ fontSize: '16px', fontWeight: '700', color: isFlipped ? 'var(--accent-emerald)' : 'var(--text-main)' }}>
          {isFlipped ? card.back : card.front}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          className="btn btn-secondary"
          onClick={() => { setIsFlipped(false); setCurrentIdx(prev => Math.max(0, prev - 1)); }}
          disabled={currentIdx === 0}
        >
          ← Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={() => { setIsFlipped(false); setCurrentIdx(prev => Math.min(cards.length - 1, prev + 1)); }}
          disabled={currentIdx === cards.length - 1}
        >
          Next →
        </button>
      </div>
    </div>
  );
};
