'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAppKitAccount, useAppKit, useDisconnect } from '@reown/appkit/react';
import { User, Camera, Trash2, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const { status, address } = useAppKitAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const [username, setUsername] = useState('@janedoe');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSaveSettings = () => {
    toast.success('Profile updated successfully', {
      duration: 5000
    });
  };

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Account deleted successfully', {
        duration: 5000
      });
      
      await disconnect();
      
      setTimeout(() => {
        router.push('/');
      }, 1000);
      
    } catch (error) {
      toast.error('Error deleting account');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleImageUpload = () => {
    toast.success('Profile picture updated', {
      duration: 5000
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4 mx-60 my-12">
      <div className="flex items-center gap-2 mb-8">
        <User className="w-6 h-6 text-purple-400" />
        <h1 className="text-2xl font-semibold text-purple-400">Profile Settings</h1>
      </div>

      <div className="space-y-6">
        {/* Profile Picture */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-purple-500/20 shadow-lg hover:border-purple-500/40 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-purple-600/20 border-2 border-purple-500/40 flex items-center justify-center">
                  <User className="w-10 h-10 text-purple-400" />
                </div>
                <button
                  onClick={handleImageUpload}
                  className="absolute bottom-0 right-0 p-2 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors"
                >
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>
              <div>
                <h2 className="font-bold text-purple-400 mb-1">Profile Picture</h2>
                <p className="text-sm text-purple-300/70">Upload a new profile picture</p>
              </div>
            </div>
          </div>
        </div>

        {/* Username */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-purple-500/20 shadow-lg hover:border-purple-500/40 transition-all duration-300">
          <h2 className="font-bold text-purple-400 mb-4">Username</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-black/50 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors"
            placeholder="Enter your username"
          />
        </div>

        {/* Delete Account */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-red-500/20 shadow-lg hover:border-red-500/40 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-red-400 mb-1">Delete Account</h2>
              <p className="text-sm text-red-300/70">This action cannot be undone</p>
            </div>
            <button
              onClick={handleDeleteAccount}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-600/90 text-white rounded-lg hover:bg-red-700 transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
            >
              {isDeleting ? 'Deleting...' : 'Delete Account'}
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleSaveSettings}
            className="px-6 py-3 bg-purple-600/90 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 flex items-center gap-2 shadow-lg"
          >
            <span>Save Changes</span>
            <Save className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}