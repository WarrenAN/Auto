<template>
    <el-container class="home_container">
<!--      头部区域-->
      <el-header>
        <div>
          <img src="../assets/smart-home.png" alt="">
          <span>智能家居管理</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
        <!--页面主体区域-->
        <el-container>
          <!--侧边栏-->
          <el-aside :width="isCollapse ? '64px':'200px'">
            <div class="toggle-button" @click="toggleCollapse"><--</div>
            <!--侧边栏菜单区域-->
            <el-menu background-color="#545c64" text-color="#fff" active-text-color="#409bff"
                     :unique-opened="true" :collapse="isCollapse" :collapse-transition="false" :router="true"
                     :default-active="activePath">
              <!--一级菜单-->
              <!--   注意花了很多时间     -->
              <el-submenu :index="item.index" v-for="item in menulist" :key="item.index">
                <!--一级菜单模板区域-->
                <template slot="title">
                  <!--图标-->
                  <i :class="iconsObj[item.index]"></i>
                  <!--文本-->
                  <span>{{item.first_navigationbar}}</span>
                </template>
                <!--二级菜单-->
                <el-menu-item :index="'/'+subitem.UrlPath" v-for="subitem in item.second_navigationbar"
                              :key="subitem.SecondIndex" @click="saveNavState('/'+subitem.UrlPath)"
                              >
                  <template slot="title">
                    <!--图标-->
                    <i class="el-icon-menu"></i>
                    <!--文本-->
                    <span>{{subitem.name}}</span>
                  </template>
                </el-menu-item>
              </el-submenu>

            </el-menu>
          </el-aside>
<!--          右边内容主体-->
          <el-main>
<!--            路由占位符-->
            <router-view></router-view>
<!--            <router-view></router-view>-->
          </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "Home",
      data(){
          return {
            //左侧菜单数据
            menulist:[],
            iconsObj:{
              '1': 'el-icon-user-solid',
              '2': 'el-icon-data-analysis',
              '3': 'el-icon-microphone',
              '4': 'el-icon-full-screen',
              '5': 'el-icon-s-home',
              '6': 'el-icon-guide',
              '7': 'el-icon-c-scale-to-original',
              '24': 'el-icon-message-solid'
            },
            //是否折叠
            isCollapse:false,
            //被激活的链接地址
            activePath:''
          }
      },
      created() {
          this.getMenuList(),
            this.activePath = window.sessionStorage.getItem('activePath')
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
        },
        //  菜单折叠
        toggleCollapse(){
            this.isCollapse = !this.isCollapse
        },
        //  save links
        saveNavState(activePath){
            window.sessionStorage.setItem('activePath',activePath)
          this.activePath = activePath
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
    .el-menu{
      border-right: none;
    }
  }
  .el-main{
    background-color: #EAEDF1;
  }
  .toggle-button{
    background-color: #4a5064;
    color: #fff;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
</style>
