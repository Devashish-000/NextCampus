import axios from 'axios';
import { getStorageItem } from '../utils/storage';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor: attach mock bearer token if logged in
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getStorageItem('auth_token', null);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: simulated network response or handling errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized access request - redirecting to login if needed');
    }
    return Promise.reject(error);
  }
);

// Mock Delay Helper to simulate realistic API loading states
export const mockApiDelay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export default axiosInstance;
