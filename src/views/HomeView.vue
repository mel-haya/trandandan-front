<script lang="ts" setup>
    import { useUserStore } from '@/stores/user'
    import { storeToRefs } from 'pinia'
    import SidebareItem from '@/components/SidebarItem.vue'
    import {$api} from '@/axios';
    import ProfileItem from '@/components/ProfileItem.vue';
    import { reactive } from 'vue';
    import { useRouter } from 'vue-router';
    import MessageBox from '@/components/MessageBox.vue';
    import {useInterfaceStore} from '@/stores/interface';
    import FriendSearchItem from '@/components/FriendSearchItem.vue';
import ChannelCreateBox from '@/components/ChannelCreateBox.vue';

    let interfaceStore = useInterfaceStore();
    const router = useRouter();
    const store = useUserStore();
    const {user} = storeToRefs(store)
    let test = reactive({
        a:"PLAY",
        b:"WATCH",
        c:"LEADERBOARD"
    })
    if(user.value === null){
        $api.get('user/me')
            .then((response:any) => {
                user.value = response.data;
            })
    }
    var audio = new Audio(require('../assets/hover1.mp3'));
    function firstButton(){
        audio.play();
        if(test.a === "PLAY")
        {
            test.a = "EASY";
            test.b = "HARD";
            test.c = "RETURN";
        }
        else
            router.push('/play') 
    }
    function secondButton(){
        audio.play();
        if(test.b === "WATCH")
            router.push('/watch')
        else
            router.push('/play')
    }
    function thirdButton(){
        audio.play();
        if(test.c === "RETURN")
        {
            test.a = "PLAY";
            test.b = "WATCH";
            test.c = "LEADERBOARD";
        }
        else
        {
            router.push('/leaderboard')
        }
    }

</script>

<template>
    <div id="menuWrapper">
        <div id="logo"></div>
        <div @click="firstButton" id="playBtn" class="menuBtn"><span>{{test.a}}</span></div>
        <div @click="secondButton" id="watchBtn" class="menuBtn"><span>{{test.b}}</span></div>
        <div @click="thirdButton" id="leaderboardBtn" class="menuBtn"><span>{{test.c}}</span></div>
    </div>
    <SidebareItem/>
    <MessageBox v-if="interfaceStore.activeChat"/>
    <ProfileItem v-if="interfaceStore.activeProfile !== 0"/>
    <FriendSearchItem v-if="interfaceStore.enableSearch"/>
    <ChannelCreateBox v-if="interfaceStore.enableChannelCreate"/>
</template>

<style  scoped>

    #logo{
        width: 50%;
        min-height: 250px;
        height: 35vh;
        text-align: left;
        background-image: url('@/assets/pong-online.png');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
    }
    #profile
    {
        position: absolute;
        right: 0;
        width: 50%;
        min-width: 250px;
        height: 90%;
        display: flex;
        justify-content: flex-end;
    }
    #profileImg
    {
        aspect-ratio: 1/1;
        text-align: left;
        border-radius: 100vh;
    }

    #profileImg img
    {
        width: 100%;
        height: auto;
        border-radius: 100vw;
    }

    #menuWrapper{
        position: absolute;
        top: 15%;
        width: 100%;
        height: 75%;
        display: flex;
        flex-direction: column;
        align-items: center;

    }
    .menuBtn{
        position: relative;
        max-width: 350px;
        width: 40%;
        height: 60px;
        line-height: 60px;
        text-align: center;
        cursor: pointer;
        font-family: 'B612 Mono', sans-sarif;
        font-size: 24px;
        border-top: #7B337D solid 2px;
        border-right: #7B337D solid 2px;
        border-bottom: #7B337D solid 2px;
        margin: 10px 0;
        transition: all 0.4s ease;
        transform: skew(30deg);
    }

    .menuBtn span{
        transform: skew(-30deg);
        display:inline-block;
    }

    .menuBtn:hover{
        font-size: 30px;
        text-shadow: 3px 3px 2px rgba(0, 0, 0, 0.5);
    }
    .menuBtn::before{
        content: "";
        position: absolute;
        top: -2px;
        left: 0;
        width: 5%;
        height: 60px;
        transition: all 0.3s ease-in-out;
        background-color: #7a337d;
    }

    .menuBtn:hover::before{
        background-color: #a942ac;
        width: calc(100% + 2px);
        box-shadow: #7a337d 0px 0px 20px 10px; 
    }
</style>