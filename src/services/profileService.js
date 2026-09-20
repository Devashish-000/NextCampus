import axiosInstance from './axiosInstance';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { authService } from './authService';

export const profileService = {
  getProfile: async () => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || !currentUser.id) return null;
    
    const response = await axiosInstance.get(`/profile/${currentUser.id}`);
    const updatedUser = { ...response.data, id: response.data._id };
    
    // Sync local storage with latest profile data from DB
    authService.updateCurrentUser(updatedUser);
    
    return updatedUser;
  },

  updateProfile: async (updatedData) => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || !currentUser.id) throw new Error('Not logged in');
    
    const response = await axiosInstance.put(`/profile/${currentUser.id}`, updatedData);
    const updatedUser = { ...response.data, id: response.data._id };
    
    // Sync local storage
    authService.updateCurrentUser(updatedUser);
    
    return updatedUser;
  }
};
