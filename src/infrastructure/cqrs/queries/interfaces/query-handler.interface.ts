import { Query } from '@/src/infrastructure/cqrs/queries/classes';

export interface IQueryHandler<Request, Response = any> {
  execute(actionRequest: Query<Request>): Promise<Response> | Response;
}
