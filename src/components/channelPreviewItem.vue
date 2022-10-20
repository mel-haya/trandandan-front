<template>
    <div id="msgItem" @click="handleClick">
        <div id="senderName">
            <p :class=" props.channel.unread === 0 ? 'empty' : ''">{{props.channel.name}}</p>
                 <!-- <span id="status" :style="`background: ${props.message.status}?green:grey`"></span> -->
        </div>
    </div>
</template>

<script lang="ts" setup>
     
    import { useChatStore } from '@/stores/chat';
    import { nextTick} from 'vue';
    
    let store = useChatStore();
    const props = defineProps({
        channel:
        {
            type: Object,
            required: true
        }
    })

    async function handleClick(){
        await store.updateChat(props.channel.id);
        await nextTick();
		await store.updateMessages()
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
        height: 50px;
        background-color: transparent;
        line-height: 50px;
    }

    .empty{
        color: rgb(177, 177, 177);
    }

    #msgItem:hover{
        background-color: rgba(124, 124, 124, 0.4);
    }

    #senderName{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        /* height: 40px; */
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
    }
    #senderName p{
        font-size: 20px;
        font-weight: 600;
        
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

    #unread{
        width: 20px;
        height: 20px;
        border-radius: 100vw;
        display : inline-block;
        background-color: rgb(255, 0, 0);
        font-size: 12px;
        line-height: 20px;
        color: white;
    }
</style>