import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [enhancedImages(), sveltekit()],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: 'lightningcss'
  },
  esbuild: {
    legalComments: 'none'
  },
  optimizeDeps: {
    include: ['svelte', 'drizzle-orm', 'lucia', 'luxon']
  }
});
