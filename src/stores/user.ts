import { defineStore } from "pinia";
import { ref } from "vue"
import {$api} from "@/axios"
import { useRouter } from "vue-router";

export const useUserStore = defineStore('user', () =>
{
    const router = useRouter()
    const user: any = ref({"id":-1,"username":"","email":"","displayName":"","imgPath":""});
    async function initUser() {
        $api.get('/user/me').then((res) => {
            user.value = res.data;
        }).catch((err:any) =>{
            
            console.log(err);
        })
    }

    return({user, initUser})
})