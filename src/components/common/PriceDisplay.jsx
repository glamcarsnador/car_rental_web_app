import React from 'react';
import { usePrice } from '../../hooks/usePrice';
import { cn } from '../../lib/utils';

export default function PriceDisplay({ amount, className }) {
  const { formatted } = usePrice(amount);

  return (
    <span className={cn("font-medium tracking-tight whitespace-nowrap", className)}>
      {formatted}
    </span>
  );
}
