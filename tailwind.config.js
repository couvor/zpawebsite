/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF7A00',
        primaryLight: '#FF8F33',
        primaryBg: '#FEEBDC',
        textDeep: '#0D0D0D',
        mist: '#F5F5F7',
        highlight: '#FFB366'
      },
      fontFamily: {
        serif: ['Playfair Display', 'Noto Serif SC', 'Georgia', 'serif'],
        sans: ['Noto Serif SC', 'Playfair Display', 'Georgia', 'serif']
      },
      boxShadow: {
        glow: '0 20px 50px rgba(255, 122, 0, 0.18)',
        card: '0 18px 40px rgba(13, 13, 13, 0.08)'
      },
      backgroundImage: {
        halo: 'radial-gradient(circle at 20% 20%, rgba(255, 122, 0, 0.24), rgba(255, 255, 255, 0) 60%)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        spin3d: 'spin3d 20s linear infinite'
      },
      keyframes: {
        spin3d: {
          'from': { transform: 'rotateX(0deg) rotateY(0deg)' },
          'to': { transform: 'rotateX(360deg) rotateY(360deg)' }
        }
      }
    }
  },
  plugins: []
}
