import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#E8F5E9",
        ledger: "#C8E6C9",
        ink: "#1B5E20",
        soil: "#2E7D32",
        wheat: "#4CAF50",
        "wheat-dark": "#388E3C",
        pasture: "#2E7D32",
        "pasture-light": "#43A047",
        rust: "#66BB6A",
        mist: "#558B2F",
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
        body: ["Segoe UI", "Arial", "sans-serif"],
      },
      borderRadius: {
        token: "4px",
      },
    },
  },
  plugins: [],
};
export default config;
