<template>
  <aside id="sidebar" :class="{ 'w-16': collapsed, 'w-64': !collapsed }" class="hidden lg:flex" aria-label="Sidebar">
    <div class="flex flex-grow flex-col bg-primary-500">
      <div class="flex flex-grow flex-col pt-5 pb-4 overflow-y-auto">
        <div class="flex-grow px-3 bg-primary divide-y space-y-1">
          <ul class="space-y-2 pb-2">
            <li>
              <nuxt-link
                to="/"
                class="text-base text-white font-normal rounded-lg flex items-center p-2 bg-link hover:bg-hover"
                active-class="bg-hover text-white"
              >
                <svg class="w-6 h-6 text-white group-hover:text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span :class="{ hidden: collapsed }" class="ml-3">Dashboard</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                to="/treasury"
                class="text-base text-white font-normal rounded-lg flex items-center p-2 bg-link hover:bg-hover"
                active-class="bg-hover text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                  />
                </svg>
                <span :class="{ hidden: collapsed }" class="ml-3">Treasury</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                to="/collections"
                class="text-base text-white font-normal rounded-lg flex items-center p-2 bg-link hover:bg-hover"
                active-class="bg-hover text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
                />
              </svg>
              <span :class="{ hidden: collapsed }" class="ml-3">Account</span>
            </nuxt-link>
            <nuxt-link
              to="/settings"
              class="text-base text-white font-normal rounded-lg flex items-center p-2 bg-link hover:bg-hover"
              active-class="bg-hover text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span :class="{ hidden: collapsed }" class="ml-3">Settings</span>
            </nuxt-link>
          </div>
        </div>
        <div class="flex pt-3 px-3 bg-primary divide-y space-y-1">
          <button @click="collapsed = !collapsed" class="flex-grow text-base text-white font-normal rounded-lg flex items-center p-2 bg-link hover:bg-hover">
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
