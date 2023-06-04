import { Command, CommandHandler } from '~/src/infrastructure/cqrs/commands';
import { PactCommand } from '~/src/infrastructure/pact/pact.command';
import CreateCollectionCommand, { CreateCollectionData } from '~/src/api/commands/marmalade/create-collection/create-collection.command';
import { PactModule } from '~/src/infrastructure/pact';
import { Metadata } from '~/src/infrastructure/cqrs/action-handlers';

export interface ICommandHandler {
  execute<Request = any>(actionRequest: Request): Promise<void>;

  execute<Request = any, Response = any>(actionRequest: Request): Promise<Response>;
}

@CommandHandler(CreateCollectionCommand)
export default class CreateCollectionHandler
  extends PactCommand<PactModule.MARMALADE_COLLECTION, 'create-collection'>
  implements ICommandHandler
{
  constructor() {
    super(PactModule.MARMALADE_COLLECTION, 'create-collection');
  }

  async execute({ data }: Command<CreateCollectionData>): Promise<void> {
    const { name, size, keyset } = data;

    const commandBuilder = this.builder(name, size, () => `(read-keyset "${keyset}")`)
      .addData({
        [keyset]: {
          keys: [this.wallet?.session?.account],
          pred: 'keys-all',
        },
      })
      .addCap('coin.GAS', this.wallet?.session?.account as string); // @todo gas station

    const response = await this.send(commandBuilder);

    console.log(response);
  }

  public get type() {
    return Metadata.COMMAND;
  }
}
