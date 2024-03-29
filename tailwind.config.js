/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      /** sky */
      'b-50': '#fafafa',
      'b-100': '#f4f4f5',
      'b-150': '#F0F0F0',
      'b-200': '#e4e4e5',
      'b-300': '#d4d4d8',
      'b-400': '#a1a1aa',
      'b-': '#71717a', // sky-500
      'b-600': '#52525b',
      'b-700': '#3f3f46',
      'b-800': '#27272a',
      'b-900': '#18181b',
      'b-950': '#09090b',
      /** gray */
      'g-50': '#EFF2FF',
      'g-100': '#DAE2FF',
      'g-150': '#C8D3FF',
      'g-200': '#B5C4FF',
      'g-300': '#91A7FF',
      'g-400': '#6C89FF',
      'g-500': '#476CFF',
      'g-600': '#3958D2',
      'g-700': '#2B43A5',
      'g-800': '#1C2F78',
      'g-900': '#0E1A4B',
      'g-950': '#071035',
      /** error */
      'error-pale': '#ffcece', // error50
      error: '#e11d48', // error600
      /** ok */
      'ok-pale': '#E0F8F6', // positive50
      ok: '#0d9488', // positive600
    },
    fontSize: {
      basic: ['12px', { lineHeight: '18px' }],
      sm: ['10px', { lineHeight: '15px' }],
      'sm-2': ['11px', { lineHeight: '17px' }],
      'basic-2': ['13px', { lineHeight: '19.5px' }],
      md: ['14px', { lineHeight: '21px' }],
      'md-2': ['15px', { lineHeight: '22.5px' }],
      lg: ['16px', { lineHeight: '24px' }],
      xl: ['18px', { lineHeight: '27px' }],
      '2xl': ['20px', { lineHeight: '30px' }],
      '3xl': ['22px', { lineHeight: '33px' }],
      '4xl': ['24px', { lineHeight: '36px' }],
      '5xl': ['26px', { lineHeight: '39px' }],
      '6xl': ['32px', { lineHeight: '48px' }],
    },
    extend: {},
  },
  plugins: [],
};
