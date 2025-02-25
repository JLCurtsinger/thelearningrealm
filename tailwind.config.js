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
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '25%': { transform: 'translateY(-10px) translateX(5px)' },
          '50%': { transform: 'translateY(0) translateX(10px)' },
          '75%': { transform: 'translateY(10px) translateX(5px)' }
        },
        twinkle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(0.5)', opacity: '0.3' }
        },
        'spin-slow': {
          'to': { transform: 'rotate(360deg)' }
        },
        run: {
          '0%, 100%': { transform: 'translateX(0) rotate(0)' },
          '25%': { transform: 'translateX(10px) rotate(5deg)' },
          '75%': { transform: 'translateX(-10px) rotate(-5deg)' }
        },
        'run-legs': {
          '0%, 100%': { transform: 'translateY(0) rotate(-15deg)' },
          '50%': { transform: 'translateY(-10px) rotate(15deg)' }
        },
        jump: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-30px) scale(0.95)' }
        },
        'jump-shadow': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.3' },
          '50%': { transform: 'scale(0.5)', opacity: '0.1' }
        },
        'spin-character': {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(0.95)' },
          '100%': { transform: 'rotate(360deg) scale(1)' }
        },
        stomp: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(4px) scale(1.05)' }
        },
        'stomp-feet': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' }
        },
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(20deg)' },
          '75%': { transform: 'rotate(-15deg)' }
        },
        clap: {
          '0%, 100%': { transform: 'translateX(0) scale(1)' },
          '50%': { transform: 'translateX(-5px) scale(1.1)' }
        },
        'clap-hands': {
          '0%, 100%': { transform: 'rotate(0deg) translateX(0)' },
          '50%': { transform: 'rotate(-10deg) translateX(-5px)' }
        }
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
    'origin-center',
    // Animation states
    'group-hover:animate-float',
    'group-hover:animate-twinkle',
    'group-hover:animate-spin-slow',
    'group-hover:animate-run',
    'group-hover:animate-run-legs',
    'group-hover:animate-jump',
    'group-hover:animate-jump-shadow',
    'group-hover:animate-spin-character',
    'group-hover:animate-stomp',
    'group-hover:animate-stomp-feet',
    'group-hover:animate-wave',
    'group-hover:animate-clap',
    'group-hover:animate-clap-hands'
  ]
};