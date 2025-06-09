import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
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
  plugins: [
    heroui({
      layout: {
        dividerWeight: "1px", 
        disabledOpacity: 0.5, 
        fontSize: {
          tiny: "0.75rem", 
          small: "0.875rem", 
          medium: "1rem", 
          large: "1.125rem", 
        },
        lineHeight: {
          tiny: "1rem", 
          small: "1.25rem", 
          medium: "1.5rem", 
          large: "1.75rem", 
        },
        radius: {
          small: "4px", 
          medium: "8px", 
          large: "12px", 
        },
        borderWidth: {
          small: "1px", 
          medium: "1px", 
          large: "2px", 
        },
      },
      themes: {
        dark: {
          colors: {
            background: {
              DEFAULT: "#202020"
            },
            foreground: {
              DEFAULT: "#F5F5F5"
            },
            primary: {
              50: "#E6F0F7",
              100: "#CCE1EF",
              200: "#99C3DF",
              300: "#66A5CF",
              400: "#3387BF",
              500: "#034977",
              600: "#023A5F",
              700: "#022C47",
              800: "#011D2F",
              900: "#000F18",
              DEFAULT: "#034977",
              foreground: "#FFFFFF"
            },
            secondary: {
              DEFAULT: "#FF9218",
              foreground: "#000000"
            },
            success: {
              DEFAULT: "#17c964",
              foreground: "#ffffff"
            },
            warning: {
              DEFAULT: "#FFE65B",
              foreground: "#000000"
            },
            danger: {
              DEFAULT: "#f31260",
              foreground: "#ffffff"
            },
            content1: {
              DEFAULT: "#2B2B2B",
              foreground: "#F5F5F5"
            },
            content2: {
              DEFAULT: "#3A3A3A",
              foreground: "#F5F5F5"
            },
            content3: {
              DEFAULT: "#494949",
              foreground: "#F5F5F5"
            },
            content4: {
              DEFAULT: "#585858",
              foreground: "#F5F5F5"
            },
            default: {
              DEFAULT: "#2B2B2B",
              foreground: "#F5F5F5"
            },
            divider: {
              DEFAULT: "rgba(245, 245, 245, 0.2)"
            },
            focus: {
              DEFAULT: "#FF9218"
            }
          }
        }
      }
    })
  ]
}
