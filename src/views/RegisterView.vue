<template>
  <div class="register-container">
    <h2>Registrieren</h2>
    <form @submit.prevent="handleRegister">
      <div>
        <label for="username">Username:</label>
        <input v-model="username" type="text" id="username" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input v-model="email" type="email" id="email" required />
      </div>
      <div>
        <label for="password">Passwort:</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit">Account erstellen</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const username = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()
const authStore = useAuthStore()

async function handleRegister() {
  try {
    await authStore.register(username.value, email.value, password.value)
    router.push({ name: 'Login' })
  } catch (error) {
    errorMessage.value = 'Registrierung fehlgeschlagen.'
  }
}
</script>
