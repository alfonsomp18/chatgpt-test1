import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pitch: '#0f766e',
        trophy: '#f59e0b',
      },
      boxShadow: {
        card: '0 20px 45px -25px rgba(15, 23, 42, 0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
