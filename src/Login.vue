<template>
<div>
    <div id="login">
        <form novalidate @submit.stop.prevent="submit">
            <md-input-container>
                <label>Login</label>
                <md-input required placeholder="Login"></md-input>
            </md-input-container>
            <md-input-container md-has-password>
                <label>Password</label>
                <md-input required type="password" placeholder="Password"></md-input>
            </md-input-container>
        </form>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {

        }
    },

    methods: {

    }


}
</script>
<style>
    #login{
        width:30%;
        margin:170px auto 0 auto;
    }
</style>
