import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
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
