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
        className="w-full bg-module border border-border rounded-lg py-2.5 pl-4 pr-12 text-sm font-medium focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all placeholder:text-muted/50"
      />
      <div className="absolute right-3 px-2 py-1 rounded bg-module border border-border text-[10px] font-bold text-muted pointer-events-none group-focus-within:text-accent transition-colors">
        DH
      </div>
    </div>
  );
}
