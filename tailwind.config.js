/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#fdfcf8',
          100: '#faf6ec',
          200: '#f3ecd6',
          300: '#e9dcb5',
        },
        navy: {
          50: '#eef3ff',
          100: '#d9e2fb',
          200: '#b3c4f6',
          300: '#7e97ec',
          400: '#506fd9',
          500: '#2f4cbf',
          600: '#2338a0',
          700: '#1d2e80',
          800: '#162058',
          900: '#0f1640',
          950: '#080c24',
        },
        lilac: {
          400: '#c4b5fd',
          500: '#a78bfa',
          600: '#8b5cf6',
        },
        sky: {
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
        },
        mint: {
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
        },
        rose: {
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(16, 32, 88, 0.12)',
        'soft-lg': '0 24px 60px -16px rgba(16, 32, 88, 0.18)',
        glow: '0 0 0 1px rgba(167, 139, 250, 0.3), 0 12px 36px -8px rgba(167, 139, 250, 0.35)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
