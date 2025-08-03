import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Relative paths for assets - essential for static hosting
  resolve: {
    alias: {
      "@": "./src",
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
    // Optimize for static deployment
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
    // Ensure all assets are properly referenced
    assetsInlineLimit: 4096, // Inline small assets as base64
  },
  preview: {
    port: 4173,
    strictPort: true,
    open: true
  },
  server: {
    port: 5173,
    strictPort: true,
    open: true
  }
})