import { defineStore } from "pinia";
import { ref } from "vue"

// ref()s become state properties
// computed()s become getters
// function()s become actions

export const useUserStore = defineStore('user', () =>
{
    let username = ref("")
    let password = ref("")
    function auth(u,p){
        username.value = u
        password.value = p
    }
    return({username, password, auth})
})