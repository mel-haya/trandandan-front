<template>
    <div id="profileBg" @click="closeDiv">
        <div id="profileContainer" @click = "enableMenu = false">
            <div id="profileHeader">
                <div id="userImg" alt="bruh" v-if="profile?.profile.imgPath" :style="`background-image: url('${profile?.profile.imgPath}')`">
                    <div id="userStatus" :style="`background-color: ${activityUpdate()}`"></div>
                </div>
            </div>
            <div id="profileMenu" v-if="enableMenu">
                <p class="text-red" @click="blockUser">Block</p>
                <p class="text-red" v-if="friendshipStatus === 'friend'" @click="removeFriend">Unfriend</p>
                <p v-if="friendshipStatus === 'friend'">Invite to a game</p>
            </div>
            <div id="userInfo">
                <p>{{profile?.profile.displayName}}</p>
                <div id="options">
                    <div id="watchBtn" v-if="status === 'in-game'" @click="router.push(`/play?mode=watch&id=${profile?.profile.id}`)">Watch</div>
                    <div id="reqBtn" v-if="friendshipStatus === 'none'" @click="sendRequest">Send friend request</div>
                    <div id="reqBtn" v-if="friendshipStatus === 'pending'">Friend request sent</div>
                    <div id="reqBtn" v-if="friendshipStatus === 'friend'">Send a message</div>
                    <div id="reqBtn" v-if="friendshipStatus === 'blocked'" @click="unblockUser">Unblock this user</div>
                    <div id="reqBtn" v-if="friendshipStatus === 'pending2'" @click="acceptRequest">Accept friend request</div>
                    <div id="reqBtn" v-if="friendshipStatus === 'self'" @click="router.push('/settings')">Account settings</div>
                    <div id="settings-icon" v-if="friendshipStatus !== 'blocked' && friendshipStatus !== 'self'" @click.stop="enableMenu = true">
                        <fa icon="ellipsis-vertical" />
                    </div>
                </div>
            </div>
            <div id="userBio">
                <div id="bioHeader">
                    <div :class="`bioBtn ${(activePointer === 0) ? 'activeBio' : ''}`" id="statsBtn" @click="loadStats" >Stats</div>
                    <div :class="`bioBtn ${(activePointer === 1) ? 'activeBio' : ''}`" id="historyBtn" @click="loadHistory" >History</div>
                    <div id="activePointer" :style="`transform: translateX(${activePointer * 100}%)`"></div>
                </div>
                <div id="bioBody">
                    <div id="stats" v-if="activePointer === 0">
                        level: 10 <br/>
                        Games won: 8 / 50 <br/>
                        win streak: 3 <br/>
                    </div>
                    <div id="history" v-else>
                        <div class="matchItem winner">
                            <div class="player">Mourad</div>
                            <div class="score">2-3</div>
                            <div class="player">Mouad</div>
                        </div>
                        <div class="matchItem loser">
                            <div class="player">Mourad</div>
                            <div class="score">2-3</div>
                            <div class="player">Mouad</div>
                        </div>
                        <div class="matchItem winner">
                            <div class="player">Mourad</div>
                            <div class="score">2-3</div>
                            <div class="player">Mouad</div>
                        </div>
                    </div>
                </div>
            </div>
                
                     
        </div>
    </div>
</template>

