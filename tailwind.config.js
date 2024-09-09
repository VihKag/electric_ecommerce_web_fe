/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    container:{
      center: true,
    },
    extend: {
      screens: {
        xs: '540px',
      },
      colors: {
        primary: '#DB3022',
        secondary: '#6C757D',
        background: '#FFFFFF',
        text: '#444',
        accent: '#28A745',
        border: '#DEE2E6',
        hover: '#0056B3',
        sale: '#FF4136',
        warning: '#FFC107',
        success: '#28A745',
        info: '#17A2B8',       
        footerBackground: '#343A40',
      },
      spacing: {
        '18': '4.5rem', 
        '22': '5.5rem',
        '30': '7.5rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      borderRadius: {
        'lg': '0.5rem',
        'xl': '1rem',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)', 
        'modal': '0 4px 16px rgba(0, 0, 0, 0.2)',
      },
      textColor: {
        'gray': '#343a40',
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark', 'hover', 'focus'], // Thêm các biến thể cho màu nền
      textColor: ['dark', 'hover', 'focus'],
      borderColor: ['dark', 'hover', 'focus'],
      boxShadow: ['dark'],
      opacity: ['disabled'],  // Hỗ trợ trạng thái `disabled`
    },
  },
  plugins: [
  ],
};
