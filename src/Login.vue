<template>
<div>
    <div id="login">
        <form novalidate @submit.stop.prevent="login">
            <md-input-container>
                <label>Login</label>
                <md-input required placeholder="Login" v-model="username"></md-input>
            </md-input-container>
            <md-input-container md-has-password>
                <label>Password</label>
                <md-input required type="password" placeholder="Password" v-model="password"></md-input>
            </md-input-container>
            <md-button class="md-primary" type="submit">GO</md-button>
        </form>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {

    data() {
        return {
            username: "",
            password: "",
            loginEndPoint: "http://localhost:8080/oauth/token"
        }
    },

    methods: {
        login: function(){
            function getCookie(name) {
              var value = "; " + document.cookie;
              var parts = value.split("; " + name + "=");
              if (parts.length == 2) return parts.pop().split(";").shift();
            }
            var params = new URLSearchParams();
            params.append('grant_type', 'password');
            params.append('username', this.username);
            params.append('password', this.password);
            axios({
                method:'post',
                url:this.loginEndPoint,
                auth:{username:'my-trusted-client',password:'secret'},
                headers: {"Content-type": "application/x-www-form-urlencoded; charset=utf-8"},
                data:params
            }).then(function(response){
                document.cookie = "access_token =" + response.data.access_token + ";path=/";
                document.location = '/';
            });
        }
    }


}
</script>
<style>
    #login{
        width:30%;
        margin:170px auto 0 auto;
    }
    .md-button{
        width: 100%;
        font-size:19px;
    }
</style>
