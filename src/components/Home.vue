<template>
  <div>
    <el-button type="info" @click="logout">exit</el-button>
  </div>

</template>

<script>
    export default {
        name: "Home",
      methods:{
          //退出功能
        //清空token，跳转login
          logout(){
            window.sessionStorage.clear()
            this.$router.push('/login')
          }
      }
    }
</script>

<style scoped>

</style>
