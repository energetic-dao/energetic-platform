import { Client } from '@/src/api/client';

export default defineNuxtPlugin((NuxtApp) => {
  const { public: config } = useRuntimeConfig();

  return {
    provide: {
      client: new Client(config.NETWORK, config.NETWORK_ID, config.CHAIN_ID, config.API_VERSION),
    },
  };
});
