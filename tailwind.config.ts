import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Основная палитра — industrial dark theme
        bg: '#0A0A0A',
        surface: '#141414',
        'surface-2': '#1F1F1F',
        text: '#F5F5F5',
        'text-muted': '#A1A1AA',
        accent: '#F59E0B',
        'accent-hover': '#FBBF24',
        success: '#10B981',
        error: '#EF4444',
        border: '#27272A',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      fontSize: {
        // Fluid типографика для заголовков
        'hero': 'clamp(2.5rem, 5vw, 5rem)',
        'section': 'clamp(1.75rem, 3vw, 2.5rem)',
        'body': 'clamp(1rem, 1.5vw, 1.125rem)',
      },
      lineHeight: {
        relaxed: '1.6',
      },
      maxWidth: {
        container: '1280px',
      },
      spacing: {
        section: 'clamp(4rem, 8vw, 8rem)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'count-up': 'countUp 0.5s ease-out forwards',
      },
      keyframes: {
        countUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'accent-glow': '0 0 20px rgba(245, 158, 11, 0.3)',
        'card-hover': '0 20px 40px rgba(0, 0, 0, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
