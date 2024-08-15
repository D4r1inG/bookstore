/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        primary: '#00904a',
        'dark-red': '#EB5757',
        'orange-light': '#F18E32',
        'primary-light': '#33a66e',
        'primary-lighter': '#b3dec9',

        white: '#ffffff',
        error: '#EA0505',

        'grey-500': '#5C5C5C',
        'grey-400': '#7A7A7A',
        'grey-300': '#9A9A9A',
        'grey-250': '#BDBDBD',
        'grey-200': '#D6D6D6',
        'grey-100': '#E8E8E8',
        'grey-50': '#F3F3F3',
      },
      width: {
        '81/100': '81%',
        '14/100': '14%',
        '1/25': '5%',
      },
      gridTemplateColumns: {
        station: '75% 25%',
        'form-layout-station': '10% 90%',
        'filter-device': 'repeat(2, minmax(0, 1fr))',
        'filter-device-md': 'repeat(3, minmax(0, 1fr))',
        'filter-device-lg': 'repeat(7, minmax(0, 1fr)) 1.5fr',
      },
    },
  },
  plugins: [],
};

export default config;
