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
      colors:{
        primary:"#F28705",
        darkOrange:"#F24405",
        lightOrange:"#F25C05",
        whiteCustom:"#F2F0E4",
      },
      fontFamily: {
        title: ["Bebas Neue", "sans-serif"],
        text: ["Roboto", "sans-serif"],
        text2: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};