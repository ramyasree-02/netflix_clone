import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onSearch: (query: string) => void;
  onProfileClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onProfileClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setSearchOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/95 backdrop-blur-sm' : 'bg-gradient-to-b from-black/70 to-transparent'
    }`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-red-600 text-2xl font-bold">NETFLIX</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 ml-8">
            <a href="#" className="text-white hover:text-gray-300 transition-colors">Home</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">TV Shows</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">Movies</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">New & Popular</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">My List</a>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search movies, TV shows..."
                    className="bg-black/70 text-white placeholder-gray-400 px-4 py-2 rounded border border-white/20 focus:outline-none focus:ring-2 focus:ring-red-600 w-64"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="ml-2 text-white hover:text-gray-300"
                  >
                    <X size={20} />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <Search size={20} />
                </button>
              )}
            </div>

            {/* Notifications */}
            <button className="text-white hover:text-gray-300 transition-colors">
              <Bell size={20} />
            </button>

            {/* Profile */}
            <div className="relative group">
              <button 
                onClick={onProfileClick}
                className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
              >
                <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                  <span className="text-sm font-medium">{user?.name?.charAt(0) || 'U'}</span>
                </div>
                <ChevronDown size={16} />
              </button>
              
              <div className="absolute right-0 mt-2 w-48 bg-black/95 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <button
                    onClick={onProfileClick}
                    className="w-full text-left px-4 py-2 text-white hover:bg-gray-800 transition-colors"
                  >
                    Manage Profile
                  </button>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-white hover:bg-gray-800 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 py-4">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-white hover:text-gray-300 transition-colors px-4">Home</a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors px-4">TV Shows</a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors px-4">Movies</a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors px-4">New & Popular</a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors px-4">My List</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;