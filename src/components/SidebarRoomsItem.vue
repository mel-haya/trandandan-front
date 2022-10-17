<template>
    <div id="roomsContainer" @click="enableDiv">
        <p id="roomsHeader"><fa :icon="icon" /> Groups</p>
    </div>
    <div id="rooms" :style="`max-height:${scale}px`">
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
    import {onMounted, ref} from 'vue';
    import { useInterfaceStore } from '@/stores/interface';
    import { useChatStore } from '@/stores/chat';
    const store = useInterfaceStore();
    const enable = ref(true);
    const chatStore = useChatStore();

    let icon = ref("caret-right");
    let scale = ref(330);
    function enableDiv(){
        enable.value = !enable.value;
        if(enable.value){
            scale.value = 330;
            icon.value = "caret-down";
        }
        else{
            scale.value = 0;
            icon.value = "caret-right";
        }
    }

    onMounted(() => {
        chatStore.updateAvailable();

    })
</script>

<style scoped>
        #roomsContainer{
            position: relative;
            width: 100%;
        }
        #roomsHeader{
            position: relative;
            font-size: 20px;
            font-weight: 600;
            color: white;
            text-align: left;
            padding: 10px;
            background: linear-gradient(0deg, rgba(61,15,64,1) 0%, rgba(105,39,110,1) 41%, rgba(122,51,125,1) 100%);
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