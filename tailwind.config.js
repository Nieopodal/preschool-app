/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.{html,js,hbs}', './public/scripts/photo/slider.js'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  variants: {
    display: ['group-hover'],
  },
};
