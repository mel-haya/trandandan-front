import { createApp } from 'vue'
import App from './App.vue'
var script = require('./p5script.js')
const P5 = require('p5')

createApp(App).mount('#app')
new P5(script.main, document.getElementById("p5Canvas"))
