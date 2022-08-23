<template>
    
    <div id="sidebg" :class="[state ? 'active' : '']">
        <div @click="toggleSide" id="closebutton">x</div>
        Chat
        <div @click="toggleSide" id="slidebutton">
            <fa v-if="state" icon="angle-left"/>
            <fa v-else icon="angle-right"/>
        </div>
    </div>
</template>

<script setup>
    import {ref} from 'vue'
    let state= ref(true)
    function toggleSide(){
        console.log(state.value)
        state.value = !state.value
    }
</script>

<style scoped>
    #sidebg{
        min-width: 350px;
        position: absolute;
        top: 0;
        right: 0;
        background-color: rgba(123,51,125, 0.5);
        width: 25%;
        height: 100%;
        transition: all 0.7s ease;
    }

    .active{
        transform: translateX(100%);
    }

    #sidebg>#slidebutton{
        /* border: 3px solid green; */
        width: 15%;
        aspect-ratio : 1/2;
        position: absolute;
        top: 50%;
        transform: translate(-100%,-50%);
        left: 0;
        font-size: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(123,51,125, 0.5);
        border-radius: 20px 0 0 20px;
    }

    #sidebg>#closebutton{
       width: 10%;
       position: absolute;
       top: 0;
       right: 0;
       cursor: pointer;
    }
    

</style>