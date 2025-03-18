/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bnpl-blue": "#1E40AF",
        "bnpl-light-blue": "#60A5FA",
      },
    },
  },
  plugins: [],
};