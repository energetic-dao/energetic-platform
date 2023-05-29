<template>
  <iframe :src="tokenUri" class="h-full w-full"></iframe>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';

const { public: config } = useRuntimeConfig();

const tokenUri = computed(() => {
  return `${config.NFT_VIEWER_URL}?token-id=`;
});
</script>

<style scoped></style>
