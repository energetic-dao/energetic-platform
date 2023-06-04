// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      // wallet connect config
      WALLET_CONNECT_RELAY_URL: 'wss://relay.walletconnect.com',
      WALLET_CONNECT_PROJECT_ID: '5a75812c2131cb9c3c23643c78ae206f',
      // nft-viewer config
      NFT_VIEWER_URL: 'http://localhost:3001',

      // chainweb config
      NETWORK: 'testnet',
      NETWORK_ID: 'testnet04',
      CHAIN_ID: '1',
      API_VERSION: '0.0',
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
  plugins: [
    {
      src: '~/plugins/client.plugin.ts',
      mode: 'all',
    },
    {
      src: '~/plugins/cqrs.plugin.ts',
      mode: 'all',
    },
    {
      src: '~/plugins/charts.plugin.ts',
      mode: 'client',
    },
  ],
});
