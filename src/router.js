import { createRouter, createWebHistory } from 'vue-router/dist/vue-router.esm-bundler'

export default () => createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('./views/HomeView.vue')
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('./views/LoginView.vue')
      
    },
  ]
})