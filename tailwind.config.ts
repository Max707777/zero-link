import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ibm: ["var(--font-ibm-plex)", "sans-serif"],
        "serif-display": ["var(--font-source-serif)", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
