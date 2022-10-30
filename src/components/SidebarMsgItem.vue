<template>
    <div id="messages">
        <div id="msgEmptyState" v-if="!chatStore.joinedRooms.length">
            
            <p id="emptyText"><fa id="emptyIcon" :icon="['far','message']"/> No messages</p>
        </div>
        <channelPreviewItem v-for="c in chatStore.joinedRooms" :key="c.id" :channel="c"/> 
    </div>  
</template>

<script lang="ts" setup>
    import channelPreviewItem from './channelPreviewItem.vue';
    import {onMounted} from 'vue';
    import { useChatStore } from '@/stores/chat';

    const chatStore = useChatStore();
    onMounted(chatStore.updateJoined) 
</script>

<style scoped>

    #messagesContainer{
        position: relative;
        width: 100%;
        height: 100%;
    }

    #messages{
        position: relative;
        width: 100%;
        overflow-y: auto;
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

    #msgEmptyState{
        width: 100%;
        padding: 30px;
        color: rgb(173, 173, 173);
    }

</style>