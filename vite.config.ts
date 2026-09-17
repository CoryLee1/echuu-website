import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The site is served under /website/ so it can be mounted next to the existing
// product app at / without taking over the product entry point.
export default defineConfig({
  base: '/website/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 2048,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor';
          return undefined;
        },
      },
    },
  },
  server: { port: 5180, host: 'localhost' },
  preview: { port: 5180, host: 'localhost' },
});
