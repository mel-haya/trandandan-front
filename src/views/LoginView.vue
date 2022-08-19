
<script setup>
    import { ref } from 'vue'
    import { useUserStore } from '@/stores/user'
    import { storeToRefs } from 'pinia'

    const a = ref("")
    const b = ref("")
    const store = useUserStore()
    const { username, password } = storeToRefs(store)
    const { auth } = store
    
</script>



<template>
    <div>login</div>
    <input type="text" v-model="a"> 
    <br><br>
    <input type="password" v-model="b">
    <p v-if="username"> {{username}} </p>
    <p v-if="password"> {{password}} </p>
    <br>
    <button @click="auth(a,b)">submit</button>
    <br>
    <router-link to="/">Go to Home</router-link>
    
</template>



<!--
<template>
    <div>login</div>
    <input type="text" v-model="username"> 
    <br>
    <input type="password" v-model="password">
    <p v-if="userStore.username"> {{userStore.username}} </p>
    <p v-if="userStore.password"> {{userStore.password}} </p>
    <br>
    <button @click="submitForm">submit</button>
</template>
-->


<style scoped>
*{
    font-size: 2vw;
}
button{
    padding: 5px 10px;
    border-radius: 15px;

    border: 5px solid red;
}

</style>
