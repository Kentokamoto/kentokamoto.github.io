/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}", "./node_modules/tw-elements/dist/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        "pewter": "#D7E3E5",
        "misty-blue": "#2E4D58",
        "baby-blue": "#3D9ABD",
        "blue-grotto": "#00789D",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
