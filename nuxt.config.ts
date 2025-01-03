import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    'nuxt-security',
    '@nuxthub/core',
    '@nuxtjs/tailwindcss'
  ],
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-11-01',
  routeRules: {
    // MOVE PROXY TO ENV FILE MAYBE
    '/api/aoc/**': {
      proxy: 'https://adventofcode.com/**' // avoid CORS error
    }
  },
  nitro: {
    experimental: {
      openAPI: true
    }
  },
  hub: {

  },
  eslint: {
    config: {
      nuxt: {
        sortConfigKeys: true
      },
      stylistic: {
        quotes: 'single',
        commaDangle: 'never'
      }
    }
  }
})
