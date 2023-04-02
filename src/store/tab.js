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
        ] //面包屑
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
        }

    }
}