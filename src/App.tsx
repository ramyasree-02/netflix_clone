import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import MovieRow from './components/MovieRow';
import VideoPlayer from './components/VideoPlayer';
import MovieModal from './components/MovieModal';
import SearchResults from './components/SearchResults';
import ProfileModal from './components/ProfileModal';
import AuthPage from './components/AuthPage';
import { movies } from './data/movies';
import { Movie } from './types';

const Dashboard: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [showMovieModal, setShowMovieModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const { user, addToRecentlyWatched } = useAuth();
  
  const featuredMovie = movies.find(movie => movie.featured) || movies[0];
  const trendingMovies = movies.filter(movie => movie.category === 'trending');
  const popularMovies = movies.filter(movie => movie.category === 'popular');
  const originalsMovies = movies.filter(movie => movie.category === 'originals');
  const myListMovies = movies.filter(movie => user?.myList.includes(movie.id));
  const recentlyWatchedMovies = movies.filter(movie => user?.recentlyWatched.includes(movie.id));

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setShowMovieModal(true);
  };

  const handlePlayClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setShowVideoPlayer(true);
    addToRecentlyWatched(movie.id);
    setShowMovieModal(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = movies.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.description.toLowerCase().includes(query.toLowerCase()) ||
        movie.genre.some(genre => genre.toLowerCase().includes(query.toLowerCase()))
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  if (searchQuery && searchResults.length >= 0) {
    return (
      <div className="bg-black min-h-screen">
        <Header onSearch={handleSearch} onProfileClick={() => setShowProfileModal(true)} />
        <SearchResults
          query={searchQuery}
          results={searchResults}
          onMovieClick={handleMovieClick}
          onClose={clearSearch}
        />
        
        {/* Modals */}
        {showVideoPlayer && selectedMovie && (
          <VideoPlayer
            movie={selectedMovie}
            onClose={() => setShowVideoPlayer(false)}
          />
        )}
        
        {showMovieModal && selectedMovie && (
          <MovieModal
            movie={selectedMovie}
            onClose={() => setShowMovieModal(false)}
            onPlay={handlePlayClick}
          />
        )}
        
        {showProfileModal && (
          <ProfileModal onClose={() => setShowProfileModal(false)} />
        )}
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <Header onSearch={handleSearch} onProfileClick={() => setShowProfileModal(true)} />
      
      {/* Hero Section */}
      <HeroBanner
        movie={featuredMovie}
        onPlayClick={handlePlayClick}
        onInfoClick={handleMovieClick}
      />

      {/* Movie Rows */}
      <div className="relative -mt-32 z-20 space-y-8 pb-20">
        {trendingMovies.length > 0 && (
          <MovieRow
            title="Trending Now"
            movies={trendingMovies}
            onMovieClick={handleMovieClick}
          />
        )}
        
        {myListMovies.length > 0 && (
          <MovieRow
            title="My List"
            movies={myListMovies}
            onMovieClick={handleMovieClick}
          />
        )}
        
        {recentlyWatchedMovies.length > 0 && (
          <MovieRow
            title="Continue Watching"
            movies={recentlyWatchedMovies}
            onMovieClick={handleMovieClick}
          />
        )}
        
        {popularMovies.length > 0 && (
          <MovieRow
            title="Popular on Netflix"
            movies={popularMovies}
            onMovieClick={handleMovieClick}
          />
        )}
        
        {originalsMovies.length > 0 && (
          <MovieRow
            title="Netflix Originals"
            movies={originalsMovies}
            onMovieClick={handleMovieClick}
          />
        )}
      </div>

      {/* Modals */}
      {showVideoPlayer && selectedMovie && (
        <VideoPlayer
          movie={selectedMovie}
          onClose={() => setShowVideoPlayer(false)}
        />
      )}
      
      {showMovieModal && selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setShowMovieModal(false)}
          onPlay={handlePlayClick}
        />
      )}
      
      {showProfileModal && (
        <ProfileModal onClose={() => setShowProfileModal(false)} />
      )}
    </div>
  );
};

const AppContent: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <AuthPage />;
  }

  return <Dashboard />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;