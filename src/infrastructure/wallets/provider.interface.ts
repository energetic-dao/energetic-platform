export type Session = {
  account: string;
  network: string;
  chainId: number;
};

export interface IProvider {
  connect(config?: Record<string, string | number | boolean>): Promise<Session>;
}
