import { IAction, IActionRequest, Metadata } from '@/src/infrastructure/cqrs/action-handlers';

export class Query<T = any> implements IAction<T> {
  private readonly _data: T;

  constructor(actionRequest?: IActionRequest<T>) {
    this._data = actionRequest?.data as T;
  }

  get type() {
    return Metadata.QUERY;
  }

  public get data() {
    return this._data;
  }
}
