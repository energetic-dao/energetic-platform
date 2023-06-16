import 'reflect-metadata';

import { v4 } from 'uuid';
import { Metadata, Type } from '@/src/infrastructure/cqrs/action-handlers';
import { Command } from '@/src/infrastructure/cqrs/commands';

export const CommandHandler = <T extends Command>(command: Type<T>): ClassDecorator => {
  return (target: object) => {
    if (!Reflect.hasMetadata(Metadata.COMMAND, command)) {
      Reflect.defineMetadata(
        Metadata.COMMAND,
        {
          id: v4(),
        },
        command,
      );
    }
    Reflect.defineMetadata(Metadata.COMMAND_HANDLER, { action: command }, target);
  };
};
