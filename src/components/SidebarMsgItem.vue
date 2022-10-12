<template>
    <div id="messagesContainer" @click="enableDiv">
        <p id="msgHeader"> <fa :icon="icon"/> Messages</p>
    </div>
    <div id="messages" :style="`max-height:${scale}px`">
            <channelPreviewItem v-for="c in chatStore.joinedRooms" :key="c.id" :channel="c"/> 
    </div>
    
</template>

<script lang="ts" setup>
    import channelPreviewItem from './channelPreviewItem.vue';
    import {onMounted, ref} from 'vue';
    // import {$api} from '@/axios'
    // import type {Ref} from 'vue';
    import { useChatStore } from '@/stores/chat';

    // let channels:Ref<any> = ref([]);
    let enable = ref(true);
    let icon = ref("caret-right");
    let scale = ref(240);
    const chatStore = useChatStore();
    function enableDiv(){
        enable.value = !enable.value;
        if(enable.value){
            scale.value = 240;
            icon.value = "caret-down";
        }else{
            scale.value = 0;
            icon.value = "caret-right";
        }
    }
    function updateChannels(){
        // $api.get('/channel/joined').then((res) => {
        //     channels.value = res.data;
        // })
        chatStore.updateJoined();
    }
    onMounted(updateChannels) 
</script>

<style scoped>

    #messagesContainer{
        position: relative;
        width: 100%;
    }

    #msgHeader{
        position: relative;
        font-size: 20px;
        font-weight: 600;
        color: white;
        text-align: left;
        padding: 10px;
        background: linear-gradient(0deg, rgba(61,15,64,1) 0%, rgba(105,39,110,1) 41%, rgba(122,51,125,1) 100%);
    }

    #messages{
        position: relative;
        width: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        transition: max-height 0.5s ease; 
    }

    #messages::-webkit-scrollbar {
        width: 10px;
        padding: 10px;
    }

    #messages::-webkit-scrollbar-track {
        background: #ffffff20;
    }

    #messages::-webkit-scrollbar-thumb {
        background: rgba(79, 17, 81, 0.995);
        border-radius: 10px;
    }


</style>