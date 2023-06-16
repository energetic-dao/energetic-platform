import { IActionRequest } from '@/src/infrastructure/cqrs/action-handlers';
import { Query } from '@/src/infrastructure/cqrs/queries';

export type GetPlotPowerRateData = {
  plotId: string;
};

export default class GetPlotPowerRateQuery extends Query<GetPlotPowerRateData> {
  constructor(public readonly actionRequest: IActionRequest<GetPlotPowerRateData>) {
    super(actionRequest);
  }
}
