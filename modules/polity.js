/* ==========================================================================
   Polity Module (modules/polity.js)
   Scalable CMS Learning Module for Polity.
   Delegates rendering to LearningModuleEngine to enforce the strict hierarchy:
   Subject ➔ Module ➔ Chapter ➔ Topic ➔ Learning Blocks.
   ========================================================================== */

import { PolityModularEngine } from './polity-modular-engine.js';

export const polityModule = {
  engine: null,

  async init() {
    if (!this.engine) {
      this.engine = new PolityModularEngine();
    }

    // Load default topic
    await this.engine.loadTopic('historical-underpinnings-and-fundamental-rights');

    // Wire topic selector chips
    this.engine.setupTopicSelector('polity-topic-selector-bar');

    // Wire deep-dive link events from Article Explorer
    document.addEventListener('load-topic', (e) => {
      const topicId = e.detail;
      if (topicId) {
        this.loadTopic(topicId);
        
        // Scroll to top to feel like a new page load
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  },

  async loadTopic(topicId) {
    if (!this.engine) {
      this.engine = new PolityModularEngine();
    }
    await this.engine.loadTopic(topicId);
  }
};
