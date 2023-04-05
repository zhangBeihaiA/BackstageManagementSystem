const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  //代理跨域
  devServer:{
    //改变代码时页面自动刷新
    // inline:true,
    proxy: {
      //前台项目在发请求的时候路径中带有/api的字段，代理服务器开始工作
      //跨域jsonp cros,代理
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
         changeOrigin: true // 支持跨域
        // pathRewrite:{'^/api':''},
      },
      // '/rand.qinghua':{
      //   target:'https://api.uomg.com/api/rand.qinghua',
      //   // pathRewrite:{"^/qinghua":''},
      //   // changeOrigin:true
      // }
    }
  }
})
