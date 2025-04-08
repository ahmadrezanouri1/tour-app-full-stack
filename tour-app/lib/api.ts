import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Create axios instance with default config
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for CSRF token
});

// Function to get CSRF token
const getCSRFToken = () => {
  const name = 'csrftoken';
  let cookieValue = null;
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

// Add request interceptor to include auth token and CSRF token
api.interceptors.request.use((config) => {
  // Add CSRF token
  const csrfToken = getCSRFToken();
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }

  // Add auth token if available
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('adminToken');
      if (typeof window !== 'undefined') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Types
export interface Tour {
  id: number;
  title: string;
  description: string;
  destination: Destination;
  duration: number;
  price: number;
  season: string;
  type: string;
  included_services: string[];
  excluded_services: string[];
  images: TourImage[];
  hotels: Hotel[];
}

export interface Destination {
  id: number;
  name: string;
  description: string;
  image: string;
  country: string;
  type: 'city' | 'region';
  attractions: string;
  climate: string;
  latitude?: string;
  longitude?: string;
}

export interface Hotel {
  id: number;
  name: string;
  description: string;
  address: string;
  rating: number;
  amenities: string[];
  price_per_night: number;
  image: string;
}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  image: string | null;
  author: number;  // User ID
  created_at: string;
  updated_at: string;
  category: number | null;  // Category ID
  is_published: boolean;
  tags: string;
  slug: string;
  views: number;
  comments?: Comment[];
}

export interface Comment {
  id: number;
  post: number;
  author: number;
  content: string;
  created_at: string;
  is_approved: boolean;
  parent: number | null;
}

export interface TourImage {
  id: number;
  image: string;
  tour: number;
  created_at: string;
}

// Admin API functions
export const adminAPI = {
  // Auth
  login: async (credentials: { username: string; password: string }) => {
    try {
      // First, get the CSRF token
      await api.get('/csrf/');
      
      // Then attempt login
      const response = await api.post('/auth/login/', credentials);
      const token = response.data.key || response.data.token;
      if (token) {
        localStorage.setItem('adminToken', token);
        api.defaults.headers.common['Authorization'] = `Token ${token}`;
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('adminToken');
      delete api.defaults.headers.common['Authorization'];
      if (typeof window !== 'undefined') {
        window.location.href = '/admin/login';
      }
    }
  },

  // Tours
  createTour: async (data: FormData) => {
    try {
      const response = await api.post('/tours/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating tour:', error);
      throw error;
    }
  },

  updateTour: async (id: number, data: FormData) => {
    const response = await api.put(`/tours/${id}/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteTour: async (id: number) => {
    await api.delete(`/tours/${id}/`);
  },

  // Destinations
  getAllDestinations: async () => {
    try {
      const response = await api.get('/destinations/destinations/');
      // Handle both array and paginated responses
      return Array.isArray(response.data) ? response.data : response.data.results || [];
    } catch (error) {
      console.error('Error fetching destinations:', error);
      return [];
    }
  },

  createDestination: async (data: FormData) => {
    const response = await api.post('/destinations/destinations/', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateDestination: async (id: number, data: FormData) => {
    try {
      // Log the FormData contents for debugging
      console.log(`Updating destination ${id} with data:`);
      for (const [key, value] of data.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await api.patch(`/destinations/destinations/${id}/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating destination ${id}:`, error);
      throw error;
    }
  },

  deleteDestination: async (id: number) => {
    const response = await api.delete(`/destinations/destinations/${id}/`);
    return response.data;
  },

  // Blog Posts
  createBlogPost: async (data: FormData) => {
    try {
      // Log the FormData contents for debugging
      console.log('Creating blog post with data:');
      for (const [key, value] of data.entries()) {
        console.log(`${key}: ${value}`);
      }
      
      const response = await api.post('/blog/posts/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating blog post:', error);
      throw error;
    }
  },

  updateBlogPost: async (id: number, data: FormData) => {
    try {
      // Log the FormData contents for debugging
      console.log(`Updating blog post ${id} with data:`);
      for (const [key, value] of data.entries()) {
        console.log(`${key}: ${value}`);
      }
      
      const response = await api.put(`/blog/posts/${id}/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating blog post ${id}:`, error);
      throw error;
    }
  },

  deleteBlogPost: async (id: number) => {
    await api.delete(`/blog/posts/${id}/`);
  },

  // Users
  getUsers: async () => {
    try {
      // Since there's no dedicated users API, we'll use a hardcoded list of admin users
      // In a real app, you would create a proper users API endpoint
      return [
        { id: 1, username: 'admin' },
        { id: 2, username: 'editor' }
      ];
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  },

  // Categories
  getCategories: async () => {
    try {
      // Since there's no categories API, we'll use a hardcoded list of categories
      // In a real app, you would create a proper categories API endpoint
      return [
        { id: 1, name: 'سفر' },
        { id: 2, name: 'گردشگری' },
        { id: 3, name: 'هتل' },
        { id: 4, name: 'رستوران' },
        { id: 5, name: 'فرهنگ' }
      ];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },
};

// Public API functions
export const tourAPI = {
  getAllTours: async () => {
    try {
      const response = await api.get('/tours/');
      // Handle both array and paginated responses
      return Array.isArray(response.data) ? response.data : response.data.results || [];
    } catch (error) {
      console.error('Error fetching tours:', error);
      return [];
    }
  },

  getTourById: async (id: number) => {
    const response = await api.get(`/tours/${id}/`);
    return response.data;
  },

  getAllDestinations: async () => {
    try {
      const response = await api.get('/destinations/destinations/');
      // Handle both array and paginated responses
      return Array.isArray(response.data) ? response.data : response.data.results || [];
    } catch (error) {
      console.error('Error fetching destinations:', error);
      return [];
    }
  },

  getDestinationById: async (id: number) => {
    const response = await api.get(`/destinations/${id}/`);
    return response.data;
  },

  getAllBlogPosts: async () => {
    try {
      const response = await api.get('/blog/posts/');
      // Ensure we return an array, even if the API returns an object
      return Array.isArray(response.data) ? response.data : response.data.results || [];
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  },

  getBlogPostById: async (id: number) => {
    const response = await api.get(`/blog/posts/${id}/`);
    return response.data;
  },
}; 