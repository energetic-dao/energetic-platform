import { IAction, IActionRequest, Metadata } from '@/src/infrastructure/cqrs/action-handlers';

export class Command<T = any> implements IAction<T> {
  constructor(public readonly actionRequest?: IActionRequest<T>) {}

  get type() {
    return Metadata.COMMAND;
  }
}
