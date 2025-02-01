import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        baseColor: "var(--base-color)",
        textColor: "var(--text-color)",
        accentBaseColor: "var(--accent-base-color)",
        accentLightColor: "var(--accent-light-color)",
        accentDarkColor: "var(--accent-dark-color)",
      },
    },
  },
  plugins: [],
} satisfies Config;
