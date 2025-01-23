<template>
  <div id="app">
    <NavBar v-if="$route.path !== '/login' && $route.path !== '/register'" />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>
