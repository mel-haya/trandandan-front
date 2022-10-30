<template>
    <div id="membersBG">
        <div id="membersContainer" @click.stop="" ref="rect">
            <h3 @click="store.enableMembersSettings = null">Members</h3>
            <div id="membersList" @click="store.enableMembersSettings = null">
                <memberListItem v-for="m in members" :key="m.member.id" :member="m" :admin="isAdmin()"/>
            </div>
            <div id="memberSettingsMenu" v-if="store.enableMembersSettings?.member.displayName" :style="getSettingsCoords()">
                <div id="settingItem" v-if="store.enableMembersSettings?.role === 'member'" @click="mute">Mute {{store.enableMembersSettings?.member.displayName}} </div>
                <div id="settingItem" v-if="store.enableMembersSettings?.role === 'member'" @click="ban">Ban {{store.enableMembersSettings?.member.displayName}} </div>
                <div id="settingItem" v-if="store.enableMembersSettings?.role === 'member'" @click="premote">Set as Admin </div>
                <div id="settingItem" v-if="chatStore.activeChat.role === 'owner' && store.enableMembersSettings?.role === 'admin'" @click="demote">Demote to a Member </div>
                <div id="settingItem" v-if="isAdmin() && store.enableMembersSettings?.role === 'member'" @click="kick">Kick member </div>
                
            </div>
        </div>
        <MutePopup v-if="enableMute" :request="request" :message="enableMute" @close="enableMute = ''"/>
    </div>
</template>

<script lang="ts" setup>
    import { useInterfaceStore } from '@/stores/interface';
    import { useChatStore } from '@/stores/chat';
    import { onMounted, onUnmounted, ref } from 'vue';  
    import {$api} from '@/axios';
    import memberListItem from './memberListItem.vue'
    import {useToast} from 'vue-toastification';
    import type { Ref } from 'vue'
    import MutePopup from './mutePopup.vue';

    const chatStore = useChatStore();
    let rect:Ref<any | null> = ref(null);
    let members:any = ref([]);
    let store = useInterfaceStore();
    let coords:any = null;
    const toast = useToast();
    let enableMute = ref("");
    let request = ref("");

    function updateMembers(){
        $api.get('/channel/members/'+ chatStore.activeChat.id).then((res) => {
            members.value = res.data;
        })
    }

    onMounted(() => {
        updateMembers()
    })

    onUnmounted(() => {
        store.enableMembersSettings = null;
    });

    function getSettingsCoords(){
        coords = rect.value.getBoundingClientRect();
        return `top:${ store.enableMembersSettings.y - coords.top }px; left:${store.enableMembersSettings.x - coords.left - 250}px;`
    }

    function isAdmin(){
        return chatStore.activeChat.role === 'admin' || chatStore.activeChat.role === 'owner';
    }

    function premote(){
        $api.patch('/channel/add-admin/'+ chatStore.activeChat.id + '?member_id=' + store.enableMembersSettings.member.id)
        .then(() => {
            toast.success("Member promoted to admin");
            updateMembers()
            store.enableMembersSettings = null
        }).catch(() => {
            toast.error("Something went wrong");
        })
    }

    function demote(){
        $api.patch('/channel/remove-admin/'+ chatStore.activeChat.id + '?member_id=' + store.enableMembersSettings.member.id)
        .then(() => {
            toast.success("Member demoted to member");
            updateMembers()
            store.enableMembersSettings = null
        }).catch(() => {
            toast.error("Something went wrong");
        })
    }

    function kick(){
        
        $api.patch('/channel/remove-member/'+ chatStore.activeChat.id + '?member_id=' + store.enableMembersSettings.member.id)
        .then(() => {
            toast.success("Member kicked");
            updateMembers()
            store.enableMembersSettings = null
        }).catch(() => {
            toast.error("Something went wrong");
        })
    }

    function mute(){
        enableMute.value = "Mute";
        request.value = '/channel/mute-member/'+ chatStore.activeChat.id + '?member_id=' + store.enableMembersSettings.member.id + '&mute_time=';
        store.enableMembersSettings = null;
    }

    function ban(){
        enableMute.value = "Ban";
        request.value = '/channel/ban-member/'+ chatStore.activeChat.id + '?member_id=' + store.enableMembersSettings.member.id + '&mute_time=';
        store.enableMembersSettings = null;
    }


</script>

<style scoped>

#membersBG{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
}

#membersContainer{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: rgba(123,51,125, 0.8);
    border-radius: 10px;
}

#membersContainer h3{
    margin: 0px;
    padding: 0px;
    font-size: 30px;
    background-color: rgba(122, 51, 125, 0.995);
    width: 100%;
    padding: 15px 0px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

#membersList{
    height: calc(100% - 50px);
    overflow-y: scroll;
    max-height: 390px;
}

#membersList::-webkit-scrollbar {
    width: 10px;
    padding: 10px;
}

#membersList::-webkit-scrollbar-track {
    background: #ffffff20;
}

#membersList::-webkit-scrollbar-thumb {
    background: rgba(79, 17, 81, 0.995);
    border-radius: 10px;
}

#memberSettingsMenu{
    position: absolute;
    background-color: rgba(122, 51, 125, 0.995);
    z-index: 100;
    font-size: 20px;
    width: 250px;
    border-radius: 10px;
	box-shadow: 2px 2px 10px 5px rgba(0,0,0,0.5);
    overflow: hidden;
}

#settingItem{
    width: 100%;
	height: 50px;
	line-height: 50px;
	text-align: left;
	margin: 0;
	padding-left: 15px;  
    border-bottom: 1px solid rgba(92, 34, 94, 0.995); 
}

#settingItem:last-child{
    border-bottom: none;
}

#settingItem:hover{
	cursor: pointer;
	background-color: rgba(92, 34, 94, 0.995);
}

</style>