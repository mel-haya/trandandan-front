<template>
    <div id="friendComponent">
        <div id="friendHeader">
            <p>Friends</p>
            <div id="notification" @click="toggleNotification">
                <fa icon="user-group"/>
                <span v-if="chat.friendRequests.length">{{chat.friendRequests.length}}</span>
            </div>
            <div id="filter" @click="toggleSearch">
                <fa icon="search"/>
            </div>
        </div>
        <div id="notifContainer" :style="`max-height:${notificationHeight}px`">
            <h2 id="requestEmpty" v-if="!chat.friendRequests.length">No friend requests</h2>
            <!-- <NotifItem :user="req" @update="updateRequests()"/> -->
            <div id="notifItem" v-for="req in chat.friendRequests" :key="req?.id">
                <p id="notifBody"><span>{{req.displayName}}</span> Sent you a friend request</p>
                <div id="approveBtn" @click="acceptReq(req.id)"><fa icon="check"/></div>
                <div id="denyBtn" @click="denyReq(req.id)"><fa icon="xmark"/></div>
            </div>
        </div>
        <div ref="slider" id="slider" @mouseup="sliderLeave" @mouseleave="sliderLeave" @mousedown="sliderClick" @mousemove="sliderMove">
            <h2 id="requestEmpty" v-if="!chat.friends.length"> <fa icon="users"/> No friends yet</h2>
            <div v-else ref="innerSlider" id="innerSlider">
                <FriendSliderItem v-for="friend in chat.friends" :key="friend?.id" :user="friend"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import {onMounted, ref} from 'vue'
    import FriendSliderItem from './FriendSliderItem.vue'
    import type { Ref } from 'vue'
    import {useInterfaceStore} from '@/stores/interface';
    // import {$api} from '@/axios'
    // import {useToast} from 'vue-toastification'
    import {useChatStore} from '@/stores/chat'

    // const toast = useToast();
    let notificationHeight = ref(0);
    let innerSlider = ref("innerSlider");
    let slider:Ref<any|null> = ref(null);
    let isDown = false;
    let startX:any;
    let scrollLeft:any;
    let interfaceStore = useInterfaceStore();
    // let friends:Ref<any> = ref([]);
    const chat = useChatStore();

    function updateRequests()
    {   
        chat.updateFriendRequests()
        chat.updateFriends()
    }

    // function updateFriends()
    // {
    //     $api.get("user/friends")
    //     .then((response) =>{ 
    //         friends.value = response.data;
    //     })
    //     .catch((err) => console.log(err));
    // }

    onMounted(() => {
        updateRequests()
    });

    function sliderClick(e:any){
        isDown = true;
        startX = e.pageX - slider.value?.offsetLeft;
        scrollLeft = slider.value?.scrollLeft;
    }

    function sliderLeave(){
        isDown = false;
    }

    function sliderMove(e:any){
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.value.offsetLeft;
        const walk = (x - startX) * 2;
        slider.value.scrollLeft = scrollLeft - walk;
    }

    function toggleNotification(){
        notificationHeight.value = notificationHeight.value == 0 ? 200 : 0;
    }

    function toggleSearch(){
        interfaceStore.enableSearch = true;
    }

    function acceptReq(id:number){
        chat.socket.emit('accept-friend-request', id, () => {
            updateRequests()
        })
    }

    function denyReq(id:number){
        chat.socket.emit('remove-relationship', id, () => {
            updateRequests()
        })
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
    scrollbar-width: none; /* Firefox */
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
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 24px;
    width: 100%;
}

#notifItem{
        position: relative;
        width: 100%;
        height: 50px;
        background-color: white;
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        align-items: center;
        padding: 0px 10px;
    }

    #notifBody{
        position: relative;
        left: 0;
        font-size: 15px;
        font-weight: 600;
        color: black;
        text-align: left;
        margin: 0px;
        flex-grow: 1;
    }

    #notifBody span{
        color: #1e90ff;
    }

    #approveBtn{
        position: relative;
        width: 30px;
        height: 30px;
        background-color: #00b300;
        border-radius: 30px;
        cursor: pointer;
        font-size: 20px;
        line-height: 30px;
        display: inline-block;
        text-align: center;
    }

    #denyBtn{
        position: relative;
        width: 30px;
        height: 30px;
        background-color: #ff0000;
        border-radius: 30px;
        cursor: pointer;
        font-size: 20px;
        line-height: 30px;
        right: 0px;
        display: inline-block;
        margin-left: 10px;
    }

    #denyBtn:hover{
        background-color: #ff4d4d;
    }

    #approveBtn:hover{
        background-color: #00e600;
    }

</style>