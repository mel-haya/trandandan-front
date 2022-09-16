<template>
    <div id="sideProfile">
        <div id="userImg"></div>
        <div id="userName">mel-haya</div>
        <div id="settings" @click="togglemenu">
            <fa id="settings-icon" icon="ellipsis-vertical"/>
        </div>
    </div>
    <div id="context-menu">
        <div id="context-menu-item">
            <fa icon="user"/>
            <span> My profile</span>
        </div>
        <hr>
        <div id="context-menu-item">
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
    function togglemenu(){
        let menu = document.getElementById("context-menu")
        if(menu.style.display === 'none')
            menu.style.display = 'block'
        else
            menu.style.display = 'none';
    }
</script>

<script>
    window.addEventListener('click', function (e) {
        if (!(document.getElementById("settings").contains(e.target))) {
            document.getElementById('context-menu').style.display = 'none';
        }
    });
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
        top: 70px;
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
        width: 30px; 
        height: 30px;
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