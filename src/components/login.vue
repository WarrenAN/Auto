<template>
  <div class="login_container">
    <div class="login_box">
      <!--  头像区域    -->
      <div class="avatar_box">
        <img src="../assets/yaofeng.jpg" alt="">
      </div>
      <!--  登录表单区域   -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
      <!--用户名-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
      <!--密码-->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item>
      <!--登录重置按钮区域-->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetloginForm">重置</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      //登录表单信息绑定
      loginForm:{
        username:'',
        pasword:'',
      },
      //这是表单的验证规则
      loginFormRules:{
        //验证用户名是否合法
        username:[
          { required: true, message:'请输入用户名', trigger:'blur'},
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ],
        //验证密码是否合法
        password:[
          { required: true, message:'请输入密码', trigger:'blur'},
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    //重置按钮
    resetloginForm(){
      this.$refs.loginFormRef.resetFields();
    },
    //登录按钮，先预验证
    login(){
      this.$refs.loginFormRef.validate(valid =>{
        if(!valid) return;
        this.$http.get('http://127.0.0.1:8000/api/login?user_name=' + this.loginForm.username + '&user_password=' + this.loginForm.password)
        .then((response)=>{
          var res = JSON.parse(response.bodyText)
          console.log(res)
        })
      })
    }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
  .login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 4px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }

  .avatar_box{
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    img{
      width: 100%;
      height: 100%;
      border-radius: 100%;
      background-color: #eee;
    }
  }
.login_form{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns{
  display: flex;
  justify-content: flex-end;
}

</style>

