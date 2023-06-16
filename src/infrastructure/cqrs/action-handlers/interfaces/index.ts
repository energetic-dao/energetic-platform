export * from './action-handler.interface';
export * from './action-handler-metadata.interface';
export * from './action-metadata.interface';
export * from './action.interface';
export * from './action-bus.interface';

export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}
