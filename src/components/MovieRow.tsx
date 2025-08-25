import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import { Movie } from '../types';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies, onMovieClick }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;

      rowRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });

      setTimeout(() => {
        if (rowRef.current) {
          const { scrollLeft, clientWidth, scrollWidth } = rowRef.current;
          setShowLeftArrow(scrollLeft > 0);
          setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
      }, 300);
    }
  };

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <div className="mb-8 group">
      <h2 className="text-white text-xl font-bold mb-4 px-4 sm:px-6 lg:px-8">
        {title}
      </h2>
      
      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-black/90"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-black/90"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Movies Container */}
        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex space-x-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => onMovieClick(movie)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;