<template>
    <div id="messageContainer">
        <div id="chatHeader">
            <div id="leaveChat" @click="store.activeChat = ''">
                <fa icon="chevron-left"/>
            </div>
            <div id="chatName">
                {{store.activeChat}}
            </div>
            <div id="chatSettings">
                <fa icon="ellipsis-vertical"/>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useInterfaceStore } from '@/stores/interface';
    let store = useInterfaceStore();
    
</script>

<style scoped>
    #messageContainer{
        position: absolute;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: 1;
        /* background-color: red; */
    }
    #chatHeader{
        height: 80px;
        display: flex;
        flex-direction: row;
        line-height: 80px;
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

</style>