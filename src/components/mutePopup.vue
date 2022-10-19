<template>
    <div id="muteContainer" @click.stop="">
        <div id="ccHeader">
            <h1>{{Props.message}}</h1>
        </div>
        <div id="body">
            {{Props.message}} for <input type="number" id="timeInput" v-model="time"> seconds
        </div>
        <div id="btnsCell">
            <div class="btn" id="actionBtn" @click="action">{{Props.message}}</div>  
            <div class="btn" id="cancelBtn" @click="Emits('close')">Cancel</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { $api } from '@/axios';
    import { useToast } from 'vue-toastification';
    import { ref } from 'vue';
    const Props = defineProps({
        message: {
            type: String,
            required: true
        },
        request: {
            type: String,
            required: true
        }
    })
    const Emits = defineEmits(['close'])
    const toast = useToast();
    const time = ref(0);

    function action(){
        if(time.value <= 0){
            toast.error('Time must be greater than 0')
            return
        }
        $api.patch(Props.request + (time.value * 1000))
        .then(() => {
            if(Props.message == 'Mute'){
                toast.success('User muted successfully')
            }
            else if(Props.message == 'Ban'){
                toast.success('User Banned successfully')
            }
        }).catch((err) => {
            console.log(err);
        })
        Emits('close')
    }

</script>

<style scoped>
#muteContainer{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: rgba(79, 17, 81, 0.9);
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);
    font-size: 20px;
}

#ccHeader{
    height: 70px;
    /* line-height: 30px; */
    /* background-color: rgba(122, 51, 125, 0.995); */
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    text-align: left;
    padding: 10px 20px;
    border-bottom: 2px solid rgba(255,255,255,0.2);
}

h1{
    color: white;
    font-size: 34px;
    margin: 0;
    padding: 0;
}

.btn{
    background-color: rgba(122, 51, 125, 0.995);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    height: 40px;
}

.btn:hover{
    background-color: rgba(122, 51, 125, 0.8);
}


#btnsCell{
    display: flex;
    height: 50px;
    align-items:center;
    justify-content: center;
    padding-bottom: 20px;
}

#timeInput{
    width: 100px;
    color: black;
}

#body{
    padding: 20px;
    text-align: center;
}

#cancelBtn{
    margin-left: 10px;
}

</style>