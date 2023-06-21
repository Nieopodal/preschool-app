/** @type {import("tailwindcss").Config} */
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
    themes: [
      {
        main: {
          primary: '#65c3c8',
          secondary: '#ef9fbc',
          accent: '#eeaf3a',
          neutral: '#291334',
          'base-100': '#faf7f5',
          info: '#ffffff',
          success: '#36d399',
          warning: '#fbbd23',
          error: '#f87272',
        },
      },
      {
        highContrast: {
          primary: '#006b70',
          secondary: '#865064',
          accent: '#111827',
          neutral: '#dedede',
          'base-100': '#f5f5f4',
          info: '#766060',
          success: '#24e581',
          warning: '#d89d13',
          error: '#fc547e',
        },
      },
    ],
  },
};
