/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        primaryColor : '#3378f0',
        primaryColorActif : '#2563ce',
        grayA : '#e8e8e8'
      }
    },
  },
  plugins: [],
}

