<template>
  {{ wallet }}
</template>

<script setup lang="ts">
import { useWallet } from '~/src/stores/wallet.store';
import { storeToRefs } from 'pinia';

const walletStore = useWallet();
const { wallet } = storeToRefs(walletStore);
</script>

<style scoped></style>
