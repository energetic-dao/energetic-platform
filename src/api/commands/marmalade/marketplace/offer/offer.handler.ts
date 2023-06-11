import { Command, CommandHandler, ICommandHandler } from '~/src/infrastructure/cqrs/commands';
import { PactAction } from '~/src/infrastructure/pact/pact.action';
import OfferCommand, { OfferTokenData } from '~/src/api/commands/marmalade/marketplace/offer/offer.command';
import { PactModule } from '~/src/infrastructure/pact';
import { Metadata } from '~/src/infrastructure/cqrs/action-handlers';

@CommandHandler(OfferCommand)
export default class OfferHandler extends PactAction<PactModule.MARMALADE_LEDGER, 'sale'> implements ICommandHandler<OfferTokenData> {
  constructor() {
    super(PactModule.MARMALADE_LEDGER, 'sale');
  }

  async execute({ data }: Command<OfferTokenData>): Promise<void> {
    const { tokenId, seller, amount, date } = data;

    const publicKey = this.wallet?.session?.account as string;

    const commandBuilder = this.builder(tokenId, seller, amount, date)
      .addCap(`${PactModule.COIN}.GAS`, publicKey)
      .addCap(`${PactModule.MARMALADE_LEDGER}.OFFER`, publicKey, tokenId, seller, amount, date);

    console.log(commandBuilder);
    //const response = await this.send(commandBuilder);

    //console.log(response);
  }

  public get type() {
    return Metadata.COMMAND;
  }
}
