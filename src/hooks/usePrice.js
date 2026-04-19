import { useCurrencyStore } from './useCurrencyStore';

export const usePrice = (amountInMAD) => {
  const { selectedCurrency, convertFromMAD } = useCurrencyStore();
  
  const converted = convertFromMAD(amountInMAD);
  
  const formatted = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: selectedCurrency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(converted);

  return {
    value: converted,
    formatted,
    currency: selectedCurrency
  };
};
