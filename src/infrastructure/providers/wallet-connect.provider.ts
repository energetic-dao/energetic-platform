import { Provider, Session, KADENA_CHAIN, KADENA_METHOD } from '@/src/infrastructure/types/wallets';
import Client, { SignClient } from '@walletconnect/sign-client';
import { ISigningRequest } from '@kadena/types';
import { Web3Modal } from '@web3modal/standalone';
import { PublicRuntimeConfig } from '@nuxt/schema';
import { getSdkError } from '@walletconnect/utils';
import { SessionTypes } from '@walletconnect/types';

export class WalletConnectProvider implements Provider {
  private readonly _web3Modal: Web3Modal;
  private signClient: Client | null = null;

  constructor(config: PublicRuntimeConfig) {
    this._web3Modal = new Web3Modal({
      projectId: config.WALLET_CONNECT_PROJECT_ID,
      standaloneChains: Object.values(KADENA_CHAIN),
      walletConnectVersion: 2,
    });
  }

  async connect(config: PublicRuntimeConfig): Promise<Session & { topic: string }> {
    this.signClient = await SignClient.init({
      projectId: config.WALLET_CONNECT_PROJECT_ID,
      relayUrl: config.WALLET_CONNECT_RELAY_URL,
    });

    const { uri, approval } = await this.signClient.connect({
      requiredNamespaces: {
        kadena: {
          methods: Object.values(KADENA_METHOD),
          chains: Object.values(KADENA_CHAIN).map((chain) => `kadena:${chain}`),
          events: ['kadena_transaction_updated'],
        },
      },
    });

    if (this.signClient.session.length > 0) {
      return this.getSession();
    }

    if (!uri) {
      throw new Error('uri is empty');
    }

    await this._web3Modal.openModal({ uri });
    await approval();

    this._web3Modal.closeModal();

    return this.getSession();
  }

  getSession(): Session & { topic: string } {
    if (!this.signClient) {
      throw new Error('client is not initialized');
    }

    if (this.signClient.session.length <= 0) {
      throw new Error('There are no active sessions');
    }

    const session: SessionTypes.Struct = this.signClient.session.get(this.signClient.session.keys[this.signClient.session.length - 1]);
    const account: string[] = session.namespaces.kadena.accounts[1].split(':');

    // 1 is testnet account, 0 is mainnet account
    return {
      topic: session.topic,
      account: account[2],
      network: `kadena:${account[1]}`,
    };
  }

  async sign<T>(signRequest: ISigningRequest): Promise<T> {
    if (!this.signClient) {
      throw new Error('client is not initialized');
    }

    const session: Session & { topic: string } = this.getSession();

    if (!session) {
      throw new Error('There are no active sessions');
    }

    return this.signClient?.request({
      topic: session.topic,
      chainId: session.network,
      request: {
        method: KADENA_METHOD.KDA_SIGN,
        params: signRequest,
      },
    });
  }

  async disconnect(session: Session & { topic: string }): Promise<void> {
    if (!this.signClient) {
      throw new Error('client is not initialized');
    }

    if (this.signClient.session.length <= 0 || !session?.topic) {
      throw new Error('There are no active sessions');
    }

    await this.signClient.disconnect({
      topic: session.topic,
      reason: getSdkError('USER_DISCONNECTED'),
    });
  }
}
