import { Command } from '~/src/infrastructure/cqrs/commands';
import { IActionRequest } from '~/src/infrastructure/cqrs/action-handlers';
import { IPactDecimal } from '@kadena/types';

export type UpgradePlotData = {
  plotId: string;
  itemId: string;
  amount: IPactDecimal;
  account: string;
  keyset: string;
};

export default class UpgradePlotCommand extends Command<UpgradePlotData> {
  constructor(public readonly actionRequest: IActionRequest<UpgradePlotData>) {
    super(actionRequest);
  }
}
