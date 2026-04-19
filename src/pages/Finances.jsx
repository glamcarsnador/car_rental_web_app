import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../hooks/useTranslation';
import { cn } from '../lib/utils';

export default function Finances() {
  const isHandshakeComplete = useAuth((state) => state.isHandshakeComplete);
  const { t } = useTranslation();
  const pulseClass = !isHandshakeComplete ? "animate-pulse" : "";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className={cn("h-4 w-48 bg-module rounded", pulseClass)} />
        <h1 className="text-3xl font-bold text-main tracking-tight">{t('finances')}</h1>
      </div>
      
      {/* Skeleton Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className={cn("h-32 bg-module/50 rounded-xl border border-border", pulseClass)} />
        ))}
      </div>
      <div className={cn("h-96 w-full bg-module/50 rounded-xl border border-border flex items-center justify-center text-muted font-medium", pulseClass)}>
        {!isHandshakeComplete ? t('handshake') : "Ready to Load Financial Overview"}
      </div>
    </div>
  );
}
