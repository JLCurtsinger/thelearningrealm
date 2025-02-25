/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
        'run': 'run 0.5s ease-in-out infinite',
        'run-legs': 'run-legs 0.5s ease-in-out infinite',
        'jump': 'jump 0.5s ease-in-out infinite',
        'jump-shadow': 'jump-shadow 0.5s ease-in-out infinite',
        'spin-character': 'spin-character 1s ease-in-out infinite',
        'stomp': 'stomp 0.5s ease-in-out infinite',
        'stomp-feet': 'stomp-feet 0.5s ease-in-out infinite',
        'wave': 'wave 1s ease-in-out infinite',
        'clap': 'clap 0.5s ease-in-out infinite',
        'clap-hands': 'clap-hands 0.5s ease-in-out infinite'
      }
    },
  },
  plugins: [],
  safelist: [
    // Base classes
    'text-gray-900',
    'text-white',
    'bg-clip-text',
    'text-transparent',
    'bg-gradient-to-r',
    'from-purple-600',
    'via-pink-500',
    'to-red-500',
    // Animation classes
    'animate-float',
    'animate-twinkle',
    'animate-spin-slow',
    'animate-run',
    'animate-run-legs',
    'animate-jump',
    'animate-jump-shadow',
    'animate-spin-character',
    'animate-stomp',
    'animate-stomp-feet',
    'animate-wave',
    'animate-clap',
    'animate-clap-hands',
    // Transform origins
    'origin-left',
    'origin-right',
    'origin-center'
  ]
};