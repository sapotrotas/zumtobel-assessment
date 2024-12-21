// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@pinia/colada-nuxt',
    '@nuxt/eslint',
  ],
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-11-01',
  routeRules: {
    // MOVE PROXY TO ENV FILE MAYBE
    '/api/**': { proxy: 'https://adventofcode.com/**'},
  },
  //  devServer: {
  //    https: true,
  //  },
  devtools: { 
    enabled: true
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