import { Command } from '@/src/infrastructure/cqrs/commands';
import { IActionRequest } from '@/src/infrastructure/cqrs/action-handlers';
import { IPactDecimal } from '@kadena/types';

export type UnlockPlotItemData = {
  plotId: string;
  tokenId: string;
  amount: IPactDecimal;
  account: string;
};

export default class UnlockPlotItemCommand extends Command<UnlockPlotItemData> {
  constructor(public readonly actionRequest: IActionRequest<UnlockPlotItemData>) {
    super(actionRequest);
  }
}
