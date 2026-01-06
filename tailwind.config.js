/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Helvetica Neue',
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
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.font-light-italic': {
          fontWeight: '300',
          fontStyle: 'italic',
        },
        '.font-medium-italic': {
          fontWeight: '500',
          fontStyle: 'italic',
        },
      })
    },
  ],
};