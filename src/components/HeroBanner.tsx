import React, { useState, useEffect } from 'react';
import { Play, Info, Volume2, VolumeX } from 'lucide-react';
import { Movie } from '../types';

interface HeroBannerProps {
  movie: Movie;
  onPlayClick: (movie: Movie) => void;
  onInfoClick: (movie: Movie) => void;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ movie, onPlayClick, onInfoClick }) => {
  const [muted, setMuted] = useState(true);

  return (
    <div className="relative h-screen flex items-center justify-start">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${movie.thumbnail})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 leading-tight">
            {movie.title}
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed line-clamp-3">
            {movie.description}
          </p>

          <div className="flex items-center space-x-4 mb-8">
            <span className="bg-yellow-500 text-black px-2 py-1 rounded text-sm font-bold">
              ★ {movie.rating}
            </span>
            <span className="text-gray-300">{movie.year}</span>
            <span className="text-gray-300">{movie.duration}</span>
            <div className="flex space-x-1">
              {movie.genre.slice(0, 3).map((genre, index) => (
                <span key={index} className="text-gray-300 text-sm">
                  {genre}{index < movie.genre.slice(0, 3).length - 1 && ' •'}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => onPlayClick(movie)}
              className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded font-bold hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
            >
              <Play size={20} fill="currentColor" />
              <span>Play</span>
            </button>

            <button
              onClick={() => onInfoClick(movie)}
              className="flex items-center space-x-2 bg-gray-600/70 text-white px-8 py-3 rounded font-bold hover:bg-gray-600/90 transition-all duration-200 backdrop-blur-sm"
            >
              <Info size={20} />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>

      {/* Volume Control */}
      <button
        onClick={() => setMuted(!muted)}
        className="absolute bottom-8 right-8 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors backdrop-blur-sm"
      >
        {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </div>
  );
};

export default HeroBanner;