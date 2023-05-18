// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      WALLET_CONNECT_RELAY_URL: 'wss://relay.walletconnect.com',
      WALLET_CONNECT_PROJECT_ID: '5a75812c2131cb9c3c23643c78ae206f',
    },
  },
  imports: {
    dirs: ['stores'],
  },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate'],
  },
  css: ['@/assets/css/main.css'],
});
