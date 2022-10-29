<template>
    <div id="gameContainer">
        <div id="gameHeader" @click="router.push('/')">
            <img src="../assets/pong-online.png" alt=""/>
        </div>
        <div id="players">
            <div class="player">
                <div id="playerName">{{player1}}</div>
            </div>
            <div class="player">
                <div id="playerName">{{player2}}</div>
            </div>
        </div>
        <div ref="game" id="game"></div>
    </div>
</template>

<script lang="ts" setup>
    import {onMounted, onUnmounted, ref, nextTick} from 'vue';
    import { useUserStore } from '@/stores/user'
    import { $api } from '@/axios';
    import {s,disconnectSocket,setMetadata,connectSocket,iio} from '@/p5game';
    import p5 from 'p5';
    import { useRouter, useRoute } from 'vue-router'
    import { useToast } from 'vue-toastification';

    const game = ref();
    const route = useRoute()
    const store = useUserStore();
    const toast = useToast();
    console.log(route.query.mode);
    const router = useRouter();
    const player1 = ref('Player1');
    const player2 = ref('Player2');
    
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
        connectSocket()

        
        // iio.connect();
        // if (iio.connected == false)
        // {
        //     toast.error("Something went wrong")
        //     router.push('/')
        // }
        // console.log(iio.connected);

        if (route.query.mode === "classic" || route.query.mode === "modern")
            setMetadata(0, route.query.mode)
        else if (route.query.mode === "watch")
            setMetadata(route.query.id, route.query.mode)
        else if (route.query.mode === "private")
            setMetadata(route.query.id, route.query.mode)
        
        iio.on("setPlayers", (data:any)=>{
            player1.value = data.player1Name
            player2.value = data.player2Name
            // player1.value = data.player1Img  // path of img
            // player2.value = data.player2Img  // path of img
        })

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
