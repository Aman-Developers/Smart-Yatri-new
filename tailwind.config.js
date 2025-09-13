/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* gray-700 */
        input: "var(--color-input)", /* custom-surface */
        ring: "var(--color-ring)", /* electric-cyan */
        background: "var(--color-background)", /* rich-black */
        foreground: "var(--color-foreground)", /* white */
        primary: {
          DEFAULT: "var(--color-primary)", /* deep-navy */
          foreground: "var(--color-primary-foreground)", /* white */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* charcoal-gray */
          foreground: "var(--color-secondary-foreground)", /* white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* intense-red */
          foreground: "var(--color-destructive-foreground)", /* white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* charcoal-gray */
          foreground: "var(--color-muted-foreground)", /* gray-400 */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* electric-cyan */
          foreground: "var(--color-accent-foreground)", /* rich-black */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* custom-surface */
          foreground: "var(--color-popover-foreground)", /* white */
        },
        card: {
          DEFAULT: "var(--color-card)", /* custom-surface */
          foreground: "var(--color-card-foreground)", /* white */
        },
        success: {
          DEFAULT: "var(--color-success)", /* vibrant-green */
          foreground: "var(--color-success-foreground)", /* rich-black */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* bright-amber */
          foreground: "var(--color-warning-foreground)", /* rich-black */
        },
        error: {
          DEFAULT: "var(--color-error)", /* intense-red */
          foreground: "var(--color-error-foreground)", /* white */
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Source Sans Pro', 'sans-serif'],
        caption: ['Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      boxShadow: {
        'sharp': 'var(--shadow-sharp)',
        'soft': 'var(--shadow-soft)',
        'elevated': 'var(--shadow-elevated)',
        'glow-accent': '0 0 20px rgba(0, 212, 255, 0.3), 0 0 40px rgba(0, 212, 255, 0.1)',
        'glow-success': '0 0 20px rgba(46, 213, 115, 0.3), 0 0 40px rgba(46, 213, 115, 0.1)',
        'glow-warning': '0 0 20px rgba(255, 165, 2, 0.3), 0 0 40px rgba(255, 165, 2, 0.1)',
        'glow-error': '0 0 20px rgba(255, 71, 87, 0.3), 0 0 40px rgba(255, 71, 87, 0.1)',
      },
      animation: {
        'pulse-notification': 'pulse-opacity 2s infinite',
        'counter-up': 'counter-increment 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-down': 'slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        'pulse-opacity': {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
        'counter-increment': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fadeIn': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slideDown': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'mission-control': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'fast': '200ms',
        'normal': '300ms',
        'slow': '400ms',
      },
      backdropBlur: {
        'glass': '10px',
      },
      zIndex: {
        'alert': '1000',
        'dropdown': '950',
        'navigation': '900',
        'overlay': '800',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}