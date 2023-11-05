import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    colors: {
      'lugar-blue': '#afd4e2',
      'lugar-dark': '#1e3240',
      'lugar-white': '#ffffff',
      'lugar-gray': '#bdbdbd',
      'lugar-gray-2': '#c4c4c4',
    },
    extend: {
      backgroundImage: {
        'house-1': "url('/images/House 1.png')",
      },
    },
  },
  plugins: [],
};
export default config;
