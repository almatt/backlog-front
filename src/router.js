import Projects from './Projects.vue'
import Project from './Project.vue'
import Login from './Login.vue'
export default[
    {path:'/login', component:Login},
    {path:'/', component:Projects},
    {path:'/project/:id', component:Project}
]
