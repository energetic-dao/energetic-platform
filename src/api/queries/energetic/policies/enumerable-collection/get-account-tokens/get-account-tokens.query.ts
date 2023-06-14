import { IActionRequest } from '~/src/infrastructure/cqrs/action-handlers';
import { Query } from '~/src/infrastructure/cqrs/queries';

export type GetAccountTokensData = {
  account: string;
};

export default class GetAccountTokensQuery extends Query<GetAccountTokensData> {
  constructor(public readonly actionRequest: IActionRequest<GetAccountTokensData>) {
    super(actionRequest);
  }
}
