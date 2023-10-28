import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        fever: {
          primary: "#e10600",
          secondary: "#1e1e27",
          accent: "#F8F4F0",
          neutral: "#0e0e14",
          "base-100": "#15151E",
          info: "#0891b2",
          success: "#006341",
          warning: "#f59e0b",
          error: "#e00",
        },
      },
    ],
  },
};
export default config;
