<template>
    <div id="registercontainer">
        <p><fa icon="lock"/> Two-factor authentication</p>
        <div id="twofaForm">
            <img :src="qrimg" alt="bruh">
            <input type="text" @keyup.enter="validate" placeholder="enter code" id="usernameInput" name="code" v-model="code">
            <p v-if="invalid" id="invalidErr">Invalid code</p>
            <div>
                <button @click="validate">Save</button>
                <button @click="router.go(-1)">cancel</button>
            </div>
        </div>
    </div> 
</template>


<script setup>
    // import {toDataURL} from 'qrcode';
    import {onMounted, ref} from 'vue'
    import { useRouter } from 'vue-router';
    import Cookies from 'js-cookie'
    import axios from 'axios'

    let qrimg = ref('');
    let invalid = ref(false);
    let code = ref('');
    let router = useRouter();
    let token = Cookies.get('accessToken')
    

    onMounted( async () => {
        const config = {
            headers: { "Authorization": `Bearer ${token}` }
        };
        let res = await axios.get("http://localhost:3000/2fa/generate", config)
        .then(function (response){ 
            return response.data;
        })
        .catch((err) => console.log(err));
        qrimg.value = res;
    })

    async function validate()
    {
        const config = {
            headers: { "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json" 
        }
        };
        console.log(code.value)
        let res = await axios.post("http://localhost:3000/2fa/authenticate", {code: code.value} ,config)
        .then((response) => { 
            console.log(response);
            return response.data;})
        .catch((err) => console.log(err));
        console.log("-------",res);
        if(code.value == res)
        {
            invalid.value = false;
            return true;
        }
        else
        {
            invalid.value = true;
            return false;
        }
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
        width: 30%;
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
        padding: 14px 20px; 
        margin: 8px 8px;
        border: none;
        cursor: pointer;
        width: 30%;
        min-width: 200px;
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



</style>