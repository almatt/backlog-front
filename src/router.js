import Projects from './Projects.vue'
import Project from './Project.vue'
import Login from './Login.vue'
export default[
    {path:'/login', component:Login, name:'login'},
    {path:'/', component:Projects, name:'main', meta:{requiredAuth :true}},
    {path:'/project/:id', component:Project,name:'detail', meta:{requiredAuth :true}}
]
