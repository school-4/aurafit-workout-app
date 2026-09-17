/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ios: {
          bg: '#000000',
          card: '#121214',
          cardBorder: '#27272a',
          secondary: '#1c1c1e',
          tertiary: '#2c2c2e',
          textMuted: '#8e8e93',
          tint: '#ffffff',
          accent: '#f4f4f5'
        }
      },
      fontFamily: {
        ios: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'SF Pro Display', 'Segoe UI', 'Roboto', 'sans-serif']
      },
      animation: {
        'scale-spring': 'scaleSpring 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'fade-in': 'fadeIn 0.25s ease-out',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-glow': 'pulseGlow 2s infinite',
        'check-bounce': 'checkBounce 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      },
      keyframes: {
        scaleSpring: {
          '0%': { transform: 'scale(0.92)' },
          '50%': { transform: 'scale(1.04)' },
          '100%': { transform: 'scale(1)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(18px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' }
        },
        checkBounce: {
          '0%': { transform: 'scale(0.8)' },
          '45%': { transform: 'scale(1.2)' },
          '70%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' }
        }
      }
    },
  },
  plugins: [],
}