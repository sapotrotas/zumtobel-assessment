// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@pinia/colada-nuxt',
    '@nuxt/eslint',
    'nuxt-security'
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
//  experimental: {
//    clientFallback: true,
//    renderJsonPayloads: true
//  },
  //  devServer: {
  //    https: true,
  //  },
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
        commaDangle: 'never'
      }
    }
  },
  security: {
  // nuxt-security options
  },
  app: {
    head: {
      htmlAttrs: {
      // style: 'background-color: #111; color: #f0f0f0'
      }
    }
  }
})