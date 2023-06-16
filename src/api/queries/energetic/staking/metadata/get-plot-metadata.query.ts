import { IActionRequest } from '@/src/infrastructure/cqrs/action-handlers';
import { Query } from '@/src/infrastructure/cqrs/queries';

export type GetPlotMetadataData = {
  plotId: string;
};

export default class GetPlotMetadataQuery extends Query<GetPlotMetadataData> {
  constructor(public readonly actionRequest: IActionRequest<GetPlotMetadataData>) {
    super(actionRequest);
  }
}
