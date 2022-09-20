<template>
    
    <div id="sidebg" :class="[chat ? 'active' : '']">
        <div @click="toggleSide" id="slidebutton">
            <fa v-if="chat" icon="angle-left"/>
            <fa v-else icon="angle-right"/>
        </div>
        <Transition name="slide-fade">
            <MessageBox v-if="interfaceStore.activeChat"></MessageBox>
            <div id="gridContainer" v-else>
                <SidebarProfileItem/>
                <SidebarfriendsItem/>
                <SidebarMsgItem/>
                <SidebarRoomsItem/>
            </div>
        </Transition> 
        
    </div>
</template>

<script setup>
    import {ref} from 'vue';
    import SidebarProfileItem from './SidebarProfileItem.vue';
    import SidebarfriendsItem from './SidebarfriendsItem.vue';
    import SidebarMsgItem from './SidebarMsgItem.vue';
    import SidebarRoomsItem from './SidebarRoomsItem.vue';
    import MessageBox from './MessageBox.vue';
    import {useInterfaceStore} from '@/stores/interface';
    let interfaceStore = useInterfaceStore();

    let chat= ref(true)
    function toggleSide(){
        chat.value = !chat.value
    }
    // console.log(activeChat)
</script>

<style scoped>

    #gridContainer{
        display: grid;
        grid-template-columns: 100%;
        z-index: 11;
    }

    #sidebg{
        min-width: 400px; 
        position: absolute;
        top: 0;
        right: 0;
        background-color: rgba(123,51,125, 0.7);
        width: 20vw;
        height: 100%;
        transition: all 0.7s ease;
    }
    .active{
        transform: translateX(100%);
    }

    #slidebutton{
        width: 70px;
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