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
        <div id="notifContainer" :style="`max-height:${filterheight}px;`">
            <div id="filterbar">
                <input tabindex="-1" id="filterInput" type="text" @keyup.enter="sendFriendReq()" placeholder="Add new friends..."/>
            </div>
        </div>
        <div id="notifContainer" :style="`max-height:${notificationHeight}px`">
            <h2 id="requestEmpty" v-if="!friendRequests.length">No friend requests</h2>
            <NotifItem v-for="req in friendRequests" :key="req.id" :user="req" @update="updateRequests()"/>
        </div>
        <div ref="slider" id="slider" @mouseup="sliderLeave" @mouseleave="sliderLeave" @mousedown="sliderClick" @mousemove="sliderMove">
            <div ref="innerSlider" id="innerSlider">
                <h2 id="requestEmpty" v-if="!friends.length">No friends yet</h2>
                <FriendSliderItem v-for="friend in friends" :key="friend.id" :user="friend"/>
                <!-- <FriendSliderItem name="friend 1" icon="user"/>
                <FriendSliderItem name="friend 2" icon="user"/>
                <FriendSliderItem name="friend 3" icon="user"/>
                <FriendSliderItem name="friend 4" icon="user"/>
                <FriendSliderItem name="friend 5" icon="user"/>
                <FriendSliderItem name="friend 6" icon="user"/> -->
            </div>
        </div>
    </div>
</template>

<script setup>
    import {onMounted, ref} from 'vue'
    import FriendSliderItem from './FriendSliderItem.vue'
    // import NotifItem from './NotifItem.vue'
    import { useToast } from "vue-toastification";
    import axios from 'axios'
    import Cookies from 'js-cookie'
    import NotifItem from './NotifItem.vue';

    const toast = useToast();
    let filterheight = ref(0);
    let notificationHeight = ref(0);
    let innerSlider = ref("innerSlider");
    let slider = ref("slider");
    let isDown = false;
    let startX;
    let scrollLeft;

    let friendRequests = ref([]);
    let friends = ref([]);

    function updateRequests()
    {
        const config = {
            headers: { "Authorization": `Bearer ${Cookies.get('accessToken')}` }
        };
        axios.get("http://localhost:3000/user/received-requests", config)
        .then(function (response){ 
            friendRequests.value = response.data;
        })
        .catch((err) => console.log(err));
    }

    function updateFriends()
    {
        const config = {
            headers: { "Authorization": `Bearer ${Cookies.get('accessToken')}` }
        };
        axios.get("http://localhost:3000/user/friends", config)
        .then(function (response){ 
            friends.value = response.data;
        })
        .catch((err) => console.log(err));
    }

    onMounted(() => {
        // fetch friend requests with axios
        updateRequests()
        updateFriends()
        // fetch friends
    });

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
        filterheight.value = filterheight.value == 0 ? 40 : 0;
    }

    function toggleNotification(){
        notificationHeight.value = notificationHeight.value == 0 ? 200 : 0;
    }

    function sendFriendReq(){
        toast.success("Friend request sent", {
        timeout: 4000,
      });
      
    }

</script>


<style scoped>

#friendComponent{
    width: 100%;

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
    background: linear-gradient(0deg, rgba(61,15,64,1) 0%, rgba(105,39,110,1) 41%, rgba(122,51,125,1) 100%);
    font-size: 20px;
    height: 47.5px;
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
    line-height: 47.5px;
}

#filter{
    position: absolute;
    display: inline-block;
    right: 10px;
    height: 100%;
    line-height: 47.5px;
    cursor: pointer;
}

#notification{
    position: absolute;
    display: inline-block;
    right: 40px;
    line-height: 47.5px;
    cursor: pointer;
}

#slider::-webkit-scrollbar {
    display: none;
}
#slider{
    width: 100%;
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
    display: inline-block;
}

#notifContainer{
    transition: max-height 0.5s ease;
    overflow :scroll;
}

#requestEmpty{
    color: grey;
}

</style>