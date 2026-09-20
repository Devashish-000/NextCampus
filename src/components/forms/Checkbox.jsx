import React from 'react';

export const Checkbox = React.forwardRef(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
        <input
          ref={ref}
          type="checkbox"
          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900"
          {...props}
        />
        {label && <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>}
      </label>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';
