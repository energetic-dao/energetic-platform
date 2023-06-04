import { Type } from '@/src/infrastructure/cqrs/action-handlers';

export interface IActionHandlerMetaData<T> {
  action: Type<T>;
}
