import { createRouter, createWebHistory } from 'vue-router/dist/vue-router.esm-bundler'

export default () => createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./views/HomeView.vue')
    },
    {
      path: '/login',
      component: () => import('./views/LoginView.vue')
    },
  ]
})