/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic Theme Mapping - Single Source of Truth
        body: 'var(--bg-body)',
        sidebar: 'var(--bg-sidebar)',
        header: 'var(--bg-header)',
        module: 'var(--bg-module)',
        card: 'var(--bg-card)',
        main: 'var(--text-main)',
        muted: 'var(--text-muted)',
        border: 'var(--border-main)',
        accent: 'var(--accent)',
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