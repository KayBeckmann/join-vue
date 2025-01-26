import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    userId: null,
    username: '',
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    async login(email: string, password: string) {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email,
        password,
      })
      this.token = res.data.token
      this.userId = res.data.userId
      this.username = res.data.username
      localStorage.setItem('token', this.token)
    },
    async register(username: string, email: string, password: string) {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        username,
        email,
        password,
      })
    },
    logout() {
      this.token = null
      this.userId = null
      this.username = ''
      localStorage.removeItem('token')
    },
  },
})
