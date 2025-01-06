// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Custom configs
  {
    rules: {
      'nuxt/nuxt-config-keys-order': 'off',
      'vue/no-multiple-template-root': 'off'
    }
  }
)
