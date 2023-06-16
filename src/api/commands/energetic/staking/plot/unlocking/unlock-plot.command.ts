import { Command } from '@/src/infrastructure/cqrs/commands';
import { IActionRequest } from '@/src/infrastructure/cqrs/action-handlers';
import { IPactDecimal } from '@kadena/types';

export type UnLockPlotData = {
  plotId: string;
  amount: IPactDecimal;
  account: string;
};

export default class UnlockPlotCommand extends Command<UnLockPlotData> {
  constructor(public readonly actionRequest: IActionRequest<UnLockPlotData>) {
    super(actionRequest);
  }
}
