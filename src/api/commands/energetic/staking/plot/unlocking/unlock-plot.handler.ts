import { Command, CommandHandler, ICommandHandler } from '~/src/infrastructure/cqrs/commands';
import { PactAction } from '~/src/infrastructure/pact/pact.action';
import { PactModule } from '~/src/infrastructure/pact';
import { Metadata } from '~/src/infrastructure/cqrs/action-handlers';
import UnlockPlotCommand, { UnLockPlotData } from '~/src/api/commands/energetic/staking/plot/unlocking/unlock-plot.command';

@CommandHandler(UnlockPlotCommand)
export default class UnlockPlotHandler
  extends PactAction<PactModule.ENERGETIC_PLOT_STAKING_CENTER, 'unlock-plot'>
  implements ICommandHandler<UnLockPlotData>
{
  constructor() {
    super(PactModule.ENERGETIC_PLOT_STAKING_CENTER, 'unlock-plot');
  }

  async execute({ data }: Command<UnLockPlotData>): Promise<void> {
    const { plotId, amount, account } = data;

    const pubKey: string = this.wallet.session?.account as string;

    const commandBuilder = this.builder(plotId, amount, account)
      .addCap('coin.GAS', pubKey as string)
      .addCap('free.energetic-plot-staking-center.UNSTAKE', pubKey as string, plotId, `k:${pubKey}`);

    const response = await this.local(commandBuilder);

    console.log(response);
    // fire event
    return response;
  }

  public get type() {
    return Metadata.COMMAND;
  }
}
