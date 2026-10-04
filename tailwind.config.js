/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          700: '#1d4ed8', // Deep Blue
          900: '#1e3a8a',
        },
        accent: {
          500: '#10b981', // Emerald Green
          600: '#059669',
        }
      }
    },
  },
  plugins: [],
}