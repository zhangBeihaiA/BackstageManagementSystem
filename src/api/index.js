import http from '../utils/request'

//请求首页数据
export const getData = ()=> http({url:'/home/getData',method:'get'})
//请求用户列表
export const getUser = (params)=>{
    console.log(params)
    // return http({method:'get',url:'/user/getUser',params:params})
    return http.get('/user/getUser', params)
}
//新增用户
export const addUser = (data)=>http({url:'/user/add',method:'post',data})
//编辑用户
export const editUser = (data)=>http({url:'/user/edit',method:'post',data})
//删除用户
export const deleteUser = (data)=>http({url:'/user/delete',method:'post',data})
//登录权限
export const getMenu = (data)=> http.post('/permission/getMenu',data)
