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
    <header className="h-[var(--header-h)] bg-header border-b border-border sticky top-0 z-50 transition-colors duration-300 shadow-md overflow-x-auto no-scrollbar">      <div className="flex items-center justify-between min-w-max h-full pl-1 pr-6">

      {/* Left Section: Branding & Page Link */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden w-12 h-12 flex items-center justify-center text-muted hover:text-main shrink-0"
        >
          <Menu size={24} />
        </button>

        <div className="h-10 w-auto shrink-0 bg-module rounded-lg flex items-center justify-center px-2 shadow-sm">
          <img src={logo} alt="Logo" className="h-full w-auto object-contain" />
        </div>

        {/* FIXED: Added a min-width to prevent the Toggle Section from jumping */}
        <nav className="shrink-0 ml-2 min-w-[120px] sm:min-w-[160px]">
          <span className="text-xs font-bold text-main uppercase tracking-widest whitespace-nowrap">
            {currentTitle}
          </span>
        </nav>
      </div>

      {/* Right Section: All controls and User info */}
      {/* ml-8 creates a minimum safety gap before they collide */}
      <div className="flex items-center gap-3 shrink-0 ml-8">

        {/* Toggles Cluster */}
        {/* Toggles Cluster */}
        <div className="flex items-center bg-module/50 p-1 rounded-xl border border-border shrink-0">
          {/* Theme Toggle - Fixed width square for symmetry */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center text-muted hover:text-accent hover:bg-module rounded-lg transition-all shrink-0"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Language Toggle - min-w-max ensures the text 'EN/FR' never touches the Globe icon */}
          <button
            onClick={toggleLanguage}
            className="min-w-max px-3 h-10 text-muted hover:text-accent hover:bg-module rounded-lg transition-all flex items-center gap-2 shrink-0"
          >
            <Globe size={16} className="shrink-0" />
            <span className="text-[10px] font-bold uppercase whitespace-nowrap">{language}</span>
          </button>

          {/* Currency Toggle */}
          <div className="relative shrink-0" ref={currencyRef}>
            <button
              onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
              className={cn(
                "min-w-max px-3 h-10 rounded-lg transition-all flex items-center gap-2",
                isCurrencyOpen ? "bg-accent/10 text-accent" : "text-muted hover:text-accent hover:bg-module"
              )}
            >
              <Coins size={16} className="shrink-0" />
              <span className="text-[10px] font-bold whitespace-nowrap">{selectedCurrency}</span>
              <ChevronDown size={12} className={cn("transition-transform duration-200", isCurrencyOpen && "rotate-180")} />
            </button>

            {/* Currency Dropdown stays the same, it will float over the scrollable area */}
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
        {/* User Info & Logout (Rigidly together) */}
        <div className="flex items-center gap-3 pl-3 border-l border-border shrink-0">
          <div className="flex flex-col items-end shrink-0">
            <span className="text-[11px] font-bold text-main leading-none mb-0.5 whitespace-nowrap">
              {profile?.full_name || 'Admin'}
            </span>
            <span className="text-[9px] font-medium text-muted uppercase tracking-tighter whitespace-nowrap">
              {profile?.is_whitelisted ? t('verified') : t('agent')}
            </span>
          </div>

          <button className="h-10 w-10 rounded-xl bg-module border border-border flex items-center justify-center text-accent shrink-0 overflow-hidden shadow-inner">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} className="w-full h-full object-cover" alt="" />
            ) : (
              <User size={20} />
            )}
          </button>

          <button
            onClick={handleLogout}
            className="p-2 text-muted hover:text-danger transition-colors shrink-0"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

    </div>
    </header>
  );
}