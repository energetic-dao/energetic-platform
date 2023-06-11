<template>
  <div class="h-screen w-screen bg-primary relative flex overflow-hidden">
    <nuxt-layout />
  </div>
  <div id="modal-container"></div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { ProviderType, useWallet } from '~/src/stores/wallet.store';
import { useLocalStorage, RemovableRef } from '@vueuse/core';
import GetCollectionQuery from '~/src/api/queries/marmalade/collection/get/get-collection.query';
import GetBalanceQuery from '~/src/api/queries/marmalade/token/get/get-balance.query';
import LockPlotCommand from '~/src/api/commands/energetic/staking/plot/locking/lock-plot.command';

const walletStore = useWallet();
const providerType: RemovableRef<ProviderType | null> = useLocalStorage('provider-type', null);

onBeforeMount(async () => {
  if (!providerType.value) {
    return;
  }
  await walletStore.setProvider(providerType.value);
  await walletStore.connect();
});

const { $queryBus, $commandBus } = useNuxtApp();
onMounted(() => {
  // setTimeout(() => {
  //   $commandBus.execute(
  //     new TransferCommand({
  //       data: {
  //         account: 'k:554754f48b16df24b552f6832dda090642ed9658559fef9f3ee1bb4637ea7c94',
  //       },
  //     }),
  //   );
  // }, 1000);

  setTimeout(() => {
    const { session } = toRefs(walletStore);

    $queryBus.execute(
      new GetCollectionQuery({
        data: {
          id: 'collection:DEulkJ-qDySv_BFKQvJEj315-x5JdnFObku8DXk4iKI',
        },
      }),
    );

    $queryBus.execute(
      new GetBalanceQuery({
        data: {
          id: 't:_DJWLzU_Gaw0PEboweeKv9lHGg5AcI_JELdby389IS4',
          account: ('k:' + session?.value?.account) as string,
        },
      }),
    );

    // $commandBus.execute(
    //   new LockPlotCommand({
    //     data: {
    //       plotId: 't:_DJWLzU_Gaw0PEboweeKv9lHGg5AcI_JELdby389IS4',
    //       account: 'k:00ea18feef966289dbd6b9b63ba6161c86fce643a9e684ad0d8e57f68bccd2dc',
    //       amount: {
    //         decimal: '1.0',
    //       },
    //       keyset: '00ea18feef966289dbd6b9b63ba6161c86fce643a9e684ad0d8e57f68bccd2dc',
    //     },
    //   }),
    // );
  }, 1000);
});
</script>

<style>
nav {
  @apply text-white;
}
</style>
