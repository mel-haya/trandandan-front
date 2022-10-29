    <template>
        <img id="homeLogo" src="../assets/pong-online.png" alt="">
        <br>
        <div id="loginButton">
            <a @click="submit" href="http://10.12.8.9:3000/auth/42"><img id="ft_logo" :src="require('@/assets/42.png')" alt=""/> Login</a>
        </div>
    
    </template>

<script lang="ts" setup>
    import axios from 'axios';
     function submit(){
        axios.get(`http://${process.env.VUE_APP_APP_NAME}:3000/auth/42`).catch((err) => console.log(err)) 
    }
    
</script>




<style scoped>
#homeLogo{
    width: 35%;
    min-width: 400px;
    margin: 10px auto;
}

#ft_logo{
    width: 50px;
    display: inline;
}

#loginButton{
    max-width: 350px;
    width: 40%;
    height: 84px;
    line-height: 60px;
    font-size: 26px;
    border-top: #7B337D solid 3px;
    border-right: #7B337D solid 3px;
    border-bottom: #7B337D solid 3px;
    display: inline-block;
    padding: 10px 30px;
    cursor: pointer;
    transform: skew(30deg);
}

#loginButton:hover{
    font-size: 30px;
    text-shadow: 3px 3px 2px rgba(0, 0, 0, 0.5);
}

#loginButton a{
    color: white;
    text-decoration: none;
    display: inline-block;
    transform: skew(-30deg);
    transition: all 0.3s ease-in-out;
}

#loginButton::before{
    content: "";
    position: absolute;
    top: -2px;
    left: 0;
    width: 5%;
    height: 82px;
    transition: all 0.3s ease-in-out;
    background-color: #7a337d;

}

#loginButton:hover::before{
    background-color: #a942ac;
    width: calc(100% + 2px);
    box-shadow: #7a337d 0px 0px 20px 10px; 
}

</style>
