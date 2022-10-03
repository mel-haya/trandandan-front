/* eslint-disable */

import { createPinia, storeToRefs } from 'pinia'
import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import P5 from 'p5'
import createRouter from './router'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
// import VueCookies from 'vue3-cookies'

// var script = require('./p5script.js')
// const P5 = require('p5')
const router = createRouter()
const pinia = createPinia()

import { useUserStore } from '@/stores/user'
library.add(fas)
createApp(App)
.use(Toast, {
    transition: "Vue-Toastification__fade",
    maxToasts: 10,
    newestOnTop: true
})
.use(router)
.use(pinia)
.component('fa', FontAwesomeIcon)
.mount('#app')


import {s} from '@/p5starfield.js'

new P5(s, document.getElementById("bg"))
