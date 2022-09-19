<template>
    <div ref="game" id="game">
    </div>
</template>

<script setup>
    import {ref} from 'vue';
    import {s} from '@/p5game.js';
    import p5 from 'p5';
    let game = ref('game');
    new p5(s, game.value);
</script>

<style scoped>
    
</style>