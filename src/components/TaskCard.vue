<template>
  <div class="task-card" @click="onEdit">
    <h4>{{ task.title }}</h4>
    <p>{{ task.description }}</p>
    <small>Status: {{ task.status }}</small>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface Task {
  id: number
  title: string
  description: string
  status: string
}

const props = defineProps<{ task: Task }>()
const emits = defineEmits(['editTask'])

function onEdit() {
  emits('editTask', props.task)
}
</script>

<style scoped>
.task-card {
  background: #fff;
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  border-radius: 4px;
}
</style>
