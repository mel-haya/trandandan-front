<template>
    <div id="rooms">
        <div id="createRoom" @click="store.enableChannelCreate = true">
            <div id="createIcon">
                <fa icon="plus"/>
            </div>
            <p>Create a new group</p>
        </div>
        <RoomsItem v-for="r in chatStore.availableRooms" :key="r.id" :room="r" @selected="protectedChannel = r"/>
    </div>
    <div id="joinP" v-if="protectedChannel" @click.stop="">
        <h3 id="joinPHeader">{{protectedChannel.name}}</h3>
        <div id="JoinPBody">
            <label for="password">Password:</label>
            <input id="password" v-model="password" type="text" placeholder="Enter password"/>
        </div>
        <div id="joinPrivateBtn" @click="joinGroup">
            Join  
        </div>
    </div>
</template>

<script lang="ts" setup>
    import RoomsItem from './RoomsItem.vue';
    import {onMounted} from 'vue';
    import { useInterfaceStore } from '@/stores/interface';
    import { useChatStore } from '@/stores/chat';
    import { ref } from 'vue';
    import { useToast } from 'vue-toastification';

    const toast = useToast();
    const store = useInterfaceStore();
    const chatStore = useChatStore();
    const protectedChannel:any = ref({
        id:"dsfsdf",
        name:"Test",
        type:"protected",
        membersCount:0,
        imgPath:""
    });
    const password = ref('');

    onMounted(chatStore.updateAvailable)

    function joinGroup(){
        if(password.value == ''){
            toast.error('Password field is required')
            return
        }
        chatStore.socket.emit("join_channel", {"channelId": protectedChannel.value.id, "password": password.value}, async (data:any) => {
            console.log(data);
            if(data.success){
                chatStore.updateAvailable();
                await chatStore.updateChat(protectedChannel.value.id);
                chatStore.updateMessages()
                protectedChannel.value = null;
                password.value = '';
            }
            else{
                console.log(data)
                toast.error(data.error)
            }
        });
    }

    window.addEventListener('click', () => {
        protectedChannel.value = null
    })
</script>

<style scoped>
        #roomsContainer{
            position: relative;
            width: 100%;
            height: 100%;
        }
        #rooms{
            position: relative;
            width: 100%;
            overflow-y: auto;
            overflow-x: hidden;
            transition: max-height 0.5s ease;
            margin: 10px;
        }
        
        #rooms::-webkit-scrollbar {
            left:100px;
            width: 10px;
            padding: 10px;
        }

        #rooms::-webkit-scrollbar-track {
            background: #ffffff20;
        }

        #rooms::-webkit-scrollbar-thumb {
            background: rgba(79, 17, 81, 0.995);
            border-radius: 10px;
        }

        #createRoom{
            position: relative;
            width: calc(100% - 20px);
            height: 70px;
            display: flex;
            align-items: center;
            padding: 0 10px;
            cursor: pointer;
            transition: background-color 0.2s ease;
            font-size: 20px;
            border-radius: 30px;
            margin-bottom: 10px;
        }

        #createIcon{
            position: relative;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.4);
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 10px;
        }

        #createRoom:hover{
            background-color: rgba(255, 255, 255, 0.4);
        }

        #joinP{
            position: fixed;
            width: 400px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            cursor: pointer;
            font-size: 20px;
            border-radius: 10px;
            margin-bottom: 10px;
            background-color: rgba(79, 17, 81, 0.9);;
        }

        #joinPHeader{
            position: relative;
            font-size: 30px;
            /* line-height: 30px; */
            /* background-color: rgba(122, 51, 125, 0.995); */
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            text-align: left;
            padding: 10px 20px;
            border-bottom: 2px solid rgba(255,255,255,0.2);
        }
        #JoinPBody{
            position: relative;
            padding: 20px 0px;
        }

        #JoinPBody input{
            width: 50%;
            margin-left: 10px;
            padding: 5px 10px;
            background-color: #ffffff29;
            border: none;
            border-bottom: 3px solid rgba(255,255,255,0.2);
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
        }

        #JoinPBody input:focus{
            outline: none;
            border-bottom: 3px solid rgba(72, 240, 6, 0.545);
        }

        #joinPrivateBtn{
            position: relative;
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            background-color: rgba(122, 51, 125, 0.995);
            cursor: pointer;
            transition:  background-color 0.2s ease;
        }

        #joinPrivateBtn:hover{
            background-color: rgba(72, 240, 6, 0.545);
        }


</style>