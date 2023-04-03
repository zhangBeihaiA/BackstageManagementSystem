import Mock from 'mockjs'
import homeApi from './mockServerData/home'
import user from './mockServerData/user'

Mock.mock("/api/home/getData",'get',homeApi.getStatisticalData )
//用户列表的数据
Mock.mock('/api/user/add','post',user.createUser)
Mock.mock('/api/user/adit','post',user.update)
Mock.mock('/api/user/delete','post',user.delete)
Mock.mock('/api/user/getUser','get',user.getUserList)