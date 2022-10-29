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
                <input ref="imageInput" type="file" name="file" id="file" accept=".jpg,.jpeg,.png,.gif" @change="changeImage">
            </div>
            <input type="text" placeholder="change your name" id="usernameInput" name="username" v-model="newName">
            <button id="faBtn" @click="redirectHome" v-if="store.user.is2faEnabled === false">activate 2FA</button>
            <button id="faBtn" v-else><fa icon="check"></fa>2FA activated</button>
            <button @click="submitForm" id="saveBtn">save</button>
        </div>
    </div>
    
</template>

<script lang="ts" setup>
    /*eslint-disable*/
    import { ref,onMounted } from 'vue'
    // import Cookies from 'js-cookie'
    import { useRouter } from 'vue-router';
    import {$api, $token, updateToken} from '@/axios'
    import type { Ref } from 'vue'
    import { useUserStore } from '@/stores/user';
    import { useToast } from 'vue-toastification';

    const store = useUserStore();
    const newName = ref("");
    const toast = useToast();
    let img:any;
    let router = useRouter()
    let imageInput:Ref<any> = ref(null);
    onMounted(async () => {
        try{
            store.user = (await $api.get('/user/me')).data;
            newName.value = store.user.displayName
        }
        catch(e){
            toast.error('Failed to fetch user data');
            router.push('/login');
        }
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
        if(newName.value == "")
        {
            toast.error('Please enter a username')
            return;
        }
        var bodyFormData = new FormData();
        bodyFormData.append('file', imageInput.value.files[0]);
        bodyFormData.append('displayName', newName.value);
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
                    if(response.response.data.message instanceof Array){
                        response.response.data.message.forEach((element:any) => {
                            toast.error(element);
                        });
                    }
                    else{
                        toast.error(response.response.data.message); 
                    }
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
        width: 500px;
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