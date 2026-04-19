/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic Theme Mapping
        'body-bg': 'var(--bg-body)',
        'header-bg': 'var(--bg-header)',
        'module-bg': 'var(--bg-module)',
        'main-text': 'var(--text-main)',
        'muted-text': 'var(--text-muted)',
        'border-main': 'var(--border-color)',
        
        // Consistent Accents
        accent: {
          indigo: '#6366F1',
          teal: '#0D9488',
          steel: '#4682B4',
        },
        
        // Industrial Palette (Retained for legacy utility)
        industrial: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#0A192F',
        }
      },
      fontSize: {
        'h1': ['2rem', { lineHeight: '1.2', fontWeight: '800' }],
        'h2': ['1.5rem', { lineHeight: '1.3', fontWeight: '700' }],
      },
      fontWeight: {
        normal: '600',
        bold: '800',
      }
    },
  },
  plugins: [],
}