import React from 'react';
import { cn } from '../../utils/cn';

const variants = {
  primary: 'bg-blue-100 text-primary',
  success: 'bg-green-100 text-success',
  warning: 'bg-amber-100 text-warning',
  danger: 'bg-red-100 text-danger',
  neutral: 'bg-slate-100 text-slate-600',
};

export const Badge = ({ children, variant = 'neutral', className }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
