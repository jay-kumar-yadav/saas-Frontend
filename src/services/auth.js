import api from './api';

export const authAPI = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      if (error.response) {
        // Server responded with error status
        throw new Error(error.response.data.message || 'Login failed');
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('Server not responding. Please make sure the backend is running.');
      } else {
        // Something else happened
        throw new Error('Login failed: ' + error.message);
      }
    }
  },
  
  getMe: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        throw new Error('Session expired. Please login again.');
      }
      throw error;
    }
  },
};