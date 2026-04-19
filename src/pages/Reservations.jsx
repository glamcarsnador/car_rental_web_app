import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../hooks/useTranslation';
import { cn } from '../lib/utils';

export default function Reservations() {
  const isHandshakeComplete = useAuth((state) => state.isHandshakeComplete);
  const { t } = useTranslation();
  const pulseClass = !isHandshakeComplete ? "animate-pulse" : "";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className={cn("h-4 w-48 bg-module rounded", pulseClass)} />
        <h1 className="text-3xl font-bold text-main tracking-tight">{t('reservations')}</h1>
      </div>
      
      {/* Skeleton Content */}
      <div className={cn("flex justify-between items-center bg-module/30 p-4 rounded-lg border border-border", pulseClass)}>
        <div className="h-10 w-64 bg-module rounded" />
        <div className="h-10 w-32 bg-module rounded" />
      </div>
      <div className={cn("h-[500px] w-full bg-module/50 rounded-xl border border-border", pulseClass)} />
    </div>
  );
}
