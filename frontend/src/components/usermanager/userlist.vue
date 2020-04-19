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
          <el-button type="primary" @click="addDialogVisible=true">
            添加用户
          </el-button>
        </el-col>

      </el-row>

<!--      show userlist-->
      <el-table :data="userList" border stripe>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="姓名" prop="fields.user_name"></el-table-column>
        <el-table-column label="邮箱" prop="fields.email"></el-table-column>
        <el-table-column label="手机号" prop="fields.user_telephone"></el-table-column>
        <el-table-column label="微信号" prop="fields.wechatID"></el-table-column>
        <el-table-column label="账号状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.fields.status" @change="userStatusChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="ShowEditDialog(scope.row.pk)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.pk)"></el-button>
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

    <!--    这是添加用户的对话框-->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible"
               width="50%" @close="addDialogClosed">
      <!--      新增用户读取区-->
      <el-form ref="addFromRef" :model="addFrom" :rules="addFromRules" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addFrom.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="addFrom.password" prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="telephone">
          <el-input v-model="addFrom.telephone" prefix-icon="el-icon-phone-outline"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addFrom.email" prefix-icon="el-icon-message"></el-input>
        </el-form-item>

        <el-form-item label="微信号" prop="wechat">
          <el-input v-model="addFrom.wechatID" prefix-icon="el-icon-chat-dot-round"></el-input>
        </el-form-item>
      </el-form>
      <!--      底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addnewuser">确 定</el-button>
      </span>
    </el-dialog>

<!--    修改用户的对话框-->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible"
               width="50%" @close="editDialogClosed" >
      <el-form :model="editFrom" :rules="editFromRules" ref="editFromRef" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editFrom.user_name" disabled></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="editFrom.user_password" type="password"></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="telephone">
          <el-input v-model="editFrom.user_telephone"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editFrom.email"></el-input>
        </el-form-item>

        <el-form-item label="微信号" prop="wechat">
          <el-input v-model="editFrom.wechatID"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>

<!--    删除用户对话框-->



  </div>

</template>

<script>
    export default {
        name: "userlist",
      data(){
       //   验证邮箱规则
        var checkEmail = (rules,value,cb)=>{
          //验证邮箱表达式
          const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-]+)+/
          if(regEmail.test(value)) {
            return cb()
          }
          cb(new Error("请输入合法的邮箱地址"))
        }
       // 验证电话号码
        var checkTelephone = (rules,value,cb)=>{
          const regTelephone = /^1[3456789]\d{9}$/
          if(regTelephone.test(value) ||value==null) {
            return cb()
          }
          cb(new Error("请输入合法的手机号码"))
        }

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
         total:0,
         //控制添加用户对话框的显示与隐藏
         addDialogVisible: false,
         //编辑用户对话框的显示与隐藏
         editDialogVisible: false,

       //  这是查询到的用户信息对象
         editFrom:{user_name:'',user_password:'',user_telephone:'',wechatID:'',email:''},
       //  添加用户的表达对象
         addFrom: {
           username:'', password:'', email:'', telephone:'', wechatID:''
         },
         //添加表达验证规则对象
         addFromRules: {
           username: [
             // 验证用户名是否合法
             { required: true, message: '请输入登录名称', trigger: 'blur' },
             { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
             ],
           // 验证密码是否合法
            password: [
              { required: true, message: '请输入登录密码', trigger: 'blur' },
              { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
              ],
           //自定义邮箱规则
           email:[{ validator:checkEmail,trigger:'blur'}],
           //自定义手机号规则
           telephone:[{ validator:checkTelephone,trigger:'blur'}]
         },
       //  修改表单对象
         editFromRules:{
        //    // 验证密码是否合法
        // password: [
        //   { required: true, message: '请输入登录密码', trigger: 'blur' },
        //   { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }],
           //自定义邮箱规则
        email:[{ validator:checkEmail,trigger:'blur'}],
           //自定义手机号规则
        // telephone:[{ validator:checkTelephone,trigger:'blur'}],
        },
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
        // 监听 页码值改变的事件
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
        },
        addnewuser(){
            this.$refs.addFromRef.validate(async valid => {
              if (!valid) return
              const res = await this.$http.post('http://127.0.0.1:8000/api/add_user',this.addFrom)
              console.log(res)
              if(!res.data.error_num) {
                this.$message.success(res.data.msg)
              }
              else
                this.$message.error(res.data.msg)
            })
          },
        //监听添加用户对话框关闭事件
        addDialogClosed(){
            this.$refs.addFromRef.resetFields()
        },
        //监听修修改用户对话框关闭事件
        editDialogClosed(){
            this.$refs.editFromRef.resetFields()
        },
        //监听删除用户对话框关闭事件
        DeleteUserDialogClosed(){
            this.$refs
        },
        //展示编辑用户的对话框
        async ShowEditDialog(id){
          const  {data:res} = await this.$http.get('http://127.0.0.1:8000/api/query_userinfo?id='+id)
          if (res.error_num === 0) {
            this.editFrom = res['data'][0].fields
            console.log(this.editFrom)
          }
          else {
            this.$message.error('查询用户失败')
            console.log(res['msg'])
          }
          // if(res.)
          this.editDialogVisible=true
        },
        //删除用户 信息
     async removeUserById(id){
      //      弹框询问用户是否删除
        const confirmResult = await  this.$confirm(
          '此操作将永久删除该用户, 是否继续?',
          '删除用户',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).catch(err => err)
      // 如果用户确定删除，则返回值为 confirm
      // 如果用户取消删除，则返回值为 cancel
       if(confirmResult !== 'confirm'){
         return this.$message.info('已取消删除')
       }
      // console.log('确认删除')
      const {data:res} =await this.$http.get('http://127.0.0.1:8000/api/delete_user?id='+id)
       if (res.error_num === 0) {
         this.$message.success("删除用户成功!")
         this.getUserList()
       }
       else {
         return  this.$message.error('删除用户失败')
       }
       },
        //修改用户信息并提交
        editUserInfo(){
            this.$refs.editFromRef.validate(async valid => {
              if (!valid) return
              const res = await this.$http.post('http://127.0.0.1:8000/api/edit_user',this.editFrom)
              console.log(res)
              if(!res.data.error_num) {

              //  关闭对话框
                this.editDialogVisible = false
              //  刷新数据列表
                this.getUserList()
              //  提示修改成功
                 this.$message.success(res.data.msg)
              }
              else
                this.$message.error(res.data.msg)
            })
        }
        }
    }
</script>

<style lang="less" scoped>

</style>
