import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Code splitting and optimization
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': [
            'react',
            'react-dom',
            'react-router-dom',
            'framer-motion',
          ],
          'ui': [
            './src/components/Navbar',
            './src/components/Footer',
            './src/components/ThemeToggle',
          ],
        },
      },
    },
    // Compression settings
    minify: 'terser',
    // CSS optimization
    cssCodeSplit: true,
    sourcemap: false,
    // Asset optimization
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 500,
  },
  server: {
    // Development optimizations
    middlewareMode: false,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react',
    ],
    exclude: ['@rollup/plugin-commonjs'],
  },
})
