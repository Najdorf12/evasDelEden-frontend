/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  "darkMode": "class",
  theme: {
    screens: {
      sm: "420px",

      md: "650px",

      lg: "1000px",

      xl: "1300px",

      "2xl": "1600px",
    },
    extend: {
      fontFamily: {
        title: ["Bebas Neue", "sans-serif"],
        text: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};