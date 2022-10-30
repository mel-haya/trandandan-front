<template>
    <div id="GroupItem">
        <div id="GroupChild" v-if="Props.room.imgPath" :style="`background-image: url('${Props.room.imgPath}')`"></div>
        <p id="GroupName">{{Props.room.name}}</p>
        <!-- <p id="GroupCount">{{Props.room.members}} members</p> -->
        <p id="GroupCount">{{Props.room.membersCount}} members</p>
        <div id="JoinBtn" @click.stop="joinGroup">Join</div>
    </div>
</template>

<script lang="ts" setup>
    import { useChatStore } from '@/stores/chat';
    import { useUserStore } from '@/stores/user';
    import { useToast } from 'vue-toastification';
    import { $api } from '@/axios'

    const chat = useChatStore();
    const user = useUserStore();
    const toast = useToast();

    let Props = defineProps({
        room: {
            type: Object,
            required: true
        }
    });
    let emit = defineEmits(['selected']);

    async function joinGroup(){
        try{
            let room:any =  (await $api.get("/channel/find/" + Props.room.id)).data;
            if(room.type === 'protected'){ 
                emit('selected')
                return
            }
            chat.socket.emit("join_channel", {"channelId": room.id, "userId": user.user.id}, async (data:any) => {
                if(data.success === false){
                    toast.error(data.error)
                    return
                }
                chat.updateAvailable();
                chat.updateJoined();
                await chat.updateChat(room.id);
                await chat.updateMessages()
            }); 
        }
        catch(err){
            toast.error("Something went wrong");
        }
    }
</script>

<style scoped>

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    #GroupChild{
        width: 100%;
        height: 120px;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(122, 51, 125, 0.995);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        transition: all 0.5s ease;
    }

    #GroupItem:hover #GroupChild{
        transform: scale(1.2);
    }

    #GroupItem{
        position: relative;
        width: calc(100% - 10px);
        height: 120px;
        background-color: rgba(122, 51, 125, 0.995);
        color: white;
        font-size: 20px;
        font-weight: 600;
        text-align: center;
        padding: 10px;
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 10px;
    }

    #GroupName{
        position: relative;
        width: 100%;
        text-align: left;
        padding-left: 10px;
        font-size: 20px;
        font-weight: 600;
        text-shadow: 4px 2px 2px rgb(62, 62, 62);
    }

    #GroupCount{
        position: relative;
        width: 100%;
        text-align: left;
        padding-left: 10px;
        font-size: 15px;
        font-weight: 400;
        text-shadow: 2px 2px 2px rgb(62, 62, 62);
    } 
    


    #JoinBtn{
        position: absolute;
        background-color:rgba(17, 151, 21, 0.995);
        color: white;
        font-size: 20px;
        font-weight: 600;
        text-align: right;
        padding: 5px 20px;
        margin: 10px;
        border-radius: 10px;
        right: 5px;
        bottom: 5px;
    }

    #JoinBtn:hover{
        cursor: pointer;
        background-color: rgba(21, 204, 27, 0.995);
        box-shadow: 0px 0px 5px 2px rgba(21, 204, 27, 0.995);
        text-shadow: 2px 2px 2px #0000007F;
    }

</style>