<template>
    <div id="profileBg" @click="closeDiv">
        <div id="profileContainer" @click = "enableMenu = false">
            <div id="profileHeader">
                <div id="userImg" :style="`background-image: url('${profile?.profile.imgPath}')`"><div id="userStatus"></div></div>
            </div>
            <div id="profileMenu" v-if="enableMenu">
                <p class="text-red">Block</p>
                <p>Invite to a game</p>
            </div>
            <div id="userInfo">
                <p>{{profile?.profile.displayName}}</p>
                <div id="reqBtn">Send friend request</div>
                <div id="settings-icon" @click.stop="enableMenu = true">
                    <fa icon="ellipsis-vertical" />
                </div>
                
            </div>
            <div id="userBio">
                <div id="bioHeader">
                    <div :class="`bioBtn ${(activePointer === 0) ? 'activeBio' : ''}`" id="statsBtn" @click="loadStats" >Stats</div>
                    <div :class="`bioBtn ${(activePointer === 100) ? 'activeBio' : ''}`" id="historyBtn" @click="loadHistory" >History</div>
                    <!-- <div :class="`bioBtn ${(activePointer === 200) ? 'activeBio' : ''}`" id="achivBtn" @click="loadAchivements" >Achivements</div> -->
                    <div id="activePointer" :style="`transform: translateX(${activePointer}%)`"></div>
                </div>
                <div id="bioBody">
                    <div id="stats">
                        username: mel-haya <br/>
                        level: 10 <br/>
                        Games won: 8 / 50 <br/>
                        win streak: 3 <br/>
                    </div>
                </div>
            </div>
                
                     
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { useInterfaceStore } from '@/stores/interface';
    import { ref,onMounted } from 'vue';
    import { $api } from '@/axios'
    let store = useInterfaceStore();
    let profile:any = ref(null)
    let activePointer = ref(0);
    let enableMenu = ref(false);

    function loadStats(){
        // TODO: get stats from api
        activePointer.value = 0;
    }

    function loadHistory(){
        // TODO: get history from api
        activePointer.value = 100;
    }

    // function loadAchivements(){
    //     // TODO: get archivements from api
    //     activePointer.value = 200;
    // }

    function closeDiv(e:any){
        if(e.target.id === 'profileBg')
            store.setActiveProfile(0);
    }

    onMounted(() => {
        $api.get('user/profile/' + store.activeProfile)
            .then((response:any) => {
                profile.value = response.data;
                console.log(response)
            })
    })
</script>

<style scoped>
    #profileBg{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,0.8);
        z-index: 2;
    }

    #profileContainer{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 700px;
        height: 600px;
        background-color: rgb(149, 60, 152);
        transition: all 0.7s ease;
        border-radius: 10px;
        overflow: hidden;
    }

    #userImg{
        border-radius: 150px;
        position: absolute;
        bottom: -75px;
        left: 20px;
        width: 150px;
        height: 150px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        border: 10px solid rgb(149, 60, 152);
    }
    
    #userInfo{
        position: relative;
        height: 100px;
        margin-bottom: 10px;
    }

    #userInfo p{
        position: absolute;
        bottom: 0px;
        text-align: left;
        font-size: 24px;
        min-width: 190px;
        color: white;
        text-align: center;
    }

    #userStatus{
        background-color: #0f0;
        border-radius: 15px;
        width: 30px;
        height: 30px;
        
        display: inline-block;
        position: absolute;
        bottom: 0px;
        right: 0px;
        border: 5px solid grey;
    }

    #profileHeader{
        position: relative;
        width: 100%;
        height: 100px;
        background-color: rgb(99, 38, 101);
    }

    #reqBtn{
        position: absolute;
        bottom: 0px;
        right: 50px;
        padding: 10px 20px;
        background-color: rgb(0, 137, 23);
        border-radius: 10px;
        color: white;
        font-size: 16px;
        cursor: pointer;
    }

    #settings-icon{
        position: absolute;
        bottom: 0px;
        right: 0px;
        font-size: 30px;
        color: white;
        cursor: pointer;
        width: 50px;
    }

    #bioHeader{
        position: relative;
        width: 100%;
        height: 50px;
        display: flex;
    }

    .bioBtn{
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-size: 22px;
        transition: all 0.5s ease;
    }

    .bioBtn:hover{
        background-color: rgb(99, 38, 101);
    }

    #activePointer{
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 50%;
        height: 3px;
        background-color: rgba(255, 255, 255, 0.652);
        transition: all 0.5s ease;
    }

    .activeBio{
        background-color: rgb(99, 38, 101);
        font-size: 24px;
    }

    #bioBody{
        width: 100%;
        height: 340px;
        background-color: rgb(99, 38, 101);
    }

    #profileMenu{
        position: absolute;
        top: 210px;
        right: 10px;
        width: 200px;
        background-color: rgb(149, 60, 152);
        border-radius: 10px;
        cursor: pointer;
        box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.62);
        z-index: 2;
        font-size: 20px;
    }

    #profileMenu p{
        padding: 5px 10px;
        text-align: left;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        height: 50px;
        line-height: 40px;
    }

    #profileMenu p:hover{
        background-color: rgb(99, 38, 101);
    }

    #profileMenu p:last-child{
        border-bottom: none;
    }

    #stats{
        padding: 10px 20px;
        font-size: 20px;
        color: white;
        text-align: left;
    }

    .text-red{
        color: rgb(255, 32, 32);
    }


</style>