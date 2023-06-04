import 'reflect-metadata';

import { v4 } from 'uuid';
import { Metadata, Type } from '@/src/infrastructure/cqrs/action-handlers';
import { Command } from '@/src/infrastructure/cqrs/commands';

import { IPactModules } from '@kadena/client';

type PactFunction<T extends keyof IPactModules> = keyof IPactModules[T];

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
    console.log({ action: command }, target);
    Reflect.defineMetadata(Metadata.COMMAND_HANDLER, { action: command }, target);
  };
};
