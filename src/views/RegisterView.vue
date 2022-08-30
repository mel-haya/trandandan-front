<template>
    <div id="registercontainer">
        <h2>Register</h2>
        <div id="registerForm">
            <div id="imageCont">
                <img :src="user.imageUrl" alt="bruh">
                <label for="file"><fa icon="file-arrow-up"/></label>
                <input type="file"  name="file" id="file" @change="changeImage">
            </div>
            <input type="text" placeholder="change your name" id="usernameInput" name="username" v-model="user.username">
            <button id="faBtn" @click="redirectHome">activate 2FA</button>
            <button @click="submitForm" id="saveBtn">save</button>
        </div>
    </div>
    
</template>

<script setup>
    /*eslint-disable*/
    import { onMounted, reactive } from 'vue'
    import Cookies from 'js-cookie'
    import axios from 'axios'
    import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router';

    const user = reactive({
        id: 0,
        username: '',
        imageUrl: '',
    });
    let img;
    const store = useUserStore()
    const { update } = store
    let router = useRouter()

    let token = Cookies.get('accessToken')
    onMounted(() => {
        const config = {
            headers: { "Authorization": `Bearer ${token}` }
        };
        
        axios.get('http://localhost:3000/user/profile', config)
            .then(response => {
                user.id = response.data.id;
                user.username = response.data.username;
                user.imageUrl = response.data.imageUrl;
            })
            .catch(error => {
                console.log(error)
            })
    })

    function changeImage(e)
    {
      img = e.target.files[0];
      user.imageUrl = URL.createObjectURL(img);
    }

    function redirectHome() {
        router.push('/twofa')
    }

    function submitForm()
    {
        var bodyFormData = new FormData();
        bodyFormData.append('file', img);
        bodyFormData.append('username', user.username);
        axios({
                method: "patch",
                url: "http://localhost:3000/user/update",
                data: bodyFormData,
                headers: {
                     "Content-Type": "multipart/form-data",
                     "Authorization": `Bearer ${token}`
                    },
                })
                .then(function (response) {
                    user.imageUrl = response.data.imageUrl;
                    user.username = response.data.username;
                    update(user.username, user.imageUrl)

                    // console.log(response);
                })
                .catch(function (response) {
                    console.log(response);
                });
    }
</script>

<style scoped>
    h2{
        /* text-decoration: solid underline; */
        background: rgba(124, 26, 137, 0.787);
        border-radius: 0.5em 0.5em 0 0;
        padding: 0.25em 0;
        /* text-align: left; */
    }
    #file {
        display: none;
    }

    #registercontainer{
        position: relative;
        width: 30%;
        padding: 1em 0.5em;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

    }

    #registerForm{     
        
        background: rgba(158, 78, 169, 0.703);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 0 0 0.5em 0.5em;
        padding: 1em;
    }
    

    button{
        background-color: #4CAF50;
        color: white;
        padding: 14px 20px; 
        margin: 8px 8px;
        border: none;
        cursor: pointer;
        width: 30%;
        min-width: 200px;
        font-size: 0.5em;
    }
    

    #usernameInput{
        
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        /* border: 1px solid #ccc; */
        border-radius: 4px;
        box-sizing: border-box;
        font-size: 0.5em;
        border: none;
        border-bottom: 2px solid #4CAF50;
        background-color: transparent;
        resize: none;
        outline: none;
        color : white;
    }
    label
    {
        font-size: 0.7em;
        color: white;
    }
    #imageCont{
        position: relative;
        width: 150px;
        height: 150px;
    }
    #imageCont label{
        position: absolute;
        bottom: 0px;
        right: 0px;
        color: white;
        cursor: pointer;
    }

    #imageCont img{
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }
</style>