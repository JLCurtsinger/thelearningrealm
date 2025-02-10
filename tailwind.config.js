/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'text-gray-900',
    'text-white',
    'bg-clip-text',
    'text-transparent',
    'bg-gradient-to-r',
    'from-purple-600',
    'via-pink-500',
    'to-red-500'
  ]
};