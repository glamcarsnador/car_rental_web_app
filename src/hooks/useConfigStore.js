import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Helper to keep the root element and browser overscroll color in sync
const applyThemeSync = (theme) => {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
    root.style.backgroundColor = '#0A192F'; // Matches your --bg-body in CSS
  } else {
    root.classList.remove('dark');
    root.style.backgroundColor = '#F8FAFC'; // Matches your --bg-body in CSS
  }
};

export const useConfigStore = create(
  persist(
    (set) => ({
      theme: 'dark',
      language: 'EN',

      setTheme: (theme) => {
        set({ theme });
        applyThemeSync(theme);
      },

      toggleTheme: () => {
        set((state) => {
          const newTheme = state.theme === 'dark' ? 'light' : 'dark';
          applyThemeSync(newTheme);
          return { theme: newTheme };
        });
      },

      setLanguage: (language) => set({ language }),
      toggleLanguage: () => set((state) => ({
        language: state.language === 'EN' ? 'AR' : 'EN'
      })),

      initTheme: () => {
        const saved = JSON.parse(localStorage.getItem('config-storage'))?.state?.theme || 'dark';
        applyThemeSync(saved);
      }
    }),
    {
      name: 'config-storage',
    }
  )
);