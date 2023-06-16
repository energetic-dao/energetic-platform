import { Command, CommandHandler, ICommandHandler } from '@/src/infrastructure/cqrs/commands';
import { PactAction } from '@/src/infrastructure/pact/pact.action';
import CreateTokenCommand, { CreateTokenData } from '@/src/api/commands/marmalade/token/create/create-token.command';
import { PactModule } from '@/src/infrastructure/pact';
import { Metadata } from '@/src/infrastructure/cqrs/action-handlers';

@CommandHandler(CreateTokenCommand)
export default class CreateTokenHandler
  extends PactAction<PactModule.MARMALADE_LEDGER, 'create-token'>
  implements ICommandHandler<CreateTokenData>
{
  constructor() {
    super(PactModule.MARMALADE_LEDGER, 'create-token');
  }

  async execute({ data }: Command<CreateTokenData>): Promise<void> {
    const { id, uri, precision, policies, envData, collectionId } = data;

    const publicKey = this.wallet?.session?.account as string;

    const commandBuilder = this.builder(id, precision, uri, policies)
      .addData({
        ...envData,
      })
      .addCap(`${PactModule.MARMALADE_COLLECTION}.OPERATOR`, publicKey, collectionId);
    //.addCap('coin.GAS', publicKey); // @todo gas station

    commandBuilder.code = `(${PactModule.MARMALADE_LEDGER}.create-token "${id}" ${precision.int} "${uri}" {"concrete-policies":{"quote-policy":false,"non-fungible-policy":true,"royalty-policy":false,"collection-policy":true},"immutable-policies":[free.energetic-plot-policy,free.energetic-enumerable-collection-policy],"adjustable-policies":[]})`;

    console.log(JSON.stringify(policies));
    console.log(
      JSON.stringify(policies).replace(
        '["free.energetic-plot-policy"]',
        '[free.energetic-plot-policy,free.energetic-enumerable-collection-policy]',
      ),
    );

    const response = await this.send(commandBuilder);

    console.log(response);
  }

  public get type() {
    return Metadata.COMMAND;
  }
}
