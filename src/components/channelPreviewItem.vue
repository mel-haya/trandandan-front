<template>
    <div id="msgItem">
        <div id="senderName">
            <p>{{props.message.channel}} <span id="status" :style="`background: ${props.message.status}?green:grey`"></span></p>
            
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
        margin: 10px 0;
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
        background-color: rgb(0, 255, 0);
        display: inline-block;
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
        font-size: 15px;
        font-weight: 600;
        text-align: left;
        color: white;
    }


</style>