/* ==========================================================================
   Document Uploads Module - MongoDB REST API Edition (modules/uploads.js)
   Integrates document upload interface with Express backend APIs.
   All data is stored locally in MongoDB instead of browser sandbox.
   ========================================================================== */

import { addXP, markGoalUpload } from '../app.js';

// Subject configurations matching DOM IDs and tab structures
const SUBJECT_CONFIG = {
  history: {
    panes: ['history-timeline-tab-content', 'history-notes-tab-content'],
    tabClass: 'history-tab-btn'
  },
  polity: {
    panes: ['polity-articles-tab-content', 'polity-notes-tab-content'],
    tabClass: 'polity-tab-btn'
  },
  geography: {
    panes: ['geography-map-tab-content', 'geography-notes-tab-content'],
    tabClass: 'geography-tab-btn'
  },
  science: {
    panes: ['science-cell-tab-content', 'science-notes-tab-content'],
    tabClass: 'science-tab-btn'
  },
  economy: {
    panes: ['economy-interactive-tab-content', 'economy-notes-tab-content'],
    tabClass: 'economy-tab-btn'
  },
  staticgk: {
    panes: ['staticgk-interactive-tab-content', 'staticgk-notes-tab-content'],
    tabClass: 'staticgk-tab-btn'
  },
  currentaffairs: {
    panes: ['ca-interactive-tab-content', 'ca-notes-tab-content'],
    tabClass: 'ca-tab-btn'
  }
};

