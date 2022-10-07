import { defineStore } from "pinia";
import { ref } from "vue"

// ref()s become state properties
// computed()s become getters
// function()s become actions

export const useUserStore = defineStore('user', () =>
{
    const user: any = ref(null);
    function update(r:any){
        user.value = r;
    }

    return({user, update})
})