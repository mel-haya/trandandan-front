import { createRouter, createWebHistory } from 'vue-router/dist/vue-router.esm-bundler'

export default () => createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/login',
      name: 'LoginView',
      component: () => import('./views/Login.vue')
    },
  ]
})