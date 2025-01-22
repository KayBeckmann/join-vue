<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" required />
      </div>

      <div>
        <label for="password">Passwort</label>
        <input v-model="password" type="password" id="password" required />
      </div>

      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/index'
import { useRouter } from 'vue-router'
import axios from 'axios'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()
const authStore = useAuthStore()

async function handleLogin() {
  try {
    // Beispiel-Endpoint: http://localhost:3000/api/auth/login
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email: email.value,
      password: password.value,
    })

    const { token, userId, username } = response.data

    // Im Store speichern
    authStore.setToken(token)
    authStore.setUserData(userId, username)

    // Weiterleitung zum Dashboard
    router.push({ name: 'Dashboard' })
  } catch (error: any) {
    errorMessage.value = error?.response?.data?.message || 'Login fehlgeschlagen.'
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
}
.error {
  color: red;
}
</style>
