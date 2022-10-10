<template>
    <div id="msgItem" @click="changeActiveChat">
        <div id="senderName">
            <p>{{props.message.channel.name}} <span id="status" :style="`background: ${props.message.status}?green:grey`"></span></p>
            
        </div>
        <div id="msgBody">
            <p>{{props.message.body}}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
     
    import { useInterfaceStore } from '@/stores/interface';
    let store = useInterfaceStore();
    const props = defineProps({
        message:
        {
            type: Object,
            required: true
        }
    })

    function changeActiveChat(){
        store.setActiveChat(props.message.channel);
    }
</script>

<style scoped>

    #msgItem{
        box-sizing: border-box;
        cursor: pointer;
        position: relative;
        margin: 0 auto;
        border-radius: 5px;
        width: 98%;
        height: 80px;
        background-color: transparent;
    }

    #msgItem:hover{
        background-color: rgba(255, 255, 255, 0.4);
    }

    #senderName{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
    }
    #senderName p{
        font-size: 20px;
        font-weight: 600;
        color: white;
    }
    #status{
        width: 10px;
        height: 10px;
        border-radius: 100vw;
        background-color: rgb(0, 255, 0);
        display: inline-block;
    }
    #msgBody{
        position: absolute;
        top: 35px;
        left: 0;
        width: 100%;
        height: 60px;
        padding: 10px;  
    }
    #msgBody p{
        font-size: 15px;
        font-weight: 500;
        text-align: left;
        color: white;
    }
</style>