/* ==========================================================================
   Science Modular Learning Engine (modules/science-modular-engine.js)
   Modular JSON-driven engine for Science Lab.
   Fetches each section independently and renders reusable UI components.
   ========================================================================== */

import { api } from './api-service.js';
import { activityStore } from './activity-store.js';
import { addXP } from '../app.js';
import {
  HeroCard,
  OverviewSection,
  InteractiveDiagram,
  ConceptExplorer,
  StudyNotes,
  ComparisonTables,
  ProcessFlow,
  ExamTraps,
  Flashcards,
  PracticeQuiz,
  RevisionSection,
  MindMap,
  StudyFiles,
  RelatedTopics
} from './science-components.js';

export class ScienceModularEngine {
  constructor() {
    this.subject = 'science';
    this.currentTopicId = 'cell-structure';
    this.activeTab = 'cell';

    // Independent Section States
    this.sectionsState = {
      hero: null,
      overview: null,
      interactiveDiagram: null,
      studyNotes: null,
      quickFacts: null,
      conceptCards: null,
      terminology: null,
      comparisonTables: null,
      processFlow: null,
      realLifeApplications: null,
      examTraps: null,
      pyqAnalysis: null,
      mcqs: null,
      flashcards: null,
      mindMap: null,
      revisionPoints: null,
      revisionSheet: null,
      relatedTopics: null,
      studyFiles: null
    };

    // Independent Loading / Error status for each section
    this.sectionStatus = {};
    this.resetStatuses();

    // Instantiate Reusable Components
    this.heroCard = new HeroCard('view-science');
    this.overviewSection = new OverviewSection('view-science');
    this.interactiveDiagram = new InteractiveDiagram();
    this.conceptExplorer = new ConceptExplorer();
    this.studyNotes = new StudyNotes();
    this.comparisonTables = new ComparisonTables();
    this.processFlow = new ProcessFlow();
    this.examTraps = new ExamTraps();
    this.flashcards = new Flashcards();
    this.practiceQuiz = new PracticeQuiz();
    this.revisionSection = new RevisionSection();
    this.mindMap = new MindMap();
    this.studyFiles = new StudyFiles();
    this.relatedTopics = new RelatedTopics();
  }

  resetStatuses() {
    const keys = [
      'hero', 'overview', 'interactiveDiagram', 'studyNotes', 'quickFacts',
      'conceptCards', 'terminology', 'comparisonTables', 'processFlow',
      'realLifeApplications', 'examTraps', 'pyqAnalysis', 'mcqs',
      'flashcards', 'mindMap', 'revisionPoints', 'revisionSheet',
      'relatedTopics', 'studyFiles'
    ];
    keys.forEach(k => {
      this.sectionStatus[k] = { loading: true, error: false };
      this.sectionsState[k] = null;
    });
  }

  init() {
    this.setupTabs();
    this.loadTopic(this.currentTopicId);
  }

  setupTabs() {
    const cellBtn = document.getElementById('btn-science-cell-tab');
    const notesBtn = document.getElementById('btn-science-notes-tab');

    if (cellBtn) cellBtn.addEventListener('click', () => this.switchTab('cell'));
    if (notesBtn) notesBtn.addEventListener('click', () => this.switchTab('notes'));
  }

