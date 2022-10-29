<template>
    <div id="menuWrapper">
        <div id="logo"></div>
        <div @click="firstButton" id="playBtn" class="menuBtn"><span>{{label.a}}</span></div>
        <div @click="secondButton" id="watchBtn" class="menuBtn" v-if="label.b"><span>{{label.b}}</span></div>
        <div @click="thirdButton" id="leaderboardBtn" class="menuBtn"><span>{{label.c}}</span></div>
    </div>
    <SidebareItem/>
    <MessageBox v-if="chatStore.activeChat"/>
    <ProfileItem v-if="interfaceStore.activeProfile !== 0"/>
    <FriendSearchItem v-if="interfaceStore.enableSearch"/>
    <ChannelCreateBox v-if="interfaceStore.enableChannelCreate"/>
</template>

<script lang="ts" setup>
    import { useUserStore } from '@/stores/user'
    import SidebareItem from '@/components/SidebarItem.vue'
    import {$api, $token} from '@/axios';
    import ProfileItem from '@/components/ProfileItem.vue';
    import { onMounted, reactive , onUnmounted } from 'vue';
    import { useRouter } from 'vue-router';
    import MessageBox from '@/components/MessageBox.vue';
    import {useInterfaceStore} from '@/stores/interface';
    import FriendSearchItem from '@/components/FriendSearchItem.vue';
    import ChannelCreateBox from '@/components/ChannelCreateBox.vue';
    import {useChatStore} from '@/stores/chat';
    import { io } from "socket.io-client";
    import {Message} from '@/types/message';
    import { useToast } from 'vue-toastification';

    let interfaceStore = useInterfaceStore();
    const chatStore = useChatStore();
    const router = useRouter();
    const store = useUserStore();
    const toast = useToast();
    // const {user} = storeToRefs(store)
    let label = reactive({
        a:"PLAY",
        b:"",
        c:"LEADERBOARD"
    })
    var audio = new Audio(require('../assets/hover1.mp3'));
    function firstButton(){
        audio.play();
        if(label.a === "PLAY")
        {
            label.a = "EASY";
            label.b = "HARD";
            label.c = "RETURN";
        }
        else
            router.push('/play?mode=classic') 
    }
    function secondButton(){
        audio.play();
        if(label.b === "WATCH")
            router.push('/watch')
        else
            router.push('/play?mode=modern')
    }
    function thirdButton(){
        audio.play();
        if(label.c === "RETURN")
        {
            label.a = "PLAY";
            label.b = "";
            label.c = "LEADERBOARD";
        }
        else
        {
            router.push('/leaderboard')
        }
    }

    onUnmounted(() => {
        chatStore.socket.disconnect();
    })

    onMounted(async () => {
        try{
            store.user = (await $api.get('/user/me')).data;
        }
        catch(e){
            toast.error('Failed to fetch user data');
            router.push('/login');
        }
        chatStore.socket = io("http://localhost:3000", {
            extraHeaders: {
                "token": $token
            }
        });

        chatStore.socket.on("error", (err:any) => {
            toast.error(err)
        });
        
        chatStore.socket.on("receive_message", (res:any) => {
            if(chatStore.activeChat && res.channel.id == chatStore.activeChat.id){
                chatStore.activeChatMessages.push( 
					new Message(res.id,res.channel.id,res.author.displayName,res.content, res.author.id === store.user.id ? "me" : "them","message")
				);
            }
            else{
                let channel = chatStore.joinedRooms.find((a: any)=>(a.id === res.channel.id))
                if(chatStore.joinedRooms.some((a: any)=>(a.id === res.channel.id)) === false)
                    chatStore.updateJoined()
                if(channel){
                    channel.unread += 1
                    let currentIndex = chatStore.joinedRooms.indexOf(channel);
                    if(currentIndex === 0)
                        return;
                    chatStore.joinedRooms.splice(currentIndex, 1);
                    chatStore.joinedRooms.unshift(channel)
                }   
            }
        });

        chatStore.socket.on("receive_direct_message", (res:any) => {
            if(chatStore.activeChat && res.channel.id == chatStore.activeChat.id){
                chatStore.activeChatMessages.push( 
					new Message(res.id,res.author.id,res.author.displayName,res.content,res.author.id === store.user.id ? "me" : "them", res.type)
				);
            }
        });

        chatStore.socket.on("update-friends", ()=>{
            console.log("update-friends")
            chatStore.updateFriends()
            chatStore.updateFriendRequests()
            
        })

        chatStore.socket.on("update_joined", ()=>{
            chatStore.updateJoined()
        })
    })

</script>

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