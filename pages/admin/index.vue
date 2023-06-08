<template>
  <div>
    <h1>Collection</h1>
    <form @submit="createCollection" class="flex flex-col gap-2">
      <label>
        Name:
        <input class="text-black" type="text" v-model="collectionForm.name" />
      </label>
      <label>
        Size:
        <input class="text-black" type="number" v-model="collectionForm.size.int" />
      </label>
      <label>
        Keyset:
        <input class="text-black" type="text" v-model="collectionForm.keyset" />
      </label>
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import CreateCollectionCommand, { CreateCollectionData } from '~/src/api/commands/marmalade/collection/create/create-collection.command';

const { $commandBus } = useNuxtApp();

const collectionForm = ref<CreateCollectionData>({
  name: '',
  size: {
    int: '0',
  },
  keyset: '',
});

const createCollection = async () => {
  await $commandBus.execute(
    new CreateCollectionCommand({
      data: collectionForm.value,
    }),
  );
};
</script>

<style scoped></style>
