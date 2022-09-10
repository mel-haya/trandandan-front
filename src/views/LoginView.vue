
<script setup>
    import axios from 'axios';
     function submit(){
        axios.get(`http://0.0.0.0:3000/auth/42`).catch((err) => console.log(err)) 
    }
    
</script>



<template>
    <img src="../assets/pong-online.png" alt="" style="width: 40%;">
    <br>
    <div id="loginButton">
        <a @click="submit" href="http://0.0.0.0:3000/auth/42">Sign up with 42</a>
    </div>

</template>

<style scoped>

#loginButton{
    text-decoration: none;
    border-radius: 0.4em;
    font-size: 3rem;
    /* height: 4rem; */
    line-height: 5rem;
    border: 0.125em solid #FF0FBB;
    display: inline-block;
    padding: 0.25em 1em;
    cursor: pointer;
}

#loginButton:hover{
    background: #FF0FBB;
}

#loginButton a{
    text-decoration: none;
    color: #FF0FBB;
}

#loginButton:hover a{ 
    color: black;
}

</style>
