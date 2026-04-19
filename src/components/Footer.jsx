import React from 'react';
import { Database, Zap } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="grid-in-footer h-14 bg-body-bg border-t border-border-main flex items-center justify-between px-6 text-[10px] sm:text-xs transition-colors duration-300">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-muted-text uppercase tracking-widest font-semibold">
          <Database size={14} className="text-accent-indigo/50" />
          <span>Supabase</span>
        </div>
        <div className="flex items-center gap-2 text-muted-text uppercase tracking-widest font-semibold">
          <Zap size={14} className="text-amber-500/50" />
          <span>Vite</span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-muted-text">
        <div className="flex items-center gap-1.5 border border-border-main rounded-full px-2 py-0.5 bg-module-bg/50">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          <span className="font-mono">Live v2.4</span>
        </div>
        <span className="hidden sm:inline font-medium">© {currentYear} Glam Cars ERP - {t('morocco')}</span>
      </div>
    </footer>
  );
}
