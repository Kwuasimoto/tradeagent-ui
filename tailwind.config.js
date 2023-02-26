/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./**/*.{html,ts,css}"
  ],
  theme: {
    extend: {
      colors: {}
    },
  },
  plugins: [require('daisyui')],
  safelist: []
}
