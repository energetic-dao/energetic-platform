import 'reflect-metadata';

import { v4 } from 'uuid';
import { Metadata, Type } from '@/src/infrastructure/cqrs/action-handlers';
import { Query } from '@/src/infrastructure/cqrs/queries/classes';

export const QueryHandler = <T extends Query>(query: Type<T>): ClassDecorator => {
  return (target: object) => {
    if (!Reflect.hasMetadata(Metadata.QUERY, query)) {
      Reflect.defineMetadata(
        Metadata.QUERY,
        {
          id: v4(),
          middlewares: [],
        },
        query,
      );
    }
    Reflect.defineMetadata(Metadata.QUERY_HANDLER, { action: query }, target);
  };
};
