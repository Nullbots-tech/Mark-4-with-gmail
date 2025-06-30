const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Generate a session ID for analytics
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};

// Contact API
export const contactAPI = {
  submit: async (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/contact/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send message');
    }

    return response.json();
  },
};

// Projects API
export const projectsAPI = {
  getAll: async (filters?: {
    category?: string;
    featured?: boolean;
  }) => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.featured) params.append('featured', 'true');

    const response = await fetch(`${API_BASE_URL}/projects?${params}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }

    return response.json();
  },

  getById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Project not found');
      }
      throw new Error('Failed to fetch project');
    }

    return response.json();
  },

  getCategories: async () => {
    const response = await fetch(`${API_BASE_URL}/projects/meta/categories`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    return response.json();
  },

  like: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}/like`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Failed to like project');
    }

    return response.json();
  },
};

// Newsletter API
export const newsletterAPI = {
  subscribe: async (email: string) => {
    const response = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to subscribe');
    }

    return response.json();
  },

  unsubscribe: async (email: string) => {
    const response = await fetch(`${API_BASE_URL}/newsletter/unsubscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to unsubscribe');
    }

    return response.json();
  },
};

// Analytics API
export const analyticsAPI = {
  track: async (event: string, page: string, projectId?: string) => {
    try {
      await fetch(`${API_BASE_URL}/analytics/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event,
          page,
          projectId,
          referrer: document.referrer,
          sessionId: getSessionId(),
        }),
      });
    } catch (error) {
      // Silently fail analytics tracking
      console.warn('Analytics tracking failed:', error);
    }
  },
};

// Health check
export const healthAPI = {
  check: async () => {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.json();
  },
};