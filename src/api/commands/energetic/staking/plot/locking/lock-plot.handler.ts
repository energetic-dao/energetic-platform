import { Command, CommandHandler, ICommandHandler } from '~/src/infrastructure/cqrs/commands';
import { PactAction } from '~/src/infrastructure/pact/pact.action';
import LockPlotCommand, { LockPlotData } from '~/src/api/commands/energetic/staking/plot/locking/lock-plot.command';
import { PactModule } from '~/src/infrastructure/pact';
import { Metadata } from '~/src/infrastructure/cqrs/action-handlers';

@CommandHandler(LockPlotCommand)
export default class LockPlotHandler
  extends PactAction<PactModule.ENERGETIC_PLOT_STAKING_CENTER, 'lock-plot'>
  implements ICommandHandler<LockPlotData>
{
  constructor() {
    super(PactModule.ENERGETIC_PLOT_STAKING_CENTER, 'lock-plot');
  }

  async execute({ data }: Command<LockPlotData>): Promise<void> {
    const { plotId, amount, account, keyset } = data;

    const publicKey: string = this.wallet.session?.account as string;

    const commandBuilder = this.builder(plotId, amount, account, () => `(read-keyset "${keyset}")`)
      .addData({
        [keyset]: {
          keys: [publicKey],
          pred: 'keys-all',
        },
      })
      .addCap(`${PactModule.COIN}.GAS`, publicKey)
      .addCap(`${PactModule.MARMALADE_LEDGER}.TRANSFER`, publicKey, plotId, `k:${publicKey}`, this.getEscrowAccount(plotId), amount)
      .addCap(`${PactModule.ENERGETIC_PLOT_STAKING_CENTER}.STAKE`, publicKey, plotId, `k:${publicKey}`, `(read-keyset "${keyset}")`);

    //console.log(await this.local(commandBuilder));

    const response = await this.send(commandBuilder);

    console.log(response);
    // fire event
    return response;
  }

  private getEscrowAccount(plotId: string) {
    return `u:free.energetic-plot-staking-center.require-PLOT:jzmgmD0LlAOldgM8-FuYlu5Cnz2WGuS-9vw9Qpg0xIU`;
  }

  public get type() {
    return Metadata.COMMAND;
  }
}
