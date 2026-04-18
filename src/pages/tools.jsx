import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../lib/utils';

export default function Tools() {
  const isHandshakeComplete = useAuth((state) => state.isHandshakeComplete);
  const pulseClass = !isHandshakeComplete ? "animate-pulse" : "";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className={cn("h-4 w-48 bg-slate-800 rounded", pulseClass)} />
        <h1 className="text-3xl font-bold text-white tracking-tight">System Tools</h1>
      </div>
      
      {/* Skeleton Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className={cn("p-6 bg-slate-800/40 rounded-xl border border-slate-700/50 space-y-4", pulseClass)}>
            <div className="h-10 w-10 bg-slate-700 rounded-lg" />
            <div className="space-y-2">
              <div className="h-4 w-32 bg-slate-700 rounded" />
              <div className="h-3 w-full bg-slate-700/50 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

