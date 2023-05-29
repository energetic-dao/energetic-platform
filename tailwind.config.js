/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/components/**/*.{js,vue,ts}', './layouts/**/*.vue', './pages/**/*.vue', './plugins/**/*.{js,ts}', './nuxt.config.{js,ts}'],
  theme: {
    extend: {
      colors: {
        'primary-100': '#006ECF',
        'primary-200': '#004C8F',
        'primary-300': '#002A4F',
        'primary-400': '#002342',
        'primary-500': '#001B33',
        secondary: '#004C8F',
        link: '#2B608F',
        hover: '#0075DB',
      },
    },
  },
  plugins: [],
};
