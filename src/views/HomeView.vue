<script setup>
/* eslint-disable */
    import { useUserStore } from '@/stores/user'
    import { storeToRefs } from 'pinia'
    import Cookies from 'js-cookie'
    import SidebareItem from '@/components/SidebarItem.vue'
    import axios from 'axios';
    import ProfileItem from '@/components/ProfileItem.vue';
import { onMounted } from 'vue';

    const store = useUserStore()
    const {username, imgUrl } = storeToRefs(store)
    let token = Cookies.get('accessToken')
    if(username.value == ""){
        const config = {
            headers: { "Authorization": `Bearer ${token}` }
        };
        axios.get('http://localhost:3000/user/profile', config)
            .then(response => {
                username.value = response.data.username;
                imgUrl.value = response.data.imageUrl;
            })
            .catch(error => {
                
            })
    }
    var audio = new Audio(require('../assets/hover1.mp3'));
  
    function hoverAudio(){
        audio.play();
    }
</script>

<template>
    <!--  -->
        <!-- <div id="header">
            <div id="profile">
                <div id="profileImg" :style='`background: url(${imgUrl}); background-size:cover;`'></div>
            </div>
        </div> -->
        
        <div id="menuWrapper">
            <div id="logo"></div>
            <div @click="hoverAudio" id="playBtn" class="menuBtn"><span>PLAY</span></div>
            <div @click="hoverAudio" id="watchBtn" class="menuBtn"><span>WATCH</span></div>
            <div @click="hoverAudio" id="leaderboardBtn" class="menuBtn"><span>LEADERBOARD</span></div>
            <!-- <ProfileItem></ProfileItem> -->
        </div>
    <SidebareItem></SidebareItem>
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
        /* background-color: #FF0FBB; */
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
        user-select: none;
    }

    .menuBtn:hover{
        font-size: 30px;
        text-shadow: 3px 3px 2px rgba(0, 0, 0, 0.5);
    }
    .menuBtn::before{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 5%;
        height: 100%;
        transition: all 0.4s ease-in-out;
        background-color: #7a337d;
    }

    .menuBtn:hover::before{
        background-color: #a942ac;
        width: 100%;
        box-shadow: #7a337d 0px 0px 20px 10px; 
    }


</style>