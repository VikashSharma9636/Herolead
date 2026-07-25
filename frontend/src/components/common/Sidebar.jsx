import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  FiHome, 
  FiUsers, 
  FiBriefcase, 
  FiActivity, 
  FiSettings, 
  FiLogOut 
} from 'react-icons/fi';

export const Sidebar = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: FiHome },
    { name: 'Leads', path: '/dashboard/leads', icon: FiBriefcase },
    ...(user?.role === 'admin' ? [
      { name: 'Members', path: '/dashboard/members', icon: FiUsers },
      { name: 'Settings', path: '/dashboard/settings', icon: FiSettings },
    ] : []),
  ];

  return (
    <div className="w-64 bg-secondary text-slate-300 h-screen flex flex-col fixed left-0 top-0">
      <div className="h-20 flex items-center px-6 border-b border-slate-700/50">
        <div className="flex items-center gap-2 text-white">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="font-bold text-lg">L</span>
          </div>
          <span className="font-bold text-xl tracking-tight">LeadFlow</span>
        </div>
      </div>

      <div className="flex-1 py-6 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
              ${isActive 
                ? 'bg-primary/10 text-white font-medium relative' 
                : 'hover:bg-slate-800 hover:text-white'}
            `}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-md" />
                )}
                <item.icon size={20} className={isActive ? "text-primary" : ""} />
                <span>{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-slate-700/50">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-slate-800 transition-colors text-left"
        >
          <FiLogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
