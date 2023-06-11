import { Command } from '~/src/infrastructure/cqrs/commands';
import { IActionRequest } from '~/src/infrastructure/cqrs/action-handlers';
import { IPactDecimal } from '@kadena/types';

export type MintTokenData = {
  id: string;
  account: string;
  keyset: string;
  amount: IPactDecimal;
};

export default class MintTokenCommand extends Command<MintTokenData> {
  constructor(public readonly actionRequest: IActionRequest<MintTokenData>) {
    super(actionRequest);
  }
}
