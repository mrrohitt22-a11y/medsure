
import React from 'react';
import { UserRole } from '../types';

interface RoleSwitcherProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ currentRole, onRoleChange }) => {
  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 p-1.5 rounded-full shadow-lg flex space-x-1">
      {(Object.values(UserRole)).map((role) => (
        <button
          key={role}
          onClick={() => onRoleChange(role)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            currentRole === role
              ? "bg-medical-600 text-white shadow-md"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
          }`}
        >
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </button>
      ))}
    </div>
  );
};

export const MobileFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative w-full max-w-[390px] h-[800px] bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border-[8px] border-slate-900 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col">
      {children}
    </div>
  );
};
