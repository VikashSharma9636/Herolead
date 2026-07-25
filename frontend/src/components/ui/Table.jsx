import React from 'react';
import { cn } from '../../utils/cn';

export const Table = ({ className, children, ...props }) => {
  return (
    <div className="w-full overflow-auto rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className={cn("w-full text-sm text-left", className)} {...props}>
        {children}
      </table>
    </div>
  );
};

export const TableHeader = ({ className, children, ...props }) => (
  <thead className={cn("bg-slate-50 text-slate-600 font-medium border-b border-slate-200", className)} {...props}>
    {children}
  </thead>
);

export const TableBody = ({ className, children, ...props }) => (
  <tbody className={cn("divide-y divide-slate-100", className)} {...props}>
    {children}
  </tbody>
);

export const TableRow = ({ className, children, hover = true, ...props }) => (
  <tr className={cn(hover && "hover:bg-slate-50/80 transition-colors", className)} {...props}>
    {children}
  </tr>
);

export const TableHead = ({ className, children, ...props }) => (
  <th className={cn("px-6 py-4 whitespace-nowrap", className)} {...props}>
    {children}
  </th>
);

export const TableCell = ({ className, children, ...props }) => (
  <td className={cn("px-6 py-4 whitespace-nowrap", className)} {...props}>
    {children}
  </td>
);
