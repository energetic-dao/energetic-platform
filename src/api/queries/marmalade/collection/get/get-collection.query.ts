import { IActionRequest } from '@/src/infrastructure/cqrs/action-handlers';
import { Query } from '@/src/infrastructure/cqrs/queries';

export type GetCollectionData = {
  id: string;
};

export default class GetCollectionQuery extends Query<GetCollectionData> {
  constructor(public readonly actionRequest: IActionRequest<GetCollectionData>) {
    super(actionRequest);
  }
}
