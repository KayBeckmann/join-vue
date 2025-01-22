<template>
  <div class="board-container">
    <h2>Task Board</h2>
    <div class="columns">
      <div v-for="status in statuses" :key="status" class="board-column">
        <h3>{{ status }}</h3>

        <draggable v-model="groupedTasks[status]" group="tasks" @end="onDragEnd">
          <template #item="{ element }">
            <TaskCard :task="element" @editTask="editTask" />
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import TaskCard from '@/components/TaskCard.vue'
import { useAuthStore } from '@/stores/index'
import draggable from 'vuedraggable'

// Mögliche Stati (müssen zum Backend passen)
const statuses = ['geplant', 'bearbeitung', 'prüfen', 'fertig']

interface Task {
  id: number
  title: string
  description: string
  status: string
  // weitere Felder
}

// tasks im Speicher
const tasks = ref<Task[]>([])

// gruppierte Tasks nach Status
const groupedTasks = computed(() => {
  const groups: Record<string, Task[]> = {
    geplant: [],
    bearbeitung: [],
    prüfen: [],
    fertig: [],
  }
  tasks.value.forEach((t) => {
    groups[t.status].push(t)
  })
  return groups
})

onMounted(async () => {
  try {
    const authStore = useAuthStore()
    const res = await axios.get('http://localhost:5000/api/tasks', {
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    tasks.value = res.data
  } catch (error) {
    console.error('Fehler beim Laden der Tasks:', error)
  }
})

function onDragEnd(evt: any) {
  // Nach dem Drag & Drop hat sich ggf. der Status geändert
  // Die Library sortiert nur im Frontend; wir müssen dem Backend mitteilen,
  // welcher Task nun welchen Status hat.
  // Evtl. muss man hier 'evt.to' oder 'evt.item' auslesen und dann patchen.

  // Für ein einfaches Mapping kann man z. B. in each group v-for
  // v-model="groupedTasks[status]" tracken, welcher Task in welcher Spalte gelandet ist.
  // Dann kann man den Task im Backend updaten:

  // z. B.:
  statuses.forEach((status) => {
    groupedTasks.value[status].forEach(async (task) => {
      if (task.status !== status) {
        // status im FE anpassen
        task.status = status
        try {
          const authStore = useAuthStore()
          await axios.put(
            `http://localhost:3000/api/tasks/${task.id}`,
            { status },
            { headers: { Authorization: `Bearer ${authStore.token}` } },
          )
        } catch (error) {
          console.error('Fehler beim Update des Task-Status:', error)
        }
      }
    })
  })
}

function editTask(task: Task) {
  // Weiterleitung zur Task-Bearbeitung
  // z. B. Router-Link
  window.location.href = `/task/edit/${task.id}`
}
</script>

<style scoped>
.board-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.columns {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
}
.board-column {
  flex: 1 0 250px;
  background: #f5f5f5;
  padding: 0.5rem;
  border-radius: 4px;
}
</style>
