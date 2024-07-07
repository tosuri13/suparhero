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
        "spin-loading": "spin 1.2s ease-in-out infinite",
      },
      colors: {
        background: {
          primary: "#FFB800",
          secondary: "#FFFFFF",
          pause: "rgba(63, 63, 63, 0.5)",
        },
        border: {
          primary: "#000000",
          secondary: "#ECB600",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#FFB800",
          tertiary: "#000000",
          clickable: "#CA3103",
          clicked: "#4B5563",
        },
      },
      fontFamily: {
        sans: ["var(--font-rocknroll-one)"],
      },
    },
  },
};

export default config;
