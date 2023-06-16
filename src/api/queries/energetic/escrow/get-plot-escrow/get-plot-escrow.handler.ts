import { PactAction } from '@/src/infrastructure/pact/pact.action';
import { PactModule } from '@/src/infrastructure/pact';
import { Metadata } from '@/src/infrastructure/cqrs/action-handlers';
import { IQueryHandler, Query, QueryHandler } from '@/src/infrastructure/cqrs/queries';
import GetPlotEscrowQuery, { GetPlotEscrowData } from '@/src/api/queries/energetic/escrow/get-plot-escrow/get-plot-escrow.query';

@QueryHandler(GetPlotEscrowQuery)
export default class GetPlotEscrowHandler
  extends PactAction<PactModule.ENERGETIC_PLOT_STAKING_CENTER, 'create-escrow-account'>
  implements IQueryHandler<GetPlotEscrowData>
{
  constructor() {
    super(PactModule.ENERGETIC_PLOT_STAKING_CENTER, 'create-escrow-account');
  }

  async execute({ data }: Query<GetPlotEscrowData>): Promise<any[]> {
    const { plotId } = data;

    const commandBuilder = this.builder(plotId);

    return this.local(commandBuilder);
  }

  public get type() {
    return Metadata.QUERY;
  }
}
