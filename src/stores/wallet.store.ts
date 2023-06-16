import { KADENA_CHAIN, Provider, Session } from '@/src/infrastructure/types/wallets';
import { WalletConnectProvider } from '@/src/infrastructure/providers/wallet-connect.provider';
import { RuntimeConfig } from '@nuxt/schema';
import { ProviderException } from '@/src/infrastructure/types/exceptions/provider.exception';
import { XWalletProvider } from '@/src/infrastructure/providers/x-wallet.provider';

export enum ProviderType {
  WALLET_CONNECT = 'wallet-connect',
  X_WALLET = 'x-wallet',
}

export interface WalletStore {
  provider?: Provider;
  session?: Session;
  network: KADENA_CHAIN;
  isConnect: boolean;
}

export const useWallet = defineStore('wallet', {
  state: (): WalletStore => ({
    network: KADENA_CHAIN.TESTNET,
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
    async sign(signRequest: any): Promise<void> {
      if (!this.provider) {
        throw new ProviderException("Provider isn't set");
      }
      await this.provider.sign(signRequest);
    },
    setProvider(providerType: ProviderType) {
      const config: RuntimeConfig = useRuntimeConfig();
      switch (providerType) {
        case ProviderType.WALLET_CONNECT:
          this.provider = new WalletConnectProvider(config.public);
          break;
        case ProviderType.X_WALLET:
          // @ts-ignore
          this.provider = new XWalletProvider(window.kadena, this.network);
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
