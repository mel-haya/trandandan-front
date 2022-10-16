import { defineStore } from "pinia";
import { ref } from "vue"
import type { Ref } from 'vue'

export const useInterfaceStore = defineStore('Interface', () =>
{
    const activeProfile: Ref<number> = ref(0);
    const enableSidebar = ref(true);
    const enableSearch = ref(false);
    const enableChannelCreate = ref(false);
    const enableMembersSettings:Ref<any> = ref(null);

    function setActiveProfile(p:number){
        activeProfile.value = p
    }

    function toggleSidebar(){
        enableSidebar.value = !enableSidebar.value
    }

    return({activeProfile,enableSidebar,enableSearch,enableChannelCreate,enableMembersSettings,
            setActiveProfile,toggleSidebar});
})