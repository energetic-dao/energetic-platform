<template>
  <nav class="flex flex-row flex-nowrap bg-primary-300 rounded p-4 items-center">
    <div>Total Power Rate: <span class="font-bold">0.00</span> <span>kWh</span></div>
    <div class="flex flex-row flex-grow justify-end gap-2">
      <button
        type="button"
        class="w-24 text-white bg-primary-100 hover:bg-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Turn On
      </button>
      <button
        type="button"
        class="w-24 text-white bg-primary-100 hover:bg-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Turn Off
      </button>
      <button
        type="button"
        class="w-24 text-white bg-primary-100 hover:bg-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Claim
      </button>
      <button
        type="button"
        class="w-24 text-white bg-primary-100 hover:bg-primary-200 font-medium rounded-lg text-sm px-5 text-center mr-2 mb-2"
      >
        Transfer
      </button>
    </div>
  </nav>
  <div class="flex flex-row overflow-hidden mt-2">
    <div class="w-3/12 overflow-y-auto">
      <div class="flex flex-col">
        <div>plot #1</div>
        <div>plot #2</div>
        <div>plot #3</div>
      </div>
    </div>
    <div class="flex flex-col w-9/12 overflow-hidden">
      <ul class="flex flex-row text-center mb-2">
        <li
          @click="selectedTab = Tab.LOCKED"
          :class="{ 'bg-secondary': selectedTab === Tab.LOCKED }"
          class="bg-primary-300 cursor-pointer flex-grow rounded-l"
        >
          Locked
        </li>
        <li
          @click="selectedTab = Tab.INVENTORY"
          :class="{ 'bg-secondary': selectedTab === Tab.INVENTORY }"
          class="cursor-pointer bg-primary-300 flex-grow rounded-r"
        >
          Inventory
        </li>
      </ul>
      <div class="flex flex-row flex-wrap gap-2 items-center justify-center overflow-y-auto">
        <div v-for="i of 8" class="flex flex-col">
          <img class="rounded h-64 w64" src="/assets/solar-panel.jpg" alt="" />
          <div class="p-2 bg-primary-300 rounded">
            <div class="pb-4">
              <div class="py-2">
                <h3 class="text-sm text-gray-300">Developer Name</h3>
                <h2 class="text-xl">Energetic Collection #{{ i }}</h2>
              </div>
              <div class="flex flex-col text-gray-300">
                <p class="text-sm">Type: <span class="font-bold">Solar Panel</span></p>
                <p class="text-sm">Power Rate: <span class="font-bold">2 kWh</span></p>
              </div>
            </div>

            <button class="bg-primary-400 flex w-full p-2 rounded hover:bg-primary-200 px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
              </svg>
              <span class="flex-grow"> Turn On </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
enum Tab {
  LOCKED = 'locked',
  INVENTORY = 'inventory',
}

const selectedTab = ref(Tab.LOCKED);
</script>

<style scoped></style>
