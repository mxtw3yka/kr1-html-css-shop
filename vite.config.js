import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

const pages = ['index', 'catalog', 'product', 'order', 'contacts', 'search', 'cabinet'];

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    proxy: {
      '/api': process.env.GEAR_API_TARGET || 'http://127.0.0.1:8080',
    },
  },
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map((page) => [page, resolve(import.meta.dirname, `${page}.html`)])),
    },
  },
});
