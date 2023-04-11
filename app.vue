<template>
  <div class="h-screen w-screen bg-primary relative flex overflow-hidden">
    <nuxt-layout />
  </div>
  <div id="modal-container"></div>
</template>

<script setup>
import WalletConnectModal from '~/src/components/modals/walletConnectModal.vue';
</script>

<style>
nav {
  @apply text-white;
}
</style>
