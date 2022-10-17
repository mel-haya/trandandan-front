<template>
    <div id="registercontainer">
        <h3>
            <fa icon="gear"/>
            Account settings
        </h3>
        <div id="registerForm">
            <div id="imageCont">
                <img :src="store.user?.imgPath" alt="bruh">
                <label for="file"><fa icon="file-arrow-up"/></label>
                <input ref="imageInput" type="file" name="file" id="file" @change="changeImage">
            </div>
            <input type="text" placeholder="change your name" id="usernameInput" name="username" v-model="store.user.displayName">
            <button id="faBtn" @click="redirectHome">activate 2FA</button>
            <button @click="submitForm" id="saveBtn">save</button>
        </div>
    </div>
    
</template>

<script lang="ts" setup>
    /*eslint-disable*/
    import { ref,onMounted, reactive } from 'vue'
    // import Cookies from 'js-cookie'
    import { useRouter } from 'vue-router';
    import {$api} from '@/axios'
    import type { Ref } from 'vue'
    import { useUserStore } from '@/stores/user';
    const store = useUserStore();
    // const user = reactive({
    //     id: 0,
    //     username: '',
    //     imageUrl: '',
    // });
    
    let img:any;
    let router = useRouter()
    let imageInput:Ref<any> = ref(null);
    onMounted(() => {
        store.initUser();
    })

    function changeImage(e:any)
    {
        store.user.imgPath = URL.createObjectURL(e.target.files[0]);
    }

    function redirectHome() {
        router.push('/twofa')
    }

    function submitForm()
    {
        var bodyFormData = new FormData();
        bodyFormData.append('file', imageInput.value.files[0]);
        bodyFormData.append('displayName', store.user.displayName);
        $api({
                method: "patch",
                url: "user/update",
                data: bodyFormData,
                headers: {
                     "Content-Type": "multipart/form-data",
                    },
                })
                .then(function () {
                    router.push('/')
                })
                .catch(function (response) {
                    console.log(response);
                });
    }
</script>

<style scoped>
    h3{
        background: rgba(124, 26, 137, 0.787);
        border-radius: 0.5em 0.5em 0 0;
        padding: 0.25em 0;
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