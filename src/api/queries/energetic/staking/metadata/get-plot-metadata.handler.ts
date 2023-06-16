import { PactAction } from '@/src/infrastructure/pact/pact.action';
import { PactModule } from '@/src/infrastructure/pact';
import { Metadata } from '@/src/infrastructure/cqrs/action-handlers';
import { IQueryHandler, Query, QueryHandler } from '@/src/infrastructure/cqrs/queries';
import GetPlotMetadataQuery, { GetPlotMetadataData } from '@/src/api/queries/energetic/staking/metadata/get-plot-metadata.query';

@QueryHandler(GetPlotMetadataQuery)
export default class GetCollectionHandler
  extends PactAction<PactModule.ENERGETIC_PLOT_STAKING_CENTER, 'get-staked-items-on-plot'>
  implements IQueryHandler<GetPlotMetadataData>
{
  constructor() {
    super(PactModule.ENERGETIC_PLOT_STAKING_CENTER, 'get-staked-items-on-plot');
  }

  async execute({ data }: Query<GetPlotMetadataData>): Promise<any> {
    const { plotId } = data;

    const commandBuilder = this.builder(plotId);

    return this.local(commandBuilder);
  }

  public get type() {
    return Metadata.QUERY;
  }
}
