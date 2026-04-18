import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, PanelLeftOpen, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { cn } from '../lib/utils';

const routeTitleMap = {
  '/': 'Dashboard',
  '/gantt': 'Gantt Calendar',
  '/reservations': 'Reservations',
  '/cars': 'Fleet Management',
  '/clients': 'Clients',
  '/violations': 'Violations',
  '/finances': 'Finances',
  '/tools': 'System Tools'
};

export default function Header({ isSidebarOpen, setIsMobileOpen }) {
  const location = useLocation();
  const { user, profile } = useAuth();
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const pathSegments = location.pathname.split('/').filter(Boolean);
  const currentTitle = routeTitleMap[location.pathname] || 'Overview';

  return (
    <header className="grid-in-header h-20 bg-[#0A192F]/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-6">
        {/* Toggle Controls */}
        <button 
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden p-2 text-slate-400 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>

        {/* Breadcrumbs & Title Stack */}
        <div className="flex flex-col">
          <nav className="flex items-center gap-1 text-xs font-medium text-slate-500 uppercase tracking-widest mb-1">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">ERP</span>
            <ChevronRight size={12} />
            {pathSegments.length > 0 ? (
              pathSegments.map((segment, index) => (
                <React.Fragment key={segment}>
                  <span className={cn(
                    "transition-colors",
                    index === pathSegments.length - 1 ? "text-indigo-400" : "hover:text-slate-300 cursor-pointer"
                  )}>
                    {segment.replace('-', ' ')}
                  </span>
                  {index < pathSegments.length - 1 && <ChevronRight size={12} />}
                </React.Fragment>
              ))
            ) : (
              <span className="text-indigo-400">Dashboard</span>
            )}
          </nav>
          <h1 className="text-xl font-bold text-white tracking-tight leading-tight">
            {currentTitle}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* User Profile */}
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-sm font-semibold text-slate-200 leading-none">
            {profile?.full_name || user?.email?.split('@')[0]}
          </span>
          <span className="text-[10px] text-slate-500 uppercase tracking-tighter">
            {profile?.is_whitelisted ? 'Administrator' : 'Authenticated'}
          </span>
        </div>
        
        <div className="h-10 w-10 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center text-indigo-400">
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="font-bold text-lg uppercase">
              {(profile?.full_name || user?.email)?.[0]}
            </span>
          )}
        </div>

        <button 
          onClick={handleLogout}
          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all border border-transparent hover:border-red-500/20"
          title="Sign Out"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
