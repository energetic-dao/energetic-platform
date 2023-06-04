import 'reflect-metadata';
import {
  IAction,
  IActionBusData,
  IActionHandler,
  IActionHandlerMetaData,
  IActionMetadata,
  Metadata,
} from '@/src/infrastructure/cqrs/action-handlers';

export class ActionHandlerBus<THandler extends IActionHandler<THandler> = IActionHandler<any>> implements IActionHandler<THandler> {
  private readonly _handlers = new Map<string, IActionBusData<THandler>>();

  constructor(private readonly _metaDataKey: Metadata) {}

  public register(handler: THandler) {
    const { id } = this.getActionMetadataByHandler(handler);

    if (!id) {
      return;
    }
    this._handlers.set(id, { handler });
  }

  public getId<T>(action: T): string {
    const { constructor: actionType } = Object.getPrototypeOf(action);
    const actionMetaData: IActionMetadata = Reflect.getMetadata(this._metaDataKey, actionType);
    if (!actionMetaData) {
      throw new Error('The action is not registered, make sure it is imported as provider');
    }
    return actionMetaData.id;
  }

  public getActionMetadataByHandler(handler: THandler): IActionMetadata {
    const { action }: IActionHandlerMetaData<IAction> = this.getMetaData(handler.constructor);

    if (!action) {
      throw new Error(`The action of this handler is not found for key ${this._metaDataKey}`);
    }

    return Reflect.getMetadata(this._metaDataKey, action) as IActionMetadata;
  }

  private getMetaData<T extends Object>(handler: T): IActionHandlerMetaData<IAction> {
    return Reflect.getMetadata(`${this._metaDataKey}_handler`, handler);
  }

  public get handlers() {
    return this._handlers;
  }

  public get type() {
    return this._metaDataKey;
  }
}
