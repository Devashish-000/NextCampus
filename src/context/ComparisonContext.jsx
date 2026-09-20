import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { getStorageItem, setStorageItem } from '../utils/storage';

const ComparisonContext = createContext();

export const ComparisonProvider = ({ children }) => {
  const [comparedColleges, setComparedColleges] = useState(() => {
    return getStorageItem('compared_colleges', []);
  });

  const addToCompare = (college) => {
    if (comparedColleges.some((c) => c.id === college.id)) {
      toast.error('College is already in comparison tray!');
      return;
    }
    if (comparedColleges.length >= 4) {
      toast.error('You can compare a maximum of 4 colleges at a time.');
      return;
    }
    const updated = [...comparedColleges, college];
    setComparedColleges(updated);
    setStorageItem('compared_colleges', updated);
    toast.success(`Added ${college.shortName || college.name} to comparison.`);
  };

  const removeFromCompare = (collegeId) => {
    const updated = comparedColleges.filter((c) => c.id !== collegeId);
    setComparedColleges(updated);
    setStorageItem('compared_colleges', updated);
    toast.success('Removed from comparison.');
  };

  const clearComparison = () => {
    setComparedColleges([]);
    setStorageItem('compared_colleges', []);
  };

  return (
    <ComparisonContext.Provider
      value={{ comparedColleges, addToCompare, removeFromCompare, clearComparison }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) throw new Error('useComparison must be used within ComparisonProvider');
  return context;
};
