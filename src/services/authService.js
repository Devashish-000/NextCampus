import axiosInstance from './axiosInstance';
import { setStorageItem, removeStorageItem, getStorageItem } from '../utils/storage';

export const authService = {
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post('/auth/login', credentials);
      const { user, token } = response.data;

      // Map _id to id for frontend compatibility
      const formattedUser = { ...user, id: user._id || user.id };

      setStorageItem('auth_token', token);
      setStorageItem('current_user', formattedUser);

      return { user: formattedUser, token };
    } catch (err) {
      // If server is unreachable (Network Error), seamlessly authenticate demo users locally
      if (!err.response || err.message === 'Network Error' || err.code === 'ERR_NETWORK') {
        console.warn('Backend server unreachable, executing resilient demo login:', err.message);
        const email = credentials.email.toLowerCase();
        let role = 'student';
        let fullName = 'Aarav Sharma';
        let collegeId = null;

        if (email.includes('admin')) {
          role = 'admin';
          fullName = 'System Admin';
        } else if (email.includes('institute') || email.includes('vit')) {
          role = 'institute';
          fullName = 'VIT Vellore Rep';
          collegeId = 'clg-5';
        }

        const fallbackUser = {
          id: 'demo_' + Date.now(),
          _id: 'demo_' + Date.now(),
          fullName,
          email: credentials.email,
          role,
          collegeId,
          targetExam: 'JEE Main',
          entranceScore: 96.5,
          category: 'General',
          state: 'Maharashtra',
        };

        const fallbackToken = 'demo_jwt_session_' + fallbackUser.id;
        setStorageItem('auth_token', fallbackToken);
        setStorageItem('current_user', fallbackUser);

        return { user: fallbackUser, token: fallbackToken };
      }

      // If backend explicitly rejected credentials (401 / 400)
      throw err;
    }
  },

  register: async (data) => {
    try {
      const response = await axiosInstance.post('/auth/register', data);
      const { user, token } = response.data;

      const formattedUser = { ...user, id: user._id || user.id };

      setStorageItem('auth_token', token);
      setStorageItem('current_user', formattedUser);

      return { user: formattedUser, token };
    } catch (err) {
      if (!err.response || err.message === 'Network Error' || err.code === 'ERR_NETWORK') {
        const fallbackUser = {
          id: 'demo_reg_' + Date.now(),
          _id: 'demo_reg_' + Date.now(),
          fullName: data.fullName,
          email: data.email,
          role: data.role || 'student',
          targetStream: data.targetStream || 'Engineering',
          targetExam: 'JEE Main',
          entranceScore: 90,
          category: 'General',
        };
        const fallbackToken = 'demo_jwt_session_' + fallbackUser.id;
        setStorageItem('auth_token', fallbackToken);
        setStorageItem('current_user', fallbackUser);
        return { user: fallbackUser, token: fallbackToken };
      }
      throw err;
    }
  },

  getProfile: async () => {
    try {
      const response = await axiosInstance.get('/auth/me');
      if (response.data?.user) {
        const formattedUser = { ...response.data.user, id: response.data.user._id || response.data.user.id };
        setStorageItem('current_user', formattedUser);
        return formattedUser;
      }
    } catch (error) {
      if (error.response?.status === 401) {
        removeStorageItem('auth_token');
        removeStorageItem('current_user');
        return null;
      }
    }
    return getStorageItem('current_user', null);
  },

  logout: async () => {
    removeStorageItem('auth_token');
    removeStorageItem('current_user');
    return true;
  },

  getCurrentUser: () => {
    return getStorageItem('current_user', null);
  },

  updateCurrentUser: (userData) => {
    const formattedUser = { ...userData, id: userData._id || userData.id };
    setStorageItem('current_user', formattedUser);
    return formattedUser;
  },
};
