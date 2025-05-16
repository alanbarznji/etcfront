/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Indigo
        secondary: "#9333EA", // Purple
        accent: "#FACC15", // Yellow
        danger: "#DC2626", // Red
        success: "#16A34A", // Green
        background: "#F3F4F6", // Light gray
      }},},
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
