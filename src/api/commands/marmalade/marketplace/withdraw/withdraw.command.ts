import { Command } from '@/src/infrastructure/cqrs/commands';
import { IActionRequest } from '@/src/infrastructure/cqrs/action-handlers';
import { IPactDecimal } from '@kadena/types';

export type WithdrawTokenData = {
  tokenId: string;
  seller: string;
  amount: IPactDecimal;
};

export default class WithdrawCommand extends Command<WithdrawTokenData> {
  constructor(public readonly actionRequest: IActionRequest<WithdrawTokenData>) {
    super(actionRequest);
  }
}
