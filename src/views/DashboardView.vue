<template>
  <div class="dashboard">
    <h2>Dashboard</h2>
    <div class="stats">
      <p>Gesamtanzahl Tasks: {{ dashboardData?.totalTasks }}</p>
      <p>Tasks mit hoher Priorität: {{ dashboardData?.highPriorityCount }}</p>
      <p>Nächstes Fälligkeitsdatum: {{ dashboardData?.nextDueDate }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

interface DashboardData {
  totalTasks: number
  highPriorityCount: number
  nextDueDate: string | null
}

const dashboardData = ref<DashboardData | null>(null)

onMounted(async () => {
  const authStore = useAuthStore()
  try {
    const response = await axios.get('http://localhost:5000/api/dashboard', {
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    dashboardData.value = response.data
  } catch (error) {
    console.error('Fehler beim Laden der Dashboard-Daten', error)
  }
})
</script>
