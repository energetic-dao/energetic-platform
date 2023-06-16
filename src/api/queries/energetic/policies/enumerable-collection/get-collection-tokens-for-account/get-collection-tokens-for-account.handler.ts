import { PactAction } from '@/src/infrastructure/pact/pact.action';
import { PactModule } from '@/src/infrastructure/pact';
import { Metadata } from '@/src/infrastructure/cqrs/action-handlers';
import { IQueryHandler, Query, QueryHandler } from '@/src/infrastructure/cqrs/queries';
import GetCollectionTokensForAccountQuery, {
  GetCollectionTokensForAccountData,
} from '@/src/api/queries/energetic/policies/enumerable-collection/get-collection-tokens-for-account/get-collection-tokens-for-account.query';

@QueryHandler(GetCollectionTokensForAccountQuery)
export default class GetCollectionTokensForAccountHandler
  extends PactAction<PactModule.ENERGETIC_ENUMERABLE_COLLECTION_POLICY, 'get-collection-tokens-for-account'>
  implements IQueryHandler<GetCollectionTokensForAccountData>
{
  constructor() {
    super(PactModule.ENERGETIC_ENUMERABLE_COLLECTION_POLICY, 'get-collection-tokens-for-account');
  }

  async execute({ data }: Query<GetCollectionTokensForAccountData>): Promise<any[]> {
    const { collectionId, account } = data;

    const commandBuilder = this.builder(collectionId, account);

    return this.local(commandBuilder);
  }

  public get type() {
    return Metadata.QUERY;
  }
}
