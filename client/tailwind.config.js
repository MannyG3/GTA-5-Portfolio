/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // GTA V Cinematic Color Palette - Sunset + Teal
        gta: {
          // Base colors
          bg: '#0B0D10',
          surface: '#12161C',
          surfaceAlt: '#191F28',
          darker: '#070809',
          
          // Accent colors
          orange: '#FFB35C',
          peach: '#FF7A59',
          teal: '#19C2C7',
          blue: '#2D7DFF',
          red: '#FF3B3B',
          yellow: '#FFD93D',
          
          // Legacy mappings for compatibility
          dark: '#0B0D10',
          green: '#FFB35C', // Map green to orange for compatibility
          cyan: '#19C2C7',
          pink: '#FF7A59',
        },
        // Text colors
        text: {
          primary: '#E8EDF2',
          muted: '#9AA6B2',
          dim: '#5A6672',
        }
      },
      fontFamily: {
        bebas: ['Bebas Neue', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        anton: ['Anton', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glow-teal': 'glowTeal 2s ease-in-out infinite alternate',
        'flicker': 'flicker 3s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
        'glitch': 'glitch 1s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fadeIn 0.5s ease-out',
        'zoom-in': 'zoomIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'loading-bar': 'loadingBar 2.5s ease-in-out',
        'heat-haze': 'heatHaze 8s ease-in-out infinite',
        'gradient-shift': 'gradientShift 10s ease-in-out infinite',
        'police-flash': 'policeFlash 0.5s ease-in-out infinite',
        'tilt-card': 'tiltCard 0.3s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #FFB35C, 0 0 10px #FFB35C, 0 0 15px rgba(255,179,92,0.3)' },
          '100%': { boxShadow: '0 0 10px #FFB35C, 0 0 25px #FFB35C, 0 0 40px rgba(255,179,92,0.4)' },
        },
        glowTeal: {
          '0%': { boxShadow: '0 0 5px #19C2C7, 0 0 10px #19C2C7, 0 0 15px rgba(25,194,199,0.3)' },
          '100%': { boxShadow: '0 0 10px #19C2C7, 0 0 25px #19C2C7, 0 0 40px rgba(25,194,199,0.4)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.95' },
          '75%': { opacity: '0.9' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        pulseNeon: {
          '0%, 100%': { textShadow: '0 0 5px currentColor, 0 0 10px currentColor' },
          '50%': { textShadow: '0 0 20px currentColor, 0 0 35px currentColor, 0 0 50px currentColor' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        loadingBar: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        heatHaze: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        policeFlash: {
          '0%, 100%': { opacity: '0' },
          '25%': { opacity: '1', backgroundColor: '#FF3B3B' },
          '75%': { opacity: '1', backgroundColor: '#2D7DFF' },
        },
        tiltCard: {
          '0%': { transform: 'perspective(1000px) rotateX(0) rotateY(0)' },
          '100%': { transform: 'perspective(1000px) rotateX(2deg) rotateY(2deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(25,194,199,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(25,194,199,0.03) 1px, transparent 1px)',
        'halftone': 'radial-gradient(circle, rgba(255,179,92,0.03) 1px, transparent 1px)',
        'sunset-gradient': 'linear-gradient(135deg, #FF7A59 0%, #FFB35C 50%, #19C2C7 100%)',
        'vignette': 'radial-gradient(ellipse at center, transparent 0%, rgba(11,13,16,0.4) 70%, rgba(11,13,16,0.8) 100%)',
      },
      backgroundSize: {
        'halftone': '4px 4px',
      },
    },
  },
  plugins: [],
}
