import React, { useState } from 'react';
import { X, User, Mail, CreditCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface ProfileModalProps {
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ onClose }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-white text-2xl font-bold">Account Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          {[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'subscription', label: 'Subscription', icon: CreditCard }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-red-500 border-b-2 border-red-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-white text-lg font-semibold mb-4">Profile Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Name</label>
                    <input
                      type="text"
                      defaultValue={user?.name}
                      className="w-full bg-gray-800 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-600 border border-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue={user?.email}
                      className="w-full bg-gray-800 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-600 border border-gray-700"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-white text-lg font-semibold mb-4">Change Password</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Current Password</label>
                    <input
                      type="password"
                      className="w-full bg-gray-800 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-600 border border-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">New Password</label>
                    <input
                      type="password"
                      className="w-full bg-gray-800 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-600 border border-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full bg-gray-800 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-600 border border-gray-700"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'subscription' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-white text-lg font-semibold mb-4">Current Plan</h3>
                
                <div className="bg-gray-800 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-white font-semibold capitalize">{user?.subscription} Plan</h4>
                      <p className="text-gray-400 text-sm">
                        {user?.subscription === 'basic' && '$8.99/month • HD quality'}
                        {user?.subscription === 'standard' && '$13.99/month • HD + 2 screens'}
                        {user?.subscription === 'premium' && '$17.99/month • 4K + 4 screens'}
                      </p>
                    </div>
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">Active</span>
                  </div>
                  
                  <p className="text-gray-400 text-sm">
                    Your next billing date is January 15, 2025
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-white text-lg font-semibold mb-4">Available Plans</h3>
                
                <div className="grid gap-4">
                  {[
                    { name: 'Basic', price: '$8.99', features: ['HD Quality', '1 Screen', 'Unlimited Movies & TV Shows'] },
                    { name: 'Standard', price: '$13.99', features: ['HD Quality', '2 Screens', 'Unlimited Movies & TV Shows', 'Download on 2 devices'] },
                    { name: 'Premium', price: '$17.99', features: ['4K + HDR Quality', '4 Screens', 'Unlimited Movies & TV Shows', 'Download on 4 devices'] }
                  ].map((plan) => (
                    <div key={plan.name} className={`border-2 rounded-lg p-4 ${
                      user?.subscription === plan.name.toLowerCase() 
                        ? 'border-red-600 bg-red-600/10' 
                        : 'border-gray-700 hover:border-gray-600'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-semibold">{plan.name}</h4>
                        <span className="text-white font-bold">{plan.price}/month</span>
                      </div>
                      
                      <ul className="space-y-1">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="text-gray-400 text-sm">• {feature}</li>
                        ))}
                      </ul>
                      
                      {user?.subscription !== plan.name.toLowerCase() && (
                        <button className="w-full mt-4 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors">
                          Switch to {plan.name}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;