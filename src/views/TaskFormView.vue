<template>
  <div class="task-form">
    <h2>{{ isEditMode ? 'Task bearbeiten' : 'Neuen Task erstellen' }}</h2>
    <form @submit.prevent="onSubmit">
      <div>
        <label>Titel</label>
        <input v-model="form.title" required />
      </div>

      <div>
        <label>Beschreibung</label>
        <textarea v-model="form.description"></textarea>
      </div>

      <div>
        <label>Fälligkeitsdatum</label>
        <input type="date" v-model="form.dueDate" />
      </div>

      <div>
        <label>Kategorie</label>
        <input v-model="form.category" />
      </div>

      <div>
        <label>Priorität</label>
        <select v-model="form.priority">
          <option value="hoch">hoch</option>
          <option value="mittel">mittel</option>
          <option value="niedrig">niedrig</option>
        </select>
      </div>

      <div>
        <label>Status</label>
        <select v-model="form.status">
          <option value="geplant">geplant</option>
          <option value="bearbeitung">bearbeitung</option>
          <option value="prüfen">prüfen</option>
          <option value="fertig">fertig</option>
        </select>
      </div>

      <!-- Subtasks, Sachbearbeiter etc. bei Bedarf hier oder separat -->

      <button type="submit">Speichern</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/stores/index'

interface TaskFormData {
  title: string
  description: string
  dueDate: string | null
  category: string
  priority: string
  status: string
}

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const form = ref<TaskFormData>({
  title: '',
  description: '',
  dueDate: null,
  category: '',
  priority: 'mittel',
  status: 'geplant',
})

const isEditMode = computed(() => !!route.params.id)

onMounted(async () => {
  if (isEditMode.value) {
    await loadTask()
  }
})

async function loadTask() {
  try {
    const res = await axios.get(`http://localhost:3000/api/tasks/${route.params.id}`, {
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    const task = res.data
    form.value = {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate ? task.dueDate.substring(0, 10) : null, // YYYY-MM-DD
      category: task.category,
      priority: task.priority,
      status: task.status,
    }
  } catch (error) {
    console.error('Fehler beim Laden des Tasks:', error)
  }
}

async function onSubmit() {
  try {
    if (isEditMode.value) {
      // Update
      await axios.put(`http://localhost:3000/api/tasks/${route.params.id}`, form.value, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      })
    } else {
      // Create
      await axios.post(`http://localhost:3000/api/tasks`, form.value, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      })
    }
    router.push({ name: 'Board' })
  } catch (error) {
    console.error('Fehler beim Speichern des Tasks:', error)
  }
}
</script>
