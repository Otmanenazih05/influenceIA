import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api, { setMemoryToken, getMemoryToken } from '../lib/api';

interface User {
  id: number;
  email: string;
  role: 'influencer' | 'brand';
  name?: string; // from users table
  influencer_profile?: any;
  brand_profile?: any;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initial check on load
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = getMemoryToken();
      if (storedToken) {
        setToken(storedToken);
        await checkAuth();
      } else {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = (newToken: string, newUser: User) => {
    setMemoryToken(newToken);
    setToken(newToken);
    setUser(newUser);
  };

  const logout = async () => {
    if (getMemoryToken()) {
      try {
        await api.post('/api/auth/logout');
      } catch (e) {
        console.error('Logout failed', e);
      }
    }
    setMemoryToken(null);
    setToken(null);
    setUser(null);
  };

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      if (getMemoryToken()) {
        const response = await api.get('/api/auth/me');
        setUser(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch user', error);
      setMemoryToken(null);
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Optional: Global interceptor for 401s to log out automatically
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // Token expired or invalid
          setMemoryToken(null);
          setToken(null);
          setUser(null);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
