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

    // Load default topic 'revolt-of-1857' from backend API
    await this.engine.loadTopic('revolt-of-1857');
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
