import { IActionRequest } from '~/src/infrastructure/cqrs/action-handlers';
import { Query } from '~/src/infrastructure/cqrs/queries';

export type GetCollectionTokenData = {
  collectionId: string;
};

export default class GetCollectionTokensQuery extends Query<GetCollectionTokenData> {
  constructor(public readonly actionRequest: IActionRequest<GetCollectionTokenData>) {
    super(actionRequest);
  }
}
