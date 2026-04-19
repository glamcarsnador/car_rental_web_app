import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Moon, 
  Sun, 
  Globe, 
  Coins, 
  LogOut,
  User
} from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../hooks/useAuth';
import { useTimeStore, initTimeHeartbeat } from '../hooks/useTimeStore';
import { useConfigStore } from '../hooks/useConfigStore';
import { useCurrencyStore } from '../hooks/useCurrencyStore';
import { useTranslation } from '../hooks/useTranslation';
import { supabase } from '../lib/supabase';
import { cn } from '../lib/utils';

const routeToKey = {
  '/': 'dashboard',
  '/gantt': 'gantt',
  '/reservations': 'reservations',
  '/cars': 'cars',
  '/clients': 'clients',
  '/violations': 'violations',
  '/finances': 'finances',
  '/tools': 'tools'
};

export default function Header() {
  const location = useLocation();
  const { user, profile } = useAuth();
  const { t } = useTranslation();
  
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

  const currentTitleKey = routeToKey[location.pathname] || 'overview';
  const currentTitle = t(currentTitleKey);

  return (
    <header className="h-[var(--header-h)] bg-header-bg border-b border-border-main flex items-center justify-between px-6 sticky top-0 z-30 transition-all duration-300">
      
      {/* Left: Logo & Breadcrumbs */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent-indigo rounded-lg flex items-center justify-center font-black text-white text-xl shadow-lg shadow-accent-indigo/20">
            G
          </div>
          <div className="hidden md:block">
            <h2 className="text-sm font-bold tracking-tighter uppercase leading-none text-main-text">Glam Cars</h2>
            <span className="text-[10px] text-muted-text font-medium uppercase tracking-widest">{t('industrial_erp')}</span>
          </div>
        </div>

        <div className="h-6 w-px bg-border-main hidden lg:block" />

        <nav className="hidden lg:flex items-center gap-2 text-xs font-medium text-muted-text">
          <span className="text-main-text capitalize">{currentTitle}</span>
        </nav>
      </div>

      {/* Right: Integrated Control Cluster */}
      <div className="flex items-center gap-3">
        
        {/* The Morocco Clock Module */}
        <div className="bg-module-bg border border-border-main px-4 py-1.5 rounded-xl flex flex-col items-center justify-center min-w-[120px] transition-colors">
          <span className="text-[10px] font-bold text-muted-text uppercase tracking-tighter leading-none mb-0.5">
            {format(currentTime, 'EEEE, dd/MM/yyyy')}
          </span>
          <span className="text-sm font-black text-main-text leading-none tabular-nums py-0.5">
            {format(currentTime, 'HH:mm')}
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className={cn("w-1 h-1 rounded-full", isSynced ? "bg-emerald-500" : "bg-amber-500 animate-pulse")} />
            <span className="text-[9px] font-bold text-muted-text uppercase">{t('morocco')}</span>
          </div>
        </div>

        {/* Action Toggles Cluster */}
        <div className="flex items-center gap-1 bg-module-bg/50 p-1 rounded-xl border border-border-main">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 text-muted-text hover:text-accent-indigo hover:bg-module-bg rounded-lg transition-all"
            title={t('theme_toggle')}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Language Toggle */}
          <button 
            onClick={toggleLanguage}
            className="px-2 py-1.5 text-muted-text hover:text-accent-indigo hover:bg-module-bg rounded-lg transition-all flex items-center gap-1.5"
            title={t('language_toggle')}
          >
            <Globe size={16} />
            <span className="text-[10px] font-bold">{language}</span>
          </button>

          {/* Currency Toggle */}
          <div className="relative group/curr">
             <button 
              className="px-2 py-1.5 text-muted-text hover:text-accent-indigo hover:bg-module-bg rounded-lg transition-all flex items-center gap-1.5"
            >
              <Coins size={16} />
              <span className="text-[10px] font-bold">{selectedCurrency}</span>
            </button>
            
            {/* Simple Dropdown for Currency */}
            <div className="absolute right-0 top-full mt-1 bg-header-bg border border-border-main rounded-lg shadow-2xl opacity-0 group-hover/curr:opacity-100 pointer-events-none group-hover/curr:pointer-events-auto transition-all translate-y-2 group-hover/curr:translate-y-0 z-50 p-1 min-w-[80px]">
              {['MAD', 'EUR', 'USD'].map(curr => (
                <button
                  key={curr}
                  onClick={() => setSelectedCurrency(curr)}
                  className={cn(
                    "w-full text-left px-3 py-1.5 text-[10px] font-bold rounded-md transition-colors",
                    selectedCurrency === curr 
                      ? "bg-accent-indigo/10 text-accent-indigo" 
                      : "text-muted-text hover:bg-module-bg hover:text-main-text"
                  )}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* User Stack */}
        <div className="flex items-center gap-3 pl-3 border-l border-border-main">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[11px] font-bold text-main-text leading-none mb-0.5">
              {profile?.full_name || 'Admin'}
            </span>
            <span className="text-[9px] font-medium text-muted-text uppercase tracking-tighter">
              {profile?.is_whitelisted ? t('verified') : t('agent')}
            </span>
          </div>
          
          <button className="h-10 w-10 rounded-xl bg-module-bg border border-border-main flex items-center justify-center text-accent-indigo hover:border-accent-indigo/50 transition-all shadow-inner overflow-hidden">
            {profile?.avatar_url ? (
               <img src={profile.avatar_url} className="w-full h-full object-cover" alt="" />
            ) : (
              <User size={20} />
            )}
          </button>

          <button 
            onClick={handleLogout}
            className="p-2 text-muted-text hover:text-red-400 transition-colors"
            title={t('logout')}
          >
            <LogOut size={18} />
          </button>
        </div>

      </div>
    </header>
  );
}
