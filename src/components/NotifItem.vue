<template>
    <div id="notifContainer">
        <p id="notifBody"><span>{{props.user.displayName}}</span> Sent you a friend request</p>
        <div id="approveBtn" @click="acceptReq"><fa icon="check"/></div>
        <div id="denyBtn" @click="denyReq"><fa icon="xmark"/></div>
    </div>
    
</template>

<script setup>
    import {defineProps, defineEmits} from 'vue'
    import Cookies from 'js-cookie'
    import Axios from 'axios'
    let props = defineProps({
        user: Object
    });
    let emit = defineEmits(['update']);

    function acceptReq(){
        Axios.post('http://localhost:3000/user/accept-friend', {
            "target_id": props.user.id
        },
        {
            headers: { "Authorization": `Bearer ${Cookies.get('accessToken')}`,
            "Content-Type": "application/json" 
        }}).then(() => {
            emit('update');
        })
    }

    function denyReq(){
        Axios.post('http://localhost:3000/user/remove-friend', {
            "target_id": props.user.id
        },
        {
            headers: { "Authorization": `Bearer ${Cookies.get('accessToken')}`,
            "Content-Type": "application/json" 
        }}).then(() => {
            emit('update');
        })
    }


</script>

<style scoped>
    #notifContainer{
        position: relative;
        width: 100%;
        height: 50px;
        background-color: white;
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        align-items: center;
        padding: 0px 10px;
    }

    #notifBody{
        position: relative;
        left: 0;
        font-size: 15px;
        font-weight: 600;
        color: black;
        text-align: left;
        margin: 0px;
        flex-grow: 1;
    }

    #notifBody span{
        color: #1e90ff;
    }

    #approveBtn{
        position: relative;
        width: 30px;
        height: 30px;
        background-color: #00b300;
        border-radius: 30px;
        cursor: pointer;
        font-size: 20px;
        line-height: 30px;
        display: inline-block;
        text-align: center;
    }

    #denyBtn{
        position: relative;
        width: 30px;
        height: 30px;
        background-color: #ff0000;
        border-radius: 30px;
        cursor: pointer;
        font-size: 20px;
        line-height: 30px;
        right: 0px;
        display: inline-block;
        margin-left: 10px;
    }

    #denyBtn:hover{
        background-color: #ff4d4d;
    }

    #approveBtn:hover{
        background-color: #00e600;
    }

</style>