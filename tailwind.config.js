/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF7A00',
        primaryLight: '#FF8F33',
        primaryBg: '#FEEBDC',
        textDeep: '#111827',
        mist: '#EEF1F8',
        highlight: '#FFB366',
        ink: '#28324b',
        slateSoft: '#6f7c99',
        card: '#f7f9ff'
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'DM Sans', 'Segoe UI', 'sans-serif'],
        display: ['Manrope', 'Plus Jakarta Sans', 'sans-serif']
      },
      boxShadow: {
        glow: '0 18px 44px rgba(255, 122, 0, 0.22)',
        card: '0 20px 60px rgba(22, 35, 72, 0.10)',
        soft: '0 10px 30px rgba(31, 45, 88, 0.08)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-9px)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '0.95' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 5s ease-in-out infinite'
      }
    }
  },
  plugins: []
}
