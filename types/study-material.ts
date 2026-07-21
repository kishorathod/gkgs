/* ==========================================================================
   TypeScript Interfaces for Dynamic Study Material CMS Architecture
   types/study-material.ts
   ========================================================================== */

export interface HeroData {
  title: string;
  subtitle: string;
  sscWeightage: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | string;
  estimatedReadingTime: string;
  expectedQuestions: string;
  lastUpdated: string;
  whyItMatters: string;
}

export interface QuickFact {
  icon: string;
  heading: string;
  fact: string;
}

export interface NoteSection {
  heading: string;
  explanation: string;
  keyTakeaways?: string[];
  importantExamPoints?: string[];
  commonStudentMistakes?: string[];
}

export interface TimelineItem {
  year: string;
  title: string;
  shortDescription: string;
  importance: string;
}

export interface Personality {
  name: string;
  role: string;
  years: string;
  majorContributions: string;
  sscTrick?: string;
}

export interface TermDefinition {
  term: string;
  definition: string;
}

export interface ComparisonTable {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface MemoryTrick {
  concept: string;
  mnemonic: string;
  explanation: string;
}

export interface ExamTrap {
  topic: string;
  trap: string;
  correction: string;
}

export interface PYQAnalysisData {
  frequentlyTestedConcepts?: string[];
  repeatedThemes?: string[];
  importantAreas?: string[];
  difficultyTrend?: string;
  expectedFutureQuestions?: string[];
}

export interface MCQQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | string;
  topicTag?: string;
}

export interface Flashcard {
  front: string;
  back: string;
}

export interface RelatedTopicsData {
  previousTopic?: string;
  currentTopic?: string;
  nextTopic?: string;
  relatedChapters?: string[];
}

export interface TopicCMSPayload {
  topicId?: string;
  subject?: string;
  hero?: HeroData;
  quickFacts?: QuickFact[];
  notes?: NoteSection[];
  timeline?: TimelineItem[];
  personalities?: Personality[];
  terms?: TermDefinition[];
  tables?: ComparisonTable[];
  memoryTricks?: MemoryTrick[];
  examTraps?: ExamTrap[];
  pyqAnalysis?: PYQAnalysisData;
  mcqs?: MCQQuestion[];
  flashcards?: Flashcard[];
  revisionPoints?: string[];
  revisionSheet?: string[];
  relatedTopics?: RelatedTopicsData;
}
