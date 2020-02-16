import Vue from 'vue'
import Router from 'vue-router'
import login from "../components/login"
import h from '../components/h'
import Home from "../components/Home"

Vue.use(Router)

const  router = new Router({
  routes: [
    { path: '/', redirect:'/login'  },
    { path: '/login', component: login  },
    { path:'/h', component: h },
    { path:'/Home',component: Home  },
  ]
})

// 挂载路由导航守卫
router.beforeEach((to,from,next)=>{
  //to 将要访问的路径
  //from 代表从那个路径跳转
  //next 是一个函数，表示放行
  //  next() 放行 next('/login') force jump to login
  if(to.path === '/login') return next()
  // get token
  const tokenstr = window.sessionStorage.getItem('token')
  if(!tokenstr) return  next('/login')
  next()
})

export default router
{}
