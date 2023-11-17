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
          primary: "#FF1800",
          secondary: "#1B1B23",
          accent: "#ffffff",
          neutral: "#15151E",
          "base-100": "#121217",
          info: "#008eb7",
          success: "#00c4a4",
          warning: "#ff9400",
          error: "#ff6973",
        },
      },
    ],
  },
};
export default config;
