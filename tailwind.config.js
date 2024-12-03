/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        museoModerno: "MuseoModerno",
        comfortaa: "Comfortaa",
      },
      colors: {
        background: "#ffffff",
        foreground: "var(--foreground)",
        backDropDark: "#4d1821",
        backDropPink: "#ffc1bd",
        backDropBlue: "#a8d5da",
        buttonPurple: "#795dc9",
        strongPink: "#ff3659",
      },
    },
  },
  plugins: [],
};
