/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      fontWeight: {
        light: '300',
        medium: '500',
        bold: '700',
      },
      letterSpacing: {
        wider: '0.1em',
        widest: '0.15em',
      },
    },
  },
  plugins: [],
};