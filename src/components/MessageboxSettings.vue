<template>
	<div id="groupSettings">
		
		<div id="groupImage" :style="chatStore.activeChat.imgPath ? `background-image: url('${chatStore.activeChat.imgPath}')` : 'background: transparent'">
			<label for="groupFile">Change</label>
			<input ref="imageInput" id="groupFile" type="file" name="groupFile" @change="changeImage"/>
		</div>

		<!-- <div id="groupImage" style="background: transparent" v-else>
			<label for="groupFile">Change</label>
			<input  id="groupFile" type="file" name="groupFile" @change="changeImage"/>
		</div> -->
		<div id="groupName">
			<input type="text" placeholder="Group name" v-model="name">
		</div>
		<h3>Settings</h3>
		<label for="public" id="groupVisibility">
			<input type="checkbox" id="public" v-model="privacy">
			<i></i>
			Make the group private
		</label>
		<label for="password" id="groupVisibility" @click="togglePassword">
			<input type="checkbox" id="password" v-model="password">
			<i></i>
			Protect channel with a password
		</label>
		<input type="password" id="passInput" placeholder="Password" ref="passInput">
        <div class="stupidBtn" id="saveBtn" @click="submit">Save changes</div>
		<div class="stupidBtn" id="deleteBtn" @click="deleteChannel">Delete channel</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref, onMounted, watch } from 'vue';
	import type {Ref} from 'vue'
	import {useChatStore} from '@/stores/chat'
	import {$api} from '@/axios'
	import {useToast} from 'vue-toastification'

	const chatStore = useChatStore();
	let imageInput:Ref<any> = ref(null);
	let password = ref(chatStore.activeChat.type === "protected")
	let passInput:Ref<any> = ref("")
	let toast = useToast()
	let privacy = ref(chatStore.activeChat.type === "private")
	let name = ref(chatStore.activeChat.name)

	onMounted(()=>{
		passInput.value.disabled = !password.value;
	})

	function togglePassword(){
		passInput.value.disabled = password.value;
	}

	function changeImage(e:any)
    {
        chatStore.activeChat.imgPath = URL.createObjectURL(e.target.files[0]);
    }

	function deleteChannel(){
		$api.delete('channel/'+chatStore.activeChat.id).then(()=>{
			toast.success("Channel deleted")
			chatStore.updateChat(0);
			chatStore.updateJoined()
			chatStore.activeChatSetting = false
		}).catch(()=>{
			toast.error("Something went wrong")
		})
	}

	

	watch(privacy, (val)=>{
		if(val){
			password.value = false;
			passInput.value.disabled = true;
			passInput.value.value = "";
		}
	})

	watch(password, (val)=>{
		if(val){
			privacy.value = false;
		}
	})

	async function submit(){
		let data = new FormData();
		if(password.value && passInput.value.value.length == 0){
			toast.error("Password cannot be empty")
			return;
		}
		if(name.value.length == 0){
			toast.error("Name cannot be empty")
			return;
		}

		
		
		if(password.value){
			data.append("type", "protected")
			data.append("password", passInput.value.value)
		}
		else if(privacy.value){
			data.append("type", "private")
		}
		else{
			data.append("type", "public")
		}

		data.append("name", name.value)
		data.append('file', imageInput.value.files[0])
		$api({
                method: "patch",
                url: "channel/" + chatStore.activeChat.id,
                data: data,
                headers: {
                     "Content-Type": "multipart/form-data",
                    },
                })
                .then(async()=> {
                    toast.success("Channel updated")
					chatStore.updateJoined()
					await chatStore.updateChat(chatStore.activeChat.id);
					await chatStore.updateMessages()
					chatStore.activeChatSetting = false
                })
                .catch(function (res) {
					console.log(res)
                    toast.error(res.response.data.message[0]);
        });

	}


</script>

<style scoped>

	#groupSettings{
		height: 565px;
		background-color: transparent;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;	
	}

	#groupImage{
		position: relative;
		height: 150px;
		width: 100%;
		border-radius: inherit;
		margin: 0px auto;
		background-size: cover;
		background-position: center;

	}

	#groupImage label{
		position: absolute;
		right: 0;
		background-color: rgba(92, 34, 94, 0.995);
		color: white;
		font-size: 20px;
		padding: 5px;
		border-bottom-left-radius: 10px;
		border-top-right-radius: 10px;
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

	.stupidBtn{
		cursor: pointer;
		padding: 2px 10px;
		height: 40px;
		border: none;
		border-radius: 10px;
		color: white;
		font-size: 20px;
		margin: 10px auto;
		line-height: 40px;
		width: 200px;
	}

    #saveBtn{
        margin-top: 20px;
        background-color: #1094fb;
    }

    #deleteBtn{
        background-color: red;
    }

	#groupFile{
		display: none;
	}

</style>