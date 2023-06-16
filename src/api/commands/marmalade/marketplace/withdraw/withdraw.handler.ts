import { Command, CommandHandler, ICommandHandler } from '@/src/infrastructure/cqrs/commands';
import { PactAction } from '@/src/infrastructure/pact/pact.action';
import WithdrawCommand, { WithdrawTokenData } from '@/src/api/commands/marmalade/marketplace/withdraw/withdraw.command';
import { PactModule } from '@/src/infrastructure/pact';
import { Metadata } from '@/src/infrastructure/cqrs/action-handlers';

@CommandHandler(WithdrawCommand)
export default class WithdrawHandler
  extends PactAction<PactModule.MARMALADE_LEDGER, 'withdraw'>
  implements ICommandHandler<WithdrawTokenData>
{
  constructor() {
    super(PactModule.MARMALADE_LEDGER, 'withdraw');
  }

  async execute({ data }: Command<WithdrawTokenData>): Promise<void> {
    const { tokenId, seller, amount } = data;

    const commandBuilder = this.builder(tokenId, seller, amount).addCap('coin.GAS', this.wallet?.session?.account as string); // @todo gas station

    const response = await this.send(commandBuilder);

    console.log(response);
  }

  public get type() {
    return Metadata.COMMAND;
  }
}
