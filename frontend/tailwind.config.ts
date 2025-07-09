import { type Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Playfair Display', 'serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      colors: {
        primary: {
          50: '#F8F8F8',
          100: '#F0F0F0',
          200: '#E5E5E5',
          300: '#D1D1D1',
          400: '#B8B8B8',
          500: '#9A9A9A',
          600: '#7A7A7A',
          700: '#4A4A4A',  // Body text
          800: '#3A3A3A',
          900: '#2B2B2B',  // Headings
        },
        accent: {
          50: '#FDF8F3',
          100: '#FAF0E6',
          200: '#F4E0C7',
          300: '#EDD0A8',
          400: '#E6C089',
          500: '#C19B6A',  // Main accent
          600: '#A8845A',
          700: '#8F6D4A',
          800: '#76563A',
          900: '#5D3F2A',
        },
        surface: {
          50: '#FEFEFE',   // Main background
          100: '#FCFCFC',
          200: '#F8F8F8',  // Card backgrounds
          300: '#F5F5F5',
          400: '#F0F0F0',
          500: '#E8E8E8',
        },
        border: {
          light: '#F0F0F0',
          DEFAULT: '#E5E5E5',
          dark: '#D1D1D1',
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            lineHeight: '1.75',
            fontSize: '1.125rem',
            color: '#4A4A4A',
            h1: {
              color: '#2B2B2B',
              fontWeight: '700',
              fontSize: '2.25rem',
              lineHeight: '1.2',
              marginTop: '0',
              marginBottom: '1rem',
            },
            h2: {
              color: '#2B2B2B',
              fontWeight: '600',
              fontSize: '1.875rem',
              lineHeight: '1.3',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            h3: {
              color: '#2B2B2B',
              fontWeight: '600',
              fontSize: '1.5rem',
              lineHeight: '1.4',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
            },
            p: {
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
            },
            a: {
              color: '#C19B6A',
              textDecoration: 'none',
              '&:hover': {
                color: '#A8845A',
                textDecoration: 'underline',
              },
            },
            blockquote: {
              borderLeftColor: '#C19B6A',
              borderLeftWidth: '4px',
              paddingLeft: '1.5rem',
              fontStyle: 'italic',
              color: '#7A7A7A',
              backgroundColor: '#F8F8F8',
              padding: '1.5rem',
              margin: '2rem 0',
            },
            code: {
              backgroundColor: '#F5F5F5',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.875rem',
              color: '#2B2B2B',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#2B2B2B',
              color: '#F8F8F8',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              margin: '2rem 0',
              fontSize: '0.875rem',
              lineHeight: '1.5',
            },
            ul: {
              listStyleType: 'disc',
              paddingLeft: '1.5rem',
            },
            ol: {
              listStyleType: 'decimal',
              paddingLeft: '1.5rem',
            },
            li: {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
          },
        },
        lg: {
          css: {
            fontSize: '1.25rem',
            h1: {
              fontSize: '2.5rem',
            },
            h2: {
              fontSize: '2rem',
            },
            h3: {
              fontSize: '1.75rem',
            },
          },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;