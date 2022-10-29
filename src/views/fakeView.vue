<template>
    <div id="cont">
        <h1>Fake Account</h1>
        <label for="idInput">Id: </label>
        <input type="number" v-model="id" id="idInput"/>
        <label for="nameInput">Name: </label>
        <input type="text" v-model="name" if="nameInput"/>
        <div class="btn" @click="submit">submit</div>
        <div class="btn" @click="reset_users">delete all users</div>
        <div class="btn" @click="reset_channels">delete all groups</div>

    </div>
</template>

<script lang="ts" setup>
    /* eslint-disable */
    import { ref } from 'vue'
    import axios from 'axios'
    import { useRouter } from 'vue-router';
    import Cookies from 'js-cookie'
    import { useToast } from 'vue-toastification';
    const id = ref('');
    const name = ref('');
    let router = useRouter();
    let toast = useToast();

    async function submit(){
        let p = await axios.post(`http://${process.env.VUE_APP_APP_NAME}:3000/auth/fake-login`, {
            id: id.value,
            displayName: name.value
        })
        Cookies.set('accessToken', p.data)
        toast.success('user ' + name.value + ' logged in')
        router.push('/')
    }

    function reset_users(){
        axios.delete(`http://${process.env.VUE_APP_APP_NAME}:3000/user/all-users`)
        .then(()=>{
            toast.success('all users deleted')
        })
    }

    function reset_channels(){
        axios.delete(`http://${process.env.VUE_APP_APP_NAME}:3000/channel/all`)
        .then(()=>{
            toast.success('all channels deleted')
        }).catch((err)=>{
            console.log(err)
        })
    }



</script>

<style scoped>
    #cont{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .btn {
        margin-top: 20px;
        height: 80px;
        background-color: red;
        border-radius: 10px;
        line-height: 60px;
        cursor: pointer;
        font-size: 30px;
        padding: 10px;
    }

    input{
        color: black;
    }

    h1{
        color: grey;
        font-size: 50px;
    }

</style>