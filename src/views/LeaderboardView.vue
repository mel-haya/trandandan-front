<template>
    <div id="leaderContainer">
        <div id="logo" @click="router.push('/')"></div>
        <!-- <h2>leaderboard</h2> -->
        <table>
            <tr>
                <th id="rankCell">Rank</th>
                <th id="nameCell">Name</th>
                <th>Score</th>
            </tr>
            <tr v-for="(member, index) in leaderboard" :key="index">
                <td id="rankCell">{{index + 1}}</td>
                <td id="nameCell">{{member.username}}</td>
                <td>{{member.xp}}</td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts" setup>

import { useRouter } from 'vue-router'
let router = useRouter();
let leaderboard = [{username: "Mourad", level: 5, xp: 9000},
                {username: "not Mourad", level: 3, xp: 200},
                {username: "not Mourad", level: 3, xp: 200},
                {username: "not Mourad", level: 3, xp: 200},
                {username: "not Mourad", level: 3, xp: 200},
                {username: "not Mourad", level: 3, xp: 200},
                {username: "not Mourad", level: 3, xp: 200},
                {username: "not Mourad", level: 3, xp: 200},
                {username: "not Mourad", level: 3, xp: 200},
                {username: "not Mourad", level: 3, xp: 200}]
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
    /* display: flex;
    justify-content: center;
    align-items: center; */
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

</style>