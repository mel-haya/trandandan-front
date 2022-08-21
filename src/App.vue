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
  background: rgba(123, 51, 125, 0.3);
  position: relative;
  overflow: hidden;
}
</style>
