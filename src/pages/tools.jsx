import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../hooks/useTranslation';
import { cn } from '../lib/utils';

export default function Tools() {
  const isHandshakeComplete = useAuth((state) => state.isHandshakeComplete);
  const { t } = useTranslation();
  const pulseClass = !isHandshakeComplete ? "animate-pulse" : "";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className={cn("h-4 w-48 bg-module-bg rounded", pulseClass)} />
        <h1 className="text-3xl font-bold text-main-text tracking-tight">{t('tools')}</h1>
      </div>
      
      {/* Skeleton Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="space-y-4">
          <div className={cn("h-8 w-40 bg-module-bg rounded", pulseClass)} />
          <div className="grid grid-cols-1 gap-4">
             {[1, 2, 3].map((i) => (
              <div key={i} className={cn("h-24 bg-module-bg/50 rounded-xl border border-border-main", pulseClass)} />
            ))}
          </div>
        </section>
        <section className="space-y-4">
          <div className={cn("h-8 w-40 bg-module-bg rounded", pulseClass)} />
          <div className="grid grid-cols-1 gap-4">
             {[1, 2].map((i) => (
              <div key={i} className={cn("h-32 bg-module-bg/50 rounded-xl border border-border-main", pulseClass)} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
