import { PactAction } from '@/src/infrastructure/pact/pact.action';
import { PactModule } from '@/src/infrastructure/pact';
import { Metadata } from '@/src/infrastructure/cqrs/action-handlers';
import { IQueryHandler, Query, QueryHandler } from '@/src/infrastructure/cqrs/queries';
import GetStakedPlotsQuery, { GetStakedPlotsData } from '@/src/api/queries/energetic/staking/get-staked-plots/get-staked-plots.query';

@QueryHandler(GetStakedPlotsQuery)
export default class GetCollectionHandler
  extends PactAction<PactModule.ENERGETIC_PLOT_STAKING_CENTER, 'get-staked-plots'>
  implements IQueryHandler<GetStakedPlotsData>
{
  constructor() {
    super(PactModule.ENERGETIC_PLOT_STAKING_CENTER, 'get-staked-plots');
  }

  async execute({ data }: Query<GetStakedPlotsData>): Promise<any> {
    const { account } = data;

    const commandBuilder = this.builder(account);

    return this.local(commandBuilder);
  }

  public get type() {
    return Metadata.QUERY;
  }
}
