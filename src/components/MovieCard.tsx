import React, { useState } from 'react';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
import { Movie } from '../types';
import { useAuth } from '../context/AuthContext';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { user, addToMyList, removeFromMyList } = useAuth();
  const isInMyList = user?.myList.includes(movie.id) || false;

  const handleMyListClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInMyList) {
      removeFromMyList(movie.id);
    } else {
      addToMyList(movie.id);
    }
  };

  return (
    <div
      className="relative flex-shrink-0 w-64 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:z-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(movie)}
    >
      <div className="relative">
        <img
          src={movie.thumbnail}
          alt={movie.title}
          className="w-full h-36 object-cover rounded-md"
        />
        
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent rounded-md">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-bold text-sm mb-2 line-clamp-1">
                {movie.title}
              </h3>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClick(movie);
                    }}
                    className="bg-white text-black p-1.5 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Play size={14} fill="currentColor" />
                  </button>
                  
                  <button
                    onClick={handleMyListClick}
                    className={`p-1.5 rounded-full border-2 transition-colors ${
                      isInMyList 
                        ? 'bg-white text-black border-white' 
                        : 'text-white border-gray-300 hover:border-white'
                    }`}
                  >
                    <Plus size={14} className={isInMyList ? 'rotate-45' : ''} />
                  </button>
                  
                  <button className="text-white border-gray-300 border-2 p-1.5 rounded-full hover:border-white transition-colors">
                    <ThumbsUp size={14} />
                  </button>
                </div>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick(movie);
                  }}
                  className="text-white border-gray-300 border-2 p-1.5 rounded-full hover:border-white transition-colors"
                >
                  <ChevronDown size={14} />
                </button>
              </div>
              
              <div className="flex items-center space-x-2 mt-2 text-xs">
                <span className="text-green-400 font-bold">{movie.rating * 10}% Match</span>
                <span className="text-gray-300">{movie.year}</span>
                <span className="text-gray-300">{movie.duration}</span>
              </div>
              
              <div className="flex flex-wrap gap-1 mt-1">
                {movie.genre.slice(0, 2).map((genre, index) => (
                  <span key={index} className="text-gray-300 text-xs">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;