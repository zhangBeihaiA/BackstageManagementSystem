export default{
    state:{
        isCollapse:false, //控制菜单展开收起
        tabList:[
            {
                path:"/",
                name:"home",
                label:"首页",
                icon:"s-home",
                url:"Home/home"
            }
        ], //面包屑
        menu:[]
    },

    mutations:{
        //修改菜单收起
        collapseMenu(state){
            state.isCollapse = !state.isCollapse 
        },
        //更新面包屑数据
        selectMenu(state,val){
            //判断添加的数据是否为首页
            if( val.name !=='home'){
                const index = state.tabList.findIndex(item => item.name === val.name)
                //如果不存在
                if(index ==-1){
                    state.tabList.push(val)
                }
            }
        },
        //删除指定的tag数据
        closeTag(state,item){
            const index = state.tabList.findIndex( val=> val.name == item.name)
            state.tabList.splice(index,1)
        },
        //
        setMenu(state,val){
            state.menu = val
            localStorage.setItem('menu',JSON.stringify(val))
        },

        //动态注册路由
        addMenu(state,router){
            //判断缓存中是否有数据
            if(!localStorage.getItem('menu')) return
            const menu = JSON.parse(localStorage.getItem('menu'))
            state.menu = menu
            //组合动态路由的数据
            const menuArray = []
            menu.forEach(item =>{
                if(item.children){ 
                    //map方法会返回一个新的数组
                    item.children = item.children.map(chil =>{
                        chil.component = ()=>import(`../views/${chil.url}`) //return 一个import的调用
                        return chil
                    })
                    menuArray.push(...item.children)
                }else{
                    item.component = ()=>import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            })
            console.log(menuArray,"menuArray")
            //路由的动态添加
            menuArray.forEach(item =>{
                router.addRoute('Main',item)
            })
            
        }

    }
}