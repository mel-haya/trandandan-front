<template>
    <div id="messagesContainer" @click="enableDiv">
        <p id="msgHeader"> <fa :icon="icon"/> Messages</p>
    </div>
    <div id="messages" :style="`height:${scale}px`">
            <channelPreviewItem :message="message"/>
            <channelPreviewItem :message="message"/>
            <channelPreviewItem :message="message"/>
        
    </div>
    
</template>

<script setup>
    import channelPreviewItem from './channelPreviewItem.vue';
    import {ref} from 'vue';
    let message = {
        body: "Chms",
        channel: "Mouad",
        online: true
    };
    let enable = ref(false);
    let icon = ref("caret-right");
    let scale = ref(0);
    function enableDiv(){
        enable.value = !enable.value;
        if(enable.value){
            scale.value = 340;
            icon.value = "caret-down";
        }else{
            scale.value = 0;
            icon.value = "caret-right";
        }
    }
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
        background-color: rgba(122, 51, 125, 0.995);
    }

    #messages{
        position: relative;
        width: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        height: 340px;
        transition: all 0.5s ease; 
    }

    #messages::-webkit-scrollbar {
        width: 0px;
    }


</style>