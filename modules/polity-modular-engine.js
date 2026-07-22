/* ==========================================================================
   Polity Modular Learning Engine (modules/polity-modular-engine.js)
   Renders all 10 Polity subtabs using independent modular components.
   ========================================================================== */

import { api } from './api-service.js';
import { activityStore } from './activity-store.js';
import { addXP, markGoalReadNotes } from '../app.js';
import { 
  HeroCard, 
  OverviewSection, 
  ArticleExplorer, 
  NotesSection, 
  TimelineSection,
  PYQSection,
  QuizSection,
  FlashcardSection,
  MindMapSection,
  RevisionSection,
  FilesSection,
  AnalyticsSection
} from './polity-components.js';

export class PolityModularEngine {
  constructor(options = {}) {
    this.subject = 'polity';
    this.containerId = 'view-polity';
    this.activeSubTab = 'overview';
    this.currentTopicId = null;

    // Independent States for each section
    this.sectionsState = {
      hero: null,
      quickFacts: null,
      notes: null,
      timeline: null,
      personalities: null,
      terms: null,
      tables: null,
      memoryTricks: null,
      examTraps: null,
      articleExplorer: null,
      pyqAnalysis: null,
      quiz: null,
      flashcards: null,
      revisionSheet: null
    };

    // Initialize Components
    this.heroCard = new HeroCard(this.containerId);
    this.overviewSection = new OverviewSection(this.containerId, this.subject);
    this.articleExplorer = new ArticleExplorer(this.subject);
    this.notesSection = new NotesSection(this.subject);
    this.timelineSection = new TimelineSection(this.subject);
    this.pyqSection = new PYQSection(this.subject, () => this.switchSubTab('quiz'));
    this.quizSection = new QuizSection(this.subject);
    this.flashcardSection = new FlashcardSection(this.subject);
    this.mindMapSection = new MindMapSection(this.subject);
    this.revisionSection = new RevisionSection(this.subject);
    this.filesSection = new FilesSection(this.subject);
    this.analyticsSection = new AnalyticsSection(this.subject);

    this.setupSubNav();
  }

  async loadTopic(topicId) {
    this.currentTopicId = topicId;
    this.resetState();
    this.syncTopicSelector(topicId);
    activityStore.logEvent('topic_opened', { subject: this.subject, topicId });

    // Define sections to fetch concurrently
    const sectionNames = [
      'hero', 'quickFacts', 'notes', 'timeline', 'personalities',
      'terms', 'tables', 'memoryTricks', 'examTraps', 'articleExplorer',
      'pyqAnalysis', 'quiz', 'flashcards', 'revisionSheet'
    ];

    let hasModularSuccess = false;

    // Trigger concurrent independent section loading
    const fetchPromises = sectionNames.map(async (sectionName) => {
      try {
        const data = await api.getPolitySection(topicId, sectionName);
        if (data) {
          this.sectionsState[sectionName] = data;
          hasModularSuccess = true;
          this.renderSection(sectionName);
        }
      } catch (err) {
        // Section not found in modular directory or network error
      }
    });

    await Promise.allSettled(fetchPromises);

    // Fallback: If modular endpoint did not return any sections (legacy single-JSON topic), load monolithic
    if (!hasModularSuccess) {
      try {
        const monolithicData = await api.getTopic(topicId);
        if (monolithicData) {
          this.sectionsState = {
            hero: monolithicData.hero || null,
            quickFacts: monolithicData.quickFacts || null,
            notes: monolithicData.notes || null,
            timeline: monolithicData.timeline || null,
            personalities: monolithicData.personalities || null,
            terms: monolithicData.terms || null,
            tables: monolithicData.tables || null,
            memoryTricks: monolithicData.memoryTricks || null,
            examTraps: monolithicData.examTraps || null,
            articleExplorer: monolithicData.articleExplorer || monolithicData.articles || null,
            pyqAnalysis: monolithicData.pyqAnalysis || null,
            quiz: monolithicData.quiz || monolithicData.mcqs || null,
            flashcards: monolithicData.flashcards || null,
            revisionSheet: monolithicData.revisionSheet || null
          };
          this.renderAll();
        }
      } catch (err) {
        console.error(`PolityModularEngine: Failed to load topic ${topicId}:`, err.message);
      }
    } else {
      // Ensure all sections (including compound ones like mindmaps, files, analytics) render cleanly
      this.renderAll();
    }
  }

  resetState() {
    Object.keys(this.sectionsState).forEach(key => {
      this.sectionsState[key] = null;
    });
  }

