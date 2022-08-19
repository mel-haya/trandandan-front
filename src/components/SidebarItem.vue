<template>
    
    <div id="sidebg" :class="[state ? 'active' : '']">
        Chat
        <div @click="toggleSide" id="slidebutton">{{a}}</div>
    </div>
</template>

<script setup>
    import {ref} from 'vue'
    let a = ref(">")
    let state= ref(true)
    function toggleSide(){
        console.log(state.value)
        state.value = !state.value
        a.value = state.value ? '>' : '<'
    }
</script>

<style scoped>
    #sidebg{
        position: absolute;
        top: 0;
        background-color: black;
        width: 30%;
        height: 100%;
        transition: all 0.7s ease;
    }

    .active{
        transform: translateX(-85%);
    }

    #sidebg>#slidebutton{
        border: 3px solid green;
        width: 15%;
        text-align: center;
        line-height: 100%;
        vertical-align: middle;
        aspect-ratio : 1/1;
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: 50%;
    }
</style>