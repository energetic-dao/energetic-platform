import { PactAction } from '~/src/infrastructure/pact/pact.action';
import { PactModule } from '~/src/infrastructure/pact';
import { Metadata } from '~/src/infrastructure/cqrs/action-handlers';
import { IQueryHandler, Query, QueryHandler } from '~/src/infrastructure/cqrs/queries';
import GetBalanceQuery, { GetBalanceData } from '~/src/api/queries/marmalade/token/get/get-balance.query';

@QueryHandler(GetBalanceQuery)
export default class GetBalanceHandler
  extends PactAction<PactModule.MARMALADE_LEDGER, 'get-balance'>
  implements IQueryHandler<GetBalanceData>
{
  constructor() {
    super(PactModule.MARMALADE_LEDGER, 'get-balance');
  }

  async execute({ data }: Query<GetBalanceData>): Promise<void> {
    const { id, account } = data;

    const commandBuilder = this.builder(id, account);

    const response = await this.local(commandBuilder);

    console.log(response);
  }

  public get type() {
    return Metadata.QUERY;
  }
}
