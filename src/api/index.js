import http from '../utils/request'

//请求首页数据
export const getData = ()=> http({url:'/home/getData',method:'get'})