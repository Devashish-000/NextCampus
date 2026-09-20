import { mockApiDelay } from './axiosInstance';
import { setStorageItem, removeStorageItem, getStorageItem } from '../utils/storage';

export const authService = {
  login: async (credentials) => {
    await mockApiDelay(500);
    
    // Simulate user authentication
    const mockUser = {
      id: 'usr-789',
      fullName: credentials.email.startsWith('admin') ? 'System Admin' : 'Aarav Sharma',
      email: credentials.email,
      role: credentials.email.startsWith('admin') ? 'admin' : 'student',
      targetStream: 'Engineering',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      savedCollegesCount: 4,
      profileCompleted: 85,
    };
    
    const mockToken = 'mock_jwt_token_' + Math.random().toString(36).substring(2);
    setStorageItem('auth_token', mockToken);
    setStorageItem('current_user', mockUser);
    
    return { user: mockUser, token: mockToken };
  },

  register: async (data) => {
    await mockApiDelay(600);
    const mockUser = {
      id: 'usr-' + Date.now(),
      fullName: data.fullName,
      email: data.email,
      role: data.role || 'student',
      targetStream: data.targetStream || 'Engineering',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      savedCollegesCount: 0,
      profileCompleted: 50,
    };
    const mockToken = 'mock_jwt_token_' + Math.random().toString(36).substring(2);
    setStorageItem('auth_token', mockToken);
    setStorageItem('current_user', mockUser);
    
    return { user: mockUser, token: mockToken };
  },

  logout: async () => {
    await mockApiDelay(300);
    removeStorageItem('auth_token');
    removeStorageItem('current_user');
    return true;
  },

  getCurrentUser: () => {
    return getStorageItem('current_user', null);
  }
};
