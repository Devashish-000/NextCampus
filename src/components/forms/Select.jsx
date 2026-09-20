import React from 'react';
import { twMerge } from 'tailwind-merge';

export const Select = React.forwardRef(
  ({ label, options = [], error, helperText, className = '', containerClassName = '', ...props }, ref) => {
    return (
      <div className={twMerge('flex flex-col gap-1.5 w-full', containerClassName)}>
        {label && (
          <label className="text-xs font-bold text-black dark:text-gray-300 uppercase tracking-wider">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          className={twMerge(
            'w-full px-4 py-2.5 bg-white dark:bg-slate-900/90 border rounded-xl text-sm font-bold text-black dark:text-white transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm cursor-pointer',
            error
              ? 'border-red-500 focus:ring-red-500/30'
              : 'border-gray-300 dark:border-slate-700/80 hover:border-gray-400 dark:hover:border-slate-600',
            className
          )}
          {...props}
        >
          {options.map((opt, i) => {
            const val = typeof opt === 'object' ? opt.value : opt;
            const lbl = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={i} value={val} className="bg-white dark:bg-[#111726]">
                {lbl}
              </option>
            );
          })}
        </select>
        {error && <span className="text-xs font-semibold text-red-500 mt-0.5 animate-in fade-in">{error}</span>}
        {helperText && !error && (
          <span className="text-xs text-gray-500 dark:text-gray-400">{helperText}</span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
