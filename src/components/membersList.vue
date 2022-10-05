<template>
    <div id="membersBG">
        <div id="membersContainer" @click.stop="" ref="rect">
            <h3 @click="store.enableMembersSettings = false">Members</h3>
            <div id="membersList" @click="store.enableMembersSettings = false">
                <memberListItem :member="test"/>
                <memberListItem :member="test"/>
                <memberListItem :member="test"/>
                <memberListItem :member="test"/>
                <memberListItem :member="test"/>
                <memberListItem :member="test"/>
                <memberListItem :member="test"/>
                <memberListItem :member="test"/>
                <memberListItem :member="test"/>
                <memberListItem :member="test"/>
                <memberListItem :member="test"/>
                <memberListItem :member="test"/>
            </div>
            <div id="memberSettingsMenu" v-if="store.enableMembersSettings" :style="getSettingsCoords()">
                <div id="settingItem">{{store.enableMembersSettings.username}}'s Profile</div><hr/>
                <div id="settingItem">Mute {{store.enableMembersSettings.username}} for 1 hour</div><hr/>
                <div id="settingItem">Ban {{store.enableMembersSettings.username}}</div><hr/>
                <div id="settingItem">Set {{store.enableMembersSettings.username}} as Admin</div><hr/>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useInterfaceStore } from '@/stores/interface';
    import { onMounted, onUnmounted, ref } from 'vue';  
    import memberListItem from './memberListItem.vue'
    let rect = ref(null);
    let store = useInterfaceStore();
    let test = {
        username: 'Mouad',
        level: 5,
        status: 'online',
        img: 'bruh.jpg'
    }
    let coords = ref(null);
    onMounted(() => {
        coords.value = rect.value.getBoundingClientRect();
    })

    onUnmounted(() => {
        store.enableMembersSettings = false;
    });

    function getSettingsCoords(){
        return `top:${ store.enableMembersSettings.y - coords.value.top }px; left:${store.enableMembersSettings.x - coords.value.left - 250}px;`
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
    /* display: none; */
}

#membersContainer{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    /* height: 500px; */
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
}

#settingItem{
    width: 100%;
	height: 50px;
	line-height: 50px;
	text-align: left;
	margin: 0;
	padding-left: 15px;   
}

#settingItem:hover{
	cursor: pointer;
	background-color: rgba(92, 34, 94, 0.995);
}

#memberSettingsMenu hr{
		width: 100%;
		margin: 0;
		border: none;
		border-top: 1px solid rgba(92, 34, 94, 0.995);
}
</style>