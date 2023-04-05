//二次封住axios
import axios from "axios";

const request = axios.create({
    baseURL:'http://gmall-h5-api.atguigu.cn',
    timeout:5000,
})
request.interceptors.request.use(function(config){
    return config
},function(error){
    return Promise.reject(error)
})
request.interceptors.response.use(function (response) {
    // Do something with response data
    // console.log("我是响应拦截")
    // console.log(response)
    return response.data;
    
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  })

export default request