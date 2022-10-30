import { defineStore } from "pinia";
import { ref } from "vue"
import type { Ref } from "vue"
import { Message } from "@/types/message"
import { Room } from "@/types/room";
import { $api, $token } from "@/axios"
import { useUserStore } from "@/stores/user";
import { io } from "socket.io-client";
import { useToast } from "vue-toastification";

const userStore = useUserStore();

export const useChatStore = defineStore('chat', () =>
{
    const socket:any|null = ref(null);
    const gameSocket:any = ref( io(`http://${process.env.VUE_APP_APP_NAME}:${process.env.VUE_APP_HOST_PORT}/play`, {
        extraHeaders: {
            "token": $token
        }
    }))
    const activeChat: any = ref(null);
    const activeChatSetting = ref(false);
    const activeChatMessages:Ref<Message[]>= ref([]);
    const availableRooms: any = ref([]);
    const joinedRooms: Ref<Room[]> = ref([]);
    const friendRequests: Ref<any[]> = ref([])
    const friends:Ref<any[]> = ref([])

    function updateFriends(){
        $api.get("user/friends")
        .then((res)=>{
            friends.value = res.data
        })
    }

    function updateFriendRequests(){
        $api.get("user/received-requests")
        .then(response => { 
            friendRequests.value = response.data;
        })
        .catch((err) => console.log(err));
    }
    
    function updateAvailable(){
        $api.get('/channel/non-joined').then((res) => {
            availableRooms.value = res.data;
        })
    }

    function updateJoined(){
        $api.get('/channel/joined').then((res) => {
            joinedRooms.value = res.data.map((a: any)=>{
                return new Room(a.id, a.name, joinedRooms.value.find((item)=> item.id == a.id)?.unread ?? 0)
            });
        })
    }

    async function updateChat(id:number){
        activeChatMessages.value = [];
        if(id === 0)
        {
            activeChat.value = null;
            return;
        }
        try{
            const res = await $api.get('/channel/channel-role/'+id)
            activeChat.value = res.data;
        }
        catch(err){
            console.log(err)
        }

        if(joinedRooms.value.find((item)=> item.id == id))
            joinedRooms.value.find((item)=> item.id == id)!.unread = 0;
    }

    async function updateChatDirect(user:any){
        activeChatMessages.value = [];
        if(user === 0)
        {
            activeChat.value = null;
            return;
        }
        activeChat.value = {
            'id': user.channelId,
            'name': user.displayName,
            'type': 'direct',
            'userId': user.id
        }
        $api.get('/message/dm/'+ user.channelId).then( async (res) => {
            activeChatMessages.value = res.data.map((a: any)=>{
                return new Message(a.id, a.author.id, a.author.displayName, a.content, (a.author.id === userStore.user.id ) ? "me" : "them",a.type);
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    async function updateMessages(){
        if(activeChat.value === null || activeChat.value.type === 'direct')
            return;
        $api.get('/message/channel/'+ activeChat.value.id).then( async (res) => {
            activeChatMessages.value = res.data.map((a: any)=>{
                return new Message(a.id, a.channel.id, a.author.displayName, a.content, (a.author.id === userStore.user.id ) ? "me" : "them", 'message');
            })
        }).catch((err) => {
            if(err.response.status === 403)
            {
                activeChat.value = null;
                useToast().error("You are banned from this channel");
            }
        })
    }

    return({updateFriends,updateChatDirect,updateFriendRequests,gameSocket,friends,friendRequests,activeChat,activeChatSetting,socket,availableRooms,joinedRooms,activeChatMessages,updateMessages,updateAvailable,updateJoined,updateChat})
})