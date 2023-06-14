<template>
  <div class="flex flex-row items-center">
    <h1 class="text-4xl capitalize font-bold">{{ collection.name }}</h1>
    <div class="flex-grow flex justify-end gap-2">
      <a>1</a>
      <a>2</a>
      <a>3</a>
      <a>4</a>
    </div>
  </div>
  <div class="flex flex-row gap-2">
    <p>
      Items <span class="font-bold">{{ collection.size.int }} / {{ collection['max-size'].int }}</span>
    </p>
    <!--<p>
      Created
      <span class="font-bold">
        {{ new Date().toLocaleDateString() }}
      </span>
    </p>
    <p>Royalty <span class="font-bold">2.5%</span></p>-->
    <!--      <p>Chain <span class="font-bold">Kadena</span></p>-->
  </div>
  <div class="flex flex-col flex-grow overflow-hidden">
    <div class="flex flex-row flex-grow overflow-hidden">
      <!--<aside class="p-2 w-2/12 flex flex-col overflow-y-auto">
       <p class="font-bold">Attributes</p>
       <div v-for="i of 8" :key="i">
          <button @click="toggleDropdown(i)" type="button" class="flex items-center text-white py-2 text-base font-normal rounded-lg">
            <span class="text-left whitespace-nowrap">Attribute #{{ i }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          <ul :class="{ block: attributes.get(i), hidden: !attributes.get(i) }" class="flex flex-col mx-2">
            <li class="flex flex-row items-center" v-for="i of 5" :key="i">
              <label>
                <input type="checkbox" />
                <span class="ml-2">Checkbox {{ i }}</span>
              </label>
            </li>
          </ul>
        </div>
      </aside>-->
      <div class="flex flex-row flex-wrap gap-2 w-10/12 overflow-y-auto">
        <div
          v-for="(token, index) of collectionTokens"
          @click.prevent="$router.push(`/collections/${route.params.id}/tokens/${token.info.id.split(':')[1]}`)"
          class="flex flex-col h-20 cursor-pointer"
        >
          <img
            class="rounded w-48"
            src="https://image-optimizer.jpgstoreapis.com/QmTd1MGtLmRRBQERQduDFFZ5B9yjwzZDkvW4C4CUnh5LXd?width=600"
          />
          <div class="p-2 bg-primary-300 w-48 rounded-b">
            <h2 class="text-2xl">Energetic Collection #{{ index }}</h2>
            <div class="flex flex-col">
              <span class="text-sm">Description</span>
              <span class="text-sm">Floor price: <span class="font-bold">100 KDA</span> </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import GetCollectionTokensQuery from '~/src/api/queries/energetic/policies/enumerable-collection/get-collection-tokens/get-collection-tokens.query';
import GetCollectionQuery from '~/src/api/queries/marmalade/collection/get/get-collection.query';

enum CollectionType {
  fungible = 'fungible',
  nonFungible = 'nonFungible',
}

const { $queryBus } = useNuxtApp();

const route = useRoute();

const collection = ref<any>();
const collectionTokens = ref<any[]>([]);

const collectionType = ref<CollectionType>(CollectionType.nonFungible);
const attributes = ref<Map<number, boolean>>(new Map());

const toggleDropdown = (index: number) => {
  if (!attributes.value.has(index)) {
    attributes.value.set(index, true);
    return;
  }

  attributes.value.set(index, !attributes.value.get(index));
};

onBeforeMount(async () => {
  collection.value = await $queryBus.execute(
    new GetCollectionQuery({
      data: {
        id: `collection:${route.params.id as string}`,
      },
    }),
  );
  collectionTokens.value = await $queryBus.execute(
    new GetCollectionTokensQuery({
      data: {
        collectionId: `collection:${route.params.id as string}`,
      },
    }),
  );
});
</script>

<style scoped></style>
