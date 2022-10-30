<template>
    <div id="leaderContainer">
        <div id="logo" @click="router.push('/')"></div>
        <!-- <h2>leaderboard</h2> -->
        <div id="leaderBoardScroll">
            <table>
                <tr>
                    <th id="rankCell">Rank</th>
                    <th id="nameCell">Name</th>
                    <th>Level</th>
                </tr>
                <tr v-for="(member, index) in leaderboard" :key="index">
                    <td id="rankCell">{{index + 1}}</td>
                    <td id="nameCell">{{member.displayName}}</td>
                    <td>{{member.lvl}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { $api } from '@/axios'
import { useUserStore } from '@/stores/user'
import { useToast } from 'vue-toastification'
import type { Ref } from 'vue'

const router = useRouter();
const store = useUserStore()
const toast = useToast()
const leaderboard:Ref<any> = ref([])

onMounted(async()=>{
    try{
        store.user = (await $api.get('/user/me')).data;
    }
    catch(e){
        toast.error('Failed to fetch user data');
        router.push('/login');
    }
    $api.get('/game/leaderboard').then(res=>{
        leaderboard.value = res.data
    }).catch(() =>{
        toast.error('Failed to fetch leaderboard')
    })
})

</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#leaderContainer{
    width: 50%;
    height: 100%;
    margin: auto;
}

table{
    width: 100%;
    border-collapse: collapse;
    font-family: 'B612 Mono', sans-sarif;
    border-collapse: collapse;
}

tr{
    height: 80px;;
    border-bottom: 2px solid rgb(48, 48, 48);
}

th{
    /* border: 1px solid black; */
    padding: 10px;
    text-align: center;
    height: 60px;
}

td{
    /* border: 1px solid black; */
    padding: 10px;
}

#nameCell{
    text-align: right;
    max-width: 250px;
}

#rankCell{
    width: 100px;
    text-shadow: #a1a1a1 2px 2px 10px;
}


#logo{
    width: 300px;
    height: 150px;
    background: url('@/assets/pong-online.png');
    background-size: cover;
    background-position: center;
    cursor: pointer;
    margin: 20px auto;
    margin-bottom: 20px;
}

#leaderBoardScroll{
    height: calc(100% - 200px);
    overflow-y: scroll;
    overflow-x: hidden;
}

#leaderBoardScroll::-webkit-scrollbar{
    width: 0px;
}



</style>