<template>
    <div id="message" class="gameInvite" v-if="Props.message?.type === 'invite'">
        <h1>Game Invite</h1>
        <p>{{Props.message.author}} Created a game</p>
        <div id="joinGameBtn" @click="router.push(Props.message?.content)">Join game</div>
    </div>


    <div id="message" :class="Props.message.from" v-else>
        <p id="author">{{Props.message.author}}</p>
        <p>{{Props.message?.content}}</p>
    </div>
</template>

<script lang="ts" setup>
    import {defineProps} from 'vue'
    import {useRouter} from 'vue-router'

    const router = useRouter()
    let Props = defineProps({
        message: {
            type: Object,
            required: true
        }
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

    .gameInvite{
        max-width: 70%;
        align-self: center;
        border-radius: 15px;
        background: rgb(97, 37, 226);
        color : white;
    }

    .gameInvite h1{
        font-size: 24px;
        font-weight: bolder;
        margin: 0px;
    }

    .gameInvite p{
        font-size: 18px;
        margin: 0px;
    }

    #joinGameBtn{
        background: #248bf5;
        border-radius: 15px;
        padding: 10px;
        margin: 10px 0px;
        cursor: pointer;
        text-align: center;
        
    }

    #joinGameBtn:active{
        background: #248bf5b3;
    }


</style>