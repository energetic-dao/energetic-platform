<template>
  <div v-if="!isLoading" class="flex flex-col cursor-pointer" @click="router.push(`collections/${collectionId}`)">
    <img class="rounded h-64 w64" :src="`/${collectionId}.png`" :alt="`${collectionData.name} logo`" />
    <div class="p-2 bg-primary-300 rounded-b h-24 w-64">
      <h2 class="text-2xl capitalize">{{ collectionData.name }}</h2>
      <div class="flex flex-col">
        <p class="text-sm">Current supply: {{ collectionData.size.int }}</p>
        <p v-show="collectionId === config.collections[0]" class="text-sm">Max supply: {{ collectionData['max-size'].int }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GetCollectionQuery from '@/src/api/queries/marmalade/collection/get/get-collection.query';

const { public: config } = useRuntimeConfig();
const { $queryBus } = useNuxtApp();

const router = useRouter();

const props = defineProps({
  collectionId: {
    type: String,
    required: true,
  },
});

const isLoading = ref(true);
const collectionData = ref();

onBeforeMount(async () => {
  collectionData.value = await $queryBus.execute(
    new GetCollectionQuery({
      data: {
        id: `collection:${props.collectionId}`,
      },
    }),
  );
  isLoading.value = false;
});
</script>

<style scoped></style>
