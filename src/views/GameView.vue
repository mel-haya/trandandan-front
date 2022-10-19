<template>
    <div ref="game" id="game">
    </div>
</template>

<script lang="ts" setup>
    import {onMounted, onUnmounted, ref} from 'vue';
    import {s,iio} from '@/p5game';
    import p5 from 'p5';
    import {useUserStore} from '@/stores/user'

    const game = ref();
    const userStore = useUserStore()

    //console.log(userStore.user)
    onMounted(() => {
        iio.connect();
        iio.emit('getIDS', userStore.user.id)
        new p5(s, game.value);
    });
    onUnmounted(async () => {
        iio.emit("disc", "");
    });
</script>

<style scoped>

</style>