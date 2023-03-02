/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}', './index.html'],
  theme: {
    extend: {
      fontFamily: {
        'Phudu': ['Phudu', 'cursive']
      },
      colors: {
        'normal': '#A8A778',
        'fire': '#EE8130',
        'water': '#6390F0',
        'electric': '#F7D02C',
        'grass': '#7AC74C',
        'ice': '#96D9D6',
        'fighting': '#C22E28',
        'poison': '#A33EA1',
        'ground': '#E2BF65',
        'flying': '#A98FF3',
        'psychic': '#F95587',
        'bug': '#A6B91A',
        'rock': '#B6A136',
        'ghost': '#735797',
        'dragon': '#6F35FC', 
        'dark': '#705746',
        'steel': '#B7B7CE',
        'fairy': '#D685AD'
      }, 
      animation: {
        window_slider: 'window_slider 2s ease-in-out infinite alternate',
        open_slider: 'open_slider 1s ease-in-out',
        close_slider: 'close_slider 1s ease-in-out'
      },
      keyframes: {
        open_slider : {
          '0%': {right: '20rem'},
          '100%': {right: '5rem'}
        },
        close_slider : {
          '0%': {right: '5rem'},
          '100%': {right: '20rem'}
        }
      }
    },
  },
  plugins: [],
}
