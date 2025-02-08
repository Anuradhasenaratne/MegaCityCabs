/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF0000',
        secondary: {
          100: '#FF0000',
          200: '#888883',
        },
        // Add new colors for the dashboard design
        'gray-850': '#18212f',
        'blue-400': '#60a5fa',
        'purple-400': '#c084fc',
        'green-400': '#4ade80'
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(200px, 1fr))',
      },
      animation: {
        car: 'carMove 5s linear infinite',
        // Add the fade-in-down animation
        'fade-in-down': 'fadeInDown 0.5s ease-out'
      },
      keyframes: {
        carMove: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        // Add the new keyframes for fade-in-down
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      // Add backdrop-filter utilities if not already present
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
    },
  },
  plugins: [
    // Add required plugins for backdrop-filter
    require('@tailwindcss/forms'),
    require('tailwindcss-filters'),
  ],
}