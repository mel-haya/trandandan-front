<template>
    <div id="ccbg" @click="store.enableChannelCreate = false">
        <div id="ccContainer" @click.stop=""> 
            <div id="ccHeader">
                <h1>Create new group</h1>
            </div>
            <div id="ccForm">
                <table>
                    <tr>
                        <td>
                            <label for="nameInput">Name*</label> 
                        </td>
                        <td>
                            <span>:</span><input id="nameInput" type="text" placeholder="Group name" v-model="name"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="privateInput">Privacy*</label>
                        </td>
                        <td>
                            <span>:</span><select id="privateInput" v-model="privacy" required>
                                <option value="" disabled selected hidden>Select your option</option>
                                <option value="Public">Public</option>
                                <option value="Private">Private</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><label for="passInput">Password</label></td>
                        <td>
                            <span>:</span><input id="passInput" v-model="password" :type="passwordVisible" placeholder="Enter password"/>
                            <fa icon="eye" id="passEye" @click="enablePass"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        </td>
                        <td id="btnsCell">
                            <div class="btn" id="createBtn" @click="createGroup">Create</div>  
                            <div class="btn" id="cancelBtn" @click="store.enableChannelCreate = false">Cancel</div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {useInterfaceStore} from '@/stores/interface'

const name = ref('')
const privacy = ref('')
const password = ref('')
const passwordVisible = ref('text')
const store = useInterfaceStore();

function enablePass(){
    if(passwordVisible.value == 'password'){
        passwordVisible.value = 'text'
    }
    else{
        passwordVisible.value = 'password'
    }
}

function createGroup()
{
    console.log(name.value)
    console.log(privacy.value)
    console.log(password.value)
}
</script>

<style scoped>
#ccbg{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 100;
    box-sizing: border-box;
}

#ccContainer{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: rgba(79, 17, 81, 0.9);
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);
    font-size: 20px;
}

#ccForm{
    padding: 20px;
}

tr{
    height: 50px;
    text-align: left;
}



#ccHeader{
    height: 70px;
    /* line-height: 30px; */
    /* background-color: rgba(122, 51, 125, 0.995); */
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    text-align: left;
    padding: 10px 20px;
    border-bottom: 2px solid rgba(255,255,255,0.2);
}

tr td:first-child{
    width: 120px;
}

input, select{
    color: black;
    width: calc(100% - 20px);
    padding: 2px 10px;
    /* margin-left: 10px; */
}

.btn{
    background-color: rgba(122, 51, 125, 0.995);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    height: 40px;
}

.btn:hover{
    background-color: rgba(122, 51, 125, 0.8);
}

#cancelBtn{
    
    margin-left: 10px;
}


select:invalid {
  color: rgba(128, 128, 128, 0.747);
}

#passEye{
    margin-left: -30px;
    color: rgba(128, 128, 128, 0.747);
    cursor: pointer;
}

#reqNotice{
    height: 30px;

}

h1{
    color: white;
    font-size: 34px;
    margin: 0;
    padding: 0;
}

#btnsCell{
    display: flex;
    height: 50px;
    align-items:flex-end;
    justify-content: flex-end;

}

span{
    display: inline-block;
    width: 20px;
}

</style>