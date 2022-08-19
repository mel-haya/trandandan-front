<script setup>
/* eslint-disable */
    import { useUserStore } from '@/stores/user'
    import { storeToRefs } from 'pinia'
    import SidebareItem from '@/components/SidebarItem.vue'
    const store = useUserStore()
    const { username } = storeToRefs(store)
</script>

<template>
    <h1>Home</h1>
    <SidebareItem></SidebareItem>
    <router-link to="/login">Go to Login</router-link>
    <h3>{{username}}</h3>
</template>

<style  scoped>
    
</style>