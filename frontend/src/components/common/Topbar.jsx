import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { FiSearch, FiBell } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const Topbar = () => {
  const { user } = useAuth();

  return (
    <div className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex-1 max-w-xl relative text-slate-400 focus-within:text-primary">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch size={18} />
        </div>
        <input
          type="text"
          placeholder="Search leads, members, activities..."
          className="block w-full rounded-full border-0 py-2.5 pl-10 pr-4 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 sm:text-sm sm:leading-6 transition-all"
        />
      </div>

      <div className="flex items-center gap-6 ml-4">
        <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
          <FiBell size={22} />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-danger rounded-full border-2 border-white" />
        </button>

        <div className="h-8 w-px bg-slate-200" />

        <Link to="/dashboard/profile" className="flex items-center gap-3 group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-secondary group-hover:text-primary transition-colors">{user?.name}</p>
            <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
          </div>
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-10 h-10 rounded-full border-2 border-slate-100 object-cover"
          />
        </Link>
      </div>
    </div>
  );
};
