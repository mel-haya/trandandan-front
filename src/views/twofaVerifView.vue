<template>
    <div id="registercontainer">
        <p><fa icon="lock"/> Two-factor authentication</p>
        <div id="twofaForm">
            <input type="text" @keyup.enter="validate" placeholder="enter code" id="usernameInput" name="code" v-model="code">
            <div id="buttons">
                <button @click="validate">Validate</button>
                <button @click="cancel">Cancel</button>
            </div>
        </div>
    </div> 
</template>


<script lang="ts" setup>
    import {ref} from 'vue'
    import { useRouter } from 'vue-router';
    import Cookies from 'js-cookie'
    import {$api,updateToken} from '@/axios'
    import { useToast } from 'vue-toastification';

    const toast = useToast();
    let code = ref('');
    let router = useRouter();

    async function validate()
    {
        $api.post("/2fa/verify", {code: code.value})
        .then((res) => { 
            Cookies.set('accessToken', res.data.accessToken);
            updateToken()
            router.push('/');

        })
        .catch((err:any) => {
            toast.error(err.response.data.message);
        });
    }

    function cancel()
    {
        Cookies.remove('accessToken');
        updateToken()
        router.push('/');
    }
    
</script>

<style scoped>
    #invalidErr
    {
        color: red;
        background-color:transparent;
    }
    p{
        background: rgba(124, 26, 137, 0.787);
        border-radius: 0.5em 0.5em 0 0;
        font-size: .7em;
        font-weight: 200;
        color: white;
        padding: 0.5em;
    }

    #registercontainer{
        position: relative;
        width: 500px;
        padding: 1em 0.5em;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

    }

    #twofaForm{     
        
        background: rgba(158, 78, 169, 0.703);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 0 0 0.5em 0.5em;
        padding: 0.5em;
    }
    

    button{
        background-color: #4CAF50;
        color: white;
        padding: 10px; 
        margin: 8px 8px;
        border: none;
        cursor: pointer;
        min-width: 150px;
        font-size: 0.5em;
    }
    

    #usernameInput{
        
        padding: 10px 20px;
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

    #buttons{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
    }



</style>