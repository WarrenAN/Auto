<template>
    <el-container class="home_container">
<!--      头部区域-->
      <el-header>
        <div>
          <img src="../assets/smart-home.png" alt="">
          <span>智能家居管理后台</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
        <!--页面主体区域-->
        <el-container>
          <!--侧边栏-->
          <el-aside width="200px">
            <!--侧边栏菜单区域-->
            <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
              <!--一级菜单-->
              <!--   注意花了很多时间     -->
              <el-submenu :index="item.index" v-for="item in menulist" :key="item">
                <!--一级菜单模板区域-->
                <template slot="title">
                  <!--图标-->
                  <i class="el-icon-location"></i>
                  <!--文本-->
                  <span>{{item.first_navigationbar}}</span>
                </template>
                <!--二级菜单-->
                <el-menu-item :index="subitem.SecondIndex" v-for="subitem in item.second_navigationbar">
                  <template slot="title">
                    <!--图标-->
                    <i class="el-icon-location"></i>
                    <!--文本-->
                    <span>{{subitem.name}}</span>
                  </template>
                </el-menu-item>
              </el-submenu>

            </el-menu>
          </el-aside>
<!--          右边内容主体-->
          <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "Home",
      data(){
          return {
            //左侧菜单数据
            menulist:[]
          }
      },
      created() {
          this.getMenuList()
      },
      methods:{
          //退出功能
        //清空token，跳转login
          logout(){
            window.sessionStorage.clear()
            this.$router.push('/login')
          },
      //  huoq
        async getMenuList(){
          const {data: res} =  await this.$http.get('http://127.0.0.1:8000/api/get_navigationbar');
          console.log(res);
          if(!res.error_num)
            this.menulist = res.data
          else
            this.$message.error(res.msg)
        }

      }
    }
</script>

<style lang="less" scoped>
  .home_container{
    height: 100%;
  }
.el-header{
  background-color: #545c64;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
  }
}
  .el-aside{
    background-color: #545c64;
  }
  .el-main{
    background-color: #EAEDF1;
  }
</style>
