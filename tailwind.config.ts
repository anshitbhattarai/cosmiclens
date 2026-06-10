import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#020817",
        "accent-blue": "#60a5fa",
        "accent-purple": "#a78bfa",
        "accent-pink": "#E94560",
        muted: "#64748b",
      },
    },
  },
  plugins: [],
};
export default config;
