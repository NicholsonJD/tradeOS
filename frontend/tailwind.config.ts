import type { Config } from 'tailwindcss';

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"] ,
  theme: {
    extend: {
      colors: {
        background: "hsl(222 22% 8%)",
        card: "hsl(225 18% 12%)",
        foreground: "hsl(210 40% 96%)",
        muted: "hsl(216 18% 20%)",
        accent: "hsl(196 75% 46%)",
        success: "hsl(145 63% 42%)",
        danger: "hsl(0 72% 51%)"
      },
      boxShadow: {
        glow: "0 0 25px rgba(34, 211, 238, 0.2)"
      }
    }
  },
  plugins: []
};

export default config;
