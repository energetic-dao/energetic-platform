import { IActionRequest } from '~/src/infrastructure/cqrs/action-handlers';
import { Query } from '~/src/infrastructure/cqrs/queries';

export type GetBalanceData = {
  id: string;
  account: string;
};

export default class GetBalanceQuery extends Query<GetBalanceData> {
  constructor(public readonly actionRequest: IActionRequest<GetBalanceData>) {
    super(actionRequest);
  }
}
