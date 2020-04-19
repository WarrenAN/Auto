import Vue from 'vue'
import Router from 'vue-router'
import login from "../components/login"
import Home from "../components/Home"
import Welcome from "../components/Welcome"
import userlist from "../components/usermanager/userlist"
import creathome from "../components/myhome/creathome"
import seteletrical from "../components/myeletrical/seteletrical"
import expectancy from "../components/myeletrical/expectancy"
import addeletrical from "../components/myeletrical/addeletrical"
import manageeletrical from "../components/myeletrical/manageeletrical"
import eletconsume from "../components/myeletrical/eletconsume"
import joinhome from "../components/myhome/joinhome"
import invitefamilymembers from "../components/myhome/invitefamilymembers"
import homemanage from "../components/myhome/homemanage"
import commandmanage from "../components/command/commandmanage"
import eyes from "../components/other/eyes"
import addcommand from "../components/command/addcommand"
import chinesetoenglish from "../components/other/chinesetoenglish"
import sitesharing from "../components/other/sitesharing"
import feedback from "../components/other/feedback"
import wechatalert from "../components/alert/wechatalert"
import video from "../components/video"

Vue.use(Router)

const  router = new Router({
  routes: [
    { path: '/', redirect:'/login'  },
    { path: '/video',component: video },
    // { path:'/eyes',component: eyes},
    { path: '/login', component: login },
    { path:'/Home',component: Home,
      redirect: '/Welcome',
      children: [{ path: '/Welcome', component: Welcome },
        { path:'/userlist',component: userlist },
        { path:'/creathome',component: creathome},
        { path:'/seteletrical',component: seteletrical},
        { path:'/expectancy',component: expectancy},
        { path:'/addeletrical',component: addeletrical},
        { path:'/manageeletrical',component: manageeletrical},
        { path:'/eletconsume',component: eletconsume},
        { path:'/joinhome',component: joinhome},
        { path:'/invitefamilymembers',component: invitefamilymembers},
        { path:'/homemanage',component: homemanage},
        { path:'/commandmanage',component: commandmanage},
        { path:'/eyes',component: eyes},
        { path:'/addcommand',component: addcommand},
        { path:'/chinesetoenglish',component: chinesetoenglish},
        { path:'/sitesharing',component: sitesharing},
        { path:'/feedback',component: feedback},
        { path:'/wechatalert',component: wechatalert}
      ]
    },
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
