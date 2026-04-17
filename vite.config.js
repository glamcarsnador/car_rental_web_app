import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Allows for clean imports: import { Button } from '@/components'
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // Ensuring a consistent port for local development
    port: 3000,
    strictPort: true,
    // Helpful if you're testing on mobile or other devices in your network
    host: true,
  },
  build: {
    // Industrial projects often benefit from clear folder structures
    outDir: 'dist',
    sourcemap: true, // Easier debugging in production
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'lucide-react'],
        },
      },
    },
  },
})