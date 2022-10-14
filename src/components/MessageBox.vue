<template>
	<div class="messageContainer" :class="getClass()" v-if="chatStore.activeChatSetting === false">
		<div id="chatHeader" @click="maximize">
			<div id="chatUser" @click.stop="toggleOptions">
				<div id="userImg">
				</div>
				<div id="chatName" >
					{{chatStore.activeChat.name}}
				</div>
			</div>
			<div id="chatMinimize" @click.stop="minimize()" v-if="active === true">
				<fa icon="minus"/>
			</div>
			<div id="leaveChat" @click="chatStore.activeChat = 0">
				<fa icon="xmark"/>
			</div>
		</div>
		<div id="chatOptions" v-if="enableOptions">
			<div id="directOptions" v-if="chatStore.activeChat.type === 'direct'">
				<p @click="interfaceStore.setActiveProfile(1)">Profile</p>
				<hr/>
				<p>Invite to a game</p>
				<hr/>	
				<p>Block {{chatStore.activeChat.name}}</p>
			</div>
			<div id="groupOptions" v-else>
				<p>Add a new user</p>
				<hr/>
				<p @click="chatStore.activeChatSetting = true">Group settings</p>
				<hr/>
				<p @click.stop="enableMembers = true">Members</p>
				<hr/>
				<p @click="leaveGroup">Leave Group</p>
			</div>
		</div>
		<div id="chatBody">
			<div id="chatMessages" ref="chatMessages">
				<MessageBoxItem v-for="m in chatStore.activeMessages" :key="m.id" :body="m.content" :by="m.from"/>

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
	import {onMounted, ref} from 'vue'
	import type { Ref } from 'vue'
	
	let chatMessages:Ref<any> = ref(null);
	const interfaceStore = useInterfaceStore();
	const chatStore = useChatStore();
	const userStore = useUserStore();
	let active = ref(true);
	let enableOptions = ref(false);
	let enableMembers = ref(false);
	let messageBody = ref('');

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

	function send_message(){
		if(messageBody.value === '')
			return;
		chatStore.socket.emit('send_message', { userId: userStore.user.id, channelId: chatStore.activeChat.id , content: messageBody.value});
		chatStore.chatMessages.push(
			{
				from: "me",
                channelId: chatStore.activeChat.id,
                content: messageBody.value
            });
		messageBody.value = '';
	}

	async function leaveGroup(){
        chatStore.socket.emit("leave_channel", {"channelId": chatStore.activeChat.id, "userId": userStore.user.id});
        await new Promise(r => setTimeout(r, 100));
        chatStore.updateAvailable();
        chatStore.updateJoined();
        chatStore.activeChat = 0;
    }

	// TODO: list  messages from chatStore.chatMessages (needs key for v-for)
	onMounted(() => {
		chatMessages.value.scrollTop = chatMessages.value.scrollHeight;
		window.addEventListener('resize', () => {
			enableMembers.value = false;
		});
		
		chatStore.socket.emit('join_channel', { userId: userStore.user.id, channelId: chatStore.activeChat.id});

		

	});

	window.addEventListener('click', function () {
		
		enableOptions.value = false;
		enableMembers.value = false;
		chatStore.enableMembersSettings = false;
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
	}

	.maximized #chatUser:hover, #chatMinimize:hover, #leaveChat:hover{
		cursor: pointer;
		background-color: rgba(92, 34, 94, 0.995);
	}

	#chatName{
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

	#userImg{
		height: 40px;
		width: 40px;
		background-color: burlywood;
		border-radius: 60px;
		margin : 6px 5px;
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

</style>