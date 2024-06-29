import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 2s linear infinite",
      },
      colors: {
        background: {
          primary: "#FFB800",
          secondary: "#FFFFFF",
        },
        border: {
          primary: "#000000",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#FFB800",
          clickable: "#CA3103",
        },
      },
      fontFamily: {
        sans: ["var(--font-rocknroll-one)"],
      },
    },
  },
};

export default config;
