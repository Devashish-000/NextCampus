import React from 'react';

export const SkeletonCard = () => (
  <div className="bg-white dark:bg-[#111726] border border-gray-200 dark:border-slate-800 rounded-2xl p-5 animate-pulse space-y-4">
    <div className="h-44 bg-gray-200 dark:bg-slate-800 rounded-xl w-full"></div>
    <div className="h-6 bg-gray-200 dark:bg-slate-800 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-1/2"></div>
    <div className="flex gap-2 pt-2">
      <div className="h-6 bg-gray-200 dark:bg-slate-800 rounded-full w-16"></div>
      <div className="h-6 bg-gray-200 dark:bg-slate-800 rounded-full w-20"></div>
    </div>
    <div className="h-10 bg-gray-200 dark:bg-slate-800 rounded-xl w-full pt-4"></div>
  </div>
);

export const SkeletonTable = () => (
  <div className="w-full animate-pulse space-y-3">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-14 bg-gray-100 dark:bg-slate-800/60 rounded-xl w-full flex items-center px-4 gap-4">
        <div className="h-6 w-6 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/6 ml-auto"></div>
      </div>
    ))}
  </div>
);
