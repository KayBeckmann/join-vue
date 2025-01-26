<template>
  <div class="board-container">
    <h2>Task Board</h2>
    <div class="columns">
      <div v-for="status in statuses" :key="status" class="board-column">
        <h3>{{ status }}</h3>
        <draggable v-model="groupedTasks[status]" group="tasks" item-key="id" @end="onDragEnd">
          <template #item="{ element }">
            <TaskCard :task="element" @editTask="editTask" />
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useTaskStore } from '@/stores/tasks'
import { useRouter } from 'vue-router'
import TaskCard from '@/components/TaskCard.vue'
import draggable from 'vuedraggable'

const statuses = ['geplant', 'bearbeitung', 'prüfen', 'fertig']
const taskStore = useTaskStore()
const router = useRouter()

onMounted(() => {
  taskStore.fetchTasks()
})

const groupedTasks = computed(() => {
  const groups = { geplant: [], bearbeitung: [], prüfen: [], fertig: [] }
  taskStore.tasks.forEach((t) => groups[t.status].push(t))
  return groups
})

function onDragEnd() {
  taskStore.updateTaskStatuses(groupedTasks.value)
}

function editTask(task) {
  router.push({ name: 'TaskEdit', params: { id: task.id } })
}
</script>
