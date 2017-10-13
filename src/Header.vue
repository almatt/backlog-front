<template>
  <div>
    <div class="menu">
        <router-link :to="{ name: 'main', params: {} }"><img class="logo" src="/src/assets/logo.png" alt=""></router-link>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
        }
    }
}
</script>
<style >
    .menu{
        min-height:50px;
        text-align:center;
    }
    .menu .logo{
        padding: 10px 0;
        width:90px;
    }
</style>
