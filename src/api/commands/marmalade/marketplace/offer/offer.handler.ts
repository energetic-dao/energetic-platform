import { Command, CommandHandler, ICommandHandler } from '~/src/infrastructure/cqrs/commands';
import { PactAction } from '~/src/infrastructure/pact/pact.action';
import OfferCommand, { OfferTokenData } from '~/src/api/commands/marmalade/marketplace/offer/offer.command';
import { PactModule } from '~/src/infrastructure/pact';
import { Metadata } from '~/src/infrastructure/cqrs/action-handlers';

@CommandHandler(OfferCommand)
export default class OfferHandler extends PactAction<PactModule.MARMALADE_LEDGER, 'offer'> implements ICommandHandler<OfferTokenData> {
  constructor() {
    super(PactModule.MARMALADE_LEDGER, 'offer');
  }

  async execute({ data }: Command<OfferTokenData>): Promise<void> {
    const { tokenId, seller, amount } = data;

    const commandBuilder = this.builder(tokenId, seller, amount).addCap('coin.GAS', this.wallet?.session?.account as string); // @todo gas station

    const response = await this.send(commandBuilder);

    console.log(response);
  }

  public get type() {
    return Metadata.COMMAND;
  }
}
