import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import P5 from 'p5'
import createRouter from './router'
// var script = require('./p5script.js')
// const P5 = require('p5')
/* eslint-disable */
const router = createRouter()
const pinia = createPinia()
// import { useUserStore } from '@/stores/user'

// router.beforeEach((to, from) => {
//     const store = useUserStore()
//     const { username } = storeToRefs(store)
//     if(username.value.length === 0 && to.name != "login")
//         return { name: 'login' }
//     // return false
// })
createApp(App).use(router).use(pinia).mount('#app')


import {s} from '@/p5starfield.js'

new P5(s, document.getElementById("bg"))
