import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          light: '#ba4800',
        },
        indigo: {
          600: '#4338ca', 
        },
        brown: {
          brown: '#32161f', 
        },
        greenwhite: {
          300: '#81a094', 
        },
        darkpurple: {
          600: '#32161f', 
        },
        whitebrown: {
          300: '#775b59', 
        },
        
      },
      backgroundColor: {
        orange: {
          light: '#ba4800',
        },
        blue:{
          600:'#4338ca',
        },
        greenwhite: {
          300: '#81a094', 
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      width:{
        '100': '100%', 
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};

export default config;
