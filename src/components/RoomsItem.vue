<template>
    <div id="GroupItem">
        <p id="GroupName">{{Props.room.name}}</p>
        <p id="GroupCount">{{Props.room.members}} members</p>
        <div id="JoinBtn">Join</div>
    </div>
</template>

<script setup>
    import { defineProps } from 'vue'
    let Props = defineProps({
        room: {
            type: Object,
            required: true
        }
    });
</script>

<style scoped>

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    #GroupItem{
        position: relative;
        width: 100%;
        height: 120px;
        background-color: rgba(122, 51, 125, 0.995);
        color: white;
        font-size: 20px;
        font-weight: 600;
        text-align: center;
        padding: 10px;
        margin: 10px;
        border-radius: 10px;
        background-image: url('@/assets/991.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

    }

    #GroupName{
        position: relative;
        width: 100%;
        text-align: left;
        padding-left: 10px;
        font-size: 20px;
        font-weight: 600;
        text-shadow: 4px 2px 2px rgb(62, 62, 62);
    }

    #GroupCount{
        position: relative;
        width: 100%;
        text-align: left;
        padding-left: 10px;
        font-size: 15px;
        font-weight: 400;
        text-shadow: 2px 2px 2px rgb(62, 62, 62);
    } 
    


    #JoinBtn{
        position: absolute;
        background-color:rgba(17, 151, 21, 0.995);
        color: white;
        font-size: 15px;
        font-weight: 600;
        text-align: right;
        padding: 5px 10px;
        margin: 10px;
        border-radius: 10px;
        right: 5px;
        bottom: 5px;
    }

    #JoinBtn:hover{
        cursor: pointer;
        background-color: rgba(21, 204, 27, 0.995);
        box-shadow: 0px 0px 5px 2px rgba(21, 204, 27, 0.995);
        text-shadow: 2px 2px 2px #0000007F;
    }

</style>