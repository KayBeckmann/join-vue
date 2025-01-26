import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/index'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue'), // Lazy Loading
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/RegisterView.vue'), // Lazy Loading
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/DashboardView.vue'), // Lazy Loading
      meta: { requiresAuth: true },
    },
    {
      path: '/board',
      name: 'Board',
      component: () => import('@/views/BoardView.vue'), // Lazy Loading
      meta: { requiresAuth: true },
    },
    {
      path: '/task/new',
      name: 'TaskNew',
      component: () => import('@/views/TaskFormView.vue'), // Lazy Loading
      meta: { requiresAuth: true },
    },
    {
      path: '/task/edit/:id',
      name: 'TaskEdit',
      component: () => import('@/views/TaskFormView.vue'), // Lazy Loading
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isLoggedIn = authStore.isLoggedIn

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
