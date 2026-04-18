import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../lib/utils';

export default function Gantt() {
  const isHandshakeComplete = useAuth((state) => state.isHandshakeComplete);
  const pulseClass = !isHandshakeComplete ? "animate-pulse" : "";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className={cn("h-4 w-48 bg-slate-800 rounded", pulseClass)} />
        <h1 className="text-3xl font-bold text-white tracking-tight">Gantt Calendar</h1>
      </div>
      
      {/* Skeleton Content */}
      <div className="grid grid-cols-1 gap-6">
        <div className={cn("h-[600px] w-full bg-slate-800/50 rounded-xl border border-slate-700/50 flex items-center justify-center text-slate-500 font-medium", pulseClass)}>
          {!isHandshakeComplete ? "Establishing Initial Handshake..." : "Ready to Load Calendar View"}
        </div>
      </div>
    </div>
  );
}

