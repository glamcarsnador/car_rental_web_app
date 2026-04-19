import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useConfigStore = create(
  persist(
    (set) => ({
      theme: 'dark', // 'light' | 'dark'
      language: 'EN', // 'EN' | 'AR'
      
      setTheme: (theme) => {
        set({ theme });
        // Apply .dark class to document root for CSS variable shifting
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
      
      toggleTheme: () => {
        set((state) => {
          const newTheme = state.theme === 'dark' ? 'light' : 'dark';
          // Apply side effect
          if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { theme: newTheme };
        });
      },
      
      setLanguage: (language) => set({ language }),
      toggleLanguage: () => set((state) => ({ 
        language: state.language === 'EN' ? 'AR' : 'EN' 
      })),
      
      // Initialize theme on load (side effect for persistence)
      initTheme: () => {
        const saved = JSON.parse(localStorage.getItem('config-storage'))?.state?.theme || 'dark';
        if (saved === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    }),
    {
      name: 'config-storage',
    }
  )
);
