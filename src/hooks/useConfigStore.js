import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useConfigStore = create(
  persist(
    (set) => ({
      theme: 'dark', // 'light' | 'dark'
      language: 'EN', // 'EN' | 'AR'
      
      setTheme: (theme) => {
        set({ theme });
        // Apply theme class to body for CSS variable shifting
        if (theme === 'light') {
          document.body.classList.add('light');
          document.body.classList.remove('dark');
        } else {
          document.body.classList.add('dark');
          document.body.classList.remove('light');
        }
      },
      
      toggleTheme: () => {
        set((state) => {
          const newTheme = state.theme === 'dark' ? 'light' : 'dark';
          // Apply side effect
          if (newTheme === 'light') {
            document.body.classList.add('light');
            document.body.classList.remove('dark');
          } else {
            document.body.classList.add('dark');
            document.body.classList.remove('light');
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
        if (saved === 'light') {
          document.body.classList.add('light');
        } else {
          document.body.classList.add('dark');
        }
      }
    }),
    {
      name: 'config-storage',
    }
  )
);
