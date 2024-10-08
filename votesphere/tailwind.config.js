/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        lobster: ['"Lobster Two", sans-serif'],
        pasfico: ['"Pacifico", cursive'],
        montserrat: ['"Montserrat Alternates", sans-serif;'],
      },
      colors: {
        customBlue: '#03355F',
        ctaBlue: '#2684F2',
        footerBlue: '#0A2540',
        inputBORDER: '#D9D9D9',
        sidebar: '#f4f4f4',
      },
    },
  },
  plugins: [],
};
