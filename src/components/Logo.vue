<template>
  <div class="logo-container">
    <img :src="logoSrc" alt="Logo" class="logo" />
    <h1>LOGO</h1>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';

const logoSrc = ref('/logo.svg'); // Pfad zu deinem Logo

onMounted(async () => {
  // Hier den Effekt zum Verkleinern des Logos einfügen
    await nextTick();
    document.querySelector('.logo')?.classList.add('logo-small')
});
</script>

<style scoped>
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh; /* Initial im Vollbild */
  background-color: #f0f0f0; /* Beispielhintergrund */
}

.logo {
  max-width: 80vw; /* maximale Breite auf Vollbild */
  max-height: 80vh;
  transition: all 0.5s ease;
}
.logo-small {
  max-width: 150px;
  max-height: 150px;
}
</style>
