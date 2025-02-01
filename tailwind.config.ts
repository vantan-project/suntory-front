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
        baseColor: "#FDFFFF",
        textColor: "#707070",
        accentBaseColor: "#5BC2DC",
        accentLightColor: "#A6E8F8",
        accentDarkColor: "#247488",
      },
    },
  },
  plugins: [],
} satisfies Config;
