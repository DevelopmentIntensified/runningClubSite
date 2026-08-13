import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  build: {
    cssMinify: 'lightningcss',
    reportCompressedSize: false
  },
  esbuild: {
    legalComments: 'none'
  },
  optimizeDeps: {
    include: ['luxon']
  }
});
