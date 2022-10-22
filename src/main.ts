/* eslint-disable */

import { createPinia, storeToRefs } from 'pinia'
import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far} from '@fortawesome/free-regular-svg-icons'
 
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import P5 from 'p5'
import createRouter from './router'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const router = createRouter()
const pinia = createPinia()

library.add(fas,far)

createApp(App)
.use(Toast, {
    transition: "Vue-Toastification__fade",
    position: "top-left",
    maxToasts: 10,
    newestOnTop: true
})
.use(router)
.use(pinia)
.component('fa', FontAwesomeIcon)
.mount('#app')


import {s} from '@/p5starfield'

new P5(s, document.getElementById("bg")!)
