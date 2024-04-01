
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,tsx,ts}","./index.html"],
  theme: {
    extend: {},
  },
  plugins: [ require('daisyui'),require('@tailwindcss/line-clamp')],
}
