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
    <header className="h-[var(--header-h)] bg-header border-b border-border sticky top-0 z-50 transition-colors duration-300 shadow-md overflow-x-auto no-scrollbar">
      {/* This wrapper div ensures the flex items have a container that can expand beyond the screen width */}
      <div className="flex items-center justify-start min-w-max h-full pl-1 pr-2 sm:pr-6 gap-4">

        {/* Slot 1: Branding (Rigid) */}
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

          <nav className="hidden md:block shrink-0">
            <span className="text-xs font-bold text-main uppercase tracking-widest whitespace-nowrap">
              {currentTitle}
            </span>
          </nav>
        </div>

        {/* Slot 2: Controls (Rigid) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Morocco Clock */}
          <div className="hidden lg:flex bg-module border border-border px-4 py-2 rounded-xl flex-col items-center justify-center min-w-[140px] shrink-0">
            <span className="text-[10px] font-bold text-muted uppercase whitespace-nowrap">
              {format(currentTime, 'EEEE, dd/MM/yyyy')}
            </span>
            <span className="text-sm font-black text-main tabular-nums">
              {format(currentTime, 'HH:mm')}
            </span>
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-1 bg-module/50 p-1 rounded-xl border border-border shrink-0">
            <button onClick={toggleTheme} className="p-2 text-muted shrink-0">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button onClick={toggleLanguage} className="px-2 py-1.5 text-muted flex items-center gap-1 shrink-0">
              <Globe size={16} />
              <span className="text-[10px] font-bold uppercase">{language}</span>
            </button>
            <button className="px-2 py-1.5 text-muted flex items-center gap-1 shrink-0">
              <Coins size={16} />
              <span className="text-[10px] font-bold">{selectedCurrency}</span>
            </button>
          </div>
        </div>

        {/* Slot 3: User Stack (Rigid) */}
        <div className="flex items-center gap-3 pl-3 border-l border-border shrink-0 ml-auto">
          <div className="hidden sm:flex flex-col items-end shrink-0">
            <span className="text-[11px] font-bold text-main whitespace-nowrap">
              {profile?.full_name || 'Admin'}
            </span>
          </div>

          <button className="h-10 w-10 rounded-xl bg-module border border-border flex items-center justify-center shrink-0">
            <User size={18} />
          </button>

          <button onClick={handleLogout} className="p-2 text-muted shrink-0">
            <LogOut size={18} />
          </button>
        </div>

      </div>
    </header>
  );
}