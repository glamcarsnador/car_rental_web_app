import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../hooks/useTranslation';
import { cn } from '../lib/utils';

export default function Dashboard() {
  const isHandshakeComplete = useAuth((state) => state.isHandshakeComplete);
  const { t } = useTranslation();
  const pulseClass = !isHandshakeComplete ? "animate-pulse" : "";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className={cn("h-4 w-48 bg-module-bg rounded", pulseClass)} />
        <h1 className="text-3xl font-bold text-main-text tracking-tight">
          {t('dashboard')} {t('overview')}
        </h1>
      </div>
      
      {/* Skeleton Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={cn("h-32 bg-module-bg/50 rounded-xl border border-border-main", pulseClass)} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={cn("lg:col-span-2 h-96 bg-module-bg/50 rounded-xl border border-border-main", pulseClass)} />
        <div className={cn("h-96 bg-module-bg/50 rounded-xl border border-border-main", pulseClass)} />
      </div>
    </div>
  );
}
