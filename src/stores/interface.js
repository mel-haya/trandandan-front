import { defineStore } from "pinia";
import { ref } from "vue"

export const useInterfaceStore = defineStore('Interface', () =>
{
    let activeChat = ref(null);
    function setActiveChat(c){
        activeChat.value = null
        activeChat.value = c
    }
    return({activeChat, setActiveChat})
})