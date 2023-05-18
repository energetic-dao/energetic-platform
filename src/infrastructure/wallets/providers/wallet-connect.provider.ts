import { IProvider, Session } from '~/src/infrastructure/wallets/provider.interface';
import { SignClient } from '@walletconnect/sign-client';
import { Web3Modal } from '@web3modal/standalone';
import { PublicRuntimeConfig } from '@nuxt/schema';

type WalletConnectProviderConfig = {
  projectId: string;
  relayUrl?: string;
};

export class WalletConnectProvider implements IProvider {
  private readonly _web3Modal: Web3Modal;

  constructor(config: PublicRuntimeConfig) {
    this._web3Modal = new Web3Modal({
      projectId: config.WALLET_CONNECT_PROJECT_ID,
      standaloneChains: ['kadena:testnet04'],
      walletConnectVersion: 2,
    });
  }

  async connect(config: PublicRuntimeConfig): Promise<Session> {
    console.log('config', config);

    const signClient = await SignClient.init({
      projectId: config.WALLET_CONNECT_PROJECT_ID,
      relayUrl: config.WALLET_CONNECT_RELAY_URL,
    });

    const { uri, approval } = await signClient.connect({
      // @todo figure out pairing topic
      requiredNamespaces: {
        kadena: {
          methods: ['kadena_getAccounts_v1', 'kadena_sign_v1', 'kadena_quicksign_v1'],
          chains: ['kadena:mainnet01', 'kadena:testnet04', 'kadena:development'],
          events: [],
        },
      },
    });

    console.log('uri', uri, 'approval', approval);

    if (!uri) {
      throw new Error('uri is empty');
    }

    await this._web3Modal.openModal({ uri });
    const rawSession = await approval();

    this._web3Modal.closeModal();

    // 1 is testnet account, 0 is mainnet account
    const account = rawSession.namespaces.kadena.accounts[1].split(':');
    return {
      account: account[2],
      network: account[1],
      chainId: 0,
    };
  }
}
