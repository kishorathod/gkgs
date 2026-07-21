/* ==========================================================================
   modules/api-service.js — Centralised Frontend API Client
   Single HTTP client communicating with backend routes.
   ========================================================================== */

class ApiService {
  getToken() {
    return localStorage.getItem('gkgs_auth_token');
  }

  async request(endpoint, options = {}) {
    const token = this.getToken();
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

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      console.warn(`ApiService Request Failed [${endpoint}]:`, err.message);
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
}

export const api = new ApiService();
