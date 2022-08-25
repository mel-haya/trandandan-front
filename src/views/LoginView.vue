
<script setup>
    /* eslint-disable */
    // import { ref } from 'vue'
    import { useUserStore } from '@/stores/user'
    // import { storeToRefs } from 'pinia'
    // import { useRouter } from 'vue-router'
    import axios from 'axios';

    
    // const a = ref("")
    // const b = ref("")
    const store = useUserStore()
    // const { username, password } = storeToRefs(store)
    const { auth } = store
    // const router = useRouter()
    
    async function submit(){
        
        const res = await axios.get(`http://0.0.0.0:3000/auth/42`).catch((err) => console.log(err)) 
        console.log(res)

        // auth("Mourad","")
        // router.push("/")
    }
    
</script>



<template>
    <img src="../assets/pong-online.png" alt="" style="width: 40%;">
    <br>
    <div id="loginButton">
        <a @click="submit" href="http://0.0.0.0:3000/auth/42">Sign up with 42</a>
    </div>

</template>

<style scoped>

#loginButton{
    
    border-radius: 0.4em;
    color: #FF0FBB;
    font-size: 3rem;
    /* height: 4rem; */
    line-height: 5rem;
    border: 0.125em solid #FF0FBB;
    display: inline-block;
    padding: 0.25em 1em;
    cursor: pointer;
}

#loginButton:hover{
    background: #FF0FBB;
    color: #000;
}

</style>
