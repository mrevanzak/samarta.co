import typographyPlugin from '@tailwindcss/typography';
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,json,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--background-color))',
        foreground: 'rgb(var(--foreground-color))',
        primary: 'rgb(var(--aw-color-primary))',
        secondary: 'var(--aw-color-secondary)',
        accent: 'var(--aw-color-accent)',
        default: 'var(--aw-color-text-default)',
        muted: 'var(--aw-color-text-muted)',
        'broken-white': 'rgb(var(--aw-color-broken-white))',
        black: 'rgb(var(--aw-color-black))',
      },
      fontFamily: {
        logo: ['Creato Display'],
        primary: ['var(--aw-font-sans, ui-sans-serif)', ...defaultTheme.fontFamily.sans],
        hero: ['bookman-jf-pro', ...defaultTheme.fontFamily.serif],
      },

      animation: {
        fade: 'fadeInUp 1s both',
      },

      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(2rem)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    typographyPlugin,
    plugin(({ addVariant }) => {
      addVariant('intersect', '&:not([no-intersect])');
    }),
  ],
  darkMode: 'class',
};
