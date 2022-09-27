<template>
    <div id="membersBG">
        <div id="membersContainer" @click.stop="">
            <h3>Members</h3>
            <div id="membersList">
                <memberListItem :member="test" />
                <memberListItem :member="test" />
                <memberListItem :member="test" />
                <memberListItem :member="test" />
                <memberListItem :member="test" />
                <memberListItem :member="test" />
                <memberListItem :member="test" />
                <memberListItem :member="test" />
                <memberListItem :member="test" />
                <memberListItem :member="test" />
                <memberListItem :member="test" />
            </div>
        </div>
    </div>
</template>

<script setup>
    import memberListItem from './memberListItem.vue'
    let test = {
        username: 'Mouad',
        level: 5,
        status: 'online',
        img: 'bruh.jpg'
    }
</script>

<style scoped>

#membersBG{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
    /* display: none; */
}

#membersContainer{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    /* height: 500px; */
    background-color: rgba(123,51,125, 0.8);
    border-radius: 10px;
}

#membersContainer h3{
    margin: 0px;
    padding: 0px;
    font-size: 30px;
    background-color: rgba(122, 51, 125, 0.995);
    width: 100%;
    padding: 15px 0px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

#membersList{
    height: calc(100% - 50px);
    overflow-y: scroll;
    max-height: 390px;
}

#membersList::-webkit-scrollbar {
    width: 10px;
    padding: 10px;
}

#membersList::-webkit-scrollbar-track {
    background: #ffffff20;
}

#membersList::-webkit-scrollbar-thumb {
    background: rgba(79, 17, 81, 0.995);
    border-radius: 10px;
}



</style>