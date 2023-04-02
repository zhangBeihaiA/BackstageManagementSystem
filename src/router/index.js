import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)
import Home from '../views/Home'
import User from '../views/User'
import Main from '../views/Main'
import Mall from '../views/Mall'
import PageOne from '../views/PageOne'
import PageTwo from '../views/PageTwo'

export default new VueRouter({
    routes: [
        //主路由
        {
            path:'/',
            component:Main,
            redirect:'/home', //重定向
            children:[
                //子路由
                {
                    path: '/home',
                    component: Home
                },
                {
                    path: '/user',
                    component: User
                },
                {
                    path:'/mall',
                    component:Mall
                },
                {
                    path:'/page1',
                    component:PageOne
                },
                {
                    path:'/page2',
                    component:PageTwo
                },
            ]
        },
        
    ]
})

