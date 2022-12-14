<template>
    <div id="gameContainer">
        <div id="gameHeader">
            <img src="../assets/pong-online.png" alt="" @click="router.push('/')"/>
            <p @click="router.push('/')" id="backHome"><fa icon="chevron-left"/>Home</p>
        </div>
        <div id="players">
            <div class="player">
                <div id="playerImg" :v-if="player1.imgPath" :style="`background-image: url('${player1.imgPath}')`"></div>
                <div id="playerName">{{player1.name}}</div>
            </div>
            <div class="player">
                <div id="playerImg" :v-if="player2.imgPath" :style="`background-image: url('${player2.imgPath}')`"></div>
                <div id="playerName">{{player2.name}}</div>
            </div>
        </div>
        <div ref="game" id="game"></div>
    </div>
</template>

<script lang="ts" setup>
    import {onMounted, onUnmounted, ref, nextTick} from 'vue';
    import { useUserStore } from '@/stores/user'
    import { $api } from '@/axios';
    import {s,disconnectSocket,setMetadata,connectSocket,socket} from '@/p5game';
    import p5 from 'p5';
    import { useRouter, useRoute } from 'vue-router'
    import { useToast } from 'vue-toastification';

    const game = ref();
    const route = useRoute()
    const store = useUserStore();
    const toast = useToast();
    console.log(route.query.mode);
    const router = useRouter();
    const player1 = ref({name:"loading", imgPath:""});
    const player2 = ref({name:"loading", imgPath:""});
    
    onMounted(async () => {
        try{
            store.user = (await $api.get('/user/me')).data;
        }
        catch(e){
            toast.error('Failed to fetch user data');
            router.push('/login');
        }
        new p5(s, game.value);
        await nextTick()

        setTimeout(() => {
        
            connectSocket()


            if (route.query.mode === "classic" || route.query.mode === "modern")
                setMetadata(0, route.query.mode)
            else if (route.query.mode === "watch")
                setMetadata(route.query.id, route.query.mode)
            else if (route.query.mode === "private")
                setMetadata(route.query.id, route.query.mode)
            

            socket.on("setPlayers", (data:any)=>{
                player1.value = {name:data.player1Name, imgPath:data.player1Img};
                player2.value = {name:data.player2Name, imgPath:data.player2Img};
            })
        }, 40);

    });
    onUnmounted(async () => {
        disconnectSocket()
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
        max-width: 1300px;
        width: calc(100% - 100px);
        margin: 0 auto;
    }

    #gameHeader{
        display: flex;
        justify-content: center;
        align-items: flex-start;
        height: 200px;
        max-width: 1300px;
        width: calc(100% - 100px);
        margin: 0 auto;
        position: relative;
    }

    #playerImg{
        height: 100%;
        margin: 10px auto;
        background-size: cover;
        background-position: center;
    }

    #gameHeader > img{
        height: 100%;
        cursor: pointer;
    }

    #backHome{
        position: absolute;
        top: 0;
        left: 0;
        margin: 20px;
        font-size: 20px;
        cursor: pointer;
    }


</style>
