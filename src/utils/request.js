import axios from 'axios'

const http = axios.create({
    baseURL:'/api',
    timeout:5000
})
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    // console.log(config)
    // console.log("我是请求拦截")
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
http.interceptors.response.use(function (response) {
    // Do something with response data
    // console.log("我是响应拦截")
    // console.log(response)
    return response;
    
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  })

export default http