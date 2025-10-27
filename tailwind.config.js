/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'white': '#ffffff',
      },
      opacity: {
        '5': '0.05',
        '10': '0.1',
        '20': '0.2',
        '90': '0.9',
        '95': '0.95',
      },
    },
  },
  safelist: [
    {
      pattern: /bg-(blue|purple|pink|green|cyan|indigo|orange|red|yellow|emerald|rose)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /from-(blue|purple|pink|green|cyan|indigo|orange|red|yellow|emerald|rose)-(400|500|600)/,
    },
    {
      pattern: /to-(blue|purple|pink|green|cyan|indigo|orange|red|yellow|emerald|rose)-(400|500|600)/,
    },
    {
      pattern: /text-(blue|purple|pink|green|cyan|indigo|orange|red|yellow|emerald|rose)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    'bg-white/90',
    'bg-white/95',
    'text-white/80',
    'text-white/90',
    'text-blue-100',
    'opacity-5',
    'opacity-10',
    'opacity-20',
  ],
  plugins: [],
}