import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import createRouter from './router'
// var script = require('./p5script.js')
// const P5 = require('p5')
const pinia = createPinia()
createApp(App).use(createRouter()).use(pinia).mount('#app')

// new P5(script.main, document.getElementById("p5Canvas"))
