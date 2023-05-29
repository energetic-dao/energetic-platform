<template>
  <div class="flex flex-col flex-grow">
    <nav-bar />
    <div class="flex flex-row flex-grow overflow-hidden">
      <sidebar />
      <main class="flex flex-col overflow-hidden w-full bg-primary-400 text-white p-2">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '~/src/components/navigation/sidebar.vue';
import NavBar from '~/src/components/navigation/navBar.vue';
</script>

<style scoped></style>
