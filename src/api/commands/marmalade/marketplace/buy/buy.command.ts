import { Command } from '~/src/infrastructure/cqrs/commands';
import { IActionRequest } from '~/src/infrastructure/cqrs/action-handlers';
import { IPactDecimal } from '@kadena/types';

export type BuyTokenData = {
  tokenId: string;
  seller: string;
  buyer: string;
  buyerGuard: string;
  amount: IPactDecimal;
  saleId: string;
};

export default class BuyCommand extends Command<BuyTokenData> {
  constructor(public readonly actionRequest: IActionRequest<BuyTokenData>) {
    super(actionRequest);
  }
}
