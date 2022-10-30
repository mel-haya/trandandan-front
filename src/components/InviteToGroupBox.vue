<template>
    <div id="addmembersBG" @click="emits('close')">
        <div id="addmembersContainer" @click.stop="">
            <h3>Add members</h3>
            <div id="addMembersBody">
                <div id="addMemberItem" v-for="f in friends" :key="f.id">
                    <div id="inviteName">{{f.displayName}}</div>
                    <div id="inviteBtn" @click="invite(f.id)">Invite</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { useChatStore } from '@/stores/chat';
    import { onMounted, onUnmounted, ref } from 'vue';  
    import {$api} from '@/axios';
    import {useToast} from 'vue-toastification'
    
    const emits = defineEmits(['close'])
    const toast = useToast()
    const chatStore = useChatStore();
    let members:any = ref([]);
    let friends:any = ref([]);

    function updateMembers(){
        $api.get('/channel/members/'+ chatStore.activeChat.id).then((res) => {
            members.value = res.data;
        })
    }

    async function updateFriends(){
        try{
        let res = (await $api.get('/user/friends')).data
        friends.value = res.filter((f:any) => {
            const isMember = members.value.findIndex((m:any) => m.member.id === f.id)
            if (isMember === -1)
                return f
            return false
        })
        }catch(e){
            console.log(e)
        }
    }

    onMounted(async() => {
        updateMembers();
        await updateFriends();
    })

    onUnmounted(() => {
    });

    function invite(id:string){
        chatStore.socket.emit('add-member', {channelId: chatStore.activeChat.id, targetId: id},(res:any)=>{
            if(res.success === true)
            {
                friends.value = friends.value.filter((f:any) => f.id !== id)
                toast.success("Member added")
            }
            else
                toast.error(res.error)  
        })
    }


</script>

<style scoped>

#addmembersBG{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
    /* display: none; */
}

#addmembersContainer{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 500px;
    background-color: rgba(79, 17, 81, 0.9);
    border-radius: 10px;
}

#addMembersBody{
    display: grid;
    grid-template-columns: 1fr 1fr;
}

h3{
    margin: 0px;
    padding: 0px;
    font-size: 30px;
    background-color: rgba(122, 51, 125, 0.995);
    width: 100%;
    padding: 15px 0px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

#addMemberItem{
    position: relative;
    height: 70px;
    line-height: 70px;
    background-color: rgba(122, 51, 125, 0.995);
    font-size: 24px;
    border-radius: 10px;
    padding: 0px 20px;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px;
}


#inviteBtn{
    background-color: rgba(3, 139, 26, 0.995);
    height: 50px;
    color: white;
    font-size: 20px;
    padding: 5px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 15px;
    cursor: pointer;
}

</style>