import { defineStore } from "pinia";
import { ref } from "vue"

export const useInterfaceStore = defineStore('Interface', () =>
{
    const activeChat = ref(null);
    const activeChatSetting = ref(false);
    const activeProfile = ref(null);
    const enableSidebar = ref(true);
    const enableMembersSettings = ref(null);

    function setActiveChat(c:any){
        activeChat.value = null
        activeChat.value = c
        activeChatSetting.value = false
    }

    function setActiveProfile(p:any){
        activeProfile.value = p
    }

    function toggleSidebar(){
        enableSidebar.value = !enableSidebar.value
    }

    return({activeChat,activeProfile,enableSidebar,activeChatSetting,enableMembersSettings,
            setActiveChat,setActiveProfile,toggleSidebar});
})