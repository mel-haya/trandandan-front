<template>
    <div id="roomsContainer" @click="enableDiv">
        <p id="roomsHeader"><fa :icon="icon" /> Groups</p>
    </div>
    <div id="rooms" :style="`max-height:${scale}px`">
            <RoomsItem :room="room"/>
            <RoomsItem :room="room"/>
            <RoomsItem :room="room"/>
            <RoomsItem :room="room"/>
            <RoomsItem :room="room"/>
            <RoomsItem :room="room"/>
            <RoomsItem :room="room"/>
            <RoomsItem :room="room"/>
    </div>
</template>

<script setup>
    import RoomsItem from './RoomsItem.vue';
    import {ref} from 'vue';
    let room = {name: "Room 1", members: 5};
    let enable = ref(true);
    let icon = ref("caret-right");
    let scale = ref(320);
    function enableDiv(){
        enable.value = !enable.value;
        if(enable.value){
            scale.value = 320;
            icon.value = "caret-down";
        }else{
            scale.value = 0;
            icon.value = "caret-right";
        }
    }
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
            background-color: rgba(122, 51, 125, 0.995);
        }
        #rooms{
            position: relative;
            width: 100%;
            overflow-y: scroll;
            overflow-x: hidden;
            transition: max-height 0.5s ease; 
        }
        
        #rooms::-webkit-scrollbar {
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
</style>