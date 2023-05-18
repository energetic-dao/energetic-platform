<template>
  {{ getSession }}
</template>

<script setup lang="ts">
import { useWallet } from '~/src/stores/wallet.store';
import { storeToRefs } from 'pinia';

const walletStore = useWallet();
const { isConnected, getSession } = storeToRefs(walletStore);

onMounted(async () => {
  walletStore.setProvider('wallet-connect');
  await walletStore.connect();
});
</script>

<style scoped></style>
