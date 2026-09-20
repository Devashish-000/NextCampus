import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { ALL_MOCK_COLLEGES } from '../mocks/collegesData';

const SavedCollegesContext = createContext();

export const SavedCollegesProvider = ({ children }) => {
  const [savedIds, setSavedIds] = useState(() => {
    return getStorageItem('saved_college_ids', ['clg-1', 'clg-2', 'clg-3']);
  });

  const toggleSaveCollege = (collegeId, name = 'College') => {
    if (savedIds.includes(collegeId)) {
      const updated = savedIds.filter((id) => id !== collegeId);
      setSavedIds(updated);
      setStorageItem('saved_college_ids', updated);
      toast.success(`Removed ${name} from saved list.`);
    } else {
      const updated = [...savedIds, collegeId];
      setSavedIds(updated);
      setStorageItem('saved_college_ids', updated);
      toast.success(`Saved ${name} to your shortlist!`);
    }
  };

  const savedColleges = ALL_MOCK_COLLEGES.filter((c) => savedIds.includes(c.id));

  return (
    <SavedCollegesContext.Provider value={{ savedIds, savedColleges, toggleSaveCollege }}>
      {children}
    </SavedCollegesContext.Provider>
  );
};

export const useSavedColleges = () => {
  const context = useContext(SavedCollegesContext);
  if (!context) throw new Error('useSavedColleges must be used within SavedCollegesProvider');
  return context;
};
