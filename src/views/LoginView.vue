
<script setup>
    // import { ref } from 'vue'
    import { useUserStore } from '@/stores/user'
    // import { storeToRefs } from 'pinia'
    import { useRouter } from 'vue-router'

    
    // const a = ref("")
    // const b = ref("")
    const store = useUserStore()
    // const { username, password } = storeToRefs(store)
    const { auth } = store
    const router = useRouter()
    function submit(){
        auth("Mourad","")
        router.push("/")
    }
    
</script>



<template>
    <img src="../assets/pong-online.png" alt="" style="width: 40%;">
    <br>
    <div @click="submit" id="loginButton">Sign up with 42</div>
    <!-- <br>
    <input type="text" v-model="a"> 
    <br>
    <input type="password" v-model="b">
    <p v-if="username"> {{username}} </p>
    <p v-if="password"> {{password}} </p><br>
    <button @click="submit">submit</button>
    <br> -->
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

:root{
    --clear-neon: #57003E
}

#loginButton{
    
    border-radius: 0.4em;
    color: #FF0FBB;
    font-size: 3rem;
    /* height: 4rem; */
    line-height: 5rem;
    border: 0.125em solid currentColor;
    display: inline-block;
    padding: 0.25em 1em;
    cursor: pointer;
}

#loginButton:hover{
    background: #FF0FBB;
    color: #000;
}

</style>
