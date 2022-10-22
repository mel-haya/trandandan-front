<template>
	<div class="messageContainer" :class="getClass()" v-if="chatStore.activeChatSetting === false">
		<div id="chatHeader" @click="maximize">
			<div id="chatUser" @click.stop="toggleOptions">
				
				<div id="chatName" >
					{{chatStore.activeChat.name}}
				</div>
			</div>
			<div id="chatMinimize" @click.stop="minimize()" v-if="active === true">
				<fa icon="minus"/>
			</div>
			<div id="leaveChat" @click="chatStore.updateChat(0)">
				<fa icon="xmark"/>
			</div>
		</div>
		<div id="chatOptions" v-if="enableOptions">
			<div id="groupOptions" v-if="chatStore.activeChat.type === 'direct'">
				<p @click="interfaceStore.setActiveProfile(chatStore.activeChat.id)">Profile</p>
				<p>Invite to a game</p>
				<p>Block {{chatStore.activeChat.name}}</p>
			</div>
			<div id="groupOptions" v-else>
				<p>Add a new user</p>
				<p v-if="chatStore.activeChat.role === 'admin' || chatStore.activeChat.role === 'owner'"  @click="chatStore.activeChatSetting = true">Group settings</p>
				<p @click.stop="enableMembers = true">Members</p>
				<p @click="leaveGroup">Leave Group</p>
			</div>
		</div>
		<div id="chatBody">
			<div id="chatMessages" ref="chatMessages">
				<MessageBoxItem v-for="m in chatStore.activeChatMessages" :key="m.id" :message="m"/>

			</div>
			
			<input type="text" placeholder="Message..." id="chatInput" v-model="messageBody" @keyup.enter="send_message">
			<fa icon="paper-plane" id="sendButton" @click="send_message"/>
		</div>
	</div>
	<div class="messageContainer" v-else>
		<div id="closeSettings" @click="chatStore.activeChatSetting = false"> <fa icon="chevron-left"/> </div>
		<MessageboxSettingsVue/>
	</div>
	<membersListVue v-if="enableMembers"/>
</template>

<script lang="ts" setup>
	import { useInterfaceStore } from '@/stores/interface';
	import { useChatStore } from '@/stores/chat';
	import { useUserStore } from '@/stores/user';
	import membersListVue from './membersList.vue';
	import MessageBoxItem from '@/components/messageBoxItem.vue'
	import MessageboxSettingsVue from './MessageboxSettings.vue';
	import {nextTick, onMounted, onUnmounted, ref, watch} from 'vue'
	import type { Ref } from 'vue'
	import { useToast } from 'vue-toastification';
	import { Message } from '@/types/message';
	import { storeToRefs } from 'pinia'
	
	let chatMessages:Ref<any> = ref();
	const interfaceStore = useInterfaceStore();
	const chatStore = useChatStore();
	const userStore = useUserStore();
	let active = ref(true);
	let enableOptions = ref(false);
	let enableMembers = ref(false);
	let messageBody = ref('');
	const toast = useToast();
	const { activeChatMessages } = storeToRefs(chatStore)

	let scrollDown = async () => {
		await nextTick();
		if(chatMessages.value !== null){
			chatMessages.value.scrollTop = chatMessages.value.scrollHeight;
		}
	}

	function getClass(){
		let ret = ''
		if(active.value === true)
			ret += 'maximized'
		else
			ret += 'minimized'
		if(interfaceStore.enableSidebar)
			ret += ' sidebarEnabled'
		return ret;
	}

	function minimize(){
		if(active.value === true){
			active.value = false;
			enableOptions.value = false;
		}
	}

	function maximize(){
		if(active.value === false){
			active.value = true;
		}
	}

	function toggleOptions(){
		if(active.value)
			enableOptions.value = !enableOptions.value;
		else
			maximize();
	}

	function send_direct_message(){
		
		chatStore.socket.emit('send_direct_message', { receiverId: chatStore.activeChat.id , content: messageBody.value}, 
		(response:any) => {
			if(response.success === true){
				chatStore.activeChatMessages.push( 
					new Message(userStore.user.id,chatStore.activeChat.id,userStore.user.displayName,messageBody.value, "me")
				);
				messageBody.value = '';
				scrollDown()
			}
			else{
				toast.error(response.cause);
				messageBody.value = '';
			}
		})
	}

	function send_message(){
		if(messageBody.value === '')
			return;
		if(chatStore.activeChat.type === 'direct'){
			send_direct_message();
			return;
		}

		chatStore.socket.emit('send_message', {channelId: chatStore.activeChat.id , content: messageBody.value}, 
		(response:any) => {
			if(response.success === true){
				chatStore.activeChatMessages.push( 
					new Message(userStore.user.id,chatStore.activeChat.id,userStore.user.displayName,messageBody.value, "me")
				);
				scrollDown()
				messageBody.value = '';
			}
			else{
				toast.error(response.cause);
				if(response.cause == 'kicked'){
					leaveGroup()
				}
				messageBody.value = '';
			}
		})
	}

	async function leaveGroup(){
        chatStore.socket.emit("leave_channel", {"channelId": chatStore.activeChat.id, "userId": userStore.user.id});
        await new Promise(r => setTimeout(r, 100));
        chatStore.updateAvailable();
        chatStore.updateJoined();
        chatStore.updateChat(0);
    }

	onMounted(async() => {
		
		window.addEventListener('resize',  () => {
			enableMembers.value = false;
		});
		chatStore.socket.on('receive_message', scrollDown)
		chatStore.socket.on('receive_direct_message', scrollDown)
	});

	onUnmounted(() => {
		chatStore.socket.off('receive_message', scrollDown)
		chatStore.socket.off('receive_direct_message', scrollDown)
	});

	watch(activeChatMessages, async ()=>{
		await scrollDown()
	})

	window.addEventListener('click', function () {
		
		enableOptions.value = false;
		enableMembers.value = false;
		interfaceStore.enableMembersSettings = null;
	});



	
