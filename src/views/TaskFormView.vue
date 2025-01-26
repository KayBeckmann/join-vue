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
      <button type="submit">Speichern</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/tasks'

const route = useRoute()
const router = useRouter()
const taskStore = useTaskStore()

const isEditMode = computed(() => !!route.params.id)

const form = ref({
  title: '',
  description: '',
  dueDate: null,
  category: '',
  priority: 'mittel',
  status: 'geplant',
})

onMounted(async () => {
  if (isEditMode.value) {
    const task = taskStore.getTaskById(Number(route.params.id))
    if (task) {
      form.value = { ...task }
    } else {
      await taskStore.fetchTask(Number(route.params.id))
      form.value = { ...taskStore.getTaskById(Number(route.params.id)) }
    }
  }
})

async function onSubmit() {
  if (isEditMode.value) {
    await taskStore.updateTask(Number(route.params.id), form.value)
  } else {
    await taskStore.createTask(form.value)
  }
  router.push({ name: 'Board' })
}
</script>
