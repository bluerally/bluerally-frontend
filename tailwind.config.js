/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        /** sky */
        'b-20': '#F7F8FD',
        'b-50': '#EFF2FF',
        'b-100': '#DAE2FF',
        'b-150': '#C8D3FF',
        'b-200': '#B5C4FF',
        'b-300': '#91A7FF',
        'b-400': '#6C89FF',
        'b-500': '#476CFF',
        'b-600': '#3958D2',
        'b-700': '#2B43A5',
        'b-800': '#1C2F78',
        'b-900': '#0E1A4B',
        'b-950': '#071035',
        /** gray */
        'g-0': '#fff',
        'g-50': '#fafafa',
        'g-100': '#f4f4f5',
        'g-150': '#F0F0F0',
        'g-200': '#e4e4e5',
        'g-300': '#d4d4d8',
        'g-400': '#a1a1aa',
        'g-500': '#71717a', // sky-500
        'g-600': '#52525b',
        'g-700': '#3f3f46',
        'g-800': '#27272a',
        'g-900': '#18181b',
        'g-950': '#09090b',
        /** error */
        'error-50': '#FFF1F2',
        'error-100': '#FFDCDD',
        'error-150': '#FFB1B6',
        'error-200': '#F4A1A6',
        'error-600': '#e11d48',
        'error-700': '#C51239',
        /** ok */
        'ok-pale': '#E0F8F6', // positive50
        ok: '#0d9488', // positive600
      },
      width: {
        56: '56px',
        68: '68px',
        100: '100px',
        108: '108px',
        390: '390px',
        420: '420px',
        812: '812px',
      },
    },
    fontSize: {
      'font-18': '18px', // 추후 제거 (songtak)
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
  },
  plugins: [],
};
