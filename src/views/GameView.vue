<template>
    <div id="gameContainer">
        <div id="gameHeader" @click="router.push('/')">
            <img src="../assets/pong-online.png" alt=""/>
        </div>
        <div id="players">
            <div class="player">
                <div id="playerImg"></div>
                <div id="playerName">Player1</div>
            </div>
            <div class="player">
                <div id="playerImg"></div>
                <div id="playerName">Player2</div>
            </div>
        </div>
        <div ref="game" id="game"></div>
    </div>
</template>

<script lang="ts" setup>
    import {onMounted, onUnmounted, ref} from 'vue';
    import {$token} from '@/axios';
    import {s,iio} from '@/p5game';
    import p5 from 'p5';
    import { useRouter, useRoute } from 'vue-router'

    const game = ref();
    const route = useRoute()
    console.log(route.query.mode);
    const router = useRouter();
    //console.log(userStore.user)
    onMounted(() => {
        iio.connect();
        if (route.query.mode === "classic" || route.query.mode === "modern")
            iio.emit('getIDS', {token:$token, id:0, socket:"", room:"", mode:route.query.mode, pos:0})
        else if (route.query.mode === "watch")
            iio.emit('getIDS', {token:$token, id:route.query.id, socket:"", room:"", mode:route.query.mode, pos:0})
        else if (route.query.mode === "private")
            iio.emit('getIDS', {token:$token, id:route.query.id, socket:"", room:"", mode:route.query.mode, pos:0})

        new p5(s, game.value);
    });
    onUnmounted(async () => {
        iio.emit("disc", "");
    });
</script>

<style scoped>
    #game{
        height: 100%;
        display: flex;
        justify-content: center;
    }

    .player{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 50%;
    }

    .player > #playerImg{
        width: 70px;
        height: 70px;
        background-color: rgb(157, 157, 157);
        border-radius: 50%;
    }

    .player > #playerName{
        margin-top: 10px;
        font-size: 20px;
    }

    #players{
        display: flex;
        margin-top: -50px;
    }

    #gameHeader{
        display: flex;
        justify-content: center;
        align-items: flex-start;
        height: 150px;
    }

    #gameHeader > img{
        height: 100%;
        margin: 10px auto;
        cursor: pointer;
    }

</style>