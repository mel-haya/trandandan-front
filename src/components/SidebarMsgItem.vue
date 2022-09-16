<template>
    <div id="messagesContainer">
        <p id="msgHeader">Messages</p>
    </div>
    <div id="messages">
            <channelPreviewItem :message="message"/>
            <channelPreviewItem :message="message"/>
            <channelPreviewItem :message="message"/>
            <channelPreviewItem :message="message"/>
            <channelPreviewItem :message="message"/>
            <channelPreviewItem :message="message"/>
            <channelPreviewItem :message="message"/>
            <channelPreviewItem :message="message"/>
            <channelPreviewItem :message="message"/>
            <channelPreviewItem :message="message"/>
            <channelPreviewItem :message="message"/>
        </div>
</template>

<script setup>
    import channelPreviewItem from './channelPreviewItem.vue';
    let message = {
        body: "Chms",
        channel: "Mouad",
        online: true
    };
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
    }

    #messages::-webkit-scrollbar {
        width: 0px;
    }


</style>