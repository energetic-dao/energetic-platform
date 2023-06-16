<template>
  <nav class="flex flex-row flex-nowrap bg-primary-300 rounded p-4 items-center">
    <div>
      Total Power Rate: <span v-if="!isLoading" class="font-bold">{{ powerRate }}</span
      ><span v-else>0.00</span> <span>kWh</span>
    </div>
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
    <div class="w-2/12 overflow-y-auto flex grow">
      <div class="flex flex-col gap-2 w-full">
        <div class="flex-grow flex flex-col justify-center items-center">
          <iframe
            v-if="!!selectedPlotId"
            width="640"
            height="480"
            class="flex rounded"
            :src="`http://localhost:3001/viewer/${selectedPlotId.replace('t:', '')}`"
          />
          <p v-else>Select a plot</p>
        </div>
        <div class="flex flex-grow flex-col gap-2" :class="{ 'items-center': stakedPlots.length <= 0 }">
          <div class="flex-grow h-full" v-if="stakedPlots.length <= 0">No Plots staked</div>
          <div v-else v-for="(token, index) of stakedPlots" :key="index" class="flex flex-col mx-4" @click="selectedPlotId = token.id">
            <div
              class="p-2 rounded"
              :class="{ 'bg-primary-100': selectedPlotId === token.id, 'bg-primary-300': selectedPlotId !== token.id }"
            >
              <div class="pb-4">
                <div class="py-2">
                  <h3 class="text-sm text-gray-300">{{ token.metadata.collection.name }}</h3>
                  <h2 class="text-xl">{{ token.metadata.name }}</h2>
                </div>
                <div class="flex flex-col text-gray-300">
                  <p class="text-sm">Type: <span class="font-bold">Plot</span></p>
                  <p class="text-sm">
                    Power Rate: <span class="font-bold">{{ token.powerRate.toFixed(2) }} kWh</span>
                  </p>
                </div>
              </div>

              <button @click.prevent="unstakePlot(token.id)" class="bg-primary-400 flex w-full p-2 rounded hover:bg-primary-200 px-4">
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
      <template v-if="selectedTab === Tab.LOCKED">
        <div class="flex flex-row flex-wrap gap-2 items-center justify-center overflow-y-auto h-1/2">
          <div class="flex-grow flex justify-center items-center" v-if="stakedPlotItems.length <= 0">No plot selected</div>
          <div v-for="(token, index) of stakedPlotItems" :key="index" class="flex flex-col">
            <img class="rounded h-64 w-full" :src="getIpfsUrl(token.metadata.image)" />
            <div class="p-2 bg-primary-300 rounded">
              <div class="pb-4">
                <div class="py-2">
                  <h3 class="text-sm text-gray-300">{{ token.metadata.collection.name }}</h3>
                  <h2 class="text-xl">{{ token.metadata.name }}</h2>
                </div>
                <div class="flex flex-col text-gray-300">
                  <p class="text-sm">
                    Type: <span class="font-bold">{{ token.metadata.collection.family }}</span>
                  </p>
                  <p class="text-sm">Power Rate: <span class="font-bold">- kWh</span></p>
                  <p class="text-sm">
                    Balance: <span class="font-bold">{{ token.amount }}</span>
                  </p>
                </div>
              </div>
              <button @click="unstakeItem(token.id)" class="bg-primary-400 flex w-full p-2 rounded hover:bg-primary-200 px-4">
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
                <span class="flex-grow">Deactivate</span>
              </button>
            </div>
          </div>
        </div>
      </template>
      <template v-if="selectedTab === Tab.INVENTORY">
        <div class="flex flex-row flex-wrap gap-2 items-center justify-center overflow-y-auto h-1/2">
          <div v-for="(token, index) of plots" :key="index" class="flex flex-col">
            <iframe class="rounded h-64 w-full" :src="getAssetUrl(token.id)" />
            <div class="p-2 bg-primary-300 rounded">
              <div class="pb-4">
                <div class="py-2">
                  <h3 class="text-sm text-gray-300">{{ token.metadata.collection.name }}</h3>
                  <h2 class="text-xl">{{ token.metadata.name }}</h2>
                </div>
                <div class="flex flex-col text-gray-300">
                  <p class="text-sm">
                    Type: <span class="font-bold">{{ token.metadata.collection.family }}</span>
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
          <div v-for="(token, index) of plotItems" :key="index" class="flex flex-col">
            <img class="rounded h-64 w-full" :src="getIpfsUrl(token.metadata.image)" />
            <div class="p-2 bg-primary-300 rounded">
              <div class="pb-4">
                <div class="py-2">
                  <h3 class="text-sm text-gray-300">{{ token.metadata.collection.name }}</h3>
                  <h2 class="text-xl">{{ token.metadata.name }}</h2>
                </div>
                <div class="flex flex-col text-gray-300">
                  <p class="text-sm">
                    Type: <span class="font-bold">{{ token.metadata.collection.family }}</span>
                  </p>
                  <p class="text-sm">Power Rate: <span class="font-bold">- kWh</span></p>
                  <p class="text-sm">
                    Balance: <span class="font-bold">{{ token.balance }}</span>
                  </p>
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
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWallet } from '@/src/stores/wallet.store';
import { IPactDecimal } from '@kadena/types';

