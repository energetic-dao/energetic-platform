import 'reflect-metadata';
import { ActionHandlerBus, IActionBus, Metadata } from '@/src/infrastructure/cqrs/action-handlers';
import { Command } from '@/src/infrastructure/cqrs/commands/classes';
import { ICommandBuilder, ICapabilities, PactCommand, IPactModules, Pact, IPactCommand } from '@kadena/client';

export class CommandBus extends ActionHandlerBus<CommandBus> implements IActionBus {
  constructor() {
    super(Metadata.COMMAND);
  }

  async execute<Request>(command: Command<Request>): Promise<void> {
    const commandId = this.getId(command);

    if (!commandId) {
      throw new Error(`Command is not registered`);
    }

    const commandHandler = this.handlers.get(commandId);
    if (!commandHandler) {
      throw new Error(`Command with ${commandId} not found in handlers`);
    }

    const { handler } = commandHandler;

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

    return handler.execute(command);
  }
}