  renderSection(sectionName) {
    if (sectionName === 'hero') {
      this.heroCard.render(this.sectionsState.hero);
      this.updateOverview();
      this.filesSection.render(this.sectionsState.hero);
    } else if (['quickFacts', 'personalities', 'terms'].includes(sectionName)) {
      this.updateOverview();
      this.updateMindMaps();
      this.updateRevision();
    } else if (['notes', 'memoryTricks', 'examTraps', 'tables'].includes(sectionName)) {
      this.updateNotes();
    } else if (sectionName === 'timeline') {
      this.timelineSection.render(this.sectionsState.timeline);
      this.updateMindMaps();
    } else if (sectionName === 'articleExplorer') {
      this.articleExplorer.render(this.sectionsState.articleExplorer);
      this.updateMindMaps();
    } else if (sectionName === 'pyqAnalysis') {
      const mcqs = this.sectionsState.quiz?.mcqs || this.sectionsState.quiz || [];
      this.pyqSection.render(this.sectionsState.pyqAnalysis, mcqs.length);
    } else if (sectionName === 'quiz') {
      const mcqs = this.sectionsState.quiz?.mcqs || this.sectionsState.quiz || [];
      this.quizSection.render(mcqs);
      this.pyqSection.render(this.sectionsState.pyqAnalysis, mcqs.length);
    } else if (sectionName === 'flashcards') {
      this.flashcardSection.render(this.sectionsState.flashcards);
    } else if (sectionName === 'revisionSheet') {
      this.updateRevision();
    }
  }

  updateOverview() {
    this.overviewSection.render({
      hero: this.sectionsState.hero,
      quickFacts: this.sectionsState.quickFacts,
      personalities: this.sectionsState.personalities,
      terms: this.sectionsState.terms
    });
  }

  updateNotes() {
    this.notesSection.render({
      notes: this.sectionsState.notes,
      memoryTricks: this.sectionsState.memoryTricks,
      examTraps: this.sectionsState.examTraps,
      tables: this.sectionsState.tables
    });
  }

  updateMindMaps() {
    this.mindMapSection.render({
      hero: this.sectionsState.hero,
      quickFacts: this.sectionsState.quickFacts,
      personalities: this.sectionsState.personalities,
      timeline: this.sectionsState.timeline,
      articleExplorer: this.sectionsState.articleExplorer,
      examTraps: this.sectionsState.examTraps
    });
  }

  updateRevision() {
    this.revisionSection.render({
      revisionSheet: this.sectionsState.revisionSheet,
      quickFacts: this.sectionsState.quickFacts
    });
  }

  renderAll() {
    this.heroCard.render(this.sectionsState.hero);
    this.updateOverview();
    this.articleExplorer.render(this.sectionsState.articleExplorer);
    this.updateNotes();
    this.timelineSection.render(this.sectionsState.timeline);

    const mcqs = this.sectionsState.quiz?.mcqs || this.sectionsState.quiz || [];
    this.pyqSection.render(this.sectionsState.pyqAnalysis, mcqs.length);
    this.quizSection.render(mcqs);
    this.flashcardSection.render(this.sectionsState.flashcards);

    this.updateMindMaps();
    this.updateRevision();
    this.filesSection.render(this.sectionsState.hero);
    this.analyticsSection.render({
      hero: this.sectionsState.hero,
      mcqs: mcqs,
      flashcards: this.sectionsState.flashcards,
      notes: this.sectionsState.notes,
      articleExplorer: this.sectionsState.articleExplorer
    });
  }

  syncTopicSelector(topicId) {
    const bar = document.getElementById(`${this.subject}-topic-selector-bar`);
    if (!bar) return;
    bar.querySelectorAll('.topic-chip').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.topicId === topicId);
    });
  }

  setupTopicSelector(barId) {
    const bar = document.getElementById(barId);
    if (!bar) return;
    bar.querySelectorAll('.topic-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const topicId = e.target.dataset.topicId;
        if (topicId) this.loadTopic(topicId);
      });
    });
  }

  switchSubTab(subtabId) {
    this.activeSubTab = subtabId;
    const subnav = document.querySelector(`#${this.containerId} .study-sticky-nav`);
    if (subnav) {
      subnav.querySelectorAll('.study-nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.subtab === subtabId);
      });
    }

    document.querySelectorAll(`#${this.containerId} .study-tab-pane`).forEach(pane => {
      pane.classList.add('hidden');
      pane.classList.remove('active');
    });

    const targetPaneId = `${this.subject}-subtab-${subtabId}`;
    const targetPane = document.getElementById(targetPaneId);
    if (targetPane) {
      targetPane.classList.remove('hidden');
      targetPane.classList.add('active');
    }

    if (subtabId === 'notes') {
      markGoalReadNotes();
    }
    addXP(5, this.subject, `Browsed ${this.subject} ${subtabId} tab`);
  }

  setupSubNav() {
    const subnav = document.querySelector(`#${this.containerId} .study-sticky-nav`);
    if (!subnav) return;
    subnav.querySelectorAll('.study-nav-btn').forEach(btn => {
      btn.onclick = (e) => {
        const targetSubtab = e.currentTarget.dataset.subtab;
        this.switchSubTab(targetSubtab);
      };
    });
  }
}
