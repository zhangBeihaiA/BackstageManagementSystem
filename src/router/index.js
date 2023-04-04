import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)
import Home from '../views/Home'
import User from '../views/User'
import Main from '../views/Main'
import Mall from '../views/Mall'
import PageOne from '../views/PageOne'
import PageTwo from '../views/PageTwo'
import Login from '../views/Login'

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
                    name:'home',
                    component: Home
                },
                {
                    path: '/user',
                    name:'user',
                    component: User
                },
                {
                    path:'/mall',
                    name:'mall',
                    component:Mall
                },
                {
                    path:'/page1',
                    name:'page1',
                    component:PageOne
                },
                {
                    path:'/page2',
                    name:'page2',
                    component:PageTwo
                },
            ]
        },
        //登录页面
        {
            path:'/login',
            component:Login

        }
        
    ]
})

