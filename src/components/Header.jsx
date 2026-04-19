import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import {
  Moon,
  Sun,
  Globe,
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
  const { user, profile } = useAuth();
  const { t } = useTranslation();

  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const currencyRef = useRef(null);

  const { currentTime, isSynced } = useTimeStore();
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
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const currentTitleKey = routeToKey[location.pathname] || 'overview';
  const currentTitle = t(currentTitleKey);

  return (
    /* Adjusted pl-1 to move logo slot to the absolute edge */
    <header className="h-[var(--header-h)] bg-header border-b border-border flex items-center justify-between pl-1 pr-6 sticky top-0 z-50 shoji-slide transition-colors duration-300 shadow-md">

      {/* Left Section: Branding */}
      <div className="flex items-center gap-4 h-full">
        {/* Add 'shrink-0' here to lock the logo size */}
        <div className="h-[94%] w-auto shrink-0 bg-module rounded-lg flex items-center justify-center overflow-hidden px-2 shadow-sm transition-all">
          <img
            src={logo}
            alt="Glam Cars Logo"
            className="h-full w-auto object-contain"
          />
        </div>

        {/* Page Title - Add 'truncate' to handle long titles gracefully */}
        <nav className="hidden lg:flex items-center text-xs font-bold text-muted uppercase tracking-widest min-w-0">
          <span className="text-main truncate">{currentTitle}</span>
        </nav>
      </div>
      {/* Right Section: Controls */}
      <div className="flex items-center gap-3">

        {/* The Morocco Clock Module - Rigid Alignment Version */}
        <div className="bg-module border border-border px-4 py-2 rounded-xl flex flex-col items-center justify-center min-w-[140px] transition-all duration-300">
          {/* Force block display and exact centering */}
          <span className="block text-[10px] font-bold text-muted uppercase tracking-tighter leading-none text-center w-full whitespace-nowrap">
            {format(currentTime, 'EEEE, dd/MM/yyyy')}
          </span>

          {/* tabular-nums is key: it prevents the clock from 'jumping' when numbers change */}
          <span className="block text-sm font-black text-main leading-tight tabular-nums text-center w-full my-0.5">
            {format(currentTime, 'HH:mm')}
          </span>

          <div className="flex items-center justify-center gap-1.5 w-full">
            <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", isSynced ? "bg-success" : "bg-warning animate-pulse")} />
            <span className="text-[9px] font-bold text-muted uppercase tracking-widest">{t('morocco')}</span>
          </div>
        </div>

        {/* Action Toggles Cluster */}
        <div className="flex items-center gap-1 bg-module/50 p-1 rounded-xl border border-border">
          <button
            onClick={toggleTheme}
            className="p-2 text-muted hover:text-accent hover:bg-module rounded-lg transition-all"
            title={t('theme_toggle')}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={toggleLanguage}
            className="px-2 py-1.5 text-muted hover:text-accent hover:bg-module rounded-lg transition-all flex items-center gap-1.5"
            title={t('language_toggle')}
          >
            <Globe size={16} />
            <span className="text-[10px] font-bold uppercase">{language}</span>
          </button>

          <div className="relative" ref={currencyRef}>
            <button
              onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
              className={cn(
                "px-2 py-1.5 rounded-lg transition-all flex items-center gap-1.5",
                isCurrencyOpen ? "bg-accent/10 text-accent" : "text-muted hover:text-accent hover:bg-module"
              )}
            >
              <Coins size={16} />
              <span className="text-[10px] font-bold">{selectedCurrency}</span>
              <ChevronDown size={12} className={cn("transition-transform duration-200", isCurrencyOpen && "rotate-180")} />
            </button>

            {isCurrencyOpen && (
              <div
                className={cn(
                  "absolute right-0 top-full mt-2 min-w-[100px] z-[70] p-1",
                  "rounded-xl border border-border shadow-2xl",
                  "animate-in fade-in zoom-in-95 duration-200",
                  "bg-header"
                )}
                style={{ backgroundColor: 'var(--bg-header)' }}
              >
                {['MAD', 'EUR', 'USD'].map(curr => (
                  <button
                    key={curr}
                    onClick={() => {
                      setSelectedCurrency(curr);
                      setIsCurrencyOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2 text-[10px] font-bold rounded-lg transition-colors flex items-center justify-between",
                      selectedCurrency === curr
                        ? "bg-accent/10 text-accent"
                        : "text-muted hover:bg-module hover:text-main"
                    )}
                  >
                    {curr}
                    {selectedCurrency === curr && <div className="w-1 h-1 rounded-full bg-accent" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* User Stack */}
        <div className="flex items-center gap-3 pl-3 border-l border-border">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[11px] font-bold text-main leading-none mb-0.5 w-full text-center">
              {profile?.full_name || 'Admin'}
            </span>
            <span className="text-[9px] font-medium text-muted uppercase tracking-tighter w-full text-center">
              {profile?.is_whitelisted ? t('verified') : t('agent')}
            </span>
          </div>

          <button className="h-10 w-10 rounded-xl bg-module border border-border flex items-center justify-center text-accent hover:border-accent/50 transition-all shadow-inner overflow-hidden">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} className="w-full h-full object-cover" alt="" />
            ) : (
              <User size={20} />
            )}
          </button>

          <button
            onClick={handleLogout}
            className="p-2 text-muted hover:text-danger transition-colors"
            title={t('logout')}
          >
            <LogOut size={18} />
          </button>
        </div>

      </div>
    </header>
  );
}