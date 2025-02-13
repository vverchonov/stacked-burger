import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'baloo': ['Baloo', 'sans-serif'],
        'arial-black': ['"Arial Black"', 'Arial', 'sans-serif']
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-100% - 2rem))' }
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideInNext: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        slideInPrev: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        textFadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        'scroll': 'scroll 40s linear infinite',
        'fadeIn': 'fadeIn 0.5s ease-out forwards',
        'slideInNext': 'slideInNext 0.8s ease-out forwards',
        'slideInPrev': 'slideInPrev 0.8s ease-out forwards',
        'textFadeIn': 'textFadeIn 1s ease-out forwards'
      }
    },
  },
  plugins: [],
} satisfies Config;
