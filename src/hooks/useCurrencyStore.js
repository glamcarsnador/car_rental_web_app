import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';

export const useCurrencyStore = create(
  persist(
    (set, get) => ({
      selectedCurrency: 'MAD', // 'MAD' | 'EUR' | 'USD'
      rates: {
        EUR: 10.85,
        USD: 10.20
      },
      lastUpdated: null,

      setSelectedCurrency: (currency) => set({ selectedCurrency: currency }),

      fetchRates: async () => {
        try {
          const { data, error } = await supabase
            .from('exchange_rates')
            .select('currency_code, rate_to_mad');
          
          if (error) throw error;
          
          const newRates = {};
          data.forEach(item => {
            newRates[item.currency_code] = parseFloat(item.rate_to_mad);
          });
          
          set({ 
            rates: newRates,
            lastUpdated: new Date().toISOString()
          });
          console.log('[CurrencyStore] Rates updated:', newRates);
        } catch (err) {
          console.error('[CurrencyStore] Failed to fetch rates:', err);
        }
      },

      // Helper to convert MAD to selected currency
      convertFromMAD: (amountInMAD) => {
        const { selectedCurrency, rates } = get();
        if (selectedCurrency === 'MAD') return amountInMAD;
        
        const rate = rates[selectedCurrency];
        if (!rate) return amountInMAD;
        
        return amountInMAD / rate;
      }
    }),
    {
      name: 'currency-storage',
      partialize: (state) => ({ selectedCurrency: state.selectedCurrency })
    }
  )
);
