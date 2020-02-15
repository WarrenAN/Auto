import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import test from "../components/test";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // 路由重定向
      redirect: '/login',
    },
    {
      path:  '/login', component: login
    }
  ]
})
