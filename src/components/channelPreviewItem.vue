<template>
    <div id="msgItem">
        <div id="senderName">
            <p>{{props.message.channel}}</p>
            <div id="status" :style="`background: ${props.message.status}?green:grey`"></div>
        </div>
        <div id="msgBody">
            <p>{{props.message.body}}</p>
        </div>
    </div>
</template>

<script setup>
    import {defineProps} from 'vue'
    const props = defineProps({
        message:
        {
            required: false
        }
    })
</script>

<style scoped>
    #msgItem{
        position: relative;
        width: 100%;
        height: 100px;
        background-color: rgba(255, 255, 255, 0.399);
    }
    #senderName{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
    }
    #senderName p{
        font-size: 20px;
        font-weight: 600;
        color: white;
    }
    #status{
        width: 10px;
        height: 10px;
        border-radius: 100vw;
        background-color: green;
    }
    #msgBody{
        position: absolute;
        top: 40px;
        left: 0;
        width: 100%;
        height: 60px;
        padding: 10px;
    }
    #msgBody p{
        font-size: 20px;
        font-weight: 600;
        color: white;
    }


</style>