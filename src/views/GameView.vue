<template>
    <div ref="game" id="game">
    </div>
</template>

<script setup>
    import {onMounted, ref} from 'vue';
    import {s} from '@/p5game';
    import p5 from 'p5';

    let game = ref('game');
    
    onMounted(() => {
        new p5(s, game.value);
    });
</script>

<style scoped>

</style>