<template>
    <div ref="game" id="game">
    </div>
</template>

<script lang="ts" setup>
    import {onMounted, onUnmounted, ref} from 'vue';
    import {s,iio} from '@/p5game';
    import p5 from 'p5';
    import {useUserStore} from '@/stores/user'
    import { useRoute } from 'vue-router'

    const game = ref();
    const userStore = useUserStore()
    const route = useRoute()
    console.log(route.query.mode);

    //console.log(userStore.user)
    onMounted(() => {
        iio.connect();
        if (route.query.mode === "classic" || route.query.mode === "modern")
            iio.emit('getIDS', {id:userStore.user.id, socket:"", room:"", mode:route.query.mode, pos:0})
        // else if (route.query.mode === "watch")
        //     iio.emit('getIDS', {id:"id dyal li kayl3ab", socket:"", room:"", mode:route.query.mode, pos:0})
        new p5(s, game.value);
    });
    onUnmounted(async () => {
        iio.emit("disc", "");
    });
</script>

<style scoped>

</style>