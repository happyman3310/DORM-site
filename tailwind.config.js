
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'ubuntu': ['Ubuntu', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      colors: {
        'primary-blue': '#034977',
        'accent-orange': '#FF9218',
        'brand-yellow': '#FFE65B',
        'surface-gray': '#2B2B2B',
        'text-light': '#F5F5F5',
      },
      backgroundImage: {
        'gradient-primary-accent': 'linear-gradient(to right, #034977, #FF9218)',
      },
      gridTemplateColumns: {
        '12': 'repeat(12, minmax(0, 1fr))',
      },
      padding: {
        'section': '160px',
      },
      height: {
        'header': '72px',
      },
      minHeight: {
        'hero': '92vh',
      },
      maxWidth: {
        'container': '1920px',
      },
      boxShadow: {
        'glow': '0 0 15px rgba(255, 146, 24, 0.5)',
      },
      animation: {
        'text-glow': 'textGlow 4s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'counter-fade': 'fadeUp 0.6s ease-out 0.6s forwards',
      },
      keyframes: {
        textGlow: {
          '0%, 100%': { textShadow: '0 0 5px rgba(255, 146, 24, 0.2)' },
          '50%': { textShadow: '0 0 15px rgba(255, 146, 24, 0.6)' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      transitionProperty: {
        'filter': 'filter',
      },
    },
  },
  darkMode: "class",
  plugins: []
}
