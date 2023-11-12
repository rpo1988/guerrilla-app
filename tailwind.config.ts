import type { Config } from 'tailwindcss';
import { buildInternalImageUrl } from './app/utils/url';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    colors: {
      'lugar-blue': '#afd4e2',
      'lugar-dark': '#1e3240',
      'lugar-white': '#ffffff',
      'lugar-gray': '#bdbdbd',
    },
    extend: {
      backgroundImage: {
        'house-1': `url('${buildInternalImageUrl('House 1.png')}')`,
      },
    },
  },
  plugins: [],
};
export default config;
