import { Command, CommandHandler, ICommandHandler } from '@/src/infrastructure/cqrs/commands';
import { PactAction } from '@/src/infrastructure/pact/pact.action';
import { PactModule } from '@/src/infrastructure/pact';
import { Metadata } from '@/src/infrastructure/cqrs/action-handlers';
import UnlockPlotItemCommand, {
  UnlockPlotItemData,
} from '~/src/api/commands/energetic/staking/plot/unlock-plot-item/unlock-plot-item.command';

@CommandHandler(UnlockPlotItemCommand)
export default class UnlockPlotItemHandler
  extends PactAction<PactModule.ENERGETIC_PLOT_STAKING_CENTER, 'unlock-plot-item'>
  implements ICommandHandler<UnlockPlotItemData>
{
  constructor() {
    super(PactModule.ENERGETIC_PLOT_STAKING_CENTER, 'unlock-plot-item');
  }

  async execute({ data }: Command<UnlockPlotItemData>): Promise<void> {
    const { plotId, tokenId, amount, account } = data;

    const publicKey: string = this.wallet.session?.account as string;

    const commandBuilder = this.builder(plotId, tokenId, amount, account)
      //.addCap(`${PactModule.COIN}.GAS`, publicKey)
      .addCap(`${PactModule.ENERGETIC_PLOT_STAKING_CENTER}.DEGRADE_PLOT`, publicKey, plotId, tokenId, `k:${publicKey}`);

    const response = await this.send(commandBuilder);

    console.log(response);
  }

  public get type() {
    return Metadata.COMMAND;
  }
}
