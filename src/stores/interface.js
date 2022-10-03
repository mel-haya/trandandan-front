import { defineStore } from "pinia";
import { ref } from "vue"

export const useInterfaceStore = defineStore('Interface', () =>
{
    let activeChat = ref(null);
    let activeChatSetting = ref(false);
    let activeProfile = ref(null);
    let enableSidebar = ref(true);
    let enableMembersSettings = ref(null);

    function setActiveChat(c){
        activeChat.value = null
        activeChat.value = c
        activeChatSetting.value = false
    }

    function setActiveProfile(p){
        activeProfile.value = p
    }

    function toggleSidebar(){
        enableSidebar.value = !enableSidebar.value
    }

    return({activeChat,activeProfile,enableSidebar,activeChatSetting,enableMembersSettings,
            setActiveChat,setActiveProfile,toggleSidebar});
})