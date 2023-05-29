import { Session } from './session.type';

export interface Provider {
  connect(config?: Record<string, string | number | boolean>): Promise<Session>;
  sign<T>(signRequest: any): Promise<T>;
  disconnect(session?: Session): Promise<void>;
}
