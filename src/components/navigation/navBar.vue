<template>
  <nav class="bg-primary-500 w-full">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <button
            id="toggleSidebarMobile"
            aria-expanded="true"
            aria-controls="sidebar"
            class="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
          >
            <svg
              id="toggleSidebarMobileHamburger"
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg
              id="toggleSidebarMobileClose"
              class="w-6 h-6 hidden"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <a href="" class="text-xl font-bold flex items-center lg:ml-2.5">
            <!--            <img src="/images/logo.svg" class="h-6 mr-2" alt="Kinetic logo" />-->
            <h1 class="text-4xl">Kinetic DAO</h1>
          </a>
        </div>
        <div class="flex items-center truncate">
          <button
            @click="handleWalletProviderModal"
            class="hidden sm:flex flex-row text-white bg-link hover:bg-hover focus:none font-medium rounded-lg text-sm px-4 py-2.5 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 -ml-1 mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
              />
            </svg>
            <span>{{ isConnected ? getWalletAddress : 'Connect Wallet' }}</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
  <wallet-provider-modal v-model:show="showWalletProvider" />
</template>

<script setup lang="ts">
import WalletProviderModal from '~/src/components/modals/walletProviderModal.vue';
import { storeToRefs } from 'pinia';
import { Ref } from 'vue';
import { useWallet } from '~/src/stores/wallet.store';

const walletStore = useWallet();
const { getWalletAddress, isConnected, provider } = storeToRefs(walletStore);

const showWalletProvider: Ref<boolean> = ref<boolean>(false);

const handleWalletProviderModal = async () => {
  if (isConnected.value) {
    await walletStore.disconnect();
    return;
  }
  showWalletProvider.value = true;
};
</script>

<style scoped></style>
