export class ChainWebProvider {
  constructor(private _network: string, private _networkId: string, private _chainId: string, private _apiVersion: string) {}

  public setNetwork(network: string): void {
    this._network = network;
  }

  public setNetworkId(networkId: string): void {
    this._networkId = networkId;
  }

  public setChainId(chainId: string): void {
    this._chainId = chainId;
  }

  public setApiVersion(apiVersion: string): void {
    this._apiVersion = apiVersion;
  }

  public get apiEndpoint(): string {
    return `https://api.${this._network}.chainweb.com/chainweb/${this._apiVersion}/${this._networkId}/chain/${this._chainId}/pact`;
  }
}
