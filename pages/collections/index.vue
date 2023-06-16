<template>
  <h1 class="text-3xl font-bold mb-2">Collections</h1>
  <div class="flex flex-row">
    <form class="mx-2 flex-grow">
      <label for="search" class="sr-only">Search</label>
      <div class="relative w-full">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          id="search"
          class="bg-primary-500 text-white text-sm rounded-lg block w-full pl-10 p-2.5"
          placeholder="Search"
          autocomplete="off"
          required
        />
      </div>
    </form>
  </div>
  <div class="flex flex-row flex-wrap gap-2 mt-2 items-center justify-center md:justify-start overflow-y-auto">
    <collection-card v-for="(collection, index) of config.collections" :key="index" :collection-id="collection" />
  </div>
</template>

<script setup lang="ts">
import CollectionCard from '@/src/components/collection/collection-card.vue';

const { public: config } = useRuntimeConfig();
</script>

<style scoped></style>
