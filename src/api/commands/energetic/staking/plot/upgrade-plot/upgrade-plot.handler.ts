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
    const { plotId, itemId, amount, account, escrowAccount } = data;

    const publicKey: string = this.wallet.session?.account as string;

    const commandBuilder = this.builder(plotId, itemId, amount, account, () => `(read-keyset "${publicKey}")`)
      .addData({
        [publicKey]: {
          keys: [publicKey],
          pred: 'keys-all',
        },
      })
      .addCap('coin.GAS', publicKey as string)
      .addCap(`${PactModule.MARMALADE_LEDGER}.TRANSFER`, publicKey, itemId, `k:${publicKey}`, escrowAccount, amount)
      .addCap(`${PactModule.ENERGETIC_ENUMERABLE_COLLECTION_POLICY}.TRANSFER`, publicKey, itemId, `k:${publicKey}`, escrowAccount, amount)
      .addCap(`${PactModule.ENERGETIC_PLOT_STAKING_CENTER}.UPGRADE_PLOT`, publicKey as string, plotId, itemId, account, {
        keys: [publicKey],
        pred: 'keys-all',
      });

    console.log(commandBuilder);

    const response = await this.send(commandBuilder);

    console.log(response);
    // fire event
  }

  public get type() {
    return Metadata.COMMAND;
  }
}
