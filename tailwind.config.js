/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        grotesk: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        primary: '#DC2626',      // Authorcraft Red
        secondary: '#FCD34D',    // Authorcraft Yellow
        accent: '#F97316',       // Orange accent
        dark: '#1a1a2e',
        light: '#f5f5f5',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #DC2626 0%, #FCD34D 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #FCD34D 0%, #F97316 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'particle': 'particle 20s linear infinite',
        'bounce-slow': 'bounce 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scale-pulse': 'scale-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'subtle-glow': 'subtle-glow 3s ease-in-out infinite',
        'flip-in': 'flip-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'flip-out': 'flip-out 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'rotate-3d': 'rotate-3d 8s linear infinite',
        'slide-in-left': 'slide-in-left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'slide-in-right': 'slide-in-right 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'zoom-blur-in': 'zoom-blur-in 0.8s ease-out',
        'pop-in': 'pop-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'float-3d': 'float-3d 4s ease-in-out infinite',
        'aurora-shift': 'aurora-shift 15s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        particle: {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '1' },
          '100%': { transform: 'translateY(-1000px) translateX(100px)', opacity: '0' },
        },
        'scale-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'flip-in': {
          '0%': { opacity: '0', transform: 'rotateY(90deg) rotateX(10deg)' },
          '100%': { opacity: '1', transform: 'rotateY(0deg) rotateX(0deg)' },
        },
        'flip-out': {
          '0%': { opacity: '1', transform: 'rotateY(0deg) rotateX(0deg)' },
          '100%': { opacity: '0', transform: 'rotateY(-90deg) rotateX(-10deg)' },
        },
        'rotate-3d': {
          '0%': { transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)' },
          '100%': { transform: 'rotateX(360deg) rotateY(360deg) rotateZ(0deg)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-100px) skewX(10deg)' },
          '100%': { opacity: '1', transform: 'translateX(0) skewX(0deg)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(100px) skewX(-10deg)' },
          '100%': { opacity: '1', transform: 'translateX(0) skewX(0deg)' },
        },
        'zoom-blur-in': {
          '0%': { opacity: '0', transform: 'scale(0.8) blur(10px)' },
          '100%': { opacity: '1', transform: 'scale(1) blur(0)' },
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(0) rotateZ(-180deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotateZ(0deg)' },
        },
        'float-3d': {
          '0%, 100%': { transform: 'translateY(0px) rotateX(0deg) rotateY(-10deg)' },
          '50%': { transform: 'translateY(-20px) rotateX(5deg) rotateY(10deg)' },
        },
        'aurora-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
