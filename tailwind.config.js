import colors from 'tailwindcss/colors'

export default {
  theme: {
    extend: {
      colors: {
        primary: colors.green,
        secondary: colors.gray
      },
      container: {
        constrained: 'max-w-4xl'
      }
    }
  }
}
