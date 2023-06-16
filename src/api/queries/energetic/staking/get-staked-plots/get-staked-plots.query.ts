import { IActionRequest } from '@/src/infrastructure/cqrs/action-handlers';
import { Query } from '@/src/infrastructure/cqrs/queries';

export type GetStakedPlotsData = {
  account: string;
};

export default class GetStakedPlotsQuery extends Query<GetStakedPlotsData> {
  constructor(public readonly actionRequest: IActionRequest<GetStakedPlotsData>) {
    super(actionRequest);
  }
}
