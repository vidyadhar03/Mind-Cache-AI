/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      height: {
        80: "86%",
        90: "93%",
        10: "7%",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        "first-blue": "#C1D0EF",
        "second-blue": "#7391CD",
        "third-blue": "#314E8A",
        "fourth-blue": "#0F285E",
        "fifth-blue": "#000245",
        "bgc":"#E1E8F0"
      },
    },
  },
  plugins: [],
};
