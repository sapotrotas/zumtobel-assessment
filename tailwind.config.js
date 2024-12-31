import colors from 'tailwindcss/colors'

export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      colors: {
        // "primary-color": "var(--primary-color)",
        // "secondary-color": "var(--secondary-color)"
        primary: colors.green,
      },
      container: {
         constrained: 'max-w-4xl'
      }
    }
  }
}