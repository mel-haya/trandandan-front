import { defineStore } from "pinia";
import { ref } from "vue"

// ref()s become state properties
// computed()s become getters
// function()s become actions

export const useUserStore = defineStore('user', () =>
{
    const username = ref("")
    const imgUrl = ref("")
    function update(u:string,p:string){
        username.value = u
        imgUrl.value = p
    }

    return({username, imgUrl, update})
})