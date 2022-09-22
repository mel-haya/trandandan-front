<template>
    <div id="messageContainer" >
        <div id="chatHeader">
            <div id="userImg" @click="maximize">
            </div>
            <div id="chatName" @click="maximize">
                {{store.activeChat.name}}
            </div>
            <div id="chatMinimize" @click="minimize()" v-if="active === 520">
                <fa icon="minus"/>
            </div>
            <div id="leaveChat" @click="store.activeChat = null">
                <fa icon="xmark"/>
            </div>
        </div>
        <div id="chatBody" :style="`height: ${active}px;`">
            <input type="text" placeholder="Message..." id="chatInput">
            <fa icon="paper-plane" id="sendButton"/>
        </div>
    </div>
</template>

<script setup>
    import { useInterfaceStore } from '@/stores/interface';
    import {ref} from 'vue'
    let store = useInterfaceStore();
    let active = ref(520);
    function minimize(){
        console.log(active.value)
        active.value = active.value === 0 ? 520 : 0;
    }

    function maximize(){
        if(active.value === 0){
            active.value = 520;
        }
    }

    
</script>

<style scoped>
    #messageContainer{
        position: absolute;
        bottom: 0px;
        width: 400px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        right: 470px;
        z-index: 1;
        background-color: rgba(123,51,125, 0.8);
    }
    #chatHeader{
        height: 80px;
        display: flex;
        flex-direction: row;
        line-height: 80px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        text-align: left;
        background-color: rgba(122, 51, 125, 0.995);
        font-size: 22px;
    }

    #leaveChat, #chatMinimize{
        width:35px;
        height: 35px;
        text-align: center;
        line-height: 40px;
    }
    #chatName{
        flex-grow: 1;   
    }

    /* #chatSettings{
        width: 50px;
        border-radius: 40px;
    } */

    #chatBody{
        position: relative;
        overflow: hidden;
        height: 520px;
        transition: all 0.1s ease;
    }

    #userImg{
        height: 60px;
        width: 60px;
        background-color: burlywood;
        border-radius: 60px;
        margin : 10px 10px 0 10px;
    }

    
    
    #chatInput{
        position: absolute;
        bottom: 0;
        left: 0;
        width: calc(100% - 20px);
        height: 40px;
        font-size: 24px;
        padding: 10px;
        border: none;
        background: #00000030;
        color: white;
    }

    #chatInput:focus{
        outline: none;
    }

    #sendButton{
        position: absolute;
        bottom: 15px;
        right: 10px;
        font-size: 30px;
        line-height: 40px;
        color: rgb(186, 186, 186);
        cursor: pointer;
        transition: all 0.2s ease;
    }

    #sendButton:hover{
        color: white;
    }

</style>