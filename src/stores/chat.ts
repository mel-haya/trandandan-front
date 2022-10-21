import { defineStore } from "pinia";
import { ref } from "vue"
import type { Ref } from "vue"
import { Message } from "@/types/message"
import { Room } from "@/types/room";
import { $api } from "@/axios"
import { useUserStore } from "@/stores/user";
import { useToast } from "vue-toastification";

const userStore = useUserStore();

export const useChatStore = defineStore('chat', () =>
{
    const socket:any|null = ref(null);
    const activeChat: any = ref(null);
    const activeChatSetting = ref(false);
    const activeChatMessages:Ref<Message[]>= ref([]);
    const availableRooms: any = ref([]);
    const joinedRooms: Ref<Room[]> = ref([]);

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
            const res = await $api.get('/channel/'+id)
            activeChat.value = res.data;
        }
        catch(err){
            console.log(err)
        }

        if(joinedRooms.value.find((item)=> item.id == id))
            joinedRooms.value.find((item)=> item.id == id)!.unread = 0;
    }

    async function updateMessages(){
        if(activeChat.value === null)
            return;
        $api.get('/message/'+ activeChat.value.id).then( async (res) => {
            activeChatMessages.value = res.data.map((a: any)=>{
                return new Message(a.id, a.channel.id, a.author.displayName, a.content, (a.author.id === userStore.user.id ) ? "me" : "them");
            })
        }).catch((err) => {
            if(err.response.status === 403)
            {
                activeChat.value = null;
                useToast().error("You are banned from this channel");
            }
        })
    }

    return({activeChat,activeChatSetting,socket,availableRooms,joinedRooms,activeChatMessages,updateMessages,updateAvailable,updateJoined,updateChat})
})