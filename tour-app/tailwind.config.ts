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
        sans: ['var(--font-vazirmatn)', 'Vazirmatn', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#F7374F',
          dark: '#88304E',
          darker: '#522546',
        },
        secondary: '#3A7D44',  // Forest green
        dark: '#2C2C2C',
        light: '#E8F3E8',      // Light pine green
        accent: '#4A8C4A',     // Medium pine green
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config; 