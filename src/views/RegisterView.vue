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
import { useRouter } from 'vue-router'
import axios from 'axios'

const username = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

async function handleRegister() {
  try {
    await axios.post('http://localhost:3000/api/auth/register', {
      username: username.value,
      email: email.value,
      password: password.value,
    })
    // Nach Erfolg zum Login weiterleiten
    router.push({ name: 'Login' })
  } catch (error: any) {
    errorMessage.value = error?.response?.data?.message || 'Registrierung fehlgeschlagen.'
  }
}
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 50px auto;
}
.error {
  color: red;
}
</style>
