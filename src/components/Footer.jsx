import React from 'react';
import { Database, Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="grid-in-footer h-14 bg-[#0A192F] border-t border-slate-800/50 flex items-center justify-between px-6 text-[10px] sm:text-xs">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-slate-500 uppercase tracking-widest font-semibold">
          <Database size={14} className="text-indigo-500/50" />
          <span>Supabase Ready</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500 uppercase tracking-widest font-semibold">
          <Zap size={14} className="text-amber-500/50" />
          <span>Vite Active</span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-slate-500">
        <div className="flex items-center gap-1.5 border border-slate-800 rounded-full px-2 py-0.5 bg-slate-900/50">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          <span className="font-mono">Live v1.0.4-beta</span>
        </div>
        <span className="hidden sm:inline font-medium">© 2026 Glam Cars ERP</span>
      </div>
    </footer>
  );
}
