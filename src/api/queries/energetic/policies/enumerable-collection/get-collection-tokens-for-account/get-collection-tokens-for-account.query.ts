import { IActionRequest } from '@/src/infrastructure/cqrs/action-handlers';
import { Query } from '@/src/infrastructure/cqrs/queries';

export type GetCollectionTokensForAccountData = {
  collectionId: string;
  account: string;
};

export default class GetCollectionTokensForAccountQuery extends Query<GetCollectionTokensForAccountData> {
  constructor(public readonly actionRequest: IActionRequest<GetCollectionTokensForAccountData>) {
    super(actionRequest);
  }
}
