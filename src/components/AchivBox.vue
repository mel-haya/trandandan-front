<template>
    <div id="achivBg" @click="emits('close')">
        <div id="achivContainer" @click.stop="">
            <h1 id="achivTitle">Achievements</h1>
            <div id="achivBody">
                <div id="achivItem" v-if="props.player.totalWins >= 1">
                    <div id="achivImg" style="background-image: url('https://randomuser.me/api/portraits/men/3.jpg');"></div>
                    <div id="achivDesc">
                        <h2>WELCOME</h2>
                        <p>Win 1 game</p>
                    </div>
                </div>
                <div id="achivItem" v-if="props.player.totalDefeats >= 1">
                    <div id="achivImg" :style="`background-image:url('${require('@/assets/lose.png')}')`"></div>
                    <div id="achivDesc">
                        <h2>Ouch</h2>
                        <p>Lose 1 game</p>
                    </div>
                </div>
                <div id="achivItem" v-if="props.player.totalWins >= 10">
                    <div id="achivImg"></div>
                    <div id="achivDesc">
                        <h2>GGEZ</h2>
                        <p>Win 10 games</p>
                    </div>
                </div>
                <div id="achivItem" v-if="props.player.totalWins >= 50">
                    <div id="achivImg" :style="`background-image:url('${require('@/assets/50wins.png')}')`"></div>
                    <div id="achivDesc">
                        <h2>On fire</h2>
                        <p>Win 50 games</p>
                    </div>
                </div>
                <div id="achivItem" v-if="props.player.totalWins >= 100">
                    <div id="achivImg"></div>
                    <div id="achivDesc">
                        <h2>Champion</h2>
                        <p>Win 100 game</p>
                    </div>
                </div>
                <div id="achivItem" v-if="props.player.twofa === true">
                    <div id="achivImg" :style="`background-image:url('${require('@/assets/shield.png')}')`"></div>
                    <div id="achivDesc">
                        <h2>PROTECTED!</h2>
                        <p>Activate 2FA</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

    const emits = defineEmits(['close'])
    const props = defineProps({
        player: {
            type: Object,
            required: true
        }
    })
    onMounted(()=>{
        console.log(props.player)
    })
</script>

<style scoped>
    #achivBg
    {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 102;
    }
    #achivContainer
    {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 400px;
        height: 500px;
        background-color: red;
        border-radius: 10px;
        background-color: rgba(79, 17, 81, 0.9);
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);
        overflow: hidden;
    }

    #achivTitle{
        background-color: rgba(122, 51, 125, 0.995);
        height: 70px;
        line-height: 70px;
    }

    #achivItem{
        width: 100%;
        height: 100px;
        background-color: rgba(255,255,255,0.2);
        margin-bottom: 10px;
        display: flex;

    }

    #achivImg{
        width: 100px;
        height: 100px;
        background-color: red;
        float: left;
        background-size: cover;
        background-position: center;
    }

    #achivDesc{
        width: calc(100% - 100px);
        height: 100px;
        background-color: rgba(255,255,255,0.2);
        float: left;   
    }

    #achivDesc h2{
        font-size: 30px;
        text-align: left;
        padding-left: 10px;
    }

    #achivDesc p{
        font-size: 20px;
        text-align: left;
        padding-left: 10px;
    }

    #achivBody{
        width: 100%;
        height: calc(100% - 70px);
        overflow-y: auto;
        padding: 10px;
    }

</style>