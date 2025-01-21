import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DashboardView from '@/views/DashboardView.vue'
import BoardView from '@/views/BoardView.vue'
import TaskFormView from '@/views/TaskFormView.vue'
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
      component: LoginView,
    },
    { path: '/register', name: 'Register', component: RegisterView },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: '/board',
      name: 'Board',
      component: BoardView,
      meta: { requiresAuth: true },
    },
    {
      path: '/task/new',
      name: 'TaskNew',
      component: TaskFormView,
      meta: { requiresAuth: true },
    },
    {
      path: '/task/edit/:id',
      name: 'TaskEdit',
      component: TaskFormView,
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
