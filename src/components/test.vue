<template>
  <div class="home">
    <el-row display="margin-top:10px">
        <el-input v-model="input" placeholder="请输入用户名" style="display:inline-table; width: 30%; float:left"></el-input>
        <el-input v-model="ktext" placeholder="请输入密码（选）" style="display:inline-table; width: 30%; float:left"></el-input>
        <el-button type="primary" @click="adduser()" style="float:left; margin: 2px;">新增</el-button>
        <el-button type="danger" @click="deleteuser()" style="float:left; margin: 2px;">删除</el-button>
    </el-row>
    <el-row>
        <el-table :data="userList" style="width: 100%" border>
          <el-table-column prop="id" label="编号" min-width="100">
            <template scope="scope"> {{ scope.row.pk }}  </template>
          </el-table-column>
          <el-table-column prop="user_name" label="用户名" min-width="100">
            <template scope="scope"> {{ scope.row.fields.user_name }} </template>
          </el-table-column>
          <el-table-column prop="user_password" label="密码" min-width="100">
            <template scope="scope"> {{ scope.row.fields.user_password }} </template>
          </el-table-column>
        </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      input: '',
      ktext: '',
      userList: []
    }
  },
  mounted: function () {
    this.showusers()
  },
  methods: {
    adduser() {
      this.$http.get('http://127.0.0.1:8000/api/add_user?user_name=' + this.input + '&user_password=' + this.ktext)
        .then((response) => {
          var res = JSON.parse(response.bodyText)
          if (res.error_num === 0) {
            this.showusers()
          } else {
            this.$message.error('新增用户失败，请重试')
            console.log(res['msg'])
          }
        })
    },
    deleteuser(){
      this.$http.get('http://127.0.0.1:8000/api/delete_user?user_name=' + this.input + '&user_password=' + this.ktext)
      .then((response) => {
          var res = JSON.parse(response.bodyText)
          if (res.error_num === 0) {
            this.showusers()
          } else {
            this.$message.error('删除用户失败，请重试')
            console.log(res['msg'])
          }
        })
    },
    showusers() {
      this.$http.get('http://127.0.0.1:8000/api/show_users')
        .then((response) => {
          var res = JSON.parse(response.bodyText)
          console.log(res)
          if (res.error_num === 0) {
            this.userList = res['list']
          } else {
            this.$message.error('查询用户失败')
            console.log(res['msg'])
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

