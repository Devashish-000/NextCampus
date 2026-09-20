import React from 'react';
import { FiInbox } from 'react-icons/fi';
import { Button } from './Button';

export const EmptyState = ({
  icon: Icon = FiInbox,
  title = 'No Results Found',
  description = 'We could not find any records matching your criteria. Try resetting filters or searching with different keywords.',
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 bg-white dark:bg-[#111726] border border-dashed border-gray-300 dark:border-slate-800 rounded-3xl my-6">
      <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-950/60 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
