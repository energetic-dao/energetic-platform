export enum KadenaNetworks {
  MAINNET = 'mainnet01',
  TESTNET = 'testnet04',
}

export interface XWalletRequest {
  method: string;

  [key: string]: any;
}

export interface Wallet {
  account: string;
  connectedSites: string[];
  publicKey: string;
}

export type XWalletBaseResponse = {
  message: string;
  status: 'success' | 'fail';
};

export type XWalletResponse<T> = T extends undefined ? XWalletBaseResponse : XWalletBaseResponse & T;

export interface XWalletIntegrator {
  isKadena: boolean;
  request: <Req, Res>(request: Req) => Promise<Res>;
  on: (event: string, callback: (data: any) => void) => void;
}

export class XWallet {
  private readonly wallet: XWalletIntegrator;
  private network: KadenaNetworks;

  constructor(integrator?: XWalletIntegrator, network: KadenaNetworks = KadenaNetworks.MAINNET) {
    if (!integrator) {
      throw new Error('XWallet integrator not found');
    }
    this.wallet = integrator;
    this.network = network;
  }

  public async getNetwork() {
    return this.wallet?.request({
      method: 'kda_getNetwork',
    });
  }

  public async getAccount(): Promise<XWalletResponse<{ wallet: Wallet }>> {
    return this.wallet?.request({
      method: 'kda_requestAccount',
      networkId: this.network,
    });
  }

  public async connect(networkId: KadenaNetworks): Promise<XWalletResponse<{ account: Wallet }>> {
    return this.wallet?.request({
      method: 'kda_connect',
      networkId: this.network,
    });
  }

  public async disconnect(networkId: KadenaNetworks) {
    return this.wallet?.request({
      method: 'kda_disconnect',
      networkId: this.network,
    });
  }

  public changeNetwork(networkId: KadenaNetworks) {
    this.network = networkId;
  }
}
