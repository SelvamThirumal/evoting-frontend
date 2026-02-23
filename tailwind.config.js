/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {

      colors: {
        primary: "#0f172a",
        secondary: "#1e293b",
        accent: "#f97316",
        success: "#22c55e",
        danger: "#ef4444",
      },

      borderRadius: {
        xl2: "1rem",
      },

      boxShadow: {
        card: "0 4px 20px rgba(0,0,0,0.2)",
      },

      fontFamily: {
        main: ["Poppins", "sans-serif"],
      },

    },
  },

  plugins: [],
};
