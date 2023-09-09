/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      "sans": ["Poppins", "sans-serif"]
    },
    extend: {
      colors: {
        "primary-dark": "#252528",
        "light-dark": "#3E3E3E",
        "light-red": "#D6665F",
        "hover-red": "#B9544D"
      },
    },
  },
  plugins: [],
};
