<template>
    <div id="notifContainer">
        <p id="notifBody"><span>{{props.name}}</span> Sent you a friend request</p>
        <div id="approveBtn"><fa icon="check"/></div>
        <div id="denyBtn"><fa icon="xmark"/></div>
    </div>
    
</template>

<script setup>
    import {defineProps} from 'vue'
    let props = defineProps({
        name: String,
        img: String,
        online: Boolean
    });

</script>

<style scoped>
    #notifContainer{
        position: relative;
        width: 100%;
        height: 50px;
        background-color: white;
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        align-items: center;
        padding: 0px 10px;
    }

    #notifBody{
        position: relative;
        left: 0;
        font-size: 15px;
        font-weight: 600;
        color: black;
        text-align: left;
        margin: 0px;
        flex-grow: 1;
    }

    #notifBody span{
        color: #1e90ff;
    }

    #approveBtn{
        position: relative;
        width: 30px;
        height: 30px;
        background-color: #00b300;
        border-radius: 30px;
        cursor: pointer;
        font-size: 20px;
        line-height: 30px;
        display: inline-block;
        text-align: center;
    }

    #denyBtn{
        position: relative;
        width: 30px;
        height: 30px;
        background-color: #ff0000;
        border-radius: 30px;
        cursor: pointer;
        font-size: 20px;
        line-height: 30px;
        right: 0px;
        display: inline-block;
        margin-left: 10px;
    }

    #denyBtn:hover{
        background-color: #ff4d4d;
    }

    #approveBtn:hover{
        background-color: #00e600;
    }

</style>