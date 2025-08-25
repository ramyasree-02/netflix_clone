import React from 'react';
import { X, Play, Plus, ThumbsUp, Star } from 'lucide-react';
import { Movie } from '../types';
import { useAuth } from '../context/AuthContext';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
  onPlay: (movie: Movie) => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose, onPlay }) => {
  const { user, addToMyList, removeFromMyList } = useAuth();
  const isInMyList = user?.myList.includes(movie.id) || false;

  const handleMyListClick = () => {
    if (isInMyList) {
      removeFromMyList(movie.id);
    } else {
      addToMyList(movie.id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header Image */}
        <div className="relative">
          <img
            src={movie.thumbnail}
            alt={movie.title}
            className="w-full h-80 object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent rounded-t-lg" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white bg-gray-900/70 p-2 rounded-full hover:bg-gray-900 transition-colors"
          >
            <X size={24} />
          </button>

          {/* Title and Action Buttons */}
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="text-white text-3xl font-bold mb-4">{movie.title}</h2>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onPlay(movie)}
                className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded font-bold hover:bg-gray-200 transition-colors"
              >
                <Play size={20} fill="currentColor" />
                <span>Play</span>
              </button>

              <button
                onClick={handleMyListClick}
                className={`flex items-center space-x-2 px-6 py-3 rounded font-bold transition-colors border-2 ${
                  isInMyList
                    ? 'bg-gray-600 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-700'
                    : 'bg-transparent text-white border-gray-300 hover:border-white'
                }`}
              >
                <Plus size={20} className={isInMyList ? 'rotate-45' : ''} />
                <span>{isInMyList ? 'Remove from List' : 'Add to My List'}</span>
              </button>

              <button className="bg-transparent text-white border-2 border-gray-300 p-3 rounded hover:border-white transition-colors">
                <ThumbsUp size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="text-yellow-500 fill-current" size={20} />
                  <span className="text-white font-bold">{movie.rating}</span>
                </div>
                <span className="text-gray-300">{movie.year}</span>
                <span className="text-gray-300">{movie.duration}</span>
                <span className="bg-gray-700 text-white px-2 py-1 rounded text-sm">HD</span>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6">
                {movie.description}
              </p>
            </div>

            {/* Side Info */}
            <div className="space-y-4">
              <div>
                <span className="text-gray-400 text-sm">Genre: </span>
                <span className="text-white">{movie.genre.join(', ')}</span>
              </div>
              
              <div>
                <span className="text-gray-400 text-sm">Category: </span>
                <span className="text-white capitalize">{movie.category}</span>
              </div>

              <div>
                <span className="text-gray-400 text-sm">This movie is: </span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {movie.genre.map((genre, index) => (
                    <span key={index} className="bg-gray-700 text-white px-2 py-1 rounded text-sm">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;