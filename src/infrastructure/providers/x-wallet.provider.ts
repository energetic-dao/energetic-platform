import { KADENA_CHAIN, Provider, Session } from '@/src/infrastructure/types/wallets';
import { ConnectWallet, Response, Integrator, Method } from '@/src/infrastructure/types/wallets/x-wallet';
export class XWalletProvider implements Provider {
  private readonly wallet: Integrator;
  private _network: KADENA_CHAIN;

  constructor(integrator?: Integrator, network: KADENA_CHAIN = KADENA_CHAIN.MAINNET) {
    if (!integrator) {
      throw new Error('XWallet integrator not found');
    }
    this.wallet = integrator;
    this._network = network;
  }

  public async getNetwork() {
    return this.wallet?.request({
      method: 'kda_getNetwork',
    });
  }

  public async getAccount(): Promise<Response<{ wallet: ConnectWallet }>> {
    return this.wallet?.request({
      method: Method.REQUEST_ACCOUNT,
      networkId: this._network,
    });
  }

  public async connect(session: Session): Promise<Session> {
    const response: Response<{ account: ConnectWallet }> = await this.wallet?.request({
      method: Method.CONNECT,
      networkId: this._network,
    });

    if (response.status === 'fail') {
      throw new Error(response.message);
    }

    return {
      account: response.account.publicKey,
      network: this._network,
    };
  }

  public async disconnect() {
    await this.wallet?.request({
      method: Method.DISCONNECT,
      networkId: this._network,
    });
  }

  public async sign<T>(signRequest: any): Promise<T> {
    console.log('signRequest', signRequest);

    return this.wallet?.request({
      method: Method.REQUEST_SIGN,
      data: {
        networkId: this._network,
        signingCmd: signRequest,
      },
    });
  }

  public changeNetwork(networkId: KADENA_CHAIN) {
    this._network = networkId;
  }

  get nonce(): string | number {
    return `XEDS-"${new Date().toISOString()}"`;
  }
}
