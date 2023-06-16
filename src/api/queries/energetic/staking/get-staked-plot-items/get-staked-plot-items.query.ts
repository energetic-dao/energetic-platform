import { IActionRequest } from '@/src/infrastructure/cqrs/action-handlers';
import { Query } from '@/src/infrastructure/cqrs/queries';

export type GetStakedItemsOnPlotData = {
  plotId: string;
};

export default class GetStakedPlotItemsQuery extends Query<GetStakedItemsOnPlotData> {
  constructor(public readonly actionRequest: IActionRequest<GetStakedItemsOnPlotData>) {
    super(actionRequest);
  }
}