<script lang="ts" setup>
/* eslint-disable */
    import { useInterfaceStore } from '@/stores/interface';
    import { ref,onMounted, onUnmounted } from 'vue';
    import { $api } from '@/axios'
    import { useUserStore } from '@/stores/user';
    import { useRouter } from 'vue-router';
    import { useToast } from 'vue-toastification';
    import { useChatStore } from '@/stores/chat';
    import { iio } from '@/p5game';

    const chat = useChatStore();
    const store = useInterfaceStore();
    const user = useUserStore();
    const profile:any = ref(null)
    const activePointer = ref(0);
    const enableMenu = ref(false);
    const friendshipStatus = ref("")
    const router = useRouter();
    const toast = useToast();
    const status = ref("")
    const stats = ref(null)
    const history = ref([])
    let onlineLoop:any;

    function activityUpdate(){
        if(status.value === "online"){
            return '#0f0'
        }
        else if(status.value === "in-game"){
            return "orange"
        }
        else{
            return '#aaa'
        }
    }
    
    function setStatus(){
        if(profile.value?.profile.id === user.user?.id){
            friendshipStatus.value = "self"
        }
        else if(profile.value?.relationship_state == "friends"){
            friendshipStatus.value = "friend"
        }
        else if(profile.value?.relationship_state == "pending" && profile.value?.imSender === true){
            friendshipStatus.value = "pending"
        }
        else if(profile.value?.relationship_state == "pending" && profile.value?.imSender === false){
            friendshipStatus.value = "pending2"
        }
        else if(profile.value?.relationship_state == "blocked" && profile.value?.imSender === true){
            friendshipStatus.value = "blocked"
        }
        else if(profile.value?.relationship_state == "blocked" && profile.value?.imSender === false){
            friendshipStatus.value = "blocked2"
        }
        else{
            friendshipStatus.value = "none"
        }
    }

    function sendRequest(){
        chat.socket.emit('send-friend-request', profile.value?.profile.id, () => {
            updateUser()
        })
    }

    function removeFriend(){
        chat.socket.emit('remove-relationship', profile.value?.profile.id, () => {
            chat.updateFriendRequests()
            chat.updateFriends()
            updateUser()
        })
        
    }

    function acceptRequest(){
        chat.socket.emit('accept-friend-request', profile.value?.profile.id, () => {
            chat.updateFriendRequests()
            chat.updateFriends()
            updateUser()
        })
        
    }

    function blockUser(){
        chat.socket.emit('block-user', profile.value?.profile.id, () => {
            chat.updateFriendRequests()
            chat.updateFriends()
            updateUser()
        })
    }

    function unblockUser(){
        chat.socket.emit('remove-relationship', profile.value?.profile.id, () => {
            chat.updateFriends()
            chat.updateFriendRequests()
            friendshipStatus.value = "none"
        })
    }



    function loadStats(){
        // TODO: get stats from api
        activePointer.value = 0;
        $api(`/game/user-profile/${profile.value?.profile.id}`).then((res:any) => {
            stats.value = res.data
            console.log(stats.value)
        })
    }

    function loadHistory(){
        // TODO: get history from api
        activePointer.value = 1;
        $api(`/game/user-games/${profile.value?.profile.id}`).then((res:any) => {
            history.value = res.data
            console.log(history.value)
        })
    }


    function closeDiv(e:any){
        if(e.target.id === 'profileBg')
            store.setActiveProfile(0);
    }

    function updateUser(){
        $api.get('user/profile/' + store.activeProfile)
        .then((response:any) => {
            profile.value = response.data;
            setStatus()
        })  
    }

    onMounted(()=>{
        updateUser()
        chat.socket.on('update-friends', updateUser)
        chat.socket.emit('user-status', store.activeProfile, (res:any) => {
            status.value = res.status
            activityUpdate()
        })

        onlineLoop = setInterval(() => {
            //TODO get game online status from
            iio.emit('game-status', store.activeProfile, (res:any) => {
                status.value = res.status
                if(status.value === "in-game"){
                    return
                }
                chat.socket.emit('user-status', store.activeProfile, (res:any) => {
                    status.value = res.status
                })
            })
        },5000);
    })

    onUnmounted(() => {
        chat.socket.off('user-status')
        chat.socket.off('update-friends', updateUser)
        iio.off('game-status')
        clearInterval(onlineLoop)
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
        z-index: 101;
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
        position: relative;
        padding: 10px 20px;
        background-color: rgb(0, 137, 23);
        border-radius: 10px;
        font-size: 16px;
        cursor: pointer;
        display: inline-block;
    }

    #settings-icon{
        position: relative;
        font-size: 30px;
        color: white;
        cursor: pointer;
        padding-left: 20px;
        display: inline-block;
    }

    #options{
        position: absolute;
        bottom: 0px;
        right: 20px;
        display: flex;
        flex-direction: row;
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
        overflow: hidden; 
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

    #watchBtn{
        position: relative;
        padding: 10px 20px;
        background-color: rgb(0, 137, 23);
        border-radius: 10px;
        font-size: 16px;
        cursor: pointer;
        margin-right: 10px;
        display: inline-block;
    }

    .matchItem{
        position: relative;
        width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: all 0.5s ease;
        font-size: 30px;
    }

    .matchItem:hover{
        background-color: rgb(99, 38, 101);
    }

    .player{
        width: 40%;
    }


    .score{
        width: 20%;
    }

    .winner{
        background: linear-gradient(325deg, rgba(255,255,255,0) 0%, rgba(34,187,42,0) 50%, rgba(34,187,42,1) 100%);
    }
    .loser{
        background: linear-gradient(325deg, rgba(255,255,255,0) 0%, rgba(255,0,0,0) 50%, rgba(255,0,0,1) 100%);
    }
</style>
