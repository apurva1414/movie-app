/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        griffy: ['Griffy', 'cursive'], 
        montserrat: ['Montserrat', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}

