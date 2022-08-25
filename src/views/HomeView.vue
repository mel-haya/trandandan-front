<script setup>
/* eslint-disable */
    import { useUserStore } from '@/stores/user'
    import { storeToRefs } from 'pinia'
    import SidebareItem from '@/components/SidebarItem.vue'

    const store = useUserStore()
    const { username } = storeToRefs(store)
    // console.log(this.$cookies.isKey('test'))
    
</script>


<template>
    <img src="../assets/pong-online.png" alt="" style="width: 40%;">
    <br>
    <SidebareItem></SidebareItem>
    <router-link to="/login">Go to Login</router-link>
    <h3>Welcome {{username}}</h3>
</template>

<style  scoped>
    
</style>