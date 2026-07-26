import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        Primary_White: '#FFFFFF',
        Off_White: '#FAF6F7',
        Surface: '#F2F0F2',
        Lavender: '#F4F0F2',
        Footer_Bg: '#F5F0F0',
        Border: '#E5DBDF',
        Border_Light: '#E8E8E8',
        Blush: '#F7D9E3',
        Blush_Light: '#F5D0D9',
        Brand_Pink: '#D4899B',
        Rose_Dark: '#C76A91',
        Rose_Accent: '#E392B0',
        Muted: '#707070',
        Muted_Light: '#8E8E8E',
        Ink: '#2D2926',
        Charcoal: '#231F20',
        Admin_Base: '#161114',
        Admin_Cards: '#221C20',
        Admin_Elevated: '#2C242A',
        Admin_Accent: '#F2A8C4',
        Admin_Text: '#F5EEF1',
        Admin_Muted: '#9A8E94',
        Admin_Green: '#6FCF97',
        Admin_Amber: '#F2C57C',
        Admin_Blue: '#7FB5E6',
      },
      fontFamily: {
        Display: ['var(--font-cormorant)', 'serif'],
        Body: ['var(--font-jost)', 'sans-serif'],
      },
      animation: {
        Fade_In: 'fadeIn 0.3s ease-in-out',
        Scale_Up: 'scaleUp 0.3s ease-out',
        Slide_In_Right: 'slideInRight 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
