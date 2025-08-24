/** @type {import('tailwindcss').Config} */



module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}", // Update this path according to your file structure
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        auto: "repeat(auto-fit, minmax(200px, 1fr))",
      },
      fontFamily: {
        Outfit: ["Outfit", "sans-serif"],
        Ovo: ["Ovo", "serif"],
      },
      animation: {
        spin_slow: "spin 6s linear infinite",
      },
    },
  },
  plugins: [],
};
