import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return (
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">SaaS Notes</h1>
          <div>Loading...</div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">SaaS Notes</h1>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-600">
                {user.email} ({user.role})
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {user?.tenant?.subscription === 'pro' ? 'Pro Plan' : 'Free Plan'}
              </span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <span className="text-gray-600">Not logged in</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
