import type { Config } from "tailwindcss";

// BestLaptop.ca tokens. "brand" is the spruce/lake scale used for structure and
// links; "maple" is the brand mark only; "frost" is the cool section surface.
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EEF5F5",
          100: "#DCEBEC",
          200: "#B5D5D9",
          300: "#86B9C1",
          400: "#4C94A2",
          500: "#1F7A8C",
          600: "#0B6A80",
          700: "#0A5568",
          800: "#0E3B43",
          900: "#0A2A30",
        },
        maple: { 500: "#D52B1E", 600: "#B32217" },
        frost: "#F2F5F4",
        line: "#D7DFDD",
        accent: {
          500: "#0E9F6E",
          600: "#057A55",
        },
        ink: {
          900: "#15232A",
          700: "#2C3D45",
          500: "#56666D",
          400: "#7A898F",
        },
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
