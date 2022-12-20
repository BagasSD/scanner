const colors = require("tailwindcss/colors")

delete colors?.lightBlue
delete colors?.warmGray
delete colors?.trueGray
delete colors?.coolGray
delete colors?.blueGray

module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./src/pages/**/*.{ts,tsx}"],
  media: false,
  mode: "jit",
  theme: {
    colors: {
      // You may customize your own custom color here
      primary: {
        base: "#E11418",
        darker: "#BF1516",
        dark: "#DD1417",
        light: "#f20a03",
      },
      black: "#000",
      white: "#fff",
      ...colors,
    },
  },
  plugins: [require("tailwind-filter-utilities")],
}
