import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for a token and fetch user details
    const verifyUser = async () => {
      const token = localStorage.getItem('leadflow_token');
      if (token) {
        try {
          // You could have an endpoint like /api/auth/profile, or we just rely on local storage for simple setup
          // Let's use the local storage user if it exists to avoid flashing
          const storedUser = localStorage.getItem('leadflow_user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
          
          // Optionally fetch from backend to get fresh data
          const res = await api.get('/auth/profile');
          if (res.data.success) {
            setUser(res.data.data);
            localStorage.setItem('leadflow_user', JSON.stringify(res.data.data));
          }
        } catch (error) {
          console.error("Failed to verify user", error);
          logout();
        }
      }
      setLoading(false);
    };

    verifyUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        const { token, user: userData } = res.data.data;
        setUser(userData);
        localStorage.setItem('leadflow_token', token);
        localStorage.setItem('leadflow_user', JSON.stringify(userData));
        return userData;
      }
    } catch (error) {
      throw error.response?.data?.error ? new Error(error.response.data.error) : new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('leadflow_token');
    localStorage.removeItem('leadflow_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
