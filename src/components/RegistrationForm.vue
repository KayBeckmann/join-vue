<template>
  <form @submit.prevent="handleRegistration" class="registration-form">
    <div>
      <label for="reg-email">Email</label>
      <input v-model="regEmail" type="email" id="reg-email" required />
    </div>
    <div>
      <label for="reg-password">Passwort</label>
      <input v-model="regPassword" type="password" id="reg-password" required />
    </div>
    <div>
        <label for="reg-password-confirm">Passwort wiederholen</label>
        <input v-model="regPasswordConfirm" type="password" id="reg-password-confirm" required />
      </div>
    <button type="submit">Registrieren</button>
    <p v-if="regErrorMessage" class="error">{{ regErrorMessage }}</p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const regEmail = ref('');
const regPassword = ref('');
const regPasswordConfirm = ref('')
const regErrorMessage = ref('');
const authStore = useAuthStore();

async function handleRegistration() {
  try {
    if (regPassword.value === regPasswordConfirm.value) {
        await authStore.register(regEmail.value, regPassword.value);
        regErrorMessage.value = "Registrierung war erfolgreich";
    } else {
        regErrorMessage.value = "Passwörter stimmen nicht überein.";
    }
  } catch (error) {
    regErrorMessage.value = 'Registrierung fehlgeschlagen.';
  }
}
</script>

<style scoped>
.registration-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
  padding: 2rem;
}
</style>
