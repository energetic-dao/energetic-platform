import { IProvider, Session } from '~/src/infrastructure/wallets/provider.interface';
import Client, { SignClient } from '@walletconnect/sign-client';
import { Web3Modal } from '@web3modal/standalone';
import { PublicRuntimeConfig } from '@nuxt/schema';
import { getSdkError } from '@walletconnect/utils';
import { SessionTypes } from '@walletconnect/types';

export class WalletConnectProvider implements IProvider {
  private readonly _web3Modal: Web3Modal;
  private signClient: Client | null = null;

  constructor(config: PublicRuntimeConfig) {
    this._web3Modal = new Web3Modal({
      projectId: config.WALLET_CONNECT_PROJECT_ID,
      standaloneChains: ['kadena:testnet04'],
      walletConnectVersion: 2,
    });
  }

  async connect(config: PublicRuntimeConfig): Promise<Session> {
    this.signClient = await SignClient.init({
      projectId: config.WALLET_CONNECT_PROJECT_ID,
      relayUrl: config.WALLET_CONNECT_RELAY_URL,
    });

    if (this.signClient.session.length > 0) {
      return this.restoreSession();
    }

    const { uri, approval } = await this.signClient.connect({
      requiredNamespaces: {
        kadena: {
          methods: ['kadena_getAccounts_v1', 'kadena_sign_v1', 'kadena_quicksign_v1'],
          chains: ['kadena:mainnet01', 'kadena:testnet04', 'kadena:development'],
          events: [],
        },
      },
    });

    if (!uri) {
      throw new Error('uri is empty');
    }

    await this._web3Modal.openModal({ uri });
    const rawSession: SessionTypes.Struct = await approval();

    this._web3Modal.closeModal();
    // 1 is testnet account, 0 is mainnet account
    const account: string[] = rawSession.namespaces.kadena.accounts[1].split(':');
    return {
      topic: rawSession.topic,
      account: account[2],
      network: account[1],
      chainId: 0,
    };
  }

  async restoreSession(): Promise<Session> {
    if (!this.signClient) {
      throw new Error('client is not initialized');
    }

    if (this.signClient.session.length <= 0) {
      throw new Error('There are no active sessions');
    }

    const session: SessionTypes.Struct = this.signClient.session.get(this.signClient.session.keys[this.signClient.session.length - 1]);
    const account: string[] = session.namespaces.kadena.accounts[1].split(':');
    return {
      topic: session.topic,
      account: account[2],
      network: account[1],
      chainId: 0,
    };
  }

  async sign(): Promise<void> {}

  async disconnect(session: Session): Promise<void> {
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
