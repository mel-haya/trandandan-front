<template>
    <div id="messageContainer" :class="active">
        <div id="chatHeader" @click="maximize">
            <div id="chatUser" >
                <div id="userImg">
                </div>
                <div id="chatName" >
                    {{store.activeChat.name.slice(0, 10)}}
                </div>
            </div>
            <div id="leaveChat" @click="store.activeChat = null" v-if="active === 'maximized'">
                <fa icon="xmark"/>
            </div>
            <div id="chatMinimize" @click.stop="minimize()" v-if="active === 'maximized'">
                <fa icon="minus"/>
            </div>
        </div>
        <div id="chatBody">
            <div id="chatMessages" ref="chatMessages">
                <MessageBoxItem body="Yo" by="me"/>
                <MessageBoxItem body="Yo" by="them"/>
                <MessageBoxItem body="Kayn chi satat" by="them"/>
                <MessageBoxItem body="La walou gha ghyrha" by="me"/>
                <MessageBoxItem body="Iwa ki ghadi m3a chi 9raya" by="them"/>
                <MessageBoxItem body="bdit f chat ghad lina douk channels rah khas nsaliw" by="me"/>
                <MessageBoxItem body="Ha lghdar bda" by="them"/>
                <MessageBoxItem body="Chms" by="them"/>
                <MessageBoxItem body="Chms" by="them"/>
                <MessageBoxItem body="Chms" by="them"/>
            </div>
            <input type="text" placeholder="Message..." id="chatInput">
            <fa icon="paper-plane" id="sendButton"/>
        </div>
    </div>
</template>

<script setup>
    import { useInterfaceStore } from '@/stores/interface';
    import MessageBoxItem from '@/components/messageBoxItem.vue'
    import {onMounted, ref} from 'vue'
    let chatMessages = ref(null);
    let store = useInterfaceStore();
    let active = ref('maximized');
    function minimize(){
        if(active.value === 'maximized'){
            active.value = 'minimized';
        }
    }

    function maximize(){
        if(active.value === 'minimized'){
            active.value = 'maximized';
        }
    }

    onMounted(() => {
        chatMessages.value.scrollTop = chatMessages.value.scrollHeight;
    });
    
</script>

<style scoped>
    #messageContainer{
        position: absolute;
        bottom: 0px;
        width: 425px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        right: 470px;
        z-index: 1;
        background-color: rgba(123,51,125, 0.8);
    }
    #chatHeader{
        height: 60px;
        
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
        /* align-self: flex-end; */
        float: right;

    }
    #chatUser{ 
        /* border-top-left-radius: 10px; */
        height: 52px;
        margin: 4px;
        display: inline-block;
        padding-right: 40px;
        max-width: 300px;
        overflow: hidden;
        border-radius: 5px;
    }

    .maximized #chatUser:hover, #chatMinimize:hover, #leaveChat:hover{
        cursor: pointer;
        background-color: rgba(92, 34, 94, 0.995);
    }

    #chatName{
        float: left;
        line-height: 52px;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .minimized #chatBody{
        height: 0px;
    }

    .maximized #chatBody{
        height: 520px;
    }

    #chatBody{
        position: relative;
        overflow: hidden;
        transition: all 0.1s ease;
    }

    #userImg{
        height: 40px;
        width: 40px;
        background-color: burlywood;
        border-radius: 60px;
        margin : 6px 5px;
        float: left;
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

    #chatInput::placeholder {
        color: rgb(186, 186, 186);;
        opacity: 1;
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

    #chatMessages{
        height: calc(100% - 60px);
        overflow-y: scroll;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
    }

    #chatMessages::-webkit-scrollbar {
        width: 10px;
        padding: 10px;
    }

    #chatMessages::-webkit-scrollbar-track {
        background: #ffffff20;
    }

    #chatMessages::-webkit-scrollbar-thumb {
        background: rgba(79, 17, 81, 0.995);
        border-radius: 10px;
    }

    /* #chatMessages:: */

</style>