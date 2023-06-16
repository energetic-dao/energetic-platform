import { IPactInt, IPactDecimal } from '@kadena/types';

export type TokenInfo = {
  id: string;
  uri: string;
  supply: IPactDecimal;
  precision: IPactInt;
  // @todo policies
  [key: string]: string | IPactInt | IPactDecimal | boolean | object;
};

export type Token = TokenInfo & {
  metadata: TokenMetadata;
};

export type TokenMetadata = {
  id: string;
  name: string;
  description: string;
  image: string;
  external_url: string;
  properties: Record<string, string | number | boolean>;
  collection: {
    name: string;
    family: string;
  };
};
