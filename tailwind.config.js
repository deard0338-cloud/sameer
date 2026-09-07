/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gov: {
          primary: '#0066A6',
          dark: '#005B96',
          darker: '#004A7C',
          light: '#EAF4FB',
          veryLight: '#F5FAFD',
          bg: '#F7FAFC',
          border: '#E3E7EB',
          borderCard: '#E5E5E5',
          textPrimary: '#111111',
          textSecondary: '#555555',
          textMuted: '#777777',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'gov-card': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'gov-hover': '0 6px 16px rgba(0, 102, 166, 0.08)',
        'gov-header': '0 2px 10px rgba(0, 0, 0, 0.05)',
      },
      gridTemplateColumns: {
        '6-desktop': 'repeat(6, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
}
