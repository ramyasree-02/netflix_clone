import React, { useRef, useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from 'lucide-react';
import { Movie } from '../types';

interface VideoPlayerProps {
  movie: Movie;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ movie, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    let hideControlsTimeout: NodeJS.Timeout;

    if (isPlaying && showControls) {
      hideControlsTimeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }

    return () => {
      if (hideControlsTimeout) {
        clearTimeout(hideControlsTimeout);
      }
    };
  }, [isPlaying, showControls]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(!isMuted);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    const progressBar = e.currentTarget;
    if (!video || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    
    video.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(percent * 100);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    const newVolume = parseFloat(e.target.value);
    
    if (video) {
      video.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const skipTime = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds));
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div 
        className="relative w-full h-full"
        onMouseMove={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Video */}
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          poster={movie.thumbnail}
        >
          <source src={movie.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Controls Overlay */}
        {showControls && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/70">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-white text-2xl font-bold">{movie.title}</h1>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-green-400 font-bold">{movie.rating * 10}% Match</span>
                    <span className="text-gray-300">{movie.year}</span>
                    <span className="text-gray-300">{movie.duration}</span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <X size={32} />
                </button>
              </div>
            </div>

            {/* Center Play Button */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={togglePlay}
                  className="bg-red-600 text-white p-6 rounded-full hover:bg-red-700 transition-all transform hover:scale-110"
                >
                  <Play size={48} fill="currentColor" />
                </button>
              </div>
            )}

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              {/* Progress Bar */}
              <div
                className="w-full bg-gray-600 h-2 rounded-full mb-4 cursor-pointer"
                onClick={handleProgressClick}
              >
                <div
                  className="bg-red-600 h-full rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => skipTime(-10)}
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    <SkipBack size={24} />
                  </button>

                  <button
                    onClick={togglePlay}
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    {isPlaying ? <Pause size={32} /> : <Play size={32} fill="currentColor" />}
                  </button>

                  <button
                    onClick={() => skipTime(10)}
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    <SkipForward size={24} />
                  </button>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={toggleMute}
                      className="text-white hover:text-gray-300 transition-colors"
                    >
                      {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-20 accent-red-600"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-white text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                  <button
                    onClick={toggleFullscreen}
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    <Maximize size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;