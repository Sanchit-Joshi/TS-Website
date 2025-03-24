'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  isAdmin: boolean;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signUp: (name: string, email: string, password: string, phone: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await fetch('/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setToken(token);
          } else {
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Error fetching user:', error);
          localStorage.removeItem('token');
        }
        setIsLoading(false);
      };
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const signUp = async (name: string, email: string, password: string, phone: string) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, phone }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        return { error: null };
      }
      return { error: data.message };
    } catch (error) {
      return { error: 'An error occurred during registration' };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        return { error: null };
      }
      return { error: data.message };
    } catch (error) {
      return { error: 'An error occurred during login' };
    }
  };

  const signOut = async () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const resetPassword = async (email: string) => {
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        return { error: null };
      }
      return { error: data.message };
    } catch (error) {
      return { error: 'An error occurred during password reset' };
    }
  };

  const value = {
    user,
    token,
    isLoading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};