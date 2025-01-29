
<template>
  <form @submit.prevent="handleLogin" class="login-form">
    <div>
      <label for="email">Email</label>
      <input v-model="email" type="email" id="email" required />
    </div>
    <div>
      <label for="password">Passwort</label>
      <input v-model="password" type="password" id="password" required />
    </div>
    <button type="submit">Login</button>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();
const authStore = useAuthStore();

async function handleLogin() {
  try {
    await authStore.login(email.value, password.value);
    router.push({ name: 'Dashboard' });
  } catch (error) {
    errorMessage.value = 'Login fehlgeschlagen.';
  }
}
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
  padding: 2rem;
}
</style>
