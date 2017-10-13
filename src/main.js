import Vue from 'vue'
import App from './App.vue'
import Header from './Header.vue'
import VueMaterial from 'vue-material'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './router'
import 'vue-material/dist/vue-material.css'
import Vue2Dnd from 'vue2-dnd'

Vue.component('Header', Header);

Vue.use(VueResource);
Vue.use(VueMaterial);
Vue.use(VueRouter);

const router = new VueRouter({
    routes: Routes,
    mode: 'history'
});

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

router.beforeEach((to, from, next) => {
    const authUser = getCookie('access_token');
    if(to.name=="login"){
        if(authUser){
            next({name:'main'});
        }
    }else{
        if(to.meta.requiredAuth){
            if(!authUser){
                next({name:'login'});
            }
        }
    }
    next();
})

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})
