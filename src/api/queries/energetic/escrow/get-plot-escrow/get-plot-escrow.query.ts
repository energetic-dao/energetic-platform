import { IActionRequest } from '@/src/infrastructure/cqrs/action-handlers';
import { Query } from '@/src/infrastructure/cqrs/queries';

export type GetPlotEscrowData = {
  plotId: string;
};

export default class GetPlotEscrowQuery extends Query<GetPlotEscrowData> {
  constructor(public readonly actionRequest: IActionRequest<GetPlotEscrowData>) {
    super(actionRequest);
  }
}
