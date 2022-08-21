<template>
    
    <div id="sidebg" :class="[state ? 'active' : '']">
        Chat
        <div @click="toggleSide" id="slidebutton">{{a}}</div>
    </div>
</template>

<script setup>
    import {ref} from 'vue'
    let a = ref("<")
    let state= ref(true)
    function toggleSide(){
        console.log(state.value)
        state.value = !state.value
        a.value = state.value ? '<' : '>'
    }
</script>

<style scoped>
    #sidebg{
        position: absolute;
        top: 0;
        right: 0;
        background-color: rgba(33, 5, 53, 0.85);
        width: 25%;
        height: 100%;
        transition: all 0.7s ease;
    }

    .active{
        transform: translateX(100%);
    }

    #sidebg>#slidebutton{
        border: 3px solid green;
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
    }
</style>