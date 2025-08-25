export interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  category: string;
  rating: number;
  year: number;
  duration: string;
  genre: string[];
  featured?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  myList: string[];
  recentlyWatched: string[];
  subscription: 'basic' | 'standard' | 'premium';
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addToMyList: (movieId: string) => void;
  removeFromMyList: (movieId: string) => void;
  addToRecentlyWatched: (movieId: string) => void;
}