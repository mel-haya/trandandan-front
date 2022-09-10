<script setup>
/* eslint-disable */
    import { useUserStore } from '@/stores/user'
    import { storeToRefs } from 'pinia'
    import Cookies from 'js-cookie'
    import SidebareItem from '@/components/SidebarItem.vue'
    import axios from 'axios';
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
                console.log(error)
            })
    }
    console.log(username.value);
    // console.log(this.$cookies.isKey('test'))
    
</script>


<template>
    <!--  -->
    <div id="contentwrapper">
        <div id="header">
            <div id="logo">
            </div>
            <div id="profile">
                <div id="profileName">
                    <p>{{username}}</p>
                </div>
                <div id="profileImg" :style='`background: url(${imgUrl}); background-size:cover;`'>
                    <!-- <img :src="imgUrl" alt=""> -->
                </div>
                
            </div>
        </div>
        <div id="gridWrapper">
            <div id="gameMenu"></div>
            <div id="currplayed"></div>
            <div id="leaderboard"></div>
        </div>
    </div>
</template>

<style  scoped>

    #header{
        position: absolute;
        top: 0px;
        width: 100%;
        height: 15%;
        /* background-color: #FF0FBB;*/
    }
    #logo{
        position: absolute;
        min-width: 250px;
        width: 50%;
        height: 100%;
        text-align: left;
        background-image: url('../assets/pong-online.png');
        background-repeat: no-repeat;
        background-size: contain;
        /* background-color: #FF0FBB; */
    }
    #logo img{
        width: 70%;
    }

    #contentwrapper
    {
        position: relative;
        top: 20px;
        width: 85%;
        height: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
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
    #profileName
    {
        padding: 10px;
        text-align: left;
        font-size: 24px;
        display: flex;
        align-items: center;
    }

    #gridWrapper{
        position: absolute;
        top: 20%;
        width: 100%;
        height: 75%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 2fr 1fr;
        grid-template-areas: 
        "gameMenu leaderboard"
        "currplayed leaderboard";
        grid-gap: 25px;

    }

    #gameMenu{
        grid-area: gameMenu;
        background-color: #FF0FBB;
        border-radius: 20px;
    }

    #currplayed{
        grid-area: currplayed;
        background-color: green;
        border-radius: 20px;
    }

    #leaderboard{
        grid-area: leaderboard;
        background-color: yellow;
        border-radius: 20px;
    }

</style>