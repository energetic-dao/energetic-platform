import 'reflect-metadata';
import { ActionHandlerBus, IActionBus, Metadata } from '@/src/infrastructure/cqrs/action-handlers';
import { Query } from '~/src/infrastructure/cqrs/queries';

export class QueryBus extends ActionHandlerBus<QueryBus> implements IActionBus {
  constructor() {
    super(Metadata.QUERY);
  }

  async execute<Request>(query: Query<Request>): Promise<void> {
    const queryId = this.getId(query);

    if (!queryId) {
      throw new Error(`Query is not registered`);
    }

    const queryHandler = this.handlers.get(queryId);
    if (!queryHandler) {
      throw new Error(`Query with ${queryId} not found in handlers`);
    }

    const { handler } = queryHandler;

    //const next = async ({ index = 0, context }: { index?: number; context: Command<Request> }): Promise<void> => {
    //  if (middlewares.length <= 0 || index === middlewares.length) {
    //    return handler.execute(context);
    //  }

    //  const middleware = middlewares[index];

    //  if (!middleware) {
    //    throw new Error(`Middleware of command: ${commandId} is not correctly registered`);
    //  }

    //  middleware.use(context, () => next({ index: ++index, context }));
    //  return;
    //};

    return handler.execute(query);
  }
}
