import React from 'react';
import { twMerge } from 'tailwind-merge';

export const Textarea = React.forwardRef(
  ({ label, error, helperText, rows = 4, className = '', containerClassName = '', ...props }, ref) => {
    return (
      <div className={twMerge('flex flex-col gap-1.5 w-full', containerClassName)}>
        {label && (
          <label className="text-xs font-bold text-black dark:text-gray-300 uppercase tracking-wider">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={twMerge(
            'w-full px-4 py-2.5 bg-white dark:bg-slate-900/90 border rounded-xl text-sm font-bold text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm resize-y',
            error
              ? 'border-red-500 focus:ring-red-500/30'
              : 'border-gray-300 dark:border-slate-700/80 hover:border-gray-400 dark:hover:border-slate-600',
            className
          )}
          {...props}
        />
        {error && <span className="text-xs font-semibold text-red-500 mt-0.5 animate-in fade-in">{error}</span>}
        {helperText && !error && (
          <span className="text-xs text-gray-500 dark:text-gray-400">{helperText}</span>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
