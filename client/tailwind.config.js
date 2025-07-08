import plugin from 'tailwindcss/plugin';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1f2937',
        accent: '#374151',
        muted: '#6b7280',
        light: '#f3f4f6',
        background: '#ffffff',
      },
      keyframes: {
        'scroll-loop': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'scroll-loop': 'scroll-loop 40s linear infinite',
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [],
  
};
