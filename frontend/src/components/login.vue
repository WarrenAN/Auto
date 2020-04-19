<template>
  <div class="homepage-hero-module" style="height: 100%;width: 100%">
    <div class="video-container">
      <div class="filter">
        <div class="login_container">
          <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
              <img src="../assets/top.jpg" alt="">
            </div>
            <!-- 登录表单区域 -->
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
              <!-- 用户名 -->
              <el-form-item prop="username">
                <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
              </el-form-item>
              <!-- 密码 -->
              <el-form-item prop="password">
                <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" show-password></el-input>
              </el-form-item>
              <!-- 按钮区域 -->
              <el-form-item class="btns">
                <el-button type="primary" @click="login">登录</el-button>
                <el-button type="info" @click="resetLoginForm">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <video autoplay loop muted playsinline class="fillWidth">
          <source src="static/coverr--man-looking-at-the-view-in-new-zealand-1585913277416.mp4" type="video/mp4">
        </video>
        <div class="poster hidden">
          <img src="static/coverr--man-looking-at-the-view-in-new-zealand-1585913277416.jpg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: 'yaofeng',
        password: 'admin123'
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮，重置登录表单
    resetLoginForm() {
      // console.log(this);
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
       //const res = await this.$http.post('http://127.0.0.1:8000/api/login?user_name=' + this.loginForm.username + '&user_password=' + this.loginForm.password)
        const res = await this.$http.post('http://127.0.0.1:8000/api/login',this.loginForm)
        console.log(res)
        if(!res.data.error_num) {
          this.$message.success(res.data.msg)
          window.sessionStorage.setItem('token', res.data.token)
          this.$router.push('/Home')
        }
        else
          this.$message.error(res.data.msg)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .homepage-hero-module,
  .video-container {
    position: relative;
    height: 100vh;
    overflow: hidden;
  }

  .video-container .poster img{
    z-index: 0;
    position: absolute;
  }

  .video-container .filter {
    z-index: 1;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    width: 100%;
  }

  .fillWidth {
    width: 100%;
  }

.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  /*最上层，z-index越大越上层*/
  z-index: 70;
  width: 450px;
  height: 300px;
  /*透明度 rgba（最后一位）*/
  background-color: rgba(255,255,255,0.1);
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
