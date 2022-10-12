import { defineStore } from "pinia";
import { ref,computed } from "vue"
import type { Ref } from "vue"

import { $api } from "@/axios"

// ref()s become state properties
// computed()s become getters
// function()s become actions



export const useChatStore = defineStore('chat', () =>
{
    const socket:any|null = ref(null);
    const activeChat: any = ref(null);
    const activeChatSetting = ref(false);
    const chatMessages: Ref<any[]> = ref([]);
    const enableMembersSettings = ref(false);
    const availableRooms: any = ref([]);
    const joinedRooms: any = ref([]);


    function updateAvailable(){
        $api.get('/channel').then((res) => {
            availableRooms.value = res.data;
        })
    }

    function updateJoined(){
        $api.get('/channel/joined').then((res) => {
            joinedRooms.value = res.data;
        })
    }

    const activeMessages = computed(() => {
        return chatMessages.value.filter((m:any) => m.channelId === activeChat.value.id);
    });

    return({activeChat, chatMessages, activeMessages,activeChatSetting, enableMembersSettings,socket,availableRooms,joinedRooms,updateAvailable,updateJoined})
})