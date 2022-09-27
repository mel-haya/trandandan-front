<template>
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
		<label for="password" id="groupVisibility" @click="togglePassword">
			<input type="checkbox" id="password" v-model="password" >
			<i></i>
			Protect channel with a password
		</label>
		<input type="text" id="passInput" placeholder="Password" ref="passInput">
        <div class="stupidBtn" id="saveBtn">Save changes</div>
		<div class="stupidBtn" id="deleteBtn">Delete channel</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

	let password = ref(false)
	let passInput = ref(null)

	onMounted(()=>{
		passInput.value.disabled = !password.value;
	})

	function togglePassword(){
		passInput.value.disabled = (password.value);
	}
</script>

<style scoped>

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

</style>