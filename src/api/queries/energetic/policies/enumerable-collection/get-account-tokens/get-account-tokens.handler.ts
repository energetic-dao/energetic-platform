import { PactAction } from '~/src/infrastructure/pact/pact.action';
import { PactModule } from '~/src/infrastructure/pact';
import { Metadata } from '~/src/infrastructure/cqrs/action-handlers';
import { IQueryHandler, Query, QueryHandler } from '~/src/infrastructure/cqrs/queries';
import GetAccountTokensQuery, {
  GetAccountTokensData,
} from '~/src/api/queries/energetic/policies/enumerable-collection/get-account-tokens/get-account-tokens.query';

@QueryHandler(GetAccountTokensQuery)
export default class GetAccountTokensHandler
  extends PactAction<PactModule.ENERGETIC_ENUMERABLE_COLLECTION_POLICY, 'get-tokens-for-account'>
  implements IQueryHandler<GetAccountTokensData>
{
  constructor() {
    super(PactModule.ENERGETIC_ENUMERABLE_COLLECTION_POLICY, 'get-tokens-for-account');
  }

  async execute({ data }: Query<GetAccountTokensData>): Promise<any[]> {
    const { account } = data;

    const commandBuilder = this.builder(account);

    return this.local(commandBuilder);
  }

  public get type() {
    return Metadata.QUERY;
  }
}
