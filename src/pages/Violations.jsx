import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../hooks/useTranslation';
import { cn } from '../lib/utils';

export default function Violations() {
  const isHandshakeComplete = useAuth((state) => state.isHandshakeComplete);
  const { t } = useTranslation();
  const pulseClass = !isHandshakeComplete ? "animate-pulse" : "";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className={cn("h-4 w-48 bg-module-bg rounded", pulseClass)} />
        <h1 className="text-3xl font-bold text-main-text tracking-tight">{t('violations')}</h1>
      </div>
      
      {/* Skeleton Content */}
      <div className={cn("h-[400px] w-full bg-module-bg/50 rounded-xl border border-border-main flex items-center justify-center text-muted-text font-medium", pulseClass)}>
        {!isHandshakeComplete ? t('handshake') : "Ready to Load Violation Reports"}
      </div>
    </div>
  );
}
