import { Command } from '~/src/infrastructure/cqrs/commands';
import { IActionRequest } from '~/src/infrastructure/cqrs/action-handlers';
import { IPactDecimal } from '@kadena/types';

export type OfferTokenData = {
  tokenId: string;
  seller: string;
  amount: IPactDecimal;
};

export default class OfferCommand extends Command<OfferTokenData> {
  constructor(public readonly actionRequest: IActionRequest<OfferTokenData>) {
    super(actionRequest);
  }
}
