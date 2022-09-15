<template>
    
    <div id="sidebg" :class="[state ? 'active' : '']">
        <div @click="toggleSide" id="slidebutton">
            <fa v-if="state" icon="angle-left"/>
            <fa v-else icon="angle-right"/>
        </div>
        <SidebarProfileItem/>
        <SidebarfriendsItem/>
        <SidebarMsgItem/>
    </div>
</template>

<script setup>
    import {ref} from 'vue'
    import SidebarProfileItem from './SidebarProfileItem.vue';
    import SidebarfriendsItem from './SidebarfriendsItem.vue';
    import SidebarMsgItem from './SidebarMsgItem.vue';
    let state= ref(true)
    function toggleSide(){
        state.value = !state.value
    }
</script>

<style scoped>
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