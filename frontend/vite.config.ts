import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk - common dependencies
          'vendor': [
            'react',
            'react-dom',
            'react-router-dom',
            'axios',
          ],
          // UI/Styling vendor
          'ui-vendor': [
            'sonner',
            '@hookform/resolvers',
            'react-hook-form',
            'zod',
          ],
          // Page chunks - lazy loaded
          'page-products': ['./src/pages/Products'],
          'page-recipes': ['./src/pages/Recipes'],
          'page-users': ['./src/pages/Users'],
        },
      },
    },
    // Smaller chunks are generated for better caching
    chunkSizeWarningLimit: 600,
  },
})
