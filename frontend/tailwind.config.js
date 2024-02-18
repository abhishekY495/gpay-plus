/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          "0%": {
            backgroundColor: "#f2f2f2",
          },
          "50%": {
            backgroundColor: "#eaeaea",
          },
          "100%": {
            backgroundColor: "#f2f2f2",
          },
        },
        "shimmer-red": {
          "0%": {
            backgroundColor: "#fce1e1",
          },
          "50%": {
            backgroundColor: "#fad4d4",
          },
          "100%": {
            backgroundColor: "#fce1e1",
          },
        },
        "shimmer-green": {
          "0%": {
            backgroundColor: "#e1fce1",
          },
          "50%": {
            backgroundColor: "#d7fad4",
          },
          "100%": {
            backgroundColor: "#e1fce1",
          },
        },
        pulsefast: {
          "100%": { opacity: "0.7" },
        },
      },
      animation: {
        "shimmer-ui": "shimmer 1.5s infinite",
        "shimmer-green": "shimmer-green 1.5s infinite",
        "shimmer-red": "shimmer-red 1.5s infinite",
        "pulse-fast": "pulsefast 0.5s linear infinite",
      },
    },
  },
  plugins: [],
};
