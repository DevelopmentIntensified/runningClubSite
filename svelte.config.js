import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    csrf: { checkOrigin: process.env.VERCEL_ENV === 'development' ? false : true },
    adapter: adapter(),
    alias: {}
  },

  extensions: ['.svelte']
};

export default config;
