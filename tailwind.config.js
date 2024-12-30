import colors from 'tailwindcss/colors'

export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      colors: {
        primary: colors.red
      },
      container: {
         constrained: 'max-w-4xl'
      },
      theme: {
        
      }
    }
  }
}