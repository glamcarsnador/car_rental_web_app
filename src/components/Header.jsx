import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Moon, 
  Sun, 
  Globe, 
  Coins, 
  ChevronRight, 
  LogOut,
  User
} from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../hooks/useAuth';
import { useTimeStore, initTimeHeartbeat } from '../hooks/useTimeStore';
import { useConfigStore } from '../hooks/useConfigStore';
import { useCurrencyStore } from '../hooks/useCurrencyStore';
import { supabase } from '../lib/supabase';
import { cn } from '../lib/utils';

export default function Header() {
  const location = useLocation();
  const { user, profile } = useAuth();
  
  // State from our new stores
  const { currentTime, isSynced } = useTimeStore();
  const { theme, toggleTheme, language, toggleLanguage } = useConfigStore();
  const { selectedCurrency, setSelectedCurrency, fetchRates } = useCurrencyStore();

  // Initialize background tasks
  useEffect(() => {
    initTimeHeartbeat();
    fetchRates();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const currentTitle = location.pathname.split('/').filter(Boolean).pop()?.replace('-', ' ') || 'Dashboard';

  return (
    <header className="h-[var(--header-h)] bg-[var(--bg-header)] border-b border-[var(--border-color)] flex items-center justify-between px-6 sticky top-0 z-30 transition-all duration-300">
      
      {/* Left: Logo & Breadcrumbs */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-white text-xl shadow-lg shadow-indigo-500/20">
            G
          </div>
          <div className="hidden md:block">
            <h2 className="text-sm font-bold tracking-tighter uppercase leading-none text-[var(--text-main)]">Glam Cars</h2>
            <span className="text-[10px] text-[var(--text-muted)] font-medium uppercase tracking-widest">Industrial ERP</span>
          </div>
        </div>

        <div className="h-6 w-px bg-[var(--border-color)] hidden lg:block" />

        <nav className="hidden lg:flex items-center gap-2 text-xs font-medium text-[var(--text-muted)]">
          <span className="hover:text-[var(--text-main)] transition-colors cursor-pointer capitalize">{currentTitle}</span>
        </nav>
      </div>

      {/* Right: Integrated Control Cluster */}
      <div className="flex items-center gap-3">
        
        {/* The Morocco Clock Module */}
        <div className="bg-[var(--bg-module)] border border-[var(--border-color)] px-4 py-1.5 rounded-xl flex flex-col items-center justify-center min-w-[120px] transition-colors">
          <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-tighter leading-none mb-0.5">
            {format(currentTime, 'EEEE, dd/MM/yyyy')}
          </span>
          <span className="text-sm font-black text-[var(--text-main)] leading-none tabular-nums py-0.5">
            {format(currentTime, 'HH:mm')}
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className={cn("w-1 h-1 rounded-full", isSynced ? "bg-emerald-500" : "bg-amber-500 animate-pulse")} />
            <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase">Morocco</span>
          </div>
        </div>

        {/* Action Toggles Cluster */}
        <div className="flex items-center gap-1 bg-[var(--bg-module)]/50 p-1 rounded-xl border border-[var(--border-color)]">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 text-[var(--text-muted)] hover:text-indigo-400 hover:bg-[var(--bg-module)] rounded-lg transition-all"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Language Toggle */}
          <button 
            onClick={toggleLanguage}
            className="px-2 py-1.5 text-[var(--text-muted)] hover:text-indigo-400 hover:bg-[var(--bg-module)] rounded-lg transition-all flex items-center gap-1.5"
            title="Toggle Language"
          >
            <Globe size={16} />
            <span className="text-[10px] font-bold">{language}</span>
          </button>

          {/* Currency Toggle */}
          <div className="relative group/curr">
             <button 
              className="px-2 py-1.5 text-[var(--text-muted)] hover:text-indigo-400 hover:bg-[var(--bg-module)] rounded-lg transition-all flex items-center gap-1.5"
            >
              <Coins size={16} />
              <span className="text-[10px] font-bold">{selectedCurrency}</span>
            </button>
            
            {/* Simple Dropdown for Currency */}
            <div className="absolute right-0 top-full mt-1 bg-[var(--bg-header)] border border-[var(--border-color)] rounded-lg shadow-2xl opacity-0 group-hover/curr:opacity-100 pointer-events-none group-hover/curr:pointer-events-auto transition-all translate-y-2 group-hover/curr:translate-y-0 z-50 p-1 min-w-[80px]">
              {['MAD', 'EUR', 'USD'].map(curr => (
                <button
                  key={curr}
                  onClick={() => setSelectedCurrency(curr)}
                  className={cn(
                    "w-full text-left px-3 py-1.5 text-[10px] font-bold rounded-md transition-colors",
                    selectedCurrency === curr 
                      ? "bg-indigo-600/10 text-indigo-400" 
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-module)] hover:text-[var(--text-main)]"
                  )}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* User Stack */}
        <div className="flex items-center gap-3 pl-3 border-l border-[var(--border-color)]">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[11px] font-bold text-[var(--text-main)] leading-none mb-0.5">
              {profile?.full_name || 'Admin'}
            </span>
            <span className="text-[9px] font-medium text-[var(--text-muted)] uppercase tracking-tighter">
              {profile?.is_whitelisted ? 'Verified' : 'Agent'}
            </span>
          </div>
          
          <button className="h-10 w-10 rounded-xl bg-[var(--bg-module)] border border-[var(--border-color)] flex items-center justify-center text-indigo-400 hover:border-indigo-500/50 transition-all shadow-inner overflow-hidden">
            {profile?.avatar_url ? (
               <img src={profile.avatar_url} className="w-full h-full object-cover" alt="" />
            ) : (
              <User size={20} />
            )}
          </button>

          <button 
            onClick={handleLogout}
            className="p-2 text-[var(--text-muted)] hover:text-red-400 transition-colors"
            title="Sign Out"
          >
            <LogOut size={18} />
          </button>
        </div>

      </div>
    </header>
  );
}
