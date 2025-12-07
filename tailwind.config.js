/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./screens/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#2E2E2E'
      },
      fontFamily: {
        inter: ['Inter_400Regular'], 
        sans: ['Inter_400Regular'], 
      }
    },
  },
  plugins: [],
}