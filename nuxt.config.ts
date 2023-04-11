// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {},
  imports: {
    dirs: ['stores'],
  },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate'],
  },
  css: ['@/assets/css/main.css'],
});
