<template>
    <div class="sliderItem">
        <div class="sliderImg" :style="`background-image: url('${props.user?.imgPath}')`">
        </div>
        <p>{{props.user?.displayName}}</p>
    </div>
</template>

<script lang="ts" setup>
    import {defineProps} from 'vue'
    let props = defineProps({
        user: Object,
    });
</script>

<style scoped>
    .sliderItem{
        display: inline-block;
        width: 100px;
    }

    .sliderItem p{
        font-size: 15px;
        text-align: center;
        cursor: pointer;
    }

    .sliderImg{
        width: 80px;
        height: 80px;
        display: inline-block;
        margin: 0px 10px;
        border-radius: 80px;
        cursor: pointer;
        background-size: cover;
        background-position: center;
    }
</style>