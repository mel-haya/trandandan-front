<template>
    <div class="sliderItem">
        <div class="sliderImg">
            <fa :icon="props.icon"/>
        </div>
        <p>{{props.name}}</p>
    </div>
</template>

<script setup>
    import {defineProps} from 'vue'
    let props = defineProps({
        name: String,
        img: String,
        icon: String,
        online: Boolean
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
        margin-top: 10px;
        cursor: pointer;
    }

    .sliderImg{
        width: 80px;
        height: 80px;
        background-color: white;
        color  : black;
        display: inline-block;
        margin: 0px 10px;
        border-radius: 80px;
        text-align: center;
        line-height: 80px;
        font-size: 30px;
        cursor: pointer;
    }
</style>