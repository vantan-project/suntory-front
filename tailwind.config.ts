import { error } from "console";
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
        errorColor: "var(--error-color)",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        scroll: "scroll 15s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
