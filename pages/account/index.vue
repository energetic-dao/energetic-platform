<template>
  <nav class="flex flex-row flex-nowrap bg-primary-300 rounded p-4 items-center">
    <div>Total Power Rate: <span class="font-bold">0.00</span> <span>kWh</span></div>
    <div class="flex flex-row flex-grow justify-end gap-2">
      <button
        type="button"
        class="w-24 text-white bg-primary-100 hover:bg-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Turn On
      </button>
      <button
        type="button"
        class="w-24 text-white bg-primary-100 hover:bg-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Turn Off
      </button>
      <button
        type="button"
        class="w-24 text-white bg-primary-100 hover:bg-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Claim
      </button>
      <button
        type="button"
        class="w-24 text-white bg-primary-100 hover:bg-primary-200 font-medium rounded-lg text-sm px-5 text-center mr-2 mb-2"
      >
        Transfer
      </button>
    </div>
  </nav>
  <div class="flex flex-row overflow-hidden mt-2 h-full">
    <div class="w-3/12 overflow-y-auto flex items-center">
      <div class="flex flex-grow flex-col gap-2" :class="{ 'items-center': stakedPlots.length <= 0 }">
        <div class="flex-grow h-full" v-if="stakedPlots.length <= 0">No Plots staked</div>
        <div v-else v-for="(token, index) of stakedPlots" :key="index" class="flex flex-col mx-4" @click="selectedPlotId = token.id">
          <div
            class="p-2 rounded"
            :class="{ 'bg-primary-100': selectedPlotId === token.id, 'bg-primary-300': selectedPlotId !== token.id }"
          >
            <div class="pb-4">
              <div class="py-2">
                <h3 class="text-sm text-gray-300">{{ token.collection.name }}</h3>
                <h2 class="text-xl">{{ token.name }}</h2>
              </div>
              <div class="flex flex-col text-gray-300">
                <p class="text-sm">Type: <span class="font-bold">Plot</span></p>
                <p class="text-sm">Power Rate: <span class="font-bold">0 kWh</span></p>
              </div>
            </div>

            <button @click.prevent="unstakeItem(token.id)" class="bg-primary-400 flex w-full p-2 rounded hover:bg-primary-200 px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
              </svg>
              <span class="flex-grow">Unlock Plot</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col w-9/12 overflow-hidden">
      <ul class="flex flex-row text-center mb-2">
        <li
          @click="selectedTab = Tab.LOCKED"
          :class="{ 'bg-secondary': selectedTab === Tab.LOCKED }"
          class="bg-primary-300 cursor-pointer flex-grow rounded-l p-2"
        >
          Locked
        </li>
        <li
          @click="selectedTab = Tab.INVENTORY"
          :class="{ 'bg-secondary': selectedTab === Tab.INVENTORY }"
          class="cursor-pointer bg-primary-300 flex-grow rounded-r p-2"
        >
          Inventory
        </li>
      </ul>
      <div class="flex flex-row flex-wrap gap-2 items-center justify-center overflow-y-auto h-1/2">
        <div v-for="(token, index) of plots" :key="index" class="flex flex-col">
          <iframe class="rounded h-64 w-full" :src="getAssetUrl(token.id)" />
          <div class="p-2 bg-primary-300 rounded">
            <div class="pb-4">
              <div class="py-2">
                <h3 class="text-sm text-gray-300">{{ token.collection.name }}</h3>
                <h2 class="text-xl">{{ token.name }}</h2>
              </div>
              <div class="flex flex-col text-gray-300">
                <p class="text-sm">
                  Type: <span class="font-bold">{{ token.collection.family }}</span>
                </p>
              </div>
            </div>
            <button @click="stakePlot(token.id)" class="bg-primary-400 flex w-full p-2 rounded hover:bg-primary-200 px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
              </svg>
              <span class="flex-grow">Lock Plot</span>
            </button>
          </div>
        </div>
      </div>
      <div class="flex flex-row flex-wrap gap-2 items-center justify-center overflow-y-auto h-1/2">
        {{ plotItems }}
        <div v-for="(token, index) of plotItems" :key="index" class="flex flex-col">
          <img class="rounded h-64 w-full" :src="getIpfsUrl(token.image)" />
          <div class="p-2 bg-primary-300 rounded">
            <div class="pb-4">
              <div class="py-2">
                <h3 class="text-sm text-gray-300">{{ token.collection.name }}</h3>
                <h2 class="text-xl">{{ token.name }}</h2>
              </div>
              <div class="flex flex-col text-gray-300">
                <p class="text-sm">
                  Type: <span class="font-bold">{{ token.collection.family }}</span>
                </p>
                <p class="text-sm">Power Rate: <span class="font-bold">2 kWh</span></p>
              </div>
            </div>
            <button @click="stakePlotItem(token.id)" class="bg-primary-400 flex w-full p-2 rounded hover:bg-primary-200 px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
              </svg>
              <span class="flex-grow">Activate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GetAccountTokensQuery from '~/src/api/queries/energetic/policies/enumerable-collection/get-account-tokens/get-account-tokens.query';
