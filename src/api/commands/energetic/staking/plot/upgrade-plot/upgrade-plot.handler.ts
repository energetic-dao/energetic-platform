import { Command, CommandHandler, ICommandHandler } from '~/src/infrastructure/cqrs/commands';
import { PactAction } from '~/src/infrastructure/pact/pact.action';
import { PactModule } from '~/src/infrastructure/pact';
import { Metadata } from '~/src/infrastructure/cqrs/action-handlers';
import UpgradePlotCommand, { UpgradePlotData } from '~/src/api/commands/energetic/staking/plot/upgrade-plot/upgrade-plot.command';

@CommandHandler(UpgradePlotCommand)
export default class UpgradePlotHandler
  extends PactAction<PactModule.ENERGETIC_PLOT_STAKING_CENTER, 'upgrade-plot'>
  implements ICommandHandler<UpgradePlotData>
{
  constructor() {
    super(PactModule.ENERGETIC_PLOT_STAKING_CENTER, 'upgrade-plot');
  }

  async execute({ data }: Command<UpgradePlotData>): Promise<void> {
    const { plotId, itemId, amount, account, keyset } = data;

    const pubKey: string = this.wallet.session?.account as string;

    const commandBuilder = this.builder(plotId, itemId, amount, account, () => `(read-keyset "${keyset}")`)
      .addCap('coin.GAS', pubKey as string)
      .addCap(
        'free.energetic-plot-staking-center.UPGRADE_PLOT',
        pubKey as string,
        plotId,
        itemId,
        account,
        () => `(read-keyset "${keyset}")`,
      );

    const response = await this.local(commandBuilder);

    console.log(response);
    // fire event
    return response;
  }

  public get type() {
    return Metadata.COMMAND;
  }
}
