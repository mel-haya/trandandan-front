<template>
    <div id="container">
        <div id="innerContainer">
            <img :src="require('@/assets/sadCat.jpeg')" alt="">
            <span>404</span> <p>Not found</p>
        </div>
    </div>  
</template>

<script lang="ts" setup>

</script>

<style  scoped>
    #container{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 50px;
    }
    span{
        font-size: 100px;
        margin: 0 20px;
    }
    p{
        font-size: 30px;
        display: inline-block;
    }
</style>