import { PactAction } from '@/src/infrastructure/pact/pact.action';
import { PactModule } from '@/src/infrastructure/pact';
import { Metadata } from '@/src/infrastructure/cqrs/action-handlers';
import { IQueryHandler, Query, QueryHandler } from '@/src/infrastructure/cqrs/queries';
import GetPlotPowerRateQuery, {
  GetPlotPowerRateData,
} from '~/src/api/queries/energetic/staking/get-plot-power-rate/get-plot-power-rate.query';

@QueryHandler(GetPlotPowerRateQuery)
export default class GetCollectionHandler
  extends PactAction<PactModule.ENERGETIC_PLOT_STAKING_CENTER, 'get-plot-power-rate'>
  implements IQueryHandler<GetPlotPowerRateData>
{
  constructor() {
    super(PactModule.ENERGETIC_PLOT_STAKING_CENTER, 'get-plot-power-rate');
  }

  async execute({ data }: Query<GetPlotPowerRateData>): Promise<any> {
    const { plotId } = data;

    const commandBuilder = this.builder(plotId);

    return this.local(commandBuilder);
  }

  public get type() {
    return Metadata.QUERY;
  }
}
