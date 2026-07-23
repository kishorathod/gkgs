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
    this.containerId = 'view-science';
    this.currentTopicId = 'cell-structure';
    this.activeSubTab = 'overview';

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
      'flashcards', 'mindMap', 'revisionSheet',
      'relatedTopics', 'studyFiles'
    ];
    keys.forEach(k => {
      this.sectionStatus[k] = { loading: true, error: false };
      this.sectionsState[k] = null;
    });
  }

  init() {
    this.setupSubNav();
    this.setupTopicSelector('science-topic-selector-bar');
    this.loadTopic(this.currentTopicId);
  }

  setupSubNav() {
    const subnav = document.getElementById('science-subnav');
    if (!subnav) return;
    subnav.querySelectorAll('.study-nav-btn').forEach(btn => {
      btn.onclick = (e) => {
        const targetSubtab = e.currentTarget.dataset.subtab;
        this.switchSubTab(targetSubtab);
      };
    });
  }

  switchSubTab(subtabId) {
    this.activeSubTab = subtabId;
    const subnav = document.getElementById('science-subnav');
    if (subnav) {
      subnav.querySelectorAll('.study-nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.subtab === subtabId);
      });
    }

    document.querySelectorAll('#view-science .study-tab-pane').forEach(pane => {
      pane.classList.add('hidden');
      pane.classList.remove('active');
    });

    const targetPaneId = `science-subtab-${subtabId}`;
    const targetPane = document.getElementById(targetPaneId);
    if (targetPane) {
      targetPane.classList.remove('hidden');
      targetPane.classList.add('active');
    }

    addXP(5, 'science', `Browsed Science ${subtabId} tab`);
  }

  setupTopicSelector(barId) {
    const bar = document.getElementById(barId);
    if (!bar) return;
    bar.querySelectorAll('.topic-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const topicId = e.currentTarget.dataset.topicId;
        if (topicId) {
          bar.querySelectorAll('.topic-chip').forEach(c => c.classList.remove('active'));
          e.currentTarget.classList.add('active');
          this.loadTopic(topicId);
        }
      });
    });
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
    this.renderAllComponents();
  }

  renderSection(sectionName) {
    const status = this.sectionStatus[sectionName] || { loading: false, error: false };
    const data = this.sectionsState[sectionName];

    if (sectionName === 'hero') {
      this.heroCard.render(data, status);
      const diagramCta = document.getElementById('btn-science-diagram-cta');
      const quizCta = document.getElementById('btn-science-quiz-cta');
      if (diagramCta) diagramCta.onclick = () => this.switchSubTab('diagram');
      if (quizCta) quizCta.onclick = () => this.switchSubTab('quiz');
    } else if (sectionName === 'interactiveDiagram') {
      this.interactiveDiagram.render(data, status);
    } else if (sectionName === 'quickFacts' || sectionName === 'overview') {
      this.overviewSection.render(this.sectionsState.overview, this.sectionsState.quickFacts, status);
    } else {
      this.renderAllComponents();
    }
  }

  renderAllComponents() {
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
