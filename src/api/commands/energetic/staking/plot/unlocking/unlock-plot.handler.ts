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

    const publicKey: string = this.wallet.session?.account as string;

    const commandBuilder = this.builder(plotId, amount, account)
      .addCap('coin.GAS', publicKey)
      .addCap('free.energetic-plot-staking-center.UNSTAKE', publicKey, plotId, `k:${publicKey}`)
      .setMeta({
        gasLimit: 45000,
        sender: publicKey,
      });

    const response = await this.send(commandBuilder);

    console.log(response);
  }

  public get type() {
    return Metadata.COMMAND;
  }
}
