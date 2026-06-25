/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agrovista: {
          light: '#6fbf73',
          DEFAULT: '#144B27',
          dark: '#0B2B16',
          gold: '#D4B26F',
          goldDark: '#A88448',
          goldLight: '#FAF6F0',
          cream: '#FAF6F0',
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-delayed': 'fadeInUp 0.8s ease-out 0.3s forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
