import React, { useEffect, useState } from 'react';
import { TopicCMSPayload } from '../../types/study-material';
import { HeroSection } from './HeroSection';
import { QuickFactsGrid } from './QuickFactsGrid';
import { NotesAccordion } from './NotesAccordion';
import { InteractiveTimeline } from './Timeline';
import { PersonalitiesGrid } from './PersonalitiesGrid';
import { GlossaryCards } from './Glossary';
import { ComparisonTables } from './Tables';
import { MemoryTipsSection } from './MemoryTricks';
import { ExamTrapCards } from './ExamTraps';
import { PYQInsightsCard } from './PYQAnalysis';
import { PracticeQuizSection } from './PracticeQuiz';
import { FlashcardCarousel } from './Flashcards';
import { OneLinerRevision } from './RevisionPoints';
import { RevisionSummaryCard } from './RevisionSheet';
import { RelatedTopicsSection } from './RelatedTopics';

interface HistoryPageProps {
  topicId?: string;
  initialPayload?: TopicCMSPayload;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ topicId = 'revolt-of-1857', initialPayload }) => {
  const [data, setData] = useState<TopicCMSPayload | null>(initialPayload || null);
  const [loading, setLoading] = useState<boolean>(!initialPayload);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialPayload) return;

    let isMounted = true;
    setLoading(true);

    fetch(`/api/topics/${topicId}`)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load topic: ${res.statusText}`);
        return res.json();
      })
      .then(json => {
        if (isMounted) {
          setData(json);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message || 'Error fetching topic content');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [topicId, initialPayload]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-secondary)' }}>
        <div style={{ fontSize: '24px', marginBottom: '12px' }}>⌛</div>
        <p>Loading topic material...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{ textAlign: 'center', padding: '48px', color: '#f87171' }}>
        <div style={{ fontSize: '24px', marginBottom: '12px' }}>⚠️</div>
        <p>{error || 'Topic content not available'}</p>
      </div>
    );
  }

  return (
    <div className="history-page-cms" style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px 0' }}>
      {/* 1. Hero Section */}
      <HeroSection data={data.hero} />

      {/* 2. Quick Facts */}
      <QuickFactsGrid facts={data.quickFacts} />

      {/* 3. Notes Accordion */}
      <NotesAccordion notes={data.notes} />

      {/* 4. Timeline */}
      <InteractiveTimeline timeline={data.timeline} />

      {/* 5. Personalities */}
      <PersonalitiesGrid personalities={data.personalities} />

      {/* 6. Glossary */}
      <GlossaryCards terms={data.terms} />

      {/* 7. Tables */}
      <ComparisonTables tables={data.tables} />

      {/* 8. Memory Tricks */}
      <MemoryTipsSection tricks={data.memoryTricks} />

      {/* 9. Exam Traps */}
      <ExamTrapCards traps={data.examTraps} />

      {/* 10. PYQ Analysis */}
      <PYQInsightsCard analysis={data.pyqAnalysis} />

      {/* 11. Practice Quiz */}
      <PracticeQuizSection mcqs={data.mcqs} />

      {/* 12. Flashcards */}
      <FlashcardCarousel cards={data.flashcards} />

      {/* 13. Revision Points */}
      <OneLinerRevision points={data.revisionPoints} />

      {/* 14. Revision Sheet */}
      <RevisionSummaryCard sheet={data.revisionSheet} />

      {/* 15. Related Topics */}
      <RelatedTopicsSection data={data.relatedTopics} />
    </div>
  );
};
