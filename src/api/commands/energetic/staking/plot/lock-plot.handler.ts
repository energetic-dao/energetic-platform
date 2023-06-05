import { Command, CommandHandler } from '~/src/infrastructure/cqrs/commands';
import { PactCommand } from '~/src/infrastructure/pact/pact.command';
import CreateCollectionCommand, { CreateCollectionData } from '~/src/api/commands/marmalade/collection/create/create-collection.command';
import { PactModule } from '~/src/infrastructure/pact';
import { Metadata } from '~/src/infrastructure/cqrs/action-handlers';
import { LockPlotData } from '~/src/api/commands/energetic/staking/plot/lock-plot.command';

export interface ICommandHandler {
  execute<Request = any>(actionRequest: Request): Promise<void>;

  execute<Request = any, Response = any>(actionRequest: Request): Promise<Response>;
}

@CommandHandler(CreateCollectionCommand)
export default class LockPlotHandler extends PactCommand<PactModule.ENERGETIC_PLOT_STAKING_CENTER, 'lock-plot'> implements ICommandHandler {
  constructor() {
    super(PactModule.ENERGETIC_PLOT_STAKING_CENTER, 'lock-plot');
  }

  async execute({ data }: Command<LockPlotData>): Promise<void> {
    const { plotId, amount, account, keyset } = data;

    const pubKey: string = this.wallet.session?.account as string;

    const commandBuilder = this.builder(plotId, amount, account, () => `(read-keyset "${keyset}")`)
      .addData({
        [keyset]: {
          keys: [pubKey],
          pred: 'keys-all',
        },
      })
      .addCap('coin.GAS', pubKey as string)
      .addCap(
        'n_fa5008565e171dca599c6accfd71d6006ddecce0.ledger.TRANSFER',
        pubKey as string,
        plotId,
        `k:${pubKey}`,
        this.getEscrowAccount(plotId),
        amount,
      )
      .addCap('free.energetic-plot-staking-center.STAKE', pubKey as string, plotId, `k:${pubKey}`, () => `(read-keyset "${keyset}")`);

    const response = await this.local(commandBuilder);

    console.log(response);
    // fire event
    return response;
  }

  private getEscrowAccount(plotId: string) {
    return `m:free.energetic-plot-staking-center:${plotId}`;
  }

  public get type() {
    return Metadata.COMMAND;
  }
}