import { useWallet } from '~/src/stores/wallet.store';
import { IPactInt, IPactDecimal } from '@kadena/types';
import axios from 'axios';
import GetStakedPlotsQuery from '~/src/api/queries/energetic/staking/get-staked-plots/get-staked-plots.query';
import LockPlotCommand from '~/src/api/commands/energetic/staking/plot/locking/lock-plot.command';
import UnlockPlotCommand from '~/src/api/commands/energetic/staking/plot/unlocking/unlock-plot.command';
import GetPlotEscrowQuery from '~/src/api/queries/energetic/escrow/get-plot-escrow/get-plot-escrow.query';
import { computed } from '@vue/reactivity';
import UpgradePlotCommand from '~/src/api/commands/energetic/staking/plot/upgrade-plot/upgrade-plot.command';

enum Tab {
  LOCKED = 'locked',
  INVENTORY = 'inventory',
}

type TokenInfo = {
  id: string;
  uri: string;
  supply: IPactDecimal;
  precision: IPactInt;
  // @todo policies
  [key: string]: string | IPactInt | IPactDecimal | boolean | object;
};

type Token = {
  balance: number;
  info: TokenInfo;
};

type TokenMetadata = {
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

const walletStore = useWallet();
const { getSession } = toRefs(walletStore);

const { $queryBus, $commandBus } = useNuxtApp();

const selectedTab = ref<Tab>(Tab.LOCKED);

const stakedPlots = ref<TokenMetadata[]>([]);
const tokens = ref<TokenMetadata[]>([]);

const selectedPlotId = ref<string | null>(null);

onBeforeMount(async () => {
  await setStakedPlots();
  await refreshTokens(selectedTab.value);
});

watch(selectedTab, async (tab) => {
  await refreshTokens(tab);
});

const plots = computed(() => {
  return tokens.value.filter((token) => token.collection.name.toLowerCase() === 'energetic plots');
});

const plotItems = computed(() => {
  return tokens.value.filter((token) => token.collection.name.toLowerCase() === 'energetic plot-items');
});

const refreshTokens = async (tab: Tab) => {
  let accountTokens: Token[] = [];

  const account = `k:${getSession?.value?.account}`;

  if (tab === Tab.LOCKED) {
    accountTokens = [];
  } else if (tab === Tab.INVENTORY) {
    accountTokens = await $queryBus.execute(
      new GetAccountTokensQuery({
        data: {
          account,
        },
      }),
    );
  }

  tokens.value = await Promise.all(
    accountTokens?.map(async (token: Token) => {
      const tokenData = await getTokenData(token.info);
      return {
        ...tokenData,
        id: token.info.id,
      };
    }),
  );
};

const setStakedPlots = async () => {
  const account = `k:${getSession?.value?.account}`;

  const plots = await $queryBus.execute(
    new GetStakedPlotsQuery({
      data: {
        account,
      },
    }),
  );

  stakedPlots.value = await Promise.all(
    plots?.map(async (token: TokenInfo) => {
      const tokenData = await getTokenData(token);
      return {
        ...tokenData,
        id: token.id,
      };
    }),
  );
};

const getTokenData = async (tokenInfo: TokenInfo) => {
  const { data } = await axios.get(getIpfsUrl(tokenInfo.uri));

  if (!data) {
    return;
  }

  return data;
};

const stakePlot = async (tokenId: string) => {
  const escrowAccount = await getPlotEscrow(tokenId);
  await $commandBus.execute(
    new LockPlotCommand({
      data: {
        plotId: tokenId,
        amount: { decimal: '1.0' },
        account: `k:${getSession?.value?.account}`,
        escrowAccount,
      },
    }),
  );
};

const stakePlotItem = async (tokenId: string, amount: IPactDecimal = { decimal: '1.0' }) => {
  if (!selectedPlotId.value) {
    throw new Error('No plot selected');
  }
  const escrowAccount = await getPlotEscrow(selectedPlotId.value);

  await $commandBus.execute(
    new UpgradePlotCommand({
      data: {
        plotId: selectedPlotId.value,
        itemId: tokenId,
        amount,
        account: `k:${getSession?.value?.account}`,
        escrowAccount,
      },
    }),
  );
};

const unstakeItem = async (tokenId: string, type: string = 'plot', amount: IPactDecimal = { decimal: '1.0' }) => {
  await $commandBus.execute(
    new UnlockPlotCommand({
      data: {
        plotId: tokenId,
        amount,
        account: `k:${getSession?.value?.account}`,
      },
    }),
  );
};

const getAssetUrl = (tokenId: string) => {
  return `http://localhost:3001/assets/${tokenId.replace('t:', '')}`;
};

const getIpfsUrl = (hash: string) => {
  return `https://gateway.pinata.cloud/ipfs/${hash.replace('ipfs://', '')}`;
};

const getPlotEscrow = async (plotId: string) => {
  return $queryBus.execute(
    new GetPlotEscrowQuery({
      data: {
        plotId,
      },
    }),
  );
};
</script>

<style scoped></style>
