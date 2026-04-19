import React from 'react';
import { cn } from '../../lib/utils';

export default function PriceInput({ value, onChange, placeholder = "0.00", className, id }) {
  return (
    <div className={cn("relative flex items-center group", className)}>
      <input
        id={id}
        type="number"
        step="0.01"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-900/50 dark:bg-slate-900/50 light:bg-slate-100 border border-slate-700 dark:border-slate-700 light:border-slate-300 rounded-lg py-2.5 pl-4 pr-12 text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600"
      />
      <div className="absolute right-3 px-2 py-1 rounded bg-slate-800 dark:bg-slate-800 light:bg-slate-200 border border-slate-700 dark:border-slate-700 light:border-slate-300 text-[10px] font-bold text-slate-400 dark:text-slate-400 light:text-slate-600 pointer-events-none group-focus-within:text-indigo-400 transition-colors">
        DH
      </div>
    </div>
  );
}
