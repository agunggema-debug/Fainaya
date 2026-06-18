/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0f172a",
          gray: "#1e293b",
          blue: "#3b82f6",
          coral: "#f97316",
          light: "#f8fafc",
        },
      },
    },
  },
  plugins: [],
};