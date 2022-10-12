<template>  
    <div id="sidebg" :class="[store.enableSidebar ? 'active' : '']">
        <div @click="store.toggleSidebar(); chatStore.activeChat = null" id="slidebutton">
            <fa v-if="store.enableSidebar" icon="angle-left"/>
            <fa v-else icon="angle-right"/>
        </div>
        <div id="gridContainer">
            <SidebarProfileItem/>
            <SidebarfriendsItem/>
            <SidebarMsgItem/>
            <SidebarRoomsItem/>
        </div>
    </div>
</template>

<script setup>
    // import {ref} from 'vue';
    import SidebarProfileItem from './SidebarProfileItem.vue';
    import SidebarfriendsItem from './SidebarfriendsItem.vue';
    import SidebarMsgItem from './SidebarMsgItem.vue';
    import SidebarRoomsItem from './SidebarRoomsItem.vue';
    import {useInterfaceStore} from '@/stores/interface';
    import {useChatStore} from '@/stores/chat';
    const store = useInterfaceStore();
    const chatStore = useChatStore();
    
</script>

<style scoped>

    #gridContainer{
        display: grid;
        grid-template-columns: 100%;
        z-index: 11;
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


</style>