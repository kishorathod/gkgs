/* ==========================================================================
   modules/api-service.js — Centralised Frontend API Client
   Single HTTP client communicating with backend routes.
   ========================================================================== */

class ApiService {
  getToken() {
    return localStorage.getItem('gkgs_auth_token');
  }

  /**
   * Decode a JWT payload without verifying signature (client-side only).
   * Returns null if the token is missing, malformed, or expired.
   */
  isTokenValid() {
    const token = this.getToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // exp is in seconds; Date.now() is in ms
      return payload.exp && payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  /**
   * Clear stale credentials and notify the app to show login overlay.
   * Safe to call multiple times (no-op if already logged out).
   */
  _handleAuthFailure() {
    const hadToken = !!this.getToken();
    localStorage.removeItem('gkgs_auth_token');
    localStorage.removeItem('gkgs_user');
    if (hadToken) {
      window.dispatchEvent(new CustomEvent('auth:session-expired'));
    }
  }

  async request(endpoint, options = {}) {
    // Bail immediately (without a network round-trip) if the token is already expired
    const token = this.getToken();
    if (token && !this.isTokenValid()) {
      this._handleAuthFailure();
      throw new Error('Session expired. Please log in again.');
    }

    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(endpoint, {
        ...options,
        headers
      });

      // 401 = no token / 403 = invalid / expired token
      if (response.status === 401 || response.status === 403) {
        this._handleAuthFailure();
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Session expired. Please log in again.');
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      // Only log non-auth errors to avoid console noise after logout
      if (!err.message.includes('Session expired')) {
        console.warn(`ApiService Request Failed [${endpoint}]:`, err.message);
      }
      throw err;
    }
  }

  // Fetch full database-driven dashboard payload
  async getDashboard() {
    return await this.request('/api/dashboard');
  }

  // Trigger a user action (module visit, read notes, quiz, flashcard, etc.)
  async triggerAction(type, payload = {}) {
    return await this.request(`/api/actions/${type}`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  // Action helpers
  async visitModule(subject) {
    return await this.triggerAction('visit-module', { subject });
  }

  async readNotes(subject, sectionId) {
    return await this.triggerAction('read-notes', { subject, sectionId });
  }

  async completeQuiz(subject, questionsAttempted, correctAnswers, score, duration = 0) {
    return await this.triggerAction('quiz-complete', {
      subject,
      questionsAttempted,
      correctAnswers,
      score,
      duration
    });
  }

  async completeFlashcards(cardsReviewed, correctCount, subject = 'general', duration = 0) {
    return await this.triggerAction('flashcard-session', {
      cardsReviewed,
      correctCount,
      subject,
      duration
    });
  }

  async recordFileUpload(subject, fileName) {
    return await this.triggerAction('file-upload', { subject, fileName });
  }

  async endStudySession(subject = 'general', durationMinutes = 1) {
    return await this.triggerAction('session-end', { subject, durationMinutes });
  }

  async getTopic(topicId = 'revolt-of-1857') {
    return await this.request(`/api/topics/${topicId}`);
  }

  async getPolitySection(topicId, sectionName) {
    return await this.request(`/api/polity/topics/${topicId}/sections/${sectionName}`);
  }
}

export const api = new ApiService();
