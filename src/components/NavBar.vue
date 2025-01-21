<template>
  <nav class="navbar">
    <RouterLink to="/dashboard">Dashboard</RouterLink>
    <RouterLink to="/board">Board</RouterLink>
    <RouterLink to="/task/new">Neuer Task</RouterLink>
    <p>
      Noch keinen Account?
      <RouterLink to="/register">Jetzt registrieren</RouterLink>
    </p>

    <button @click="logout">Logout</button>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/index'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

function logout() {
  authStore.clearToken()
  // Zur Login-Seite
  router.push({ name: 'Login' })
}
</script>

<style scoped>
.navbar {
  display: flex;
  gap: 1rem;
  /* Desktop: seitliche Position => ggf. flex-direction: column; width: 200px; position: fixed;  */
  /* Mobile: unten => position: fixed; bottom: 0; width: 100%;  */
}
</style>
