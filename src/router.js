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
    {
      name: 'register',
      path: '/register',
      component: () => import('./views/RegisterView.vue')
      
    },
    {
      name: 'twofa',
      path: '/twofa',
      component: () => import('./views/twofaView.vue')
    },
    {
      name: 'game',
      path: '/play',
      component: () => import('./views/GameView.vue')
    },
    {
      name: 'settings',
      path: '/settings',
      component: () => import('./views/RegisterView.vue')
    }

  ]
})