import { Command } from '@/src/infrastructure/cqrs/commands';
import { IActionRequest } from '@/src/infrastructure/cqrs/action-handlers';
import { IPactDecimal } from '@kadena/types';

export type LockPlotData = {
  plotId: string;
  amount: IPactDecimal;
  account: string;
  escrowAccount: string;
};

export default class LockPlotCommand extends Command<LockPlotData> {
  constructor(public readonly actionRequest: IActionRequest<LockPlotData>) {
    super(actionRequest);
  }
}
