/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#070707',
        secondary: '#111111',
        card: '#18181B',
        cardHighlight: '#1F1F23',
        primary: '#FF6A00',
        neon: '#FF8A00',
        lightOrange: '#FDBA74',
        darkOrange: '#C2410C',
        textPrimary: '#FAFAFA',
        textSecondary: '#A1A1AA',
        border: '#2A2A2E',
        success: '#22C55E',
        warning: '#FACC15',
        error: '#EF4444',
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 20px rgba(255, 106, 0, 0.3)',
        'neon-lg': '0 0 40px rgba(255, 106, 0, 0.4)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'premium-dark': 'linear-gradient(180deg, #070707 0%, #111111 100%)',
        'premium-card': 'linear-gradient(135deg, #18181B 0%, #1F1F23 100%)',
        'neon-accent': 'linear-gradient(135deg, #FF6A00 0%, #FF8A00 100%)',
      },
    },
  },
  plugins: [],
}
