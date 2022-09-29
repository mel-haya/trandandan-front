<template>
    <div id="memberItem">
        <div id="memberName">
            <h3>{{props.member.username}}</h3>
        </div>
        <div id="memberSettings" @click.stop="settingsClick">
            <fa icon="ellipsis-vertical" />
        </div>
    </div>
    
</template>

<script setup>
    import { defineProps } from 'vue'
    import { useInterfaceStore } from '@/stores/interface'
    let props = defineProps({
        member: {
            type: Object,
            required: true
        }
    })
    let store = useInterfaceStore()
    function settingsClick(e){
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

</style>