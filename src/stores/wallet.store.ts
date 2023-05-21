import { KadenaNetworks } from '~/src/infrastructure/wallets/x-wallet';
import { IProvider, Session } from '~/src/infrastructure/wallets/provider.interface';
import { WalletConnectProvider } from '~/src/infrastructure/wallets/providers/wallet-connect.provider';
import { RuntimeConfig } from '@nuxt/schema';
import { ProviderException } from '~/src/infrastructure/types/exceptions/provider.exception';

export enum ProviderType {
  WALLET_CONNECT = 'wallet-connect',
  X_WALLET = 'x-wallet',
}

export interface WalletStore {
  provider?: IProvider;
  session?: Session;
  network: KadenaNetworks;
  isConnect: boolean;
}

export const useWallet = defineStore('wallet', {
  state: (): WalletStore => ({
    network: KadenaNetworks.TESTNET,
    isConnect: false,
  }),
  getters: {
    isConnected: (state) => state.isConnect,
    getSession: (state) => state.session,
    getNetwork: (state) => state.network,
    getWalletAddress: (state) => `k:${state.session?.account}`,
  },
  actions: {
    async connect(): Promise<void> {
      if (!this.provider) {
        throw new ProviderException("Provider isn't set");
      }
      const config: RuntimeConfig = useRuntimeConfig();
      this.session = await this.provider.connect(config.public);
      this.isConnect = true;
    },
    async disconnect(): Promise<void> {
      if (!this.provider) {
        throw new ProviderException("Provider isn't set");
      }
      await this.provider.disconnect(this.session);
      this.session = undefined;
      this.isConnect = false;
    },
    setProvider(providerType: ProviderType) {
      const config: RuntimeConfig = useRuntimeConfig();
      switch (providerType) {
        case ProviderType.WALLET_CONNECT:
          this.provider = new WalletConnectProvider(config.public);
          break;
        default:
          this.session = undefined;
          this.isConnect = false;
          throw new ProviderException('Provider not supported');
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWallet, import.meta.hot));
}
