import { PactAction } from '~/src/infrastructure/pact/pact.action';
import { PactModule } from '~/src/infrastructure/pact';
import { Metadata } from '~/src/infrastructure/cqrs/action-handlers';
import { IQueryHandler, Query, QueryHandler } from '~/src/infrastructure/cqrs/queries';
import GetCollectionTokensQuery, {
  GetCollectionTokenData,
} from '~/src/api/queries/energetic/policies/enumerable-collection/get-collection-tokens/get-collection-tokens.query';

@QueryHandler(GetCollectionTokensQuery)
export default class GetCollectionTokensHandler
  extends PactAction<PactModule.ENERGETIC_ENUMERABLE_COLLECTION_POLICY, 'get-collection-tokens'>
  implements IQueryHandler<GetCollectionTokenData>
{
  constructor() {
    super(PactModule.ENERGETIC_ENUMERABLE_COLLECTION_POLICY, 'get-collection-tokens');
  }

  async execute({ data }: Query<GetCollectionTokenData>): Promise<any[]> {
    const { collectionId } = data;

    const commandBuilder = this.builder(collectionId);

    return this.local(commandBuilder);
  }

  public get type() {
    return Metadata.QUERY;
  }
}
