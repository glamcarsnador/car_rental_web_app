import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../lib/utils';

export default function Reservations() {
  const isHandshakeComplete = useAuth((state) => state.isHandshakeComplete);
  const pulseClass = !isHandshakeComplete ? "animate-pulse" : "";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className={cn("h-4 w-48 bg-slate-800 rounded", pulseClass)} />
        <h1 className="text-3xl font-bold text-white tracking-tight">Reservations</h1>
      </div>
      
      {/* Skeleton Content */}
      <div className={cn("flex justify-between items-center bg-slate-800/30 p-4 rounded-lg border border-slate-700/50", pulseClass)}>
        <div className="h-10 w-64 bg-slate-800 rounded" />
        <div className="h-10 w-32 bg-slate-800 rounded" />
      </div>
      <div className={cn("h-[500px] w-full bg-slate-800/50 rounded-xl border border-slate-700/50", pulseClass)} />
    </div>
  );
}

