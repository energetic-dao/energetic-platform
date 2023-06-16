import { Command, CommandHandler, ICommandHandler } from '@/src/infrastructure/cqrs/commands';
import { PactAction } from '@/src/infrastructure/pact/pact.action';
import BuyCommand, { BuyTokenData } from '@/src/api/commands/marmalade/marketplace/buy/buy.command';
import { PactModule } from '@/src/infrastructure/pact';
import { Metadata } from '@/src/infrastructure/cqrs/action-handlers';

@CommandHandler(BuyCommand)
export default class BuyHandler extends PactAction<PactModule.MARMALADE_LEDGER, 'buy'> implements ICommandHandler<BuyTokenData> {
  constructor() {
    super(PactModule.MARMALADE_LEDGER, 'buy');
  }

  async execute({ data }: Command<BuyTokenData>): Promise<void> {
    const { tokenId, seller, buyer, buyerGuard, amount, saleId } = data;

    const commandBuilder = this.builder(tokenId, seller, buyer, () => `(read-keyset "${buyerGuard}")`, amount, saleId).addData({
      [buyerGuard]: {
        keys: [this.wallet?.session?.account],
        pred: 'keys-all',
      },
    });
    //.addCap('coin.GAS', this.wallet?.session?.account as string); // @todo gas station

    const response = await this.send(commandBuilder);

    console.log(response);
  }

  public get type() {
    return Metadata.COMMAND;
  }
}
