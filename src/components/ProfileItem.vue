<template>
    <div id="profileContainer">
        <div id="profileHeader">Player profile</div>
        <div id="closeButton">
            <fa icon="xmark"/>
        </div>
        <div id="profileBody">
            <div id="userImg"></div>
            <div id="userInfo">
                <p>Alejandro <span id="userStatus"></span> </p>
                <p>level: 5</p>
                <div id="addFriendButton">
                    <fa icon="user-plus"/>
                </div>
                <div id="blockUserButton">
                    <fa icon="user-xmark"/>
                </div>
            </div>
            <div id="userAchiv"></div>
            <div id="matchHistory"></div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>


    #profileContainer{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        max-width: 1200px;
        width: 80%;
        aspect-ratio: 5/3;
        background-color: rgba(123, 51, 125, 0.9);
        transition: all 0.7s ease;
        border-radius: 20px;
        overflow: hidden;
    }
    #closeButton{
        position: absolute;
        top: 20px;
        left: 20px;
        width: 75px;
        aspect-ratio: 1/1;
        background: #C70000;
        border-radius: 10px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;

    }
    #profileHeader{
        position: absolute;
        top: 20px;
        width: 100%;
        height: 75px;
        line-height: 75px;
        text-align: center;
    }
    #profileBody::-webkit-scrollbar {
        display: none;
    }
    #profileBody{
        position: absolute;
        top: 120px;
        left: 30px;
        width: calc(100% - 60px);
        height: calc(100% - 150px);
        background-color: rgb(149, 60, 152);
        border-radius: 20px;
        overflow: scroll;
        scrollbar-width: none;
    }
    #userImg{
        background-color: rgba(255, 255, 255, 0.9);
        border-radius: 10px;
        position: absolute;
        top: 20px;
        left: 20px;
        width: 130px;
        height: 130px;
        background-image: url('../assets/bruh.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        border: rgba(149, 60, 152, 0.9) 10px ridge; 
    }
    
    #userInfo{
        border-radius: 10px;
        position: absolute;
        top: 20px;
        left: 190px;
        width: 150px;
        height: 150px;
    }

    #userInfo p{
        padding-left: 10px;
        padding-top: 10px;
        text-align: left;
        font-size: 24px;
        color: white;
    }

    #userStatus{
        background-color: #0f0;
        border-radius: 10px;
        width: 10px;
        height: 10px;
        display: inline-block;
    }
    #userAchiv{
        background-color: rgba(255, 255, 255, 0.9);
        border-radius: 10px;
        position: absolute;
        top: 20px;
        right: 20px;
        height: 150px;
        width: calc(100% - 410px);
        background-color: #4242427c;
    }
    #matchHistory{
        background-color: rgba(255, 255, 255, 0.9);
        border-radius: 10px; 
        width: calc(100% - 40px);
        height: calc(100% - 220px);
        position: absolute;
        top: 200px;
        left: 20px;
        background-color: #4242427c;
    }

    #blockUserButton{
        position: absolute;
        bottom: 0px;
        left: 60px;
        width: 50px;
        aspect-ratio: 1/1;
        color: #f00;
        border-radius: 50px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: large;
        background: #B4B4B47F;
    }

    #addFriendButton{
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 50px;
        aspect-ratio: 1/1;
        color: #0f0;
        border-radius: 50px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: large;
        background: #B4B4B47F;
    }
    @media (max-height: 720px) {
        #closeButton {
            font-size: 50%;
            top: 10px;
            left: 10px;
            width: 50px;
            aspect-ratio: 1/1;
        }
        #profileHeader {
            font-size: 75%;
            top: 10px;
            height: 50px;
            line-height: 50px;
        }
        #profileBody {
            top: 80px;
            left: 20px;
            width: calc(100% - 40px);
            height: calc(100% - 100px);
        }
        #profileContainer {
            width: 90%;
            height: 80%;
        }
    }

</style>