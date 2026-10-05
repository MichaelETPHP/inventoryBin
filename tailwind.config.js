/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FBF1F0',
          100: '#F3DCDA',
          300: '#C98A85',
          500: '#8F3832',
          600: '#79302B',
          700: '#642722',
          800: '#4F1F1B',
          900: '#3A1714',
        },
        gold: {
          50: '#FBF6E8',
          100: '#F3E6BD',
          300: '#DEBD5E',
          500: '#BD9435',
          600: '#9C7A2B',
          700: '#7A5F21',
        },
        cream: {
          50: '#FDFAF4',
          100: '#F8F1E4',
          200: '#EFE3CC',
        },
        ink: {
          500: '#6B5F55',
          700: '#45392F',
          900: '#271E18',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
      },
      boxShadow: {
        panel: '0 1px 2px rgba(39, 30, 24, 0.04), 0 8px 24px -12px rgba(58, 23, 20, 0.18)',
        'panel-lg': '0 2px 4px rgba(39, 30, 24, 0.05), 0 16px 40px -16px rgba(58, 23, 20, 0.28)',
      },
      letterSpacing: {
        tightest: '-0.03em',
      },
      transitionTimingFunction: {
        'out-strong': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out-strong': 'cubic-bezier(0.77, 0, 0.175, 1)',
        drawer: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
    },
  },
  plugins: [],
};
