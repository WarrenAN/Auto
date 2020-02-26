<template>
  <div>
<!--    用户列表-->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/userlist">用户管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>


<!--    卡片视图-->
    <el-card>

      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>

        <el-col :span="4" >
          <el-button type="primary">
            添加用户
          </el-button>
        </el-col>

      </el-row>

      <el-table :data="userList" border stripe>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="姓名" prop="fields.user_name"></el-table-column>
        <el-table-column label="邮箱" prop="fields.email"></el-table-column>
        <el-table-column label="微信号" prop="fields.wechatID"></el-table-column>
        <el-table-column label="账号状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.fields.status" @change="userStatusChange(scope.row)">

            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <el-tooltip class="item" effect="dark" content="设置" placement="top">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

<!--      分页区域-->

      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="queryinfo.pagenum" :page-sizes="[1, 2, 5, 10]"
                     :page-size="queryinfo.pagesize" layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>
    </el-card>

  </div>

</template>

<script>
    export default {
        name: "userlist",
      data(){
       return{
       //  获取用户列表的参数对象
         queryinfo: {
           query: '',
           //当前的页数
           pagenum: 1,
           //当前每页显示多少条数据
           pagesize: 2
         },
         userList:[],
         total:0
       }
      },
      created() {
          this.getUserList()
      },
      methods:{
          async getUserList(){
            this.$http.get('http://127.0.0.1:8000/api/show_users',{params:this.queryinfo})
            .then((response) => {
              var res = JSON.parse(response.bodyText)
              if (res.error_num === 0) {
                this.userList = res['data']
                this.total = res.total
                console.log(this.userList)
              } else {
                this.$message.error('查询用户失败')
                console.log(res['msg'])
              }
            })
          },
      //监听 pagesizi改变的事件
        handleSizeChange(newSize){
            // console.log(newSize)
          this.queryinfo.pagesize = newSize
          this.getUserList()
        },
        //监听 页码值改变的事件
        handleCurrentChange(newPage){
            // console.log(newPage)
          this.queryinfo.pagenum = newPage
          this.getUserList()
        },
        //监听switch开关状态的改变
        async userStatusChange(userinfo){
            // console.log(userinfo)
         const res = await this.$http.get('http://127.0.0.1:8000/api/edit_user_status?user_id='+userinfo.pk+'&user_status='+userinfo.fields.status)
          console.log(res)
          if(!res.data.error_num) {
          this.$message.success("更新用户状态成功")
        }
        else {
          userinfo.fields.status = !userinfo.fields.status
            return this.$message.error("更新用户状态失败")
          }
        }
      }
    }
</script>

<style lang="less" scoped>

</style>
