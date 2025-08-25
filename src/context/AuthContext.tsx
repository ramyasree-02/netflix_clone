import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('netflix-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'demo@netflix.com' && password === 'password') {
      const newUser: User = {
        id: '1',
        name: 'Demo User',
        email,
        myList: [],
        recentlyWatched: [],
        subscription: 'premium'
      };
      setUser(newUser);
      localStorage.setItem('netflix-user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      myList: [],
      recentlyWatched: [],
      subscription: 'basic'
    };
    setUser(newUser);
    localStorage.setItem('netflix-user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('netflix-user');
  };

  const addToMyList = (movieId: string) => {
    if (user && !user.myList.includes(movieId)) {
      const updatedUser = { ...user, myList: [...user.myList, movieId] };
      setUser(updatedUser);
      localStorage.setItem('netflix-user', JSON.stringify(updatedUser));
    }
  };

  const removeFromMyList = (movieId: string) => {
    if (user) {
      const updatedUser = { ...user, myList: user.myList.filter(id => id !== movieId) };
      setUser(updatedUser);
      localStorage.setItem('netflix-user', JSON.stringify(updatedUser));
    }
  };

  const addToRecentlyWatched = (movieId: string) => {
    if (user) {
      const recentlyWatched = [movieId, ...user.recentlyWatched.filter(id => id !== movieId)].slice(0, 10);
      const updatedUser = { ...user, recentlyWatched };
      setUser(updatedUser);
      localStorage.setItem('netflix-user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    addToMyList,
    removeFromMyList,
    addToRecentlyWatched
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};