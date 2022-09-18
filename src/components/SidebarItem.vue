<template>
    
    <div id="sidebg" :class="[chat ? 'active' : '']">
        <div @click="toggleSide" id="slidebutton">
            <fa v-if="chat" icon="angle-left"/>
            <fa v-else icon="angle-right"/>
        </div>
        <div id="gridContainer">
            <SidebarProfileItem/>
            <SidebarfriendsItem/>
            <SidebarMsgItem/>
            <SidebarRoomsItem/>
        </div>
        <transition name="">

        </transition>  
    </div>
</template>

<script setup>
    import {ref} from 'vue';
    import SidebarProfileItem from './SidebarProfileItem.vue';
    import SidebarfriendsItem from './SidebarfriendsItem.vue';
    import SidebarMsgItem from './SidebarMsgItem.vue';
    import SidebarRoomsItem from './SidebarRoomsItem.vue';
    let chat= ref(true)
    function toggleSide(){
        chat.value = !chat.value
    }
</script>

<style scoped>

    #gridContainer{
        display: grid;
        grid-template-columns: 100%;
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
    

</style>