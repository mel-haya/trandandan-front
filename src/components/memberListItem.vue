<template>
    <div id="memberItem">
        <div id="memberName">
            <h3 @click="store.activeProfile = props.member.member.id">{{props.member.member.displayName}} 
                <fa icon="crown" style="color: #FFD700" v-if="props.member.role === 'owner'"/>
                <fa icon="shield" style="color: #C0C0C0" v-if="props.member.role === 'admin'"/>
            </h3>
        </div>
        <div v-if="
        props.admin //admin || owner
        && userStore.user.id !== props.member.member.id // my profile
        && props.member.role !== 'owner' // owner
        && (props.member.role !== chatStore.activeChat.role)"
         id="memberSettings" @click.stop="settingsClick">
            <fa icon="ellipsis-vertical" />
        </div>
    </div>
    
</template>

<script lang="ts" setup>
    import { defineProps } from 'vue'
    import { useInterfaceStore } from '@/stores/interface'
    import { useUserStore } from '@/stores/user'
    import { useChatStore } from '@/stores/chat'
    let props = defineProps({
        member: {
            type: Object,
            required: true
        },
        admin: Boolean
    })
    let chatStore = useChatStore()
    let userStore = useUserStore()
    let store = useInterfaceStore()
    function settingsClick(e:any){
        store.enableMembersSettings = props.member;
        store.enableMembersSettings.x = e.clientX;
        store.enableMembersSettings.y = e.clientY;
    }

</script>

<style scoped>

#memberItem{
    position: relative;
    width: 100%;
    height: 50px;
    background-color: rgba(122, 51, 125, 0.995);
    margin-bottom: 10px;
    font-size: 22px;
    margin: 5px 0px;
}

#memberName{
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% - 50px);
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 10px;
}

#memberSettings{
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

#memberSettings:hover{
    cursor: pointer;
    background-color: rgba(92, 34, 94, 0.995);
}

h3:hover{
    cursor: pointer;
}

</style>