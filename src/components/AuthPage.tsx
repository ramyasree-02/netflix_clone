import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let success = false;
      
      if (isLogin) {
        success = await login(formData.email, formData.password);
      } else {
        success = await signup(formData.name, formData.email, formData.password);
      }

      if (!success) {
        setError(isLogin ? 'Invalid email or password' : 'Failed to create account');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/7991033/pexels-photo-7991033.jpeg?auto=compress&cs=tinysrgb&w=1920)'
        }}
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-black/75 p-8 rounded-lg backdrop-blur-sm">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-red-600 text-3xl font-bold">NETFLIX</h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-white text-2xl font-bold mb-6">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </h2>

            {error && (
              <div className="bg-red-600/20 border border-red-600 text-red-500 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {!isLogin && (
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-600 border border-gray-700"
                  required
                />
              </div>
            )}

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-600 border border-gray-700"
                required
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-600 border border-gray-700"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded font-bold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Sign Up')}
            </button>

            {isLogin && (
              <div className="text-center">
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Forgot your password?
                </a>
              </div>
            )}

            <div className="text-center">
              <p className="text-gray-400">
                {isLogin ? "New to Netflix? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-white hover:underline"
                >
                  {isLogin ? 'Sign up now' : 'Sign in'}
                </button>
              </p>
            </div>

            {isLogin && (
              <div className="mt-6 p-4 bg-gray-800/50 rounded">
                <p className="text-gray-400 text-sm mb-2">Demo Account:</p>
                <p className="text-white text-sm">Email: demo@netflix.com</p>
                <p className="text-white text-sm">Password: password</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;