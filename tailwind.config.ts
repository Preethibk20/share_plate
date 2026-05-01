import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './store/**/*.{ts,tsx}',
    './types/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#effdf3',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#16a34a',
          600: '#15803d',
          700: '#166534',
          800: '#14532d',
          900: '#052e16',
        },
      },
      boxShadow: {
        soft: '0 24px 60px rgba(22, 163, 74, 0.12)',
      },
      backgroundImage: {
        'warm-grid':
          'radial-gradient(circle at top, rgba(255,255,255,0.88), transparent 44%), linear-gradient(180deg, #fbfaf6 0%, #f6f3eb 100%)',
      },
    },
  },
  plugins: [],
}

export default config
