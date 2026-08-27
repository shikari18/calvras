/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0c0c0e",
        sidebar: "#0a0a0c",
        card: "#16161a",
        cardBorder: "#26262c",
        inputBox: "#19191e",
        inputBorder: "#2d2d35",
        accent: {
          blue: "#3b82f6",
          cyan: "#06b6d4",
          purple: "#8b5cf6",
          orange: "#f97316",
          yellow: "#eab308",
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.8, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.02)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2.5s infinite linear',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
