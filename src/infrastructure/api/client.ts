import { CoinEndpoint } from '~/src/infrastructure/api/endpoints/coin.endpoint';
import { ChainWebProvider } from '~/src/infrastructure/api/providers/chain-web.provider';

export class Client {
  private _provider: ChainWebProvider;

  // API endpoints
  private readonly _coin: CoinEndpoint;

  constructor(
    private readonly network: string,
    private readonly networkId: string,
    private readonly chainId: string,
    private readonly apiVersion: string,
  ) {
    this._provider = new ChainWebProvider(network, networkId, chainId, apiVersion);
    this._coin = new CoinEndpoint(this._provider);
  }

  public setProvider(provider: ChainWebProvider) {
    this._provider = provider;
  }

  public get coin(): CoinEndpoint {
    return this._coin;
  }
}
