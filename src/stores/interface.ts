import { defineStore } from "pinia";
import { ref } from "vue"
import type { Ref } from 'vue'

export const useInterfaceStore = defineStore('Interface', () =>
{
    const activeChat = ref(null);
    const activeChatSetting = ref(false);
    const activeProfile: Ref<number> = ref(0);
    const enableSidebar = ref(true);
    const enableMembersSettings = ref(null);
    const enableSearch = ref(false);

    function setActiveChat(c:any){
        activeChat.value = null
        activeChat.value = c
        activeChatSetting.value = false
    }

    function setActiveProfile(p:number){
        activeProfile.value = p
    }

    function toggleSidebar(){
        enableSidebar.value = !enableSidebar.value
    }

    return({activeChat,activeProfile,enableSidebar,activeChatSetting,enableMembersSettings,enableSearch,
            setActiveChat,setActiveProfile,toggleSidebar});
})