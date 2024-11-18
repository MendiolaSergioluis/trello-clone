// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/vello.css'],
  compatibilityDate: '2024-04-03',
  devtools: {enabled: true},
  modules: ['@pinia/nuxt', '@nuxt/ui'],
  colorMode: {
    preference: 'light',
  },
})