<template>  
    <div id="sidebg" :class="[store.enableSidebar ? 'active' : '']">
        <div @click="store.toggleSidebar(); chatStore.updateChat(0)" id="slidebutton">
            <fa v-if="store.enableSidebar" icon="angle-left"/>
            <fa v-else icon="angle-right"/>
        </div>
        <div id="gridContainer">
            <SidebarProfileItem/>
            <SidebarfriendsItem/>
            <div id="selectChat">
                <div :class="(active === 'messages' ? 'activeBtn': '') + ' selectBtn'" id="msgBtn" @click="toggleActive('messages')">Messages</div>
                <div :class="(active === 'groups' ? 'activeBtn': '') + ' selectBtn'" id="roomsBtn" @click="toggleActive('groups')">Groups</div>
            </div>
            <SidebarMsgItem v-if="active == 'messages'"/>
            <SidebarRoomsItem v-else/>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import SidebarProfileItem from './SidebarProfileItem.vue';
    import SidebarfriendsItem from './SidebarfriendsItem.vue';
    import SidebarMsgItem from './SidebarMsgItem.vue';
    import SidebarRoomsItem from './SidebarRoomsItem.vue';
    import {useInterfaceStore} from '@/stores/interface';
    import {useChatStore} from '@/stores/chat';
    import {ref} from 'vue';
    import type {Ref} from 'vue';

    const store = useInterfaceStore();
    const chatStore = useChatStore();
    const active:Ref<String> = ref('messages');

    function toggleActive(mode:String){
        active.value = mode;
        chatStore.updateJoined();
        chatStore.updateAvailable();
    }
    
</script>

<style scoped>

    #gridContainer{
        display: grid;
        grid-template-columns: 100%;
        z-index: 11;
        height: 100vh;
        grid-template-rows: auto auto auto 1fr;
    }

    #sidebg{
        width: 450px;
        position: absolute;
        top: 0;
        right: 0;
        background-color: rgba(123,51,125, 0.7);
        height: 100%;
        transition: all 0.3s ease;
    }
    .active{
        transform: translateX(100%);
    }

    #slidebutton{
        width: 50px;
        aspect-ratio : 1/2;
        position: absolute;
        top: 50%;
        transform: translate(-100%,-50%);
        left: 0;
        font-size: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(123,51,125, 0.7);
        border-radius: 20px 0 0 20px;
    }
    

    .slide-fade-enter-active {
        transition: all 0.3s ease-out;
    }

    .slide-fade-leave-active {
        transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
        transform: translateX(100%);
        opacity: 0;
    }

    #selectChat{
        position: relative;
        font-size: 20px;
        font-weight: 600;
        text-align: left;
        background: linear-gradient(0deg, rgba(61,15,64,1) 0%, rgb(104, 37, 106) 41%, rgb(142, 51, 145) 100%);
        
    }

    .selectBtn{
        width: 50%;
        display: inline-block;
        text-align: center;
        padding: 20px;
        cursor: pointer;
        font-size: 24px;

    }



    .activeBtn{
        background: linear-gradient(0deg, rgb(82, 20, 86) 0%, rgb(69, 25, 72) 50%, rgb(69, 25, 72) 100%);
        background-color: rgb(69, 25, 72);
    }


</style>