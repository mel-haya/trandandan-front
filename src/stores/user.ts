import { defineStore } from "pinia";
import { ref } from "vue"
import {$api} from "@/axios"

// ref()s become state properties
// computed()s become getters
// function()s become actions

export const useUserStore = defineStore('user', () =>
{
    const user: any = ref({"id":0,"username":"","email":"","displayName":"","imgPath":""});
    function initUser(){
        $api.get('/user/me').then((res) => {
            user.value = res.data;
        })
    }

    return({user, initUser})
})