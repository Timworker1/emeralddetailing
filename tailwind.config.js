/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#0A0A0B',
          panel: '#141416',
        },
        border: {
          DEFAULT: '#232327',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#F2F2F2',
          muted: '#9A9AA0',
        },
        accent: {
          DEFAULT: '#1FA37A',
          light: '#54C39A',
          dark: '#16775A',
        },
      },
      fontFamily: {
        heading: ['Archivo', 'sans-serif'],
        body: ['Hanken Grotesk', 'sans-serif'],
      },
      letterSpacing: {
        heading: '0.04em',
      },
    },
  },
  plugins: [],
}
