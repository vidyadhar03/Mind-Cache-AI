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
      width: {
        80: "86%",
        90: "93%",
        10: "7%",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        honk: ["'Honk'", "system-ui"],
        protest: ["Protest Riot"],
        pacifico: ["Pacifico", "cursive"],
        exo: ["'Exo 2'", "sans-serif"],
      },
      colors: {
        "cardi":"#EAECFF",
        // "card":"#ECEAFF",
        "card":"#F5F0FF",
        "first-blue": "#C1D0EF",
        "second-blue": "#7391CD",
        "third-blue": "#314E8A",
        "fourth-blue": "#0F285E",
        "fifth-blue": "#000245",
        bgc: "#F5F0FF",
      },
    },
  },
  plugins: [
    // Other plugins...
    function ({ addUtilities }) {
      const newUtilities = {
        '.hide-scrollbar': {
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none', /* Firefox */
          '&::-webkit-scrollbar': {
            display: 'none', /* Chrome, Safari, Opera*/
          }
        },
      }
      addUtilities(newUtilities, ['responsive']);
    }
  ],
};
