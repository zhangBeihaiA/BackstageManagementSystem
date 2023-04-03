import http from '../utils/request'

//请求首页数据
export const getData = ()=> http({url:'/home/getData',method:'get'})
//请求用户列表
export const getUser = (data)=>http({url:'/user/getUser',method:'get',data})
//新增用户
export const addUser = (data)=>http({url:'/user/add',method:'post',data})
//编辑用户
export const editUser = (data)=>http({url:'/user/edit',method:'post',data})
//删除用户
export const deleteUser = (data)=>http({url:'/user/delete',method:'post',data})