</script>

<style scoped>


	.sidebarEnabled{
		transform: translateX(450px);
	}

	.messageContainer{
		position: absolute;
		bottom: 0px;
		right: 480px;
		width: 425px;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		z-index: 1;
		background-color: rgba(123,51,125, 0.8);
		transition: all 0.3s ease;
	}
	#chatHeader{
		height: 60px;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		text-align: left;
		background-color: rgba(122, 51, 125, 0.995);
		font-size: 22px;
		display: flex;
	}

	#leaveChat, #chatMinimize{
		width:35px;
		height: 35px;
		text-align: center;
		line-height: 40px;
	}
	#chatUser{ 
		margin: 4px;
		display: flex;
		max-width: 300px;
		overflow: hidden;
		border-radius: 5px;
		margin-right: auto;
		justify-content: center;
	}

	.maximized #chatUser:hover, #chatMinimize:hover, #leaveChat:hover{
		cursor: pointer;
		background-color: rgba(92, 34, 94, 0.995);
	}

	#chatName{
		padding: 0px 10px;
		margin-right: auto;
		max-width: 250px;
		line-height: 52px;
		word-wrap: break-word;
	}

	.minimized #chatBody{
		height: 0px;
	}

	.maximized #chatBody{
		height: 520px;
	}

	#chatBody{
		position: relative;
		overflow: hidden;
		transition: all 0.1s ease;
	}

	
	
	#chatInput{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		font-size: 24px;
		padding: 10px;
		border: none;
		background: #00000030;
		color: white;
	}

	#chatInput::placeholder {
		color: rgb(186, 186, 186);;
		opacity: 1;
	}

	#chatInput:focus{
		outline: none;
	}

	#sendButton{
		position: absolute;
		bottom: 15px;
		right: 10px;
		font-size: 30px;
		line-height: 40px;
		color: rgb(186, 186, 186);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	#sendButton:hover{
		color: white;
	}

	#chatMessages{
		height: calc(100% - 60px);
		overflow-y: scroll;
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
	}

	#chatMessages::-webkit-scrollbar {
		width: 10px;
		padding: 10px;
	}

	#chatMessages::-webkit-scrollbar-track {
		background: #ffffff20;
	}

	#chatMessages::-webkit-scrollbar-thumb {
		background: rgba(79, 17, 81, 0.995);
		border-radius: 10px;
	}

	#chatOptions{
		position: absolute;
		top: 65px;
		left: 5px;
		width: 200px;
		background-color: rgba(122, 51, 125, 0.995);
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		font-size: 20px;
		color: white;
		transition: all 0.1s ease;
		z-index: 1;
		overflow: hidden;
		border-radius: 10px;
		box-shadow: 2px 2px 10px 5px rgba(0,0,0,0.5);
	}

	#chatOptions p:hover{
		cursor: pointer;
		background-color: rgba(92, 34, 94, 0.995);
	}

	#chatOptions p{
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: left;
		margin: 0;
		padding-left: 15px;
		
	}

	#chatOptions hr{
		width: 100%;
		margin: 0;
		border: none;
		border-top: 1px solid rgba(92, 34, 94, 0.995);
	}

	.minimized #chatOptions{
		height: 0px;
	}

	#chatOptions div{
		width: 100%;
	}

	#closeSettings{
		width: 50px;
		height: 50px;
		position: absolute;
		top: 0px;
		left: 0px;
		cursor: pointer;
		z-index: 99;
	}

	#groupOptions>p {
		border-bottom: 1px solid rgba(92, 34, 94, 0.995);
	}

	#groupOptions>p:last-child {
		border-bottom: none;
	}
</style>