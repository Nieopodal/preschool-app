/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.{html,js,hbs}',
    './public/scripts/album/slider.js',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  variants: {
    display: ['group-hover'],
  },
  daisyui: {
    themes: ['cupcake'],
  },
};
