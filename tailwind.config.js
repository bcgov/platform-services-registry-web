const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        18: "4.35rem",
        17: "4.3rem",
      },
      colors: {
        bcblue: "#003366",
        bcorange: "#FCBA19",
      },
      borderWidth: {
        3: "3px",
      },
      textColor: {
        deselected: "rgba(102, 112, 133, 0.44)",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        roboto: ["Roboto", ...defaultTheme.fontFamily.sans],
        bcsans: ["BCSans", "sans-serif"],
      },
      maxWidth: {
        test: "40%",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
