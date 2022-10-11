<template>
	<div class="messageContainer" :class="getClass()" v-if="store.activeChatSetting === false">
		<div id="chatHeader" @click="maximize">
			<div id="chatUser" @click.stop="toggleOptions">
				<div id="userImg">
				</div>
				<div id="chatName" >
					{{store.activeChat.name}}
				</div>
			</div>
			<div id="chatMinimize" @click.stop="minimize()" v-if="active === true">
				<fa icon="minus"/>
			</div>
			<div id="leaveChat" @click="store.activeChat = null">
				<fa icon="xmark"/>
			</div>
		</div>
		<div id="chatOptions" v-if="enableOptions">
			<div id="directOptions" v-if="store.activeChat.type === 1">
				<p @click="store.setActiveProfile(1)">Profile</p>
				<hr/>
				<p>Invite to a game</p>
				<hr/>	
				<p>Block {{store.activeChat.name}}</p>
			</div>
			<div id="groupOptions" v-else>
				<p>Add a new user</p>
				<hr/>
				<p @click="store.activeChatSetting = true">Group settings</p>
				<hr/>
				<p @click.stop="enableMembers = true">Members</p>
				<hr/>
				<p>Leave Group</p>
			</div>
		</div>
		<div id="chatBody">
			<div id="chatMessages" ref="chatMessages">
				<MessageBoxItem body="Yo" by="me"/>
				<MessageBoxItem body="Yo" by="them"/>
				<MessageBoxItem body="Kayn chi satat" by="them"/>
				<MessageBoxItem body="La walou gha ghyrha" by="me"/>
				<MessageBoxItem body="Iwa ki ghadi m3a chi 9raya" by="them"/>
				<MessageBoxItem body="bdit f chat ghad lina douk channels rah khas nsaliw" by="me"/>
				<MessageBoxItem body="Ha lghdar bda" by="them"/>
				<MessageBoxItem body="Chms" by="them"/>
				<MessageBoxItem body="Chms" by="them"/>
				<MessageBoxItem body="Chms" by="them"/>
			</div>
			
			<input type="text" placeholder="Message..." id="chatInput">
			<fa icon="paper-plane" id="sendButton"/>
		</div>
	</div>
	<div class="messageContainer" v-else>
		<div id="closeSettings" @click="store.activeChatSetting = null"> <fa icon="chevron-left"/> </div>
		<MessageboxSettingsVue/>
	</div>
	<membersListVue v-if="enableMembers"/>
</template>

<script setup>
	import { useInterfaceStore } from '@/stores/interface';
	import membersListVue from './membersList.vue';
	import MessageBoxItem from '@/components/messageBoxItem.vue'
	import MessageboxSettingsVue from './MessageboxSettings.vue';
	import {onMounted, ref} from 'vue'
	import {$api} from '@/axios';
	// import { io } from "socket.io-client";
	let chatMessages = ref(null);
	let store = useInterfaceStore();
	let active = ref(true);
	let enableOptions = ref(false);
	let enableMembers = ref(false);
	let user = ref(null);

// 	let socket = io("http://localhost:3000", {extraHeaders: {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZGlzcGxheU5hbWUiOiJvb09tYXJpYW5hT29vIiwidHdvZmFTdGF0ZSI6Im5vdF9hY3RpdmUiLCJpYXQiOjE2NjU0NjYxMzMsImV4cCI6MTY2NTU1MjUzM30.n2z3bchatJ95wLTevtgMSav4TcSl42QtiK3PiEEpLZs"}
//   });
  
  


	function getClass(){
		let ret = ''
		if(active.value === true)
			ret += 'maximized'
		else
			ret += 'minimized'
		if(store.enableSidebar)
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

	onMounted(() => {
		chatMessages.value.scrollTop = chatMessages.value.scrollHeight;
		window.addEventListener('resize', () => {
			enableMembers.value = false;
		});
		$api.get('/user/me').then((res) => {
			user.value = res.data;
			console.log(user.value);
			// socket.emit('send_message', { userId: user.value.id, channelId: 9 , content: 'hello world'});
		});

		

	});

	window.addEventListener('click', function () {
		
		enableOptions.value = false;
		enableMembers.value = false;
		store.enableMembersSettings = false;
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