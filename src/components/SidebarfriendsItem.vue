<template>
    <div id="friendComponent">
        <div id="friendHeader">
            <p>Connected friends</p>
            <div id="filter" @click="toggleFilter">
                <fa icon="search"/>
            </div>
            <div id="notification">
                <fa icon="bell"/>
            </div>
        </div>
        <div id="filterbar" :style="`top: ${filterheight}px`">
            <input id="filterInput" type="text" placeholder="Filter friends..."/>
        </div>
        <div id="slider" :style="`top: ${filterheight}px`">
            <div id="addFriend">
                <fa icon="plus"/>
            </div>
            <div id="addFriend">
                <fa icon="user"/>
            </div>
            <div id="addFriend">
                <fa icon="user"/>
            </div>
            <div id="addFriend">
                <fa icon="user"/>
            </div>
            <div id="addFriend">
                <fa icon="user"/>
            </div>
        </div>

    </div>
</template>

<script setup>
    import {ref} from 'vue'
    let filterheight = ref(-40);
    function toggleFilter(){
        filterheight.value = filterheight.value == 0 ? -40 : 0;
    }
</script>


<style scoped>

#friendHeader{
    width: 100%;
    background-color: rgba(122, 51, 125, 0.995);
    font-size: 20px;
    height: 40px;
    position: relative;
    z-index: 2;
}

#friendHeader p{
    margin: 0;
    padding: 0;
    font-weight: bold;
    position: absolute;
    top: 0;
    left: 10px;
    height: 100%;
    width: 100%;
    text-align: left;
    display: inline-block;
    line-height: 40px;
}

#filter{
    position: absolute;
    display: inline-block;
    right: 10px;
    height: 100%;
    line-height: 40px;
    cursor: pointer;
}

#notification{
    position: absolute;
    display: inline-block;
    right: 40px;
    height: 100%;
    line-height: 40px;
    cursor: pointer;
}

#slider::-webkit-scrollbar {
    display: none;
}
#slider{
    width: 100%;
    overflow: hidden;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    height: 100%;
    padding: 10px 0;
    position: relative;
    transition: all 0.5s ease;
}

#addFriend{
    width: 75px;
    height: 75px;
    background-color: white;
    color  : black;
    display: inline-block;
    margin: 10px;
    border-radius: 100px;
    text-align: center;
    line-height: 75px;
    font-size: 35px;
    font-weight: bold;
    cursor: pointer;
}

#filterbar{
    width: 100%;
    height: 40px;
    position: relative;
    transition: all 0.5s ease;
    z-index: 0;
    top: 0px;
    z-index: 1;
}

#filterbar input{
    width: calc(100% - 20px);
    height: 100%;
    border: none;
    font-size: 20px;
    color: black;
    top: 0px;
    left: 0px;
    position: absolute;
    padding: 0 10px;
}

textarea:focus, input:focus{
    outline: none;
}




</style>