import GetStakedPlotsQuery from '@/src/api/queries/energetic/staking/get-staked-plots/get-staked-plots.query';
import LockPlotCommand from '@/src/api/commands/energetic/staking/plot/locking/lock-plot.command';
import UnlockPlotCommand from '@/src/api/commands/energetic/staking/plot/unlocking/unlock-plot.command';
import GetPlotEscrowQuery from '@/src/api/queries/energetic/escrow/get-plot-escrow/get-plot-escrow.query';
import UpgradePlotCommand from '@/src/api/commands/energetic/staking/plot/upgrade-plot/upgrade-plot.command';
import GetCollectionTokensForAccountQuery from '@/src/api/queries/energetic/policies/enumerable-collection/get-collection-tokens-for-account/get-collection-tokens-for-account.query';

import { addTokenMetadata, getAssetUrl, getIpfsUrl } from '@/src/utils';
import { Token, TokenInfo } from '~/src/types/token';
import GetStakedPlotItemsQuery from '~/src/api/queries/energetic/staking/get-staked-plot-items/get-staked-plot-items.query';
import UnlockPlotItemCommand from '~/src/api/commands/energetic/staking/plot/unlock-plot-item/unlock-plot-item.command';

enum Tab {
  LOCKED = 'locked',
  INVENTORY = 'inventory',
}

const isLoading = ref<boolean>(true);

const walletStore = useWallet();
const { getSession } = toRefs(walletStore);

const { $queryBus, $commandBus } = useNuxtApp();

const selectedTab = ref<Tab>(Tab.LOCKED);

const stakedPlots = ref<Token[]>([]);

const plots = ref<Token[]>([]);
const plotItems = ref<Token[]>([]);
const stakedPlotItems = ref<Token[]>([]);

const totalPowerRate = ref<number>(0);
const selectedPlotId = ref<string | null>(null);

const powerRate = computed(() => totalPowerRate.value.toFixed(2));

onBeforeMount(async () => {
  await setStakedPlots();
  await refreshTokens(selectedTab.value);
  isLoading.value = false;
});

watch(selectedTab, async (tab) => {
  await refreshTokens(tab);
});

watch(selectedPlotId, async (plotId) => {
  if (plotId === null) {
    return;
  }
  await refreshTokens(selectedTab.value);
});

const refreshTokens = async (tab: Tab) => {
  const account = `k:${getSession?.value?.account}`;

  if (tab === Tab.LOCKED) {
    if (selectedPlotId.value === null) {
      return;
    }

    const items: TokenInfo[] = await $queryBus.execute(
      new GetStakedPlotItemsQuery({
        data: {
          plotId: selectedPlotId.value,
        },
      }),
    );
    stakedPlotItems.value = await Promise.all(addTokenMetadata(items));
  } else if (tab === Tab.INVENTORY) {
    const plotTokens: TokenInfo[] = await $queryBus.execute(
      new GetCollectionTokensForAccountQuery({
        data: {
          collectionId: 'collection:DEulkJ-qDySv_BFKQvJEj315-x5JdnFObku8DXk4iKI',
          account,
        },
      }),
    );
    const plotItemTokens: TokenInfo[] = await $queryBus.execute(
      new GetCollectionTokensForAccountQuery({
        data: {
          collectionId: 'collection:XHWZVc77jHiIcSXZoM9bSNSCM9dtBdh1TcHTgqiO86s',
          account,
        },
      }),
    );

    plots.value = await Promise.all(addTokenMetadata(plotTokens));
    plotItems.value = await Promise.all(addTokenMetadata(plotItemTokens));
    return;
  }
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

  stakedPlots.value = await Promise.all(addTokenMetadata(plots));
  totalPowerRate.value = stakedPlots.value.reduce((acc: number, { powerRate }) => acc + powerRate, 0);
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

const unstakePlot = async (tokenId: string, amount: IPactDecimal = { decimal: '1.0' }) => {
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

const unstakeItem = async (tokenId: string, amount: IPactDecimal = { decimal: '1.0' }) => {
  if (!selectedPlotId.value) {
    throw new Error('No plot selected');
  }

  await $commandBus.execute(
    new UnlockPlotItemCommand({
      data: {
        tokenId,
        plotId: selectedPlotId.value,
        amount,
        account: `k:${getSession?.value?.account}`,
      },
    }),
  );
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
