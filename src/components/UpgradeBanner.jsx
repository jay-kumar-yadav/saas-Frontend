import React from 'react';
import { tenantsAPI } from '../services/tenants';
import { useAuth } from '../hooks/useAuth';

const UpgradeBanner = ({ noteCount, onUpgrade }) => {
  const { user } = useAuth();

  const handleUpgrade = async () => {
    try {
      await tenantsAPI.upgrade(user.tenant.slug);
      onUpgrade();
      alert('Subscription upgraded to Pro successfully!');
    } catch (error) {
      alert('Upgrade failed: ' + (error.response?.data?.message || error.message));
    }
  };

  if (user.tenant.subscription === 'pro') {
    return null;
  }

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-yellow-700">
            <strong>Free Plan Limit:</strong> You have {noteCount} out of 3 notes.
            {noteCount >= 3 && ' Upgrade to Pro to create more notes.'}
          </p>
        </div>
        {user.role === 'admin' && (
          <button
            onClick={handleUpgrade}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded text-sm"
          >
            Upgrade to Pro
          </button>
        )}
      </div>
    </div>
  );
};

export default UpgradeBanner;