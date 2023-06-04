import { Client } from '~/src/api/client';
import { CommandBus } from '@/src/infrastructure/cqrs/commands';
import { ActionHandlerBus, Metadata, Type } from '~/src/infrastructure/cqrs/action-handlers';

const modules: Record<string, { default: Component }> = import.meta.glob(['../**/*.handler.ts'], {
  eager: true,
});

export default defineNuxtPlugin((NuxtApp) => {
  const { public: config } = useRuntimeConfig();

  const commandBus: CommandBus = new CommandBus();

  console.log(modules);

  for (const path in modules) {
    const ActionHandler = <Type<ActionHandlerBus>>modules[path].default;
    const actionHandler = new ActionHandler();

    console.log(actionHandler.type);

    switch (actionHandler.type) {
      case Metadata.COMMAND:
        commandBus.register(<CommandBus>actionHandler);
        break;
      case Metadata.QUERY:
        break;
      case Metadata.EVENT:
        break;
    }
  }

  return {
    provide: {
      commandBus,
      queryBus: null,
    },
  };
});
