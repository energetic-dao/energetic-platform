import { IActionBusData, Metadata } from '@/src/infrastructure/cqrs/action-handlers';

export interface IActionBus {
  execute<Request = any>(actionRequest: Request): Promise<void>;

  execute<Request = any, Response = any>(actionRequest: Request): Promise<Response>;
}

export interface IActionRequest<T = any> {
  data?: T;
}

export interface IActionHandler<TActionHandler> {
  register(handlers: TActionHandler): void;

  getId<T>(action: T): string;

  handlers: Map<string, IActionBusData<TActionHandler>>;

  type: Metadata;
}
