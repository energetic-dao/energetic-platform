import { Command } from '@/src/infrastructure/cqrs/commands';

export interface ICommandHandler<Request, Response = any> {
  execute(actionRequest: Command<Request>): Promise<Response> | Response;
}
