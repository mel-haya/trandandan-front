<template>
    <div id="messagesContainer" @click="enableDiv">
        <p id="msgHeader"> <fa :icon="icon"/> Messages</p>
    </div>
    <div id="messages" :style="`max-height:${scale}px`">
            <channelPreviewItem :message="message"/>
            <channelPreviewItem :message="message2"/>
            <channelPreviewItem :message="message"/>
            <channelPreviewItem :message="message"/>
            <channelPreviewItem :message="message"/>
            <channelPreviewItem :message="message"/>
            <channelPreviewItem :message="message"/>
        
    </div>
    
</template>

<script setup>
    import channelPreviewItem from './channelPreviewItem.vue';
    import {ref} from 'vue';
    let message = {
        id: 1,
        body: "Chms",
        channel: {id:500, name:"Mouad", type: 1},
        online: true
        
    };
    let message2 = {
        id: 2,
        body: "Hop on valorant",
        channel: {id:501, name:"ADHD and retarded group", type: 2}, 
        online: true
    };
    let enable = ref(true);
    let icon = ref("caret-right");
    let scale = ref(260);
    function enableDiv(){
        enable.value = !enable.value;
        if(enable.value){
            scale.value = 260;
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


</style>