  switchTab(tab) {
    this.activeTab = tab;

    document.querySelectorAll('.science-tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`.science-tab-btn[data-tab="${tab}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    const cellContent = document.getElementById('science-cell-tab-content');
    const notesContent = document.getElementById('science-notes-tab-content');

    if (tab === 'cell') {
      cellContent?.classList.remove('hidden');
      notesContent?.classList.add('hidden');
    } else {
      cellContent?.classList.add('hidden');
      notesContent?.classList.remove('hidden');
    }

    addXP(5, 'science', 'Browsed Science tab');
  }

  async loadTopic(topicId = 'cell-structure') {
    this.currentTopicId = topicId;
    this.resetStatuses();
    activityStore.logEvent('topic_opened', { subject: this.subject, topicId });

    // Section names to fetch concurrently
    const sectionNames = Object.keys(this.sectionsState);

    // Fetch each section independently (AI pipeline compatible)
    const fetchPromises = sectionNames.map(async (sectionName) => {
      try {
        const data = await api.getScienceSection(topicId, sectionName);
        if (data) {
          this.sectionsState[sectionName] = data;
          this.sectionStatus[sectionName] = { loading: false, error: false };
        } else {
          this.sectionStatus[sectionName] = { loading: false, error: false };
        }
      } catch (err) {
        // Section failed or 404 - set error status without breaking other sections
        this.sectionStatus[sectionName] = { loading: false, error: true };
      }
      // Render section immediately when its fetch settles
      this.renderSection(sectionName);
    });

    await Promise.allSettled(fetchPromises);
    this.renderNotesTab();
  }

  renderSection(sectionName) {
    const status = this.sectionStatus[sectionName] || { loading: false, error: false };
    const data = this.sectionsState[sectionName];

    if (sectionName === 'hero') {
      this.heroCard.render(data, status);
    } else if (sectionName === 'interactiveDiagram') {
      this.interactiveDiagram.render(data, status);
    } else if (sectionName === 'quickFacts' || sectionName === 'overview') {
      this.overviewSection.render(this.sectionsState.overview, this.sectionsState.quickFacts, status);
    } else if (['studyNotes', 'conceptCards', 'comparisonTables', 'processFlow', 'examTraps', 'mcqs', 'flashcards', 'revisionSheet', 'mindMap', 'studyFiles', 'relatedTopics'].includes(sectionName)) {
      this.renderNotesTab();
    }
  }

  renderNotesTab() {
    const container = document.getElementById('science-notes-container');
    if (!container) return;

    // Build container containers dynamically for each component pane
    if (!document.getElementById('science-concepts-mount')) {
      container.innerHTML = `
        <div id="science-concepts-mount"></div>
        <div id="science-notes-mount"></div>
        <div id="science-tables-mount"></div>
        <div id="science-flow-mount"></div>
        <div id="science-traps-mount"></div>
        <div id="science-quiz-mount"></div>
        <div id="science-flashcards-mount"></div>
        <div id="science-revision-mount"></div>
        <div id="science-mindmap-mount"></div>
        <div id="science-files-mount"></div>
        <div id="science-related-mount"></div>
      `;
    }

    this.conceptExplorer.render(
      this.sectionsState.conceptCards,
      this.sectionsState.terminology,
      document.getElementById('science-concepts-mount'),
      this.sectionStatus.conceptCards
    );

    this.studyNotes.render(
      this.sectionsState.studyNotes,
      document.getElementById('science-notes-mount'),
      this.sectionStatus.studyNotes
    );

    this.comparisonTables.render(
      this.sectionsState.comparisonTables,
      document.getElementById('science-tables-mount'),
      this.sectionStatus.comparisonTables
    );

    this.processFlow.render(
      this.sectionsState.processFlow,
      document.getElementById('science-flow-mount'),
      this.sectionStatus.processFlow
    );

    this.examTraps.render(
      this.sectionsState.examTraps,
      document.getElementById('science-traps-mount'),
      this.sectionStatus.examTraps
    );

    this.practiceQuiz.render(
      this.sectionsState.mcqs,
      this.sectionsState.pyqAnalysis,
      document.getElementById('science-quiz-mount'),
      this.sectionStatus.mcqs
    );

    this.flashcards.render(
      this.sectionsState.flashcards,
      document.getElementById('science-flashcards-mount'),
      this.sectionStatus.flashcards
    );

    this.revisionSection.render(
      this.sectionsState.revisionSheet || this.sectionsState.revisionPoints,
      document.getElementById('science-revision-mount'),
      this.sectionStatus.revisionSheet
    );

    this.mindMap.render(
      this.sectionsState.mindMap,
      document.getElementById('science-mindmap-mount'),
      this.sectionStatus.mindMap
    );

    this.studyFiles.render(
      this.sectionsState.studyFiles,
      document.getElementById('science-files-mount'),
      this.sectionStatus.studyFiles
    );

    this.relatedTopics.render(
      this.sectionsState.relatedTopics,
      document.getElementById('science-related-mount'),
      this.sectionStatus.relatedTopics
    );
  }
}

export const scienceModularEngine = new ScienceModularEngine();
