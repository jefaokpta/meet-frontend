import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'meet',
      component: () => import('../views/Meet.vue'),
    },
    {
      path: '/div',
      name: 'div',
      component: () => import('../views/Division.vue'),
    }
  ],
})

export default router
