import { mockApiDelay } from './axiosInstance';
import { getStorageItem, setStorageItem } from '../utils/storage';

export const profileService = {
  getProfile: async () => {
    await mockApiDelay(300);
    const user = getStorageItem('current_user', {
      id: 'usr-789',
      fullName: 'Aarav Sharma',
      email: 'aarav.sharma@example.com',
      phone: '9876543210',
      city: 'Bengaluru',
      state: 'Karnataka',
      targetExam: 'JEE Advanced',
      entranceScore: 98.4,
      budgetMax: 1200000,
      preferredStreams: ['Engineering'],
      bio: 'Aspiring AI engineer passionate about machine learning & cloud infrastructure.',
    });
    return user;
  },

  updateProfile: async (updatedData) => {
    await mockApiDelay(500);
    const existing = getStorageItem('current_user', {});
    const newProfile = { ...existing, ...updatedData };
    setStorageItem('current_user', newProfile);
    return newProfile;
  }
};
