import axios from 'axios';
import { TokenInfo } from '~/src/types/token';
import GetPlotPowerRateQuery from '~/src/api/queries/energetic/staking/get-plot-power-rate/get-plot-power-rate.query';

export const getAssetUrl = (tokenId: string) => `http://localhost:3001/assets/${tokenId.replace('t:', '')}`;

export const getIpfsUrl = (hash: string) => `https://gateway.pinata.cloud/ipfs/${hash.replace('ipfs://', '')}`;

export const getTokenData = async (tokenInfo: TokenInfo) => {
  const { data } = await axios.get(getIpfsUrl(tokenInfo.uri));

  if (!data) {
    return;
  }

  return data;
};

export const addTokenMetadata = (tokens: TokenInfo[]) => {
  return tokens.map(async (token: TokenInfo) => {
    const metadata = await getTokenData(token);

    if (metadata.collection.family === 'Land') {
      const { $queryBus } = useNuxtApp();
      const powerRate = await $queryBus.execute(
        new GetPlotPowerRateQuery({
          data: {
            plotId: token.id,
          },
        }),
      );
      return {
        ...token,
        metadata,
        powerRate: powerRate || 0,
      };
    }

    return {
      ...token,
      metadata,
    };
  });
};
