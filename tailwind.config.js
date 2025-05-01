/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'shimmer': 'shimmer 8s ease-in-out infinite',
        'float-dot': 'float 3s ease-in-out infinite',
        'float': 'float 10s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 12s ease-in-out infinite',
        'fadeInUp': 'fadeInUp 0.8s ease-out forwards',
        'gradient-x': 'gradient-x 15s ease infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slower': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'spin-slow': 'spin 30s linear infinite',
      },
      backgroundSize: {
        '300%': '300% 100%',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': {
            'background-position': '-200% 0',
          },
          '50%': {
            'background-position': '200% 0',
          },
        },
        float: {
          '0%': { transform: 'translateY(0px) translateX(0px)' },
          '25%': { transform: 'translateY(-10px) translateX(5px)' },
          '50%': { transform: 'translateY(0px) translateX(10px)' },
          '75%': { transform: 'translateY(10px) translateX(5px)' },
          '100%': { transform: 'translateY(0px) translateX(0px)' },
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        pulse: {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 0.6 },
        },
        glow: {
          'from': { boxShadow: '0 0 5px -5px rgba(138, 43, 226, 0.2)' },
          'to': { boxShadow: '0 0 15px 5px rgba(138, 43, 226, 0.4)' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-position': 'left center',
          },
          '50%': {
            'background-position': 'right center',
          },
        },
      },
    },
  },
  plugins: [],
} 