import { KadenaNetworks, Wallet, XWallet, XWalletIntegrator } from '~/src/infrastructure/wallets/x-wallet';
import { IProvider, Session } from '~/src/infrastructure/wallets/provider.interface';
import { WalletConnectProvider } from '~/src/infrastructure/wallets/providers/wallet-connect.provider';

export interface WalletStore {
  provider?: IProvider;
  providerType?: string; // @todo: enum
  session?: Session;
  network: KadenaNetworks;
  wallet?: Wallet;
}

export const useWallet = defineStore('wallet', {
  state: (): WalletStore => ({
    network: KadenaNetworks.TESTNET,
  }),
  getters: {
    isConnected: (state) => !!state.session,
    getSession: (state) => state.session,
  },
  actions: {
    async connect() {
      if (!this.provider) {
        throw new Error('No provider');
      }
      const config = useRuntimeConfig();
      const session = await this.provider.connect(config.public);

      console.log('session', session);
      this.session = session;
      console.log('session', this.session);
    },
    setProvider(providerType: string) {
      const config = useRuntimeConfig();
      switch (providerType) {
        case 'wallet-connect':
          this.provider = new WalletConnectProvider(config.public);
          break;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWallet, import.meta.hot));
}
