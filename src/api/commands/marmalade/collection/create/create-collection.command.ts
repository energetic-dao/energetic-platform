import { Command } from '~/src/infrastructure/cqrs/commands';
import { IActionRequest } from '~/src/infrastructure/cqrs/action-handlers';
import { IPactInt } from '@kadena/types';

export type CreateCollectionData = {
  name: string;
  size: IPactInt;
  keyset: string;
};

export default class CreateCollectionCommand extends Command<CreateCollectionData> {
  constructor(public readonly actionRequest: IActionRequest<CreateCollectionData>) {
    super(actionRequest);
  }
}
