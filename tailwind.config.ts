import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#fef2f2',
          '100': '#fde3e4',
          '200': '#fdcbcd',
          '300': '#faa7aa',
          '400': '#f57478',
          '500': '#eb484d',
          '600': '#d82a30',
          '700': '#b72025',
          DEFAULT: '#b72025',
          '800': '#961e22',
          '900': '#7d1f22',
          '950': '#440b0d'
        },
        secondary: {
          DEFAULT: '#DC2626',
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D'
        }
      }
    }
  },

  plugins: [forms]
} satisfies Config;
