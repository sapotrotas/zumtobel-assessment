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
  runtimeConfig: {
    public: {
      appUrl: 'http://localhost:3000',
      filesPath: '/challenges'
    }
  },
  routeRules: {
    '/api/aoc/**': {
      proxy: 'https://adventofcode.com/**' // avoid CORS error
    }
  },
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
        commaDangle: 'never'
      }
    }
  }
})
