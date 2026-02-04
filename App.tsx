
import React, { useState, useEffect } from 'react';
import { UserRole } from './types';
import { RoleSwitcher, MobileFrame } from './components/Layout';
import PatientView from './views/PatientView';
import PharmacistView from './views/PharmacistView';
import AdminView from './views/AdminView';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.PATIENT);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
        <RoleSwitcher currentRole={role} onRoleChange={setRole} />
        <button 
          onClick={toggleDarkMode}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg text-slate-600 dark:text-slate-300 hover:scale-110 active:scale-95 transition-transform"
          aria-label="Toggle Dark Mode"
        >
          <iconify-icon icon={isDarkMode ? "solar:sun-2-bold" : "solar:moon-bold"} class="text-xl"></iconify-icon>
        </button>
      </div>

      <main className="flex-1 w-full flex items-center justify-center p-4 pt-24 pb-8 overflow-hidden">
        {role === UserRole.PATIENT && (
          <MobileFrame>
            <PatientView isDarkMode={isDarkMode} />
          </MobileFrame>
        )}

        {role === UserRole.PHARMACIST && (
          <MobileFrame>
            <PharmacistView isDarkMode={isDarkMode} />
          </MobileFrame>
        )}

        {role === UserRole.ADMIN && (
          <div className="w-full h-full max-w-7xl">
            <AdminView isDarkMode={isDarkMode} />
          </div>
        )}
      </main>

      {/* Background Decorative Elements */}
      <div className="fixed -bottom-24 -left-24 w-64 h-64 bg-medical-500/5 dark:bg-medical-500/10 rounded-full blur-3xl -z-10" />
      <div className="fixed -top-24 -right-24 w-96 h-96 bg-health-500/5 dark:bg-health-500/10 rounded-full blur-3xl -z-10" />
    </div>
  );
};

export default App;
