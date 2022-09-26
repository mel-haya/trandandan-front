<template>
	<div class="messageContainer" :class="getClass()" v-if="false">
		<div id="chatHeader" @click="maximize">
			<div id="chatUser" @click.stop="toggleOptions">
				<div id="userImg">
				</div>
				<div id="chatName" >
					{{store.activeChat.name}}
				</div>
			</div>
			<div id="leaveChat" @click="store.activeChat = null">
				<fa icon="xmark"/>
			</div>
			<div id="chatMinimize" @click.stop="minimize()" v-if="active === true">
				<fa icon="minus"/>
			</div>
		</div>
		<div id="chatOptions" v-if="enableOptions">
			<div id="directOptions" v-if="store.activeChat.type === 1">
				<p @click="store.setActiveProfile(test)">Profile</p>
				<hr/>
				<p>Block {{store.activeChat.name}}</p>
			</div>
			<div id="groupOptions" v-else>
				<p>Group settings</p>
				<hr/>
				<p>Members</p>
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
		<div id="groupSettings">
			<div id="groupImage">
				<label for="groupFile">Change</label>
				<input id="groupFile" type="file" style="display: none;">
			</div>
			<div id="groupName">
				<input type="text" placeholder="Group name" value="ADHD and retarded group">
			</div>
			<h3>Settings</h3>
			<label for="public" id="groupVisibility">
				<input type="checkbox" id="public" value="public" checked>
				<i></i>
				Make the group private
			</label>
			<label for="password" id="groupVisibility">
				<input type="checkbox" id="password" value="enabled">
				<i></i>
				Protect channel with a password
			</label>
			<input type="text" id="passInput" placeholder="Password" >
			<div id="saveBtn">Delete channel</div>
		</div>
	</div>
</template>

<script setup>
	import { useInterfaceStore } from '@/stores/interface';
	import MessageBoxItem from '@/components/messageBoxItem.vue'
	import {onMounted, ref} from 'vue'
	// let enablePass = ref("")
	
	let chatMessages = ref(null);
	let store = useInterfaceStore();
	let active = ref(true);
	let enableOptions = ref(false);
	let test = {
		name: 'Mouad',
		level: 5,
		status: 'online',
		img: 'bruh.jpg'
	}
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
	});

	window.addEventListener('click', function () {
		enableOptions.value = false;
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
	}

	#leaveChat, #chatMinimize{
		width:35px;
		height: 35px;
		text-align: center;
		line-height: 40px;
		float: right;
	}
	#chatUser{ 
		height: 52px;
		margin: 4px;
		display: inline-block;
		padding-right: 40px;
		max-width: 300px;
		overflow: hidden;
		border-radius: 5px;
	}

	.maximized #chatUser:hover, #chatMinimize:hover, #leaveChat:hover{
		cursor: pointer;
		background-color: rgba(92, 34, 94, 0.995);
	}

	#chatName{
		float: left;
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
		float: left;
	}

	
	
	#chatInput{
		position: absolute;
		bottom: 0;
		left: 0;
		width: calc(100% - 20px);
		height: 40px;
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

	/* #chatMessages:: */
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

	#groupSettings{
		height: 565px;
		background-color: transparent;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		padding-top : 15px;
	}

	#groupImage{
		position: relative;
		height: 150px;
		width: 150px;
		background-color: burlywood;
		border-radius: 100px;
		margin: 0px auto;
	}

	#groupImage label{
		position: absolute;
		bottom: 0;
		right: 0;
		background-color: rgba(92, 34, 94, 0.995);
		color: white;
		font-size: 20px;
		padding: 5px;
		border-bottom-left-radius: 10px;
	}

	#groupImage label:hover{
		cursor: pointer;
		background-color: rgb(179, 11, 201);
	}

	#groupName{
		margin: 10px 0px;
	}

	#groupName input{
		width: calc(100% - 20px);
		height: 40px;
		font-size: 24px;
		padding: 10px;
		border: none;
		background: transparent;
		color: white;
		text-align: center;
	}

	#groupName input::placeholder {
		color: rgb(186, 186, 186);;
		opacity: 1;
	}

	#groupName input:focus{
		outline: none;
		background: #00000030;
	}

	#groupVisibility {
		font-family:"Montserrat", sans-serif;
		font-size: 18px;
		font-weight: 400;
		cursor: pointer;
		display: block;
		margin-left: 10px;
		text-align: left;
		height: 28px;
		line-height: 28px;
		margin: 0px 0px 10px 10px;
	}

	#groupVisibility > input {
		display: none;
	}

	#groupVisibility i {
		display: inline-block;
		width: 64px;
		height: 40px;
		border-radius: 20px;
		vertical-align: middle;
		transition: 0.25s 0.09s;
		position: relative;
		background: #deeff7;
		transform: scale(0.7);

	}

	#groupVisibility i:after {
		content: " ";
		display: block;
		width: 30px;
		height: 30px;
		top: 5px;
		left: 5px;
		border-radius: 50%;
		background: #fff;
		position: absolute;
		box-shadow: 1px 2px 4px 0 rgba(0, 0, 0, 0.4);
		transition: 0.15s;
	}

	#groupVisibility > input:checked + i {
		background: #1094fb;
	}

	#groupVisibility > input:checked + i:after {
		transform: translateX(25px);
	}

	h3{
		margin: 0px 0px 10px 10px;
		text-align: left;
		font-size: 20px;
	}

	#passInput{
		padding: 10px;
		/* border: none; */
		background: transparent;
		color: white;
		font-size: 18px;
	}

	#passInput::placeholder {
		color: rgb(186, 186, 186);;
		opacity: 1;
	}

	#passInput:focus{
		outline: none;
		background: #00000030;
	}

	#saveBtn{
		background-color: red;
		cursor: pointer;
		padding: 0px 10px;
		height: 40px;
		border: none;
		border-radius: 10px;
		color: white;
		font-size: 20px;
		margin: 10px auto;
		line-height: 40px;
		width: fit-content;
	}

</style>