import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aurora: {
          wine: '#661D48',
          night: '#0B1836', 
          gold: '#DAA520',
          parchment: '#F2EAFF',
          sage: '#B2D1B1'
        }
      },
      fontFamily: {
        'cinzel': ['Cinzel Decorative', 'serif'],
        'alice': ['Alice', 'serif']
      },
      backdropBlur: {
        'arcane': '12px'
      },
      borderRadius: {
        '2xl': '1rem'
      }
    },
  },
  plugins: [],
}

export default config

