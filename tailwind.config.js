/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Professional Industrial Palette (Slate/Navy/Teal mix)
        // Avoiding pure black (#000) for visual comfort
        industrial: {
          50: '#F8FAFC',   // Light Slate background
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',   // Deep Navy/Slate 
          950: '#0A192F',   // Your "Industrial Dark" base
        },
        accent: {
          teal: '#0D9488',
          steel: '#4682B4',
        }
      },
      fontSize: {
        // Ensuring headers stay between 24px and 32px as requested
        'h1': ['2rem', { lineHeight: '1.2', fontWeight: '800' }],    // 32px
        'h2': ['1.5rem', { lineHeight: '1.3', fontWeight: '700' }],  // 24px
      },
      fontWeight: {
        // Making bold the default "vibe"
        normal: '600',
        bold: '800',
      }
    },
  },
  plugins: [],
}