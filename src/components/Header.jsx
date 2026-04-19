import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import {
  Moon,
  Sun,
  Globe,
  Menu,
  Coins,
  LogOut,
  User,
  ChevronDown
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
  const { t } = useTranslation();

  // Fix: Explicitly get these from useAuth
  const user = useAuth((state) => state.user);
  const profile = useAuth((state) => state.profile);
  const toggleMobileMenu = useAuth((state) => state.toggleMobileMenu);
  // ---------------------------

  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const currencyRef = useRef(null);
  const { currentTime } = useTimeStore();
  const { theme, toggleTheme, language, toggleLanguage } = useConfigStore();
  const { selectedCurrency, setSelectedCurrency, fetchRates } = useCurrencyStore();

  useEffect(() => {
    initTimeHeartbeat();
    fetchRates();

    const handleClickOutside = (event) => {
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setIsCurrencyOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [fetchRates]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const currentTitleKey = routeToKey[location.pathname] || 'overview';
  const currentTitle = t(currentTitleKey);

  return (
    <header className="h-[var(--header-h)] bg-header border-b border-border flex items-center justify-between pl-1 pr-2 sm:pr-6 sticky top-0 z-50 transition-colors duration-300 shadow-md">

      {/* Left Section: Branding */}
      <div className="flex items-center gap-1 sm:gap-4 h-full min-w-0">
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden w-12 h-12 flex items-center justify-center text-muted hover:text-main shrink-0"
        >
          <Menu size={24} />
        </button>

        <div className="h-[70%] lg:h-[94%] w-auto shrink-0 bg-module rounded-lg flex items-center justify-center overflow-hidden px-1 sm:px-2 shadow-sm">
          <img
            src={logo}
            alt="Glam Cars Logo"
            className="h-full w-auto object-contain"
          />
        </div>

        <nav className="hidden md:flex items-center text-xs font-bold text-muted uppercase tracking-widest min-w-0 ml-2">
          <span className="text-main truncate">{currentTitle}</span>
        </nav>
      </div>

      {/* Right Section: Controls */}
      <div className="flex items-center gap-1 sm:gap-3">

        {/* Morocco Clock - Hidden on mobile */}
        <div className="hidden lg:flex bg-module border border-border px-4 py-2 rounded-xl flex-col items-center justify-center min-w-[140px]">
          <span className="block text-[10px] font-bold text-muted uppercase tracking-tighter leading-none text-center w-full whitespace-nowrap">
            {format(currentTime, 'EEEE, dd/MM/yyyy')}
          </span>
          <span className="block text-sm font-black text-main leading-tight tabular-nums text-center w-full my-0.5">
            {format(currentTime, 'HH:mm')}
          </span>
          <div className="flex items-center justify-center gap-1.5 w-full">
            <div className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
            <span className="text-[9px] font-bold text-muted uppercase tracking-widest">{t('morocco')}</span>
          </div>
        </div>

        {/* Action Toggles Cluster */}
        <div className="flex items-center gap-0.5 sm:gap-1 bg-module/50 p-0.5 sm:p-1 rounded-xl border border-border">
          <button
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 text-muted hover:text-accent hover:bg-module rounded-lg transition-all"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={toggleLanguage}
            className="p-1.5 sm:px-2 sm:py-1.5 text-muted hover:text-accent hover:bg-module rounded-lg transition-all flex items-center gap-1"
          >
            <Globe size={16} />
            <span className="hidden xs:block text-[10px] font-bold uppercase">{language}</span>
          </button>

          <div className="relative" ref={currencyRef}>
            <button
              onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
              className={cn(
                "p-1.5 sm:px-2 sm:py-1.5 rounded-lg transition-all flex items-center gap-1",
                isCurrencyOpen ? "bg-accent/10 text-accent" : "text-muted hover:text-accent hover:bg-module"
              )}
            >
              <Coins size={16} />
              <span className="text-[10px] font-bold">{selectedCurrency}</span>
              <ChevronDown size={10} className={cn("hidden xs:block transition-transform duration-200", isCurrencyOpen && "rotate-180")} />
            </button>
            {/* Currency Dropdown */}
            {isCurrencyOpen && (
              <div className="absolute right-0 top-full mt-2 min-w-[100px] z-[70] p-1 rounded-xl border border-border shadow-2xl bg-header">
                {['MAD', 'EUR', 'USD'].map(curr => (
                  <button
                    key={curr}
                    onClick={() => {
                      setSelectedCurrency(curr);
                      setIsCurrencyOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2 text-[10px] font-bold rounded-lg transition-colors",
                      selectedCurrency === curr ? "bg-accent/10 text-accent" : "text-muted hover:bg-module"
                    )}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* User Stack */}
        <div className="flex items-center gap-1 sm:gap-3 pl-1 sm:pl-3 border-l border-border ml-1">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[11px] font-bold text-main leading-none mb-0.5">{profile?.full_name || 'Admin'}</span>
            <span className="text-[9px] font-medium text-muted uppercase tracking-tighter">{profile?.is_whitelisted ? t('verified') : t('agent')}</span>
          </div>

          <button className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-module border border-border flex items-center justify-center text-accent shrink-0 overflow-hidden">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} className="w-full h-full object-cover" alt="" />
            ) : (
              <User size={18} />
            )}
          </button>

          <button
            onClick={handleLogout}
            className="p-1.5 sm:p-2 text-muted hover:text-danger transition-colors shrink-0"
          >
            <LogOut size={18} />
          </button>
        </div>

      </div>
    </header>
  );
}