import { useConfigStore } from './useConfigStore';
import { translations } from '../lib/translations';

export const useTranslation = () => {
  const { language } = useConfigStore();
  
  const t = (key) => {
    // Fallback logic if key is missing or language is unknown
    const langDict = translations[language] || translations.EN;
    return langDict[key] || key;
  };

  return { t, language };
};
