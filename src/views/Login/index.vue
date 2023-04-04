<template>
  <el-form ref="form" label-width="70px" class="login-container" :model="form" :rules="rules" inline>
    <h3 class="login_title">系统登录</h3>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" placeholder="请输入账户"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="submit" type="primary">登录</el-button>
    </el-form-item>
  </el-form>
  
</template>

<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
import {getMenu} from '../../api'
export default {
    name:'Login',
    data(){
      return{
        form:{
          username:'',
          password:''
        },
        rules:{
          username:[
            {required: true, message:'请输入用户名', trigger: 'blur'}
          ],
          password:[
            {required: true, message:'请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods:{
       submit(){
        // const token = Mock.Random.guid()
        // Cookie.set('token',token)
        // this.$router.push('/home')
        //async&&await************************************************************
        this.$refs.form.validate(async (valid)=>{
          try{
            if(valid){
            // getMenu(this.form).then(({data})=>{
            //   console.log(data)
            // })
            const result = await getMenu(this.form)
            if(result.data.code==20000){
                Cookie.set('token',result.data.data.token)
                this.$router.push('/home')
                this.$message({type:'success',message:'登录成功！'})
            }
            else{
              this.$message.error("用户名或密码错误！")
            }
        
          }
          }catch(error){
            alert(error.message)
          }
           
        })
      }
    }
}
</script>

<style lang="less">
  .login-container{
    text-align: center;
    width: 350px;
    border: 1px solid #eaeaea;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    // box-shadow: 0 0 25px rgb(125, 105, 174);
    box-sizing: border-box;
    .login_title{
      text-align: center;
      margin-bottom: 40px;
      color: #505458;
    }
    .el-input{
      width: 198px;
    }
    .el-button{
      margin-top: 10px;
    }
  }
</style>