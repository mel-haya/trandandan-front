<template>
    <div id="messagesContainer">
        <p id="msgHeader">Messages</p>
        
        <channelPreviewItem :message="message">

        </channelPreviewItem> 
    </div>
</template>

<script setup>
    import channelPreviewItem from './channelPreviewItem.vue';
    let message = {
        body: "l7abs",
        channel: "Mouad",
        status: "online"
    };
</script>

<style scoped>

    #messagesContainer{
        position: relative;
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
</style>