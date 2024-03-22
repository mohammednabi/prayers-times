/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: "#root",
  theme: {
    extend: {
      fontFamily: {
        cairo: ["cairo"],
      },
      colors: {
        beige: "#e8e0d5",
        lightBeige: "#f2ede6",
        lightBrown: "#690f20",
        darkGreen: "#061f29",
        lightGreen: "#1d9b76",
        lightBlue: "#32686a",
      },
    },
  },
  plugins: [],
};
