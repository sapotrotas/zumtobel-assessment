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
      stylistic: {
        quotes: 'single',
        commaDangle: 'never'
      }
    }
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api'
    }
  }
})
