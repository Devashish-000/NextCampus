import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Checkbox } from '../components/forms/Checkbox';
import { PasswordInput } from '../components/forms/PasswordInput';
import toast from 'react-hot-toast';

export const SettingsPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const [emailPrefs, setEmailPrefs] = useState({
    deadlines: true,
    rankings: true,
    digest: false
  });

  const handleUpdatePassword = () => {
    if (!currentPassword || !newPassword) {
      toast.error('Please enter both current and new passwords.');
      return;
    }
    
    // Simulate API call
    toast.success('Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
  };

  const handleCheckboxChange = (key) => {
    const newVal = !emailPrefs[key];
    setEmailPrefs(prev => ({ ...prev, [key]: newVal }));
    toast.success(`Preference ${newVal ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Account Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage notifications, security settings, and password updates.
        </p>
      </div>

      <Card className="p-8 space-y-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Security & Password</h3>
        <div className="space-y-4 max-w-md">
          <PasswordInput 
            label="Current Password" 
            placeholder="Enter current password" 
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <PasswordInput 
            label="New Password" 
            placeholder="Enter new password" 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button variant="primary" onClick={handleUpdatePassword}>
            Update Password
          </Button>
        </div>
      </Card>

      <Card className="p-8 space-y-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Email Notifications</h3>
        <div className="space-y-3">
          <Checkbox 
            label="Send application deadline reminders 48 hours prior" 
            checked={emailPrefs.deadlines}
            onChange={() => handleCheckboxChange('deadlines')}
          />
          <Checkbox 
            label="Notify when new NIRF rankings or cutoff data is released" 
            checked={emailPrefs.rankings}
            onChange={() => handleCheckboxChange('rankings')}
          />
          <Checkbox 
            label="Weekly counseling recommendations digest" 
            checked={emailPrefs.digest}
            onChange={() => handleCheckboxChange('digest')}
          />
        </div>
      </Card>
    </div>
  );
};
