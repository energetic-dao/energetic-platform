import { KadenaNetworks, Wallet, XWallet, XWalletIntegrator } from '~/src/infrastructure/chain/x-wallet';

export interface WalletStore {
  integrator?: XWallet;
  network: KadenaNetworks;
  wallet?: Wallet;
}

export const useWallet = defineStore('wallet', {
  state: (): WalletStore => ({
    integrator: undefined,
    network: KadenaNetworks.MAINNET,
    wallet: undefined,
  }),
  getters: {
    selectedNetwork: async (state) => {
      return state.integrator?.getNetwork();
    },
    isConnected: (state) => !!state.wallet,
  },
  actions: {
    initialize(integrator?: XWalletIntegrator) {
      if (!integrator) {
        throw new Error('wallet not found');
      }
      this.integrator = new XWallet(integrator);
    },
    async connect() {
      const response = await this.integrator?.connect(this.network);

      if (response?.status === 'fail') {
        throw new Error('failed to connect wallet');
      }

      this.wallet = response?.account;
    },

    async disconnect() {
      const response = await this.integrator?.disconnect(this.network);
      console.log(response);
      this.wallet = undefined;
      this.integrator = undefined;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWallet, import.meta.hot));
}
