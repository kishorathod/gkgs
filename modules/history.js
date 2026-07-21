/* ==========================================================================
   History Module (modules/history.js)
   Scalable CMS Learning Module for History.
   Delegates rendering to LearningModuleEngine to enforce the strict hierarchy:
   Subject ➔ Module ➔ Chapter ➔ Topic ➔ Learning Blocks.
   ========================================================================== */

import { LearningModuleEngine } from './learning-module.js';

export const historyModule = {
  engine: null,

  async init() {
    if (!this.engine) {
      this.engine = new LearningModuleEngine({
        subject: 'history',
        containerId: 'view-history'
      });
    }

    // Load default topic — Arrival of Europeans
    await this.engine.loadTopic('arrival-of-europeans');

    // Wire topic selector chips
    this.engine.setupTopicSelector('history-topic-selector-bar');
  },

  async loadTopic(topicId) {
    if (!this.engine) {
      this.engine = new LearningModuleEngine({
        subject: 'history',
        containerId: 'view-history'
      });
    }
    await this.engine.loadTopic(topicId);
  }
};
