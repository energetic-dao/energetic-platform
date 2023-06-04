<template>
  <div class="h-screen w-screen bg-primary relative flex overflow-hidden">
    <nuxt-layout />
  </div>
  <div id="modal-container"></div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { ProviderType, useWallet } from '@/src/stores/wallet.store';
import { useLocalStorage, RemovableRef } from '@vueuse/core';

const walletStore = useWallet();
const providerType: RemovableRef<ProviderType | null> = useLocalStorage('provider-type', null);

onBeforeMount(async () => {
  if (!providerType.value) {
    return;
  }
  await walletStore.setProvider(providerType.value);
  await walletStore.connect();
});
</script>

<style>
nav {
  @apply text-white;
}
</style>
