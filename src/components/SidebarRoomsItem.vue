<template>
    <div id="rooms">
        <div id="createRoom" @click="store.enableChannelCreate = true">
            <div id="createIcon">
                <fa icon="plus"/>
            </div>
            <p>Create a new group</p>
        </div>
        <RoomsItem v-for="r in chatStore.availableRooms" :key="r.id" :room="r"/>
    </div>
</template>

<script lang="ts" setup>
    import RoomsItem from './RoomsItem.vue';
    import {onMounted} from 'vue';
    import { useInterfaceStore } from '@/stores/interface';
    import { useChatStore } from '@/stores/chat';

    const store = useInterfaceStore();
    const chatStore = useChatStore();

    onMounted(chatStore.updateAvailable)
</script>

<style scoped>
        #roomsContainer{
            position: relative;
            width: 100%;
            height: 100%;
        }
        #rooms{
            position: relative;
            width: 100%;
            overflow-y: scroll;
            overflow-x: hidden;
            transition: max-height 0.5s ease; 
        }
        
        #rooms::-webkit-scrollbar {
            left:100px;
            width: 10px;
            padding: 10px;
        }

        #rooms::-webkit-scrollbar-track {
            background: #ffffff20;
        }

        #rooms::-webkit-scrollbar-thumb {
            background: rgba(79, 17, 81, 0.995);
            border-radius: 10px;
        }

        #createRoom{
            position: relative;
            width: calc(100% - 10px);
            height: 70px;
            display: flex;
            align-items: center;
            padding: 0 10px;
            cursor: pointer;
            transition: background-color 0.2s ease;
            font-size: 20px;
            margin-left: 10px;
            border-radius: 30px;
        }

        #createIcon{
            position: relative;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.4);
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 10px;
        }

        #createRoom:hover{
            background-color: rgba(255, 255, 255, 0.4);
        }

</style>