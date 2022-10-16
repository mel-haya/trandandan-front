<template>
    <div id="message" :class="Props.message?.from">
        <p id="author">{{Props.message?.author}}</p>
        <p>{{Props.message?.content}}</p>
    </div>
</template>

<script lang="ts" setup>
    import {defineProps} from 'vue'
    let Props = defineProps({
        message: Object,
    });
</script>

<style scoped>
    #message{
        max-width: 80%;
        margin: 10px;
        font-size: 20px;
        text-align: left;
        padding: 10px;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        width: fit-content;
        font-family: -apple-system, 
        BlinkMacSystemFont, 
        "Segoe UI", 
        Roboto, 
        Oxygen-Sans, 
        Ubuntu, 
        Cantarell, 
        "Helvetica Neue", 
        sans-serif;
        font-weight: normal;
    }

    #message p{
        word-wrap: break-word;
        position: relative;
    }

    .me{
        align-self: flex-end;
        background: #248bf5;
        border-bottom-left-radius: 15px;
    }

    .them{
        align-items: flex-start;
        background-color: #e5e5ea;
        border-bottom-right-radius: 15px;
        color: black;
    }

    #author{
        font-size: 12px;
        font-weight: bolder;
        margin-bottom: 5px;
        color: #248bf5;
    }
    .me #author{
        display: none;
    }

</style>