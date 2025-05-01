// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  nitro: {
    experimental: {
      tasks: true
    }
  },
  future: {
    compatibilityVersion: 4,
  },
  modules: ['@nuxt/ui', 'nuxt-auth-utils'],

  ui: {
    fonts: false
  },
  css: ['~/assets/css/main.css'],

})
