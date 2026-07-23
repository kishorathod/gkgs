/* ==========================================================================
   Science Module (modules/science.js)
   Modular architecture adapter for Science Lab.
   ========================================================================== */

import { scienceModularEngine } from './science-modular-engine.js';

export const scienceModule = {
  activeTab: "cell",

  init() {
    scienceModularEngine.init();
  },

  switchTab(tab) {
    scienceModularEngine.switchTab(tab);
  },

  loadTopic(topicId) {
    scienceModularEngine.loadTopic(topicId);
  }
};
