<template>
  <div class="h-screen w-screen bg-primary relative flex overflow-hidden">
    <nuxt-layout />
  </div>
  <div id="modal-container"></div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { ProviderType, useWallet } from '~/src/stores/wallet.store';

const walletStore = useWallet();

onBeforeMount(async () => {
  await walletStore.setProvider(ProviderType.WALLET_CONNECT);
  await walletStore.connect();
});
</script>

<style>
nav {
  @apply text-white;
}
</style>
