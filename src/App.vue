<template> 
  <router-view />
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
// import HomeView from './views/Home.vue'


export default {
  name: 'App',

  setup() {
    const state = reactive({
      name: ""
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  font-size: 2vw;
  font-weight: bold;
  grid-column: 2/3;
  grid-row: 2/3;
  background: #2c3e50;
  opacity: 80%;
  border-radius: 20px;
}
</style>
