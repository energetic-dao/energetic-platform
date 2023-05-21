export type Session = {
  account: string;
  network: string;
  chainId: number;
  topic?: string;
};

export interface IProvider {
  connect(config?: Record<string, string | number | boolean>): Promise<Session>;
  disconnect(session?: Session): Promise<void>;
}
