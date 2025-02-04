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
        scroll: "scroll 20s linear infinite",
      },
      fontFamily: {
        body: [
          "Hiragino Kaku Gothic ProN",
          "Hiragino Sans",
          "Meiryo",
          "sans-serif",
        ],
      },
      fontSize: {
        title: ["32px", { fontWeight: 600 }],
        subtitle: ["22px", { fontWeight: 600 }],
        main: ["16px", { fontWeight: 300 }],
        button: ["18px", { fontWeight: 600 }],
        support: ["12px", { fontWeight: 300 }],
      },
    },
  },
  plugins: [],
} satisfies Config;
