<template>
    <div id="sideProfile">
        <div id="userImg" :style="`background-image: url('${Profile.imageUrl}')`"></div>
        <div id="userName">{{Profile.username}}</div>
        <div id="settings" @click.stop="togglemenu">
            <fa id="settings-icon" icon="ellipsis-vertical"/>
        </div>
    </div>
    <div id="context-menu" ref="contextMenu">
        <div id="context-menu-item" @click="store.setActiveProfile(Profile.id)">
            <fa icon="user"/>
            <span> My profile</span>
        </div>
        <hr>
        <div id="context-menu-item" @click="router.push('/settings')">
            <fa icon="gear"/>
            <span> Settings</span>
        </div>
        <hr>
        <div id="context-menu-item">
            <fa icon="sign-out"/>
            <span> Sign out</span>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { useInterfaceStore } from '../stores/interface';
    import { useRouter } from 'vue-router';
    import {$api} from '@/axios';

    let router = useRouter();
    let store = useInterfaceStore();
    let contextMenu = ref(null);
    let Profile = ref({
        id: 0,
        username: '',
        imageUrl: '',
    });

    function togglemenu(){
        if(contextMenu.value.style.display === 'none')
            contextMenu.value.style.display = 'block'
        else
            contextMenu.value.style.display = 'none';
    }

    window.addEventListener('click', function () {
        if(contextMenu.value)
            contextMenu.value.style.display = 'none';
    });
    
    onMounted(async () => {
        let res = await $api.get('http://localhost:3000/user/me')
        Profile.value.id = res.data.id;
        Profile.value.username = res.data.displayName;
        Profile.value.imageUrl = res.data.imgPath;
    })



</script>


<style scoped>

    #sideProfile{
        width: 100%;
        padding-bottom: 10px;
    }

    #userImg{
        width: 150px;
        height: 150px;
        border-radius: 150px;
        margin: 10px auto;
        background-image: url('../assets/bruh.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
    #userName{
        width: 100%;
        font-size: 30px;
        text-align: center;
        height: 50px;
    }
    #context-menu{
        position: absolute;
        top: 65px;
        right: 10px;
        background-color: #FFFEFE;
        color: black;
        text-align: left;
        border-radius: 5px;
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);
        overflow: hidden;
        display: none;
    }
    #context-menu-item{
        width: 100%;
        padding: 7px;
        cursor: pointer;
        font-size: 20px;
    }
    #context-menu-item:hover{
        background-color: #e4e4e4;
    }
    #settings{
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 10px;
        width: 50px; 
        height: 50px;
        line-height: 30px;
        font-size: 30px;
        border-radius: 50px;
        color: rgb(249, 249, 249);
        cursor: pointer;
        z-index: 1;
    }
    #settings:hover{
        background: #fffefe31;
    }
    #settings-icon{
        z-index: 0;
    }
</style>