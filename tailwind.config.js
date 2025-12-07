/** @type {import('tailwindcss').Config} */
module.exports = {

  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#2E2E2E'
      }
    },
  },
  plugins: [],
}
