<template>
  <aside id="sidebar" :class="{ 'w-16': collapsed, 'w-64': !collapsed }" class="hidden lg:flex" aria-label="Sidebar">
    <div class="flex flex-grow flex-col bg-primary-500">
      <div class="flex flex-grow flex-col pt-5 pb-4 overflow-y-auto">
        <div class="flex-grow px-3 bg-primary divide-y space-y-1">
          <ul class="space-y-2 pb-2">
            <li>
              <nuxt-link
                to="/collections"
                class="text-base text-white font-normal rounded-lg flex items-center p-2 bg-link hover:bg-hover"
                active-class="bg-hover text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 text-white"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
                <span :class="{ hidden: collapsed }" class="ml-3">Collections</span>
              </nuxt-link>
            </li>
          </ul>
          <div class="space-y-2 pt-2">
            <nuxt-link
              to="/account"
              class="text-base text-white font-normal rounded-lg flex items-center p-2 bg-link hover:bg-hover"
              active-class="bg-hover text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
                />
              </svg>
              <span :class="{ hidden: collapsed }" class="ml-3">Account</span>
            </nuxt-link>
            <nuxt-link
              to="/dashboard"
              class="text-base text-white font-normal rounded-lg flex items-center p-2 bg-link hover:bg-hover"
              active-class="bg-hover text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                />
              </svg>
              <span :class="{ hidden: collapsed }" class="ml-3">Dashboard</span>
            </nuxt-link>
          </div>
        </div>
        <div class="flex pt-3 px-3 bg-primary divide-y space-y-1">
          <button
            @click="collapsed = !collapsed"
            class="flex-grow text-base text-white font-normal rounded-lg flex items-center p-2 bg-link hover:bg-hover"
          >
            <svg
              v-if="collapsed"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-white"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
            </svg>
            <svg
              v-if="!collapsed"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-white"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
            </svg>

            <span :class="{ hidden: collapsed }" class="ml-3">Slide {{ collapsed ? 'out' : 'in' }}</span>
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';

// @todo
const collapsed = useLocalStorage('sidebar-collapsed', true);
</script>

<style scoped></style>
