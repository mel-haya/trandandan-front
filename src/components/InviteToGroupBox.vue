<template>
    <div id="addmembersBG" @click="emits('close')">
        <div id="addmembersContainer" @click.stop="">
            <h3>Add members</h3>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { useChatStore } from '@/stores/chat';
    import { onMounted, onUnmounted, ref } from 'vue';  
    import {$api} from '@/axios';
    // import {useToast} from 'vue-toastification';
    
    const emits = defineEmits(['close'])


    const chatStore = useChatStore();
    let members:any = ref([]);
    // const toast = useToast();

    function updateMembers(){
        $api.get('/channel/members/'+ chatStore.activeChat.id).then((res) => {
            members.value = res.data;
        })
    }

    onMounted(() => {
        updateMembers()
    })

    onUnmounted(() => {
    });


</script>

<style scoped>

#addmembersBG{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
    /* display: none; */
}

#addmembersContainer{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 500px;
    background-color: rgba(79, 17, 81, 0.9);
    border-radius: 10px;
}

#addmembersContainer h3{
    margin: 0px;
    padding: 0px;
    font-size: 30px;
    background-color: rgba(122, 51, 125, 0.995);
    width: 100%;
    padding: 15px 0px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}


</style>