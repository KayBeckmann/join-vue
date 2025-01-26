import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

export const useTaskStore = defineStore('tasks', {
  state: () => ({ tasks: [] }),
  actions: {
    async fetchTasks() {
      const authStore = useAuthStore()
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      })
      this.tasks = res.data
    },
    async fetchTask(id) {
      const authStore = useAuthStore()
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      })
      this.tasks.push(res.data)
    },
    async createTask(task) {
      const authStore = useAuthStore()
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, task, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      })
      this.tasks.push(res.data)
    },
    async updateTask(id, task) {
      const authStore = useAuthStore()
      await axios.put(`${import.meta.env.VITE_API_URL}/tasks/${id}`, task, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      })
    },
    getTaskById(id) {
      return this.tasks.find((t) => t.id === id)
    },
  },
})
