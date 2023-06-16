import { CommandBus } from '@/src/infrastructure/cqrs/commands';
import { QueryBus } from '@/src/infrastructure/cqrs/queries';
import { ActionHandlerBus, Metadata, Type } from '@/src/infrastructure/cqrs/action-handlers';

const modules: Record<string, { default: Component }> = import.meta.glob(['../**/*.handler.ts'], {
  eager: true,
});

export default defineNuxtPlugin((NuxtApp) => {
  const { public: config } = useRuntimeConfig();

  const commandBus: CommandBus = new CommandBus();
  const queryBus: QueryBus = new QueryBus();

  for (const path in modules) {
    const ActionHandler = <Type<ActionHandlerBus>>modules[path].default;
    const actionHandler = new ActionHandler();

    switch (actionHandler.type) {
      case Metadata.COMMAND:
        commandBus.register(<CommandBus>actionHandler);
        break;
      case Metadata.QUERY:
        queryBus.register(<QueryBus>actionHandler);
        break;
      case Metadata.EVENT:
        break;
    }
  }

  return {
    provide: {
      commandBus,
      queryBus,
    },
  };
});
