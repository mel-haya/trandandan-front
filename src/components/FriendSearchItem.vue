<template>
    <div id="fsbg" @click="store.enableSearch = false">
        <div id="fsc" @click.stop="">
            <div id="FSHeader">
                <h3>Add friends</h3>
            </div>
            <div id="FSBody">
                <input type="text" v-model="search"/>
                <p id="noResult" v-if="search.length > 0 && res.length === 0">No results for search "{{search}}"</p>
                <div id="searchRes">
                    <div id="searchItem" v-for="u in res" :key="u.id" @click="selectProfile(u.id)">
                        <span :style="`background-image: url('${u.imgPath}')`"></span><p>{{u.displayName}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>      
</template>
<script lang="ts" setup>
    import {useInterfaceStore} from '@/stores/interface'
    import {ref, watch} from 'vue'
    import {$api} from '@/axios'
    import type {Ref} from 'vue'
    let store = useInterfaceStore()
    let res:Ref<any> = ref([])
    let search:Ref<string> = ref("")
    
    watch(search, (val) => {
        if(val.length > 0)
        {
            $api.get('/user/search', {params: {q: search.value}})
            .then((response) => {
                res.value = response.data
            })
        }
        else
        {
            res.value = []
        }
    })

    function selectProfile(id: number)
    {
        store.activeProfile = id
        store.enableSearch = false
    }
    


</script>

<style scoped>

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    #fsbg{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.8);
        z-index: 100;
    }

    #fsc{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 400px;
        height: 600px;
        background-color: rgba(123,51,125, 0.8);
        border-radius: 10px;
        overflow: hidden;
    }

    #FSHeader{
        width: 100%;
        height: 80px;
        background-color: rgba(61,15,64, 0.8);
        border-radius: 10px 10px 0 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
    }

    input{
        width: calc(100% - 20px);
        border: 2px solid black;
        background-color: rgba(255,255,255, 0.5);
        padding: 5px 5px;
        margin: 0 10px;
        font-size: 24px;
        color: black;
    }

    input:focus{
        outline: none;
    }

    #searchItem{
        position: relative;
        width: 100%;
        height: 50px;
        margin: 10px;
        font-size: 26px;
        cursor: pointer;
        text-align: left;
        
    }

    #searchItem:hover{
        background-color: rgba(255,255,255, 0.2);

    }

    #searchItem p{
        display: inline-block;
        line-height: 50px;
        position: absolute;
    }

    #searchItem span{
        display: inline-block;
        width: 50px;
        height: 50px;
        border-radius: 100vw;
        background-color: rgba(255,255,255, 0.5);
        margin-right: 10px;
        background-size: cover;
        background-position: center;
    }

    #noResult{
        font-size: 26px;
        text-align: center;
        margin: 10px 0;
        word-wrap: break-word;
        color: rgb(168, 168, 168);
    }

</style>