import { Command } from '~/src/infrastructure/cqrs/commands';
import { IActionRequest } from '~/src/infrastructure/cqrs/action-handlers';
import { IPactInt } from '@kadena/types';

export type ConcretePolicy = {
  'quote-policy': boolean;
  'non-fungible-policy': boolean;
  'royalty-policy': boolean;
  'collection-policy': boolean;
};

export type Policy = {
  'concrete-policies': ConcretePolicy;
  'immutable-policies': string[];
  'adjustable-policies': string[];
};

export type EnvData = {
  'collection-id': string;
  'cp-mint-guard': Guard;
  //'nfp-mint-guard': Guard;
  [key: string]: any;
};

export type Guard = {
  keys: string[];
  pred: string;
};

export type CreateTokenData = {
  id: string;
  collectionId: string;
  precision: IPactInt;
  uri: string;
  policies: Policy;
  envData?: EnvData;
};

export default class CreateTokenCommand extends Command<CreateTokenData> {
  constructor(public readonly actionRequest: IActionRequest<CreateTokenData>) {
    super(actionRequest);
  }
}
