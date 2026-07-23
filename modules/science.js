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
    if (scienceModularEngine.switchSubTab) {
      scienceModularEngine.switchSubTab(tab);
    }
  },

  loadTopic(topicId) {
    scienceModularEngine.loadTopic(topicId);
  }
};
