import { Command, CommandHandler, ICommandHandler } from '@/src/infrastructure/cqrs/commands';
import { PactAction } from '@/src/infrastructure/pact/pact.action';
import CreateCollectionCommand, { CreateCollectionData } from '@/src/api/commands/marmalade/collection/create/create-collection.command';
import { PactModule } from '@/src/infrastructure/pact';
import { Metadata } from '@/src/infrastructure/cqrs/action-handlers';

@CommandHandler(CreateCollectionCommand)
export default class CreateCollectionHandler
  extends PactAction<PactModule.MARMALADE_COLLECTION, 'create-collection'>
  implements ICommandHandler<CreateCollectionData>
{
  constructor() {
    super(PactModule.MARMALADE_COLLECTION, 'create-collection');
  }

  async execute({ data }: Command<CreateCollectionData>): Promise<void> {
    const { name, size, keyset } = data;

    const commandBuilder = this.builder(name, size, () => `(read-keyset "${keyset}")`).addData({
      [keyset]: {
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
