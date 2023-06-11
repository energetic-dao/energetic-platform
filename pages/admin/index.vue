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

  <div>
    <h1>Create token for Collection</h1>
    <form @submit.prevent="createCollectionToken" class="flex flex-col gap-2">
      <label>
        Token id:
        <input class="text-black" type="text" v-model="tokenForm.id" />
      </label>
      <label>
        Collection id:
        <input class="text-black" type="text" v-model="tokenForm.collectionId" />
      </label>
      <label>
        Precision:
        <input class="text-black" type="number" step="0.1" v-model.number="tokenForm.precision.int" />
      </label>
      <label>
        URI:
        <input class="text-black" type="text" v-model="tokenForm.uri" />
      </label>
      <button type="submit">Create</button>
    </form>
  </div>

  <div>
    <h1>Mint token</h1>
    <form @submit.prevent="mintToken" class="flex flex-col gap-2">
      <label>
        Token id:
        <input class="text-black" type="text" v-model="mintForm.id" />
      </label>
      <label>
        Account:
        <input class="text-black" type="text" v-model="mintForm.account" />
      </label>
      <label>
        Keyset:
        <input class="text-black" type="text" v-model="mintForm.keyset" />
      </label>
      <label>
        Amount:
        <input class="text-black" type="text" v-model="mintForm.amount.decimal" />
      </label>
      <button type="submit">Mint</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import CreateCollectionCommand, { CreateCollectionData } from '~/src/api/commands/marmalade/collection/create/create-collection.command';
import CreateTokenCommand, { CreateTokenData } from '~/src/api/commands/marmalade/token/create/create-token.command';
import { useWallet } from '~/src/stores/wallet.store';
import MintTokenCommand, { MintTokenData } from '~/src/api/commands/marmalade/token/mint/mint-token.command';

const { $commandBus } = useNuxtApp();
const walletStore = useWallet();
const { getSession } = toRefs(walletStore);

const collectionForm = ref<CreateCollectionData>({
  name: '',
  size: {
    int: '0',
  },
  keyset: '',
});

const tokenForm = ref<CreateTokenData>({
  id: '',
  collectionId: '',
  precision: {
    int: '0',
  },
  uri: '',
  policies: {
    'concrete-policies': {
      'quote-policy': true,
      'non-fungible-policy': true,
      'royalty-policy': false,
      'collection-policy': true,
    },
    'immutable-policies': ['free.energetic-plot-policy'],
    'adjustable-policies': [],
  },
});

const mintForm = ref<MintTokenData>({
  id: '',
  account: '',
  keyset: '',
  amount: {
    decimal: '1.0',
  },
});

const createCollection = async () => {
  await $commandBus.execute(
    new CreateCollectionCommand({
      data: collectionForm.value,
    }),
  );
};

const mintToken = async () => {
  await $commandBus.execute(
    new MintTokenCommand({
      data: mintForm.value,
    }),
  );
};

const createCollectionToken = async () => {
  await $commandBus.execute(
    new CreateTokenCommand({
      data: {
        ...tokenForm.value,
        envData: {
          'collection-id': tokenForm.value.collectionId,
          'cp-mint-guard': {
            keys: getSession?.value?.account ? [getSession?.value?.account] : [],
            pred: 'keys-all',
          },
          'nfp-mint-guard': {
            keys: getSession?.value?.account ? [getSession?.value?.account] : [],
            pred: 'keys-all',
          },
          'energetic-admin': {
            keys: getSession?.value?.account ? [getSession?.value?.account] : [],
            pred: 'keys-all',
          },
          token: {
            index: '2',
          },
        },
      },
    }),
  );
};
</script>

<style scoped></style>
