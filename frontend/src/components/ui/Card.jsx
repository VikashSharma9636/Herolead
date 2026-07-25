import React from 'react';
import { cn } from '../../utils/cn';

export const Card = ({ className, children, hover = false, ...props }) => {
  return (
    <div
      className={cn(
        "bg-surface rounded-xl shadow-soft border border-slate-100 overflow-hidden",
        hover && "transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ className, children }) => (
  <div className={cn("px-6 py-5 border-b border-slate-100", className)}>
    {children}
  </div>
);

export const CardTitle = ({ className, children }) => (
  <h3 className={cn("text-lg font-semibold text-secondary", className)}>
    {children}
  </h3>
);

export const CardContent = ({ className, children }) => (
  <div className={cn("p-6", className)}>
    {children}
  </div>
);

export const CardFooter = ({ className, children }) => (
  <div className={cn("px-6 py-4 bg-slate-50 border-t border-slate-100", className)}>
    {children}
  </div>
);
