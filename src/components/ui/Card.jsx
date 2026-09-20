import React from 'react';
import { twMerge } from 'tailwind-merge';

export const Card = ({ children, className = '', hover = true, glass = false, ...props }) => {
  return (
    <div
      className={twMerge(
        'card saas-card overflow-hidden',
        hover && 'saas-card-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={twMerge('card-header bg-white border-bottom p-4 sm:p-5', className)}>
    {children}
  </div>
);

export const CardBody = ({ children, className = '' }) => (
  <div className={twMerge('card-body p-4 sm:p-6', className)}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={twMerge('card-footer bg-light border-top p-4 sm:p-5', className)}>
    {children}
  </div>
);
