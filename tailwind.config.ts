import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        primary: '#F7D148',
        primaryText: '#241606',
        lightGray: '#F8F8F7',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
}

export default config
