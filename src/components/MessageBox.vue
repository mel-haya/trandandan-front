<template>
    <div id="messageContainer">
        <div id="chatHeader">
            <div id="leaveChat" @click="store.activeChat = null">
                <fa icon="chevron-left"/>
            </div>
            <div id="userImg">

            </div>
            <div id="chatName">
                {{store.activeChat.name}}
            </div>
            <div id="chatSettings">
                <fa icon="ellipsis-vertical"/>
            </div>
        </div>
        <div id="chatBody">

        </div>
    </div>
</template>

<script setup>
    import { useInterfaceStore } from '@/stores/interface';
    let store = useInterfaceStore();
    
    
</script>

<style scoped>
    #messageContainer{
        position: relative;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: 1;
        /* background-color: red; */
    }
    #chatHeader{
        height: 100px;
        display: flex;
        flex-direction: row;
        line-height: 100px;
        text-align: left;
        background-color: #00000040;
    }

    #chatName{
        flex-grow: 1;
    }

    #chatSettings{
        height: 40px;
        width: 40px;
        border-radius: 40px;
    }

    #chatBody{
        height: calc(100% - 100px);
    }

</style>