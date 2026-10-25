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
          DEFAULT: '#8CB89A',
          dark: '#6C9A7A',
          light: '#B8D8C2',
        },
        accent: {
          warm: '#D4937A',
          blue: '#7FB5C9',
          gold: '#E8C87A',
        },
        error: '#D47A8B',
        bg: '#F9F7F4',
        surface: '#EFECE4',
        border: '#E0DCD3',
        text: {
          primary: '#2D2D2D',
          secondary: '#6B6B6B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
      },
      boxShadow: {
        'sm': '0 1px 3px rgba(45, 45, 45, 0.06)',
        'md': '0 2px 8px rgba(45, 45, 45, 0.08)',
      }
    },
  },
  plugins: [],
}
