import { defineStore } from "pinia";
import { ref } from "vue"

export const useInterfaceStore = defineStore('Interface', () =>
{
    let activeChat = ref("")
    function setActiveChat(c){
        activeChat.value = c
    }
    return({activeChat, setActiveChat})
})