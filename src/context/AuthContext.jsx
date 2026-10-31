import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { getStorageItem } from '../utils/storage';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const cachedUser = authService.getCurrentUser();
      const token = getStorageItem('auth_token', null);

      if (cachedUser) {
        setUser(cachedUser);
      }

      if (token) {
        try {
          const freshUser = await authService.getProfile();
          if (freshUser) {
            setUser(freshUser);
          } else if (!cachedUser) {
            setUser(null);
          }
        } catch (err) {
          console.warn('Session verification error:', err.message);
        }
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const res = await authService.login(credentials);
      setUser(res.user);
      toast.success(`Welcome back, ${res.user.fullName}!`);
      return res.user;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Login failed. Check credentials.';
      toast.error(msg);
      throw err;
    }
  };

  const register = async (data) => {
    try {
      const res = await authService.register(data);
      setUser(res.user);
      toast.success('Account created successfully!');
      return res.user;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Registration failed.';
      toast.error(msg);
      throw err;
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    toast.success('Logged out successfully.');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
