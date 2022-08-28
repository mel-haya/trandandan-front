<template>
    <div id="registerForm">
        <h2>Register</h2>
        <img :src="user.imageUrl" alt="bruh" >
        change avatar
        <input type="file" name="file" @change="changeImage">
        <br>
        change username
        <input type="text" name="username" v-model="user.username">
        <br>
        <button @click="submitForm" id="saveBtn">save</button>
        <button id="faBtn">activate 2FA</button>
    </div>
</template>

<script setup>
    import { onMounted, reactive } from 'vue'
    import Cookies from 'js-cookie'
    import axios from 'axios'

    const user = reactive({
        id: 0,
        username: '',
        imageUrl: '',
    });
    let img;

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
      console.log(img);
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
                    console.log(response);
                })
                .catch(function (response) {
                    console.log(response);
        });
    }
</script>

<style scoped>
    img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }

    #saveBtn{
        background-color: #4CAF50;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        width: 100%;
    }
    #faBtn{
        background-color: #4CAF50;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        width: 100%;
    }
</style>