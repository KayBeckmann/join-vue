<template>
  <div class="auth-view">
    <div class="logo-column">
      <Logo v-if="showLogo" />
    </div>
    <div class="form-column">
      <Transition name="slide-form">
        <LoginForm v-if="showLogin" />
        <RegistrationForm v-else />
      </Transition>
      <button @click="toggleForm" class="toggle-button">
        {{ showLogin ? 'Registrieren' : 'Login' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import Logo from '@/components/Logo.vue';
import LoginForm from '@/components/LoginForm.vue';
import RegistrationForm from '@/components/RegistrationForm.vue';

const showLogo = ref(true);
const showLogin = ref(true);

onMounted(async () => {
  await nextTick()
  showLogo.value = false;
});

function toggleForm() {
  showLogin.value = !showLogin.value;
}
</script>

<style scoped>
.auth-view {
  display: flex;
  width: 100%;
  height: 100vh;
}

.logo-column {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-column {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.slide-form-enter-active,
.slide-form-leave-active {
  transition: transform 0.5s ease;
}

.slide-form-enter-from {
  transform: translateX(100%);
}

.slide-form-leave-to {
  transform: translateX(-100%);
}
</style>
