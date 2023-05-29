<template>
  <h1 class="text-3xl font-bold mb-2">Collections</h1>
  <div class="flex flex-row">
    <button>Filters</button>
    <form class="mx-2 flex-grow">
      <label for="search" class="sr-only">Search</label>
      <div class="relative w-full">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
    <button>dropdown</button>
  </div>
  <div class="flex flex-row flex-wrap gap-2 mt-2 items-center justify-center md:justify-start overflow-y-auto">
    <div v-for="i of 25" @click.prevent="$router.push(`/collections/${i}`)" class="flex flex-col cursor-pointer">
      <img class="rounded h-64 w64" src="https://image-optimizer.jpgstoreapis.com/QmTd1MGtLmRRBQERQduDFFZ5B9yjwzZDkvW4C4CUnh5LXd?width=600" />
      <div class="p-2 bg-primary-300 rounded-b">
        <h2 class="text-2xl">Energetic Collection #{{ i }}</h2>
        <div class="flex flex-col">
          <span class="text-sm">Description</span>
          <span class="text-sm">Floor price: <span class="font-bold">100 KDA</span> </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
