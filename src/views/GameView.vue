<template>
    <div ref="game" id="game">
    </div>
</template>

<script setup>
    import {onMounted, onUnmounted, ref} from 'vue';
    import {s,iio} from '@/p5game';
    import p5 from 'p5';

    let game = ref('game');

    onMounted(() => {
        iio.connect();
        new p5(s, game.value);
    });
    onUnmounted(async () => {
        iio.emit("disc", "");
    });
</script>

<style scoped>

</style>