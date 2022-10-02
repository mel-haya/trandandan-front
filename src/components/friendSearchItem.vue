<template>
    <div id="fsbg">
        <div id="fsc" @mousedown.stop="">
            <div id="FSHeader">
                <h3>Add friends</h3>
            </div>
            <div id="FSBody">
                <input type="text"/>
            </div>
        </div>
    </div>    
    
</template>

<script setup>

</script>

<style scoped>

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    #fsbg{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.8);
        z-index: 100;
    }

    #fsc{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 400px;
        height: 600px;
        background-color: rgba(123,51,125, 0.8);;
        border-radius: 10px;
    }

    #FSHeader{
        width: 100%;
        height: 80px;
        background-color: rgba(61,15,64, 0.8);
        border-radius: 10px 10px 0 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
    }

    input{
        width: calc(100% - 20px);
        border: 2px solid black;
        padding: 5px 5px;
        margin: 0 10px;
        font-size: 24px;
        color: black;
    }

    input:focus{
        outline: none;
    }

</style>