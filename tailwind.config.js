// tailwind.config.js
const colors = require("tailwindcss/colors");

// Remove deprecated colors
delete colors["lightBlue"];
delete colors["warmGray"];
delete colors["trueGray"];
delete colors["coolGray"];
delete colors["blueGray"];

module.exports = {
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",
      ...colors,
    },
  },
  plugins: [],
  xwind: {
    mode: "objectstyles",
  },
};
