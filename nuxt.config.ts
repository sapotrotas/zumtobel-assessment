// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint'
  ],
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-11-01',
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