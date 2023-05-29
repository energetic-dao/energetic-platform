<template>
  <div class="flex flex-row flex-wrap gap-2 justify-center lg:justify-between pb-4">
    <div class="max-w-sm p-6 bg-primary-500 border border-primary-300 rounded-lg shadow w-full">
      <h5 class="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">Total Power Rate</h5>
      <div class="flex flex-row gap-1 items-center pt-2">
        <p class="text-3xl font-bold">100.00</p>
        <span>kWh</span>
      </div>
      <p class="font-normal text-gray-700 dark:text-gray-400">Last 24h</p>
    </div>
    <div class="max-w-sm p-6 bg-primary-500 border border-primary-300 rounded-lg shadow w-full">
      <h5 class="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">Power Rate per NFT</h5>
      <div class="flex flex-row gap-1 items-center pt-2">
        <p class="text-3xl font-bold">10.00</p>
        <span>kWh</span>
      </div>
      <p class="font-normal text-gray-700 dark:text-gray-400">Last 24h</p>
    </div>
    <div class="max-w-sm p-6 bg-primary-500 border border-primary-300 rounded-lg shadow w-full">
      <h5 class="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">Overview</h5>
      <p>Total generators:</p>
      <div class="flex flex-row gap-1 items-center pt-2">
        <p class="text-3xl font-bold">20</p>
      </div>
      <p>Total Active Generators:</p>
      <div class="flex flex-row gap-1 items-center pt-2">
        <p class="text-3xl font-bold">10</p>
      </div>
    </div>
    <div class="max-w-sm p-6 bg-primary-500 border border-primary-300 rounded-lg shadow w-full">
      <h5 class="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">Claim Rewards</h5>
      <div class="flex flex-row gap-3 items-center pt-2">
        <p class="text-3xl font-bold">$ 200.00</p>
        <button
          type="button"
          class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Claim Rewards
        </button>
      </div>
    </div>
  </div>
  <div class="flex flex-col break-words bg-primary-300 border-0 shadow-xl rounded-2xl bg-clip-border">
    <div class="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-4 pb-0">
      <h6 class="mb-0 font-bold text-2xl dark:text-white">Average Power Rate</h6>
    </div>
    <div class="flex-auto p-4 mt-6">
      <client-only>
        <apexchart width="500" type="line" :options="options2" :series="series"></apexchart>
      </client-only>
    </div>
  </div>
</template>

<script setup lang="ts">
const options2 = {
  chart: {
    id: 'vuechart-example',
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
};

const series = [
  {
    name: 'series-1',
    data: [30, 40, 45, 50, 49, 60, 70, 91],
  },
];
</script>

<style scoped></style>
