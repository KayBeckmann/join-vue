import { defineStore } from 'pinia'

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
    setToken(token: string) {
      this.token = token
      localStorage.setItem('token', token)
    },
    clearToken() {
      this.token = null
      localStorage.removeItem('token')
    },
    setUserData(id: number, username: string) {
      this.userId = id
      this.username = username
    },
  },
})
