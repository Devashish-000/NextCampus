import axiosInstance from './axiosInstance';
import { setStorageItem, removeStorageItem, getStorageItem } from '../utils/storage';

export const authService = {
  login: async (credentials) => {
    const response = await axiosInstance.post('/auth/login', credentials);
    const { user, token } = response.data;
    
    // Map _id to id for frontend compatibility
    const formattedUser = { ...user, id: user._id };
    
    setStorageItem('auth_token', token);
    setStorageItem('current_user', formattedUser);
    
    return { user: formattedUser, token };
  },

  register: async (data) => {
    const response = await axiosInstance.post('/auth/register', data);
    const { user, token } = response.data;
    
    const formattedUser = { ...user, id: user._id };
    
    setStorageItem('auth_token', token);
    setStorageItem('current_user', formattedUser);
    
    return { user: formattedUser, token };
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
  }
};
