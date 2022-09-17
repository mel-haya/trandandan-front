<template>
    <div id="friendComponent">
        <div id="friendHeader">
            <p>Friends</p>
            <div id="filter" @click="toggleFilter">
                <fa icon="search"/>
            </div>
            <div id="notification" @click="toggleNotification">
                <fa icon="user-group"/>
            </div>
        </div>
        <div :style="`height:${filterheight+40}px; transition: all 0.5s ease; overflow:hidden;`">
            <div id="filterbar">
                <input tabindex="-1" id="filterInput" type="text" placeholder="Filter friends..."/>
            </div>
        </div>
        <div id="notifContainer" :style="`height:${notificationHeight}px`">
            <NotifItem name="arbi"/>
            <NotifItem name="bouchta"/> 
            <NotifItem name="abdelaziz"/> 
            <NotifItem name="mourad"/>
            <NotifItem name="abdelaziz"/> 
            <NotifItem name="abdelaziz"/> 
            <NotifItem name="abdelaziz"/> 
            <NotifItem name="abdelaziz"/> 
        </div>
        <div ref="slider" id="slider" @mouseup="sliderLeave" @mouseleave="sliderLeave" @mousedown="sliderClick" @mousemove="sliderMove">
            <div ref="innerSlider" id="innerSlider">
                <FriendSliderItem name="Add"/>
                <FriendSliderItem name="friend 1"/>
                <FriendSliderItem name="friend 2"/>
                <FriendSliderItem name="friend 3"/>
                <FriendSliderItem name="friend 4"/>
                <FriendSliderItem name="friend 5"/>
                <FriendSliderItem name="friend 6"/>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {ref} from 'vue'
    import FriendSliderItem from './FriendSliderItem.vue'
    import NotifItem from './NotifItem.vue'

    let filterheight = ref(-40);
    let notificationHeight = ref(0);
    let innerSlider = ref("innerSlider");
    let slider = ref("slider");
    let isDown = false;
    let startX;
    let scrollLeft;


    function sliderClick(e){
        isDown = true;
        startX = e.pageX - slider.value.offsetLeft;
        scrollLeft = slider.value.scrollLeft;
    }

    function sliderLeave(){
        isDown = false;
    }

    function sliderMove(e){
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.value.offsetLeft;
        const walk = (x - startX) * 2;
        slider.value.scrollLeft = scrollLeft - walk;
    }

    function toggleFilter(){
        filterheight.value = filterheight.value == 0 ? -40 : 0;
    }

    function toggleNotification(){
        notificationHeight.value = notificationHeight.value == 0 ? 200 : 0;
        console.log(notificationHeight.value);
    }
</script>


<style scoped>

#friendComponent{
    width: 100%;
    position: relative;
}
*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

#notifContainer{
    transition: all 0.5s ease;
    overflow: scroll;
}
#notifContainer::-webkit-scrollbar{
    display: none;
}

#friendHeader{
    width: 100%;
    background-color: rgba(122, 51, 125, 0.995);
    font-size: 20px;
    height: 40px;
    position: relative;
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
    padding-top: 10px;
    position: relative;
    transition: all 0.5s ease;
    background-color: #51515142;
    scrollbar-width: none;
    text-align: left;
}

#addFriend{
    width: 70px;
    height: 70px;
    background-color: white;
    color  : black;
    display: inline-block;
    margin: 5px;
    border-radius: 80px;
    text-align: center;
    line-height: 70px;
    font-size: 35px;
    font-weight: bold;
}

#filterbar{
    width: 100%;
    height: 40px;
    position: relative;
    transition: all 0.5s ease;
    top: 0px;
}

#filterbar input{
    width: 100%;
    height: 100%;
    border: none;
    font-size: 20px;
    color: black;
    top: 0px;
    left: 0px;
    position: absolute;
    padding: 0 10px;
    box-sizing: content-box;
}

textarea:focus, input:focus{
    outline: none;
}

#innerSlider{
    position: relative;
    top: 0px;
    left: 0px;
    display: inline-block;
    scrollbar-width: none;
}


</style>