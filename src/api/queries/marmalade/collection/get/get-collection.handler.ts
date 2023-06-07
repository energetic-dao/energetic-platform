import { PactAction } from '~/src/infrastructure/pact/pact.action';
import { PactModule } from '~/src/infrastructure/pact';
import { Metadata } from '~/src/infrastructure/cqrs/action-handlers';
import { IQueryHandler, Query, QueryHandler } from '~/src/infrastructure/cqrs/queries';
import GetCollectionQuery, { GetCollectionData } from '~/src/api/queries/marmalade/collection/get/get-collection.query';

@QueryHandler(GetCollectionQuery)
export default class GetCollectionHandler
  extends PactAction<PactModule.MARMALADE_COLLECTION, 'get-collection'>
  implements IQueryHandler<GetCollectionData>
{
  constructor() {
    super(PactModule.MARMALADE_COLLECTION, 'get-collection');
  }

  async execute({ data }: Query<GetCollectionData>): Promise<void> {
    const { id } = data;

    const commandBuilder = this.builder(id);

    const response = await this.local(commandBuilder);

    console.log(response);
  }

  public get type() {
    return Metadata.QUERY;
  }
}
