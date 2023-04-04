import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)
import Cookie from 'js-cookie'
import Home from '../views/Home'
import User from '../views/User'
import Main from '../views/Main'
import Mall from '../views/Mall'
import PageOne from '../views/PageOne'
import PageTwo from '../views/PageTwo'
import Login from '../views/Login'


let router =  new VueRouter({
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
            name:'login',
            component:Login

        }
        
    ]
})

//导航守卫
router.beforeEach((to,from,next)=>{
    //判断token不存在
    const token = Cookie.get('token')
    console.log(token)
    // if(!token && to.name !=='login'){
    //     next({name:'login'})
    // }else if(token &&to.name=='login'){
    //     next({name:from.name})
    // }else{
    //     next()
    //     console.log(1)
    // }
    if(!token && to.path == '/login'){
        next()
    }else if(!token && to.path !=='/login'){
        next('/login')
    }else if(token && to.path=='/login'){
        next({path:from.path})
    }else{
        next()
    }
})
export default router
