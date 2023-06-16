import { IActionRequest, Metadata } from '@/src/infrastructure/cqrs/action-handlers';

export interface IAction<Request = any> {
  readonly type: Metadata;
  actionRequest?: IActionRequest<Request>;
}
