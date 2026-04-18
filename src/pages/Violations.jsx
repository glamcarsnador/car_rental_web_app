import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../lib/utils';

export default function Violations() {
  const isHandshakeComplete = useAuth((state) => state.isHandshakeComplete);
  const pulseClass = !isHandshakeComplete ? "animate-pulse" : "";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className={cn("h-4 w-48 bg-slate-800 rounded", pulseClass)} />
        <h1 className="text-3xl font-bold text-white tracking-tight">Violations</h1>
      </div>
      
      {/* Skeleton Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className={cn("h-32 bg-slate-800/50 rounded-xl border border-slate-700/50", pulseClass)} />
        ))}
      </div>
      <div className={cn("h-96 w-full bg-slate-800/50 rounded-xl border border-slate-700/50", pulseClass)} />
    </div>
  );
}