// Initialize the uploads module
export const uploadsModule = {
  async init() {
    try {
      this.injectPreviewModal();
      this.injectUploadsUI();
      console.log("uploadsModule (MongoDB API Edition) initialized successfully");
    } catch (err) {
      console.error("Failed to initialize uploadsModule:", err);
    }
  },

  // ── Inject Preview Modal ──────────────────────────────────────────────
  injectPreviewModal() {
    if (document.getElementById('uploads-preview-modal')) return;
    
    const modalHtml = `
      <div class="modal" id="uploads-preview-modal">
        <div class="glass-card modal-content uploads-modal-content">
          <span class="close-modal" id="close-uploads-preview-modal">&times;</span>
          <h3 id="uploads-modal-title" style="margin-bottom: 12px; font-family: 'Space Grotesk', sans-serif;">Preview File</h3>
          <div id="uploads-modal-body" style="height: calc(100% - 60px); overflow: auto; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
            <!-- Content will be injected dynamically -->
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Bind close events
    const modal = document.getElementById('uploads-preview-modal');
    const closeBtn = document.getElementById('close-uploads-preview-modal');
    
    const closeModal = () => {
      modal.classList.remove('active');
      const body = document.getElementById('uploads-modal-body');
      body.innerHTML = ''; // Clear preview to release memory/stop PDFs
    };

    closeBtn?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  },

  // ── Dynamic UI Injection into Subject Sections ────────────────────────
  injectUploadsUI() {
    Object.keys(SUBJECT_CONFIG).forEach(subject => {
      const viewPanel = document.getElementById(`view-${subject}`);
      if (!viewPanel) return;

      const header = viewPanel.querySelector('.polity-tab-header');
      if (!header) return;

      // 1. Inject tab button
      const uploadsBtn = document.createElement('button');
      uploadsBtn.className = `polity-tab-btn ${SUBJECT_CONFIG[subject].tabClass}`;
      uploadsBtn.dataset.tab = 'uploads';
      uploadsBtn.innerHTML = '📁 Study Files';
      header.appendChild(uploadsBtn);

      // Hide uploads pane when another tab is selected by each module's own switchTab
      // Ensure uploads pane also hides correctly by having it react to active-tab changes

      // 2. Inject uploads tab content pane
      const uploadsPane = document.createElement('div');
      uploadsPane.id = `${subject}-uploads-tab-content`;
      uploadsPane.className = 'hidden uploads-tab-pane';
      uploadsPane.innerHTML = `
        <div class="glass-card upload-container" style="padding: 24px; margin-top: 16px;">
          <div class="upload-dropzone" id="${subject}-dropzone">
            <span class="upload-icon" style="font-size: 32px; display: block; margin-bottom: 8px;">📤</span>
            <h4>Drag & drop study files here or click to browse</h4>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Supports PDF and images (Max 15MB)</p>
            <input type="file" class="hidden-file-input" id="${subject}-file-input" accept="application/pdf, image/*" multiple style="display: none;">
          </div>
          <div class="uploaded-files-section" style="margin-top: 24px;">
            <h4 class="files-title" style="margin-bottom: 12px; font-family: 'Space Grotesk', sans-serif;">📁 My Custom Study Materials (MongoDB)</h4>
            <div class="files-grid" id="${subject}-files-grid">
              <!-- Dynamically populated files -->
            </div>
          </div>
        </div>
      `;
      viewPanel.appendChild(uploadsPane);

      // 3. Setup File Drag & Drop + Input Events
      this.setupUploadEvents(subject);

      // 4. Hook into Tab Switch Event Listeners
      this.setupTabSwitching(subject, header, uploadsBtn, uploadsPane);
    });
  },

  // ── Tab Event Listeners & Transitions ─────────────────────────────────
  setupTabSwitching(subject, header, uploadsBtn, uploadsPane) {
    const originalButtons = header.querySelectorAll(`button:not([data-tab="uploads"])`);
    const allPanes = SUBJECT_CONFIG[subject].panes;

    // Click uploads tab
    uploadsBtn.addEventListener('click', () => {
      // Toggle button active state
      header.querySelectorAll('.polity-tab-btn').forEach(btn => btn.classList.remove('active'));
      uploadsBtn.classList.add('active');

      // Hide original panes
      allPanes.forEach(paneId => {
        document.getElementById(paneId)?.classList.add('hidden');
      });

      // Show uploads pane
      uploadsPane.classList.remove('hidden');

      // Render files list from local MongoDB backend
      this.renderUploadedFiles(subject);

      addXP(5);
    });

    // When clicking any original buttons, hide our uploads pane
    originalButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        uploadsBtn.classList.remove('active');
        uploadsPane.classList.add('hidden');
      });
    });
  },

  // ── Upload Event Handlers ─────────────────────────────────────────────
  setupUploadEvents(subject) {
    const dropzone = document.getElementById(`${subject}-dropzone`);
    const fileInput = document.getElementById(`${subject}-file-input`);

    if (!dropzone || !fileInput) return;

    // Clicking dropzone triggers file input
    dropzone.addEventListener('click', () => fileInput.click());

    // Highlight dropzone on dragover
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('drag-over');
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('drag-over');
    });

    // Handle dropped files
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('drag-over');
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        this.handleFilesUpload(subject, files);
      }
    });

    // Handle file selection via explorer
    fileInput.addEventListener('change', (e) => {
      const files = e.target.files;
      if (files.length > 0) {
        this.handleFilesUpload(subject, files);
      }
    });
  },

  async handleFilesUpload(subject, files) {
    let successCount = 0;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validate file size (15MB max)
      if (file.size > 15 * 1024 * 1024) {
        alert(`File "${file.name}" exceeds the 15MB size limit.`);
        continue;
      }

      // Validate file type
      if (file.type !== 'application/pdf' && !file.type.startsWith('image/')) {
        alert(`Unsupported file type: "${file.name}". Please upload PDFs or Images.`);
        continue;
      }

      try {
        await this.saveFileToServer(subject, file);
        successCount++;
      } catch (err) {
        console.error("Error saving file:", err);
      }
    }

    if (successCount > 0) {
      addXP(successCount * 10, subject, `Uploaded ${successCount} study file(s) to ${subject}`);
      markGoalUpload(); // Mark upload goal complete
      this.renderUploadedFiles(subject);
    }
  },

  // ── REST API Calls to MongoDB Backend ──────────────────────────────────
  async saveFileToServer(subject, file) {
    const token = localStorage.getItem('gkgs_auth_token');
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`/api/uploads/${subject}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Failed to upload file to backend');
    }
    return response.json();
  },

  async getFilesFromServer(subject) {
    const token = localStorage.getItem('gkgs_auth_token');
    const response = await fetch(`/api/uploads/${subject}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch uploads list from backend');
    }
    return response.json();
  },

  async deleteFileFromServer(id) {
    const token = localStorage.getItem('gkgs_auth_token');
    const response = await fetch(`/api/files/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to delete file from backend');
    }
    return response.json();
  },

  // ── Rendering Listings & Preview Cards ────────────────────────────────
  async renderUploadedFiles(subject) {
    const grid = document.getElementById(`${subject}-files-grid`);
    if (!grid) return;

    grid.innerHTML = '<div style="color: var(--text-muted); text-align: center; padding: 20px;">Loading files from MongoDB...</div>';

    try {
      const files = await this.getFilesFromServer(subject);
      grid.innerHTML = '';

      if (files.length === 0) {
        grid.innerHTML = `
          <div style="grid-column: span 12; text-align: center; padding: 32px; color: var(--text-muted); border: 1px dashed rgba(255,255,255,0.05); border-radius: 8px;">
            🔍 No uploaded files yet. Drag and drop materials here to study.
          </div>
        `;
        return;
      }

      files.forEach(file => {
        const fileCard = document.createElement('div');
        fileCard.className = 'glass-card file-card';
        
        const token = localStorage.getItem('gkgs_auth_token');
        const fileUrl = `/api/files/${file._id}?token=${token}`;

        const fileSizeKB = (file.size / 1024).toFixed(1);
        const fileSizeStr = fileSizeKB > 1024 ? `${(fileSizeKB / 1024).toFixed(1)} MB` : `${fileSizeKB} KB`;
        const uploadDate = new Date(file.uploadedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

        // Decide icon / thumbnail
        let thumbnailHtml = '';
        if (file.type.startsWith('image/')) {
          thumbnailHtml = `<img src="${fileUrl}" class="file-card-img" alt="File Thumbnail">`;
        } else {
          thumbnailHtml = `<div class="file-card-pdf-icon">📕<br><span style="font-size: 10px; font-weight:700;">PDF</span></div>`;
        }

        fileCard.innerHTML = `
          <div class="file-card-thumbnail">
            ${thumbnailHtml}
          </div>
          <div class="file-card-info">
            <h5 class="file-card-name" title="${file.name}">${file.name}</h5>
            <div class="file-card-meta">${fileSizeStr} • ${uploadDate}</div>
          </div>
          <div class="file-card-actions">
            <button class="file-action-btn view" title="Preview File">👁️ Preview</button>
            <a href="${fileUrl}" download="${file.name}" class="file-action-btn download" title="Download File">📥 Save</a>
            <button class="file-action-btn delete" title="Delete File">🗑️ Delete</button>
          </div>
        `;

        // Action Handlers
        fileCard.querySelector('.view').addEventListener('click', () => this.previewFile(file.name, file.type, fileUrl));
        fileCard.querySelector('.delete').addEventListener('click', async () => {
          if (confirm(`Are you sure you want to delete "${file.name}"?`)) {
            try {
              await this.deleteFileFromServer(file._id);
              this.renderUploadedFiles(subject);
            } catch (err) {
              console.error("Delete failed:", err);
            }
          }
        });

        grid.appendChild(fileCard);
      });
    } catch (err) {
      grid.innerHTML = `<div style="color: #ef4444; padding: 20px;">Error loading files: ${err.message}</div>`;
    }
  },

  // ── Preview Logic ─────────────────────────────────────────────────────
  previewFile(name, type, url) {
    const modal = document.getElementById('uploads-preview-modal');
    const title = document.getElementById('uploads-modal-title');
    const body = document.getElementById('uploads-modal-body');

    if (!modal || !body) return;

    title.textContent = name;
    body.innerHTML = '';

    if (type === 'application/pdf') {
      body.innerHTML = `<iframe src="${url}" style="width: 100%; height: 100%; border: none; border-radius: 8px;"></iframe>`;
    } else if (type.startsWith('image/')) {
      body.innerHTML = `<img src="${url}" style="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 8px;">`;
    }

    modal.classList.add('active');
  }
};
