import React from 'react';
import { Movie } from '../types';
import MovieCard from './MovieCard';

interface SearchResultsProps {
  query: string;
  results: Movie[];
  onMovieClick: (movie: Movie) => void;
  onClose: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, results, onMovieClick, onClose }) => {
  if (!query) return null;

  return (
    <div className="min-h-screen bg-black pt-20 pb-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-white text-2xl font-bold">
            Search results for "{query}"
          </h1>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Clear search
          </button>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-white text-xl mb-4">No results found</h2>
            <p className="text-gray-400">
              Try searching for something else or check your spelling.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {results.map((movie) => (
              <div key={movie.id} className="w-full">
                <MovieCard
                  movie={movie}
                  onClick={() => onMovieClick(movie)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;