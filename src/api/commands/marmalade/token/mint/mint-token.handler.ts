import { Command, CommandHandler, ICommandHandler } from '~/src/infrastructure/cqrs/commands';
import { PactAction } from '~/src/infrastructure/pact/pact.action';
import MintTokenCommand, { MintTokenData } from '~/src/api/commands/marmalade/token/mint/mint-token.command';
import { PactModule } from '~/src/infrastructure/pact';
import { Metadata } from '~/src/infrastructure/cqrs/action-handlers';

@CommandHandler(MintTokenCommand)
export default class MintTokenHandler extends PactAction<PactModule.MARMALADE_LEDGER, 'mint'> implements ICommandHandler<MintTokenData> {
  constructor() {
    super(PactModule.MARMALADE_LEDGER, 'mint');
  }

  async execute({ data }: Command<MintTokenData>): Promise<void> {
    const { id, account, keyset, amount } = data;

    const publicKey = this.wallet?.session?.account as string;

    const commandBuilder = this.builder(id, account, () => `(read-keyset "${keyset}")`, amount)
      .addData({
        'energetic-admin': {
          keys: this.wallet.session?.account ? [this.wallet.session?.account] : [],
          pred: 'keys-all',
        },
        'cp-mint-guard': {
          keys: this.wallet.session?.account ? [this.wallet.session?.account] : [],
          pred: 'keys-all',
        },
        'nfp-mint-guard': {
          keys: this.wallet.session?.account ? [this.wallet.session?.account] : [],
          pred: 'keys-all',
        },
      })
      .addCap(`${PactModule.MARMALADE_LEDGER}.MINT`, publicKey, id, account, amount)
      .addCap(`${PactModule.MARMALADE_COLLECTION}.MINT`, publicKey, id)
      .addCap(`${PactModule.MARMALADE_NONE_FUNGIBLE}.MINT`, publicKey, id)
      .addCap('coin.GAS', publicKey); // @todo gas station

    //commandBuilder.code = `(n_fa5008565e171dca599c6accfd71d6006ddecce0.ledger.mint "t:_DJWLzU_Gaw0PEboweeKv9lHGg5AcI_JELdby389IS4" "00ea18feef966289dbd6b9b63ba6161c86fce643a9e684ad0d8e57f68bccd2dc" (read-keyset "energetic-admin") 1.0)`;

    console.log(commandBuilder);

    const response = await this.send(commandBuilder);

    console.log(response);
  }

  public get type() {
    return Metadata.COMMAND;
  }
}
