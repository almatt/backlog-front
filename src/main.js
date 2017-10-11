import Vue from 'vue'
import App from './App.vue'
import Projects from './Projects.vue'
import VueMaterial from 'vue-material'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './router'
import 'vue-material/dist/vue-material.css'
import Vue2Dnd from 'vue2-dnd'

Vue.component('projects', Projects);

Vue.use(VueResource);
Vue.use(VueMaterial);
Vue.use(VueRouter);

const router = new VueRouter({
    routes: Routes,
    mode: 'history'
});

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})
