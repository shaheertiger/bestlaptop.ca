import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9ecff",
          200: "#bcdcff",
          300: "#8ec5ff",
          400: "#59a4ff",
          500: "#327ffc",
          600: "#1b5ff1",
          700: "#1549de",
          800: "#173cb4",
          900: "#19388e",
        },
        accent: {
          500: "#0e9f6e",
          600: "#057a55",
        },
        ink: {
          900: "#0f1722",
          700: "#27313f",
          500: "#54606e",
          400: "#7b8694",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
