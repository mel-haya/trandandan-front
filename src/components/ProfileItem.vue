<template>
    <div id="profileBg" @click="closeDiv">
        <div id="profileContainer">
            <div id="profileHeader">
                <div id="userImg" :style="`background-image: url('${profile?.profile.imgPath}')`"></div>
            </div>
            <div id="userInfo">
                <p>{{profile?.profile.displayName}} <span id="userStatus"></span> </p>
                <div id="reqBtn">Send friend request</div>
                <fa id="settings-icon" icon="ellipsis-vertical"/>
            </div>        
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { useInterfaceStore } from '@/stores/interface';
    import { ref,onMounted } from 'vue';
    import { $api } from '@/axios'
    let store = useInterfaceStore();
    let profile:any = ref(null)

    function closeDiv(e:any){
        if(e.target.id === 'profileBg')
            store.setActiveProfile(0);
    }

    onMounted(() => {
        // TODO: get profile idd from store
        $api.get('user/profile/' + 1)
            .then((response:any) => {
                profile.value = response.data;
                console.log(response)
            })
    })
</script>

<style scoped>
    #profileBg{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,0.8);
        z-index: 2;
    }

    #profileContainer{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 700px;
        height: 600px;
        background-color: rgb(149, 60, 152);
        transition: all 0.7s ease;
        border-radius: 10px;
        overflow: hidden;
    }

    #userImg{
        border-radius: 150px;
        position: absolute;
        bottom: -75px;
        left: 20px;
        width: 150px;
        height: 150px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        border: 10px solid rgb(149, 60, 152) ;
    }
    
    #userInfo{
        position: relative;
        height: 100px;
    }

    #userInfo p{
        position: absolute;
        bottom: 0px;
        padding-left: 10px;
        padding-top: 10px;
        text-align: left;
        font-size: 24px;
        color: white;
    }

    #userStatus{
        background-color: #0f0;
        border-radius: 15px;
        width: 15px;
        height: 15px;
        display: inline-block;
    }

    #profileHeader{
        position: relative;
        width: 100%;
        height: 100px;
        background-color: rgb(99, 38, 101);
    }

    #reqBtn{
        position: absolute;
        bottom: 0px;
        right: 50px;
        padding: 10px 20px;
        background-color: rgb(0, 137, 23);
        border-radius: 10px;
        color: white;
        font-size: 16px;
        cursor: pointer;
    }

    #settings-icon{
        position: absolute;
        bottom: 7px;
        right: 0px;
        font-size: 30px;
        color: white;
        cursor: pointer;
        width: 50px;
    }

</style>