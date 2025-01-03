export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    'nuxt-security',
    '@nuxthub/core',
    '@nuxtjs/tailwindcss'
  ],
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  routeRules: {
    // MOVE PROXY TO ENV FILE MAYBE
    '/api/aoc/**': {
      proxy: 'https://adventofcode.com/**'  // avoid CORS error
    },
  },
  nitro: {
    experimental: {
      openAPI: true
    }
  },
  // hub: {
    // nuxt hub options
  // },
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
        commaDangle: 'never'
      }
    }
  }
})