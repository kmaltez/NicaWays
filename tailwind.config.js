/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      colors: {
        darkBlack: "#0b0d0d",
        blueSea: "#00486c",
        greenLemon: "#cdcc32",
        greenTale: "#00a9a9",
      },
      fontFamily: {
        raleway: ["Raleway"],
        glacial: ["Glacial-Indifference"],
      },
    },
  },
  plugins: [],
